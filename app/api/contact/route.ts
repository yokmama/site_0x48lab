import {
  normalizeContactRequest,
  type ContactRequest,
  type ContactResponse,
  validateContactRequest,
} from '@/lib/contact'
import { prisma } from '@/lib/db'
import { randomUUID } from 'node:crypto'
import net from 'node:net'
import tls from 'node:tls'

export const runtime = 'nodejs'

type SmtpConfig = {
  host: string
  port: number
  secure: boolean
  startTls: boolean
  user?: string
  pass?: string
  from: string
  to: string
}

function smtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST
  const to = process.env.CONTACT_TO_EMAIL
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const from = process.env.SMTP_FROM_EMAIL || user || to
  if (!host || !to || !from) return null

  const port = Number(process.env.SMTP_PORT || '587')
  return {
    host,
    port,
    secure: process.env.SMTP_SECURE === 'true' || port === 465,
    startTls: process.env.SMTP_STARTTLS === 'true',
    user,
    pass,
    from,
    to,
  }
}

function encodeSubject(value: string) {
  return `=?UTF-8?B?${Buffer.from(value, 'utf8').toString('base64')}?=`
}

function escapeData(value: string) {
  return value.replace(/\r?\n/g, '\r\n').replace(/^\./gm, '..')
}

function formatUtm(utm?: Record<string, string>) {
  if (!utm || Object.keys(utm).length === 0) return 'なし'
  return Object.entries(utm).map(([key, value]) => `${key}: ${value}`).join('\n')
}

function mailBody(contact: ContactRequest, inquiryId: string) {
  return [
    'ハックラボサイトから無料相談が送信されました。',
    '',
    `問い合わせID: ${inquiryId}`,
    `会社名: ${contact.company}`,
    `お名前: ${contact.name}`,
    `メール: ${contact.email}`,
    `電話: ${contact.phone || '未入力'}`,
    `種別: ${contact.inquiryType || '未選択'}`,
    `予算感: ${contact.budgetRange || '未選択'}`,
    `希望時期: ${contact.timeline || '未選択'}`,
    `流入ページ: ${contact.sourcePath || '不明'}`,
    '',
    'UTM:',
    formatUtm(contact.utm),
    '',
    'お問い合わせ内容:',
    contact.message,
  ].join('\n')
}

async function sendSmtpNotification(contact: ContactRequest, inquiryId: string) {
  const config = smtpConfig()
  if (!config) return false

  let socket: net.Socket | tls.TLSSocket = config.secure
    ? tls.connect({ host: config.host, port: config.port, servername: config.host })
    : net.connect({ host: config.host, port: config.port })

  socket.setTimeout(10000)

  let buffer = ''
  const readResponse = () => new Promise<string>((resolve, reject) => {
    const onData = (chunk: Buffer) => {
      buffer += chunk.toString('utf8')
      const lines = buffer.split(/\r?\n/)
      const complete = lines.find((line) => /^\d{3} /.test(line))
      if (!complete) return
      cleanup()
      const response = buffer
      buffer = ''
      resolve(response)
    }
    const onError = (error: Error) => {
      cleanup()
      reject(error)
    }
    const onTimeout = () => {
      cleanup()
      reject(new Error('SMTP connection timed out'))
    }
    const cleanup = () => {
      socket.off('data', onData)
      socket.off('error', onError)
      socket.off('timeout', onTimeout)
    }
    socket.on('data', onData)
    socket.on('error', onError)
    socket.on('timeout', onTimeout)
  })

  const command = async (line: string, ok: RegExp) => {
    socket.write(`${line}\r\n`)
    const response = await readResponse()
    if (!ok.test(response)) throw new Error(`SMTP command failed: ${line}`)
    return response
  }

  try {
    await readResponse()
    await command(`EHLO ${config.host}`, /^250/m)

    if (!config.secure && config.startTls) {
      await command('STARTTLS', /^220/m)
      socket = tls.connect({ socket, servername: config.host })
      await command(`EHLO ${config.host}`, /^250/m)
    }

    if (config.user && config.pass) {
      await command('AUTH LOGIN', /^334/m)
      await command(Buffer.from(config.user).toString('base64'), /^334/m)
      await command(Buffer.from(config.pass).toString('base64'), /^235/m)
    }

    await command(`MAIL FROM:<${config.from}>`, /^250/m)
    await command(`RCPT TO:<${config.to}>`, /^250|^251/m)
    await command('DATA', /^354/m)

    const subject = encodeSubject(`【HackLab】無料相談 ${contact.company}`)
    const message = [
      `From: ${config.from}`,
      `To: ${config.to}`,
      `Subject: ${subject}`,
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=utf-8',
      'Content-Transfer-Encoding: 8bit',
      `Date: ${new Date().toUTCString()}`,
      '',
      escapeData(mailBody(contact, inquiryId)),
      '.',
    ].join('\r\n')

    socket.write(`${message}\r\n`)
    const dataResponse = await readResponse()
    if (!/^250/m.test(dataResponse)) throw new Error('SMTP DATA failed')
    await command('QUIT', /^221/m)
    return true
  } finally {
    socket.end()
  }
}

export async function POST(request: Request) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    const body: ContactResponse = {
      ok: false,
      code: 'INVALID_JSON',
      message: 'JSON payload is required.',
    }
    return Response.json(body, { status: 400 })
  }

  const contact = normalizeContactRequest(payload)
  if (!contact) {
    const body: ContactResponse = {
      ok: false,
      code: 'VALIDATION_ERROR',
      message: 'Invalid contact payload.',
    }
    return Response.json(body, { status: 400 })
  }

  if (contact.website?.trim()) {
    return Response.json({ ok: true, inquiryId: randomUUID() } satisfies ContactResponse)
  }

  const fieldErrors = validateContactRequest(contact)
  if (Object.keys(fieldErrors).length > 0) {
    const body: ContactResponse = {
      ok: false,
      code: 'VALIDATION_ERROR',
      message: 'Contact payload failed validation.',
      fieldErrors,
    }
    return Response.json(body, { status: 400 })
  }

  const inquiryId = randomUUID()
  const utm = contact.utm ? JSON.stringify(contact.utm) : null

  try {
    await prisma.$executeRaw`
      INSERT INTO "ContactInquiry" (
        "id",
        "company",
        "name",
        "email",
        "phone",
        "inquiryType",
        "budgetRange",
        "timeline",
        "message",
        "sourcePath",
        "utm",
        "privacyConsent",
        "privacyConsentAt",
        "updatedAt"
      ) VALUES (
        ${inquiryId},
        ${contact.company.trim()},
        ${contact.name.trim()},
        ${contact.email.trim()},
        ${contact.phone?.trim() || null},
        ${contact.inquiryType || null},
        ${contact.budgetRange || null},
        ${contact.timeline || null},
        ${contact.message.trim()},
        ${contact.sourcePath || null},
        CAST(${utm} AS jsonb),
        ${contact.privacyConsent},
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      )
    `

    try {
      const notified = await sendSmtpNotification(contact, inquiryId)
      if (notified) {
        await prisma.$executeRaw`
          UPDATE "ContactInquiry"
          SET "notificationAt" = CURRENT_TIMESTAMP, "updatedAt" = CURRENT_TIMESTAMP
          WHERE "id" = ${inquiryId}
        `
      }
    } catch (error) {
      console.error('Contact SMTP notification failed', error)
    }
  } catch (error) {
    console.error('Contact inquiry save failed', error)
    const body: ContactResponse = {
      ok: false,
      code: 'SAVE_FAILED',
      message: 'Contact inquiry could not be saved.',
    }
    return Response.json(body, { status: 500 })
  }

  return Response.json({ ok: true, inquiryId } satisfies ContactResponse)
}
