import net from 'node:net'
import tls from 'node:tls'

type SmtpConfig = {
  host: string
  port: number
  secure: boolean
  startTls: boolean
  user?: string
  pass?: string
  from: string
  envelopeFrom: string
}

export type SmtpMail = {
  to: string
  subject: string
  text: string
  replyTo?: string
}

const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/

function sanitizeHeader(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim()
}

function extractEmail(value: string) {
  const cleaned = sanitizeHeader(value)
  const bracketMatch = cleaned.match(/<([^<>]+)>/)
  return (bracketMatch?.[1] ?? cleaned).trim()
}

function assertEmail(value: string, field: string) {
  const email = extractEmail(value)
  if (!emailPattern.test(email)) throw new Error(`Invalid ${field} email address`)
  return email
}

function smtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const from = process.env.SMTP_FROM_EMAIL || user
  if (!host || !from) return null

  const port = Number(process.env.SMTP_PORT || '587')
  return {
    host,
    port,
    secure: process.env.SMTP_SECURE === 'true' || port === 465,
    startTls: process.env.SMTP_STARTTLS === 'true',
    user,
    pass,
    from: sanitizeHeader(from),
    envelopeFrom: assertEmail(from, 'from'),
  }
}

export function isSmtpConfigured() {
  try {
    return smtpConfig() !== null
  } catch {
    return false
  }
}

export function smtpFromAddress() {
  try {
    return smtpConfig()?.from ?? ''
  } catch {
    return ''
  }
}

function encodeSubject(value: string) {
  return `=?UTF-8?B?${Buffer.from(sanitizeHeader(value), 'utf8').toString('base64')}?=`
}

function escapeData(value: string) {
  return value.replace(/\r?\n/g, '\r\n').replace(/^\./gm, '..')
}

function waitForSecure(socket: tls.TLSSocket) {
  return new Promise<void>((resolve, reject) => {
    const cleanup = () => {
      socket.off('secureConnect', onSecureConnect)
      socket.off('error', onError)
    }
    const onSecureConnect = () => {
      cleanup()
      resolve()
    }
    const onError = (error: Error) => {
      cleanup()
      reject(error)
    }
    socket.once('secureConnect', onSecureConnect)
    socket.once('error', onError)
  })
}

export async function sendSmtpMail(mail: SmtpMail) {
  const config = smtpConfig()
  if (!config) throw new Error('SMTP is not configured')

  const to = assertEmail(mail.to, 'to')
  const replyTo = mail.replyTo ? assertEmail(mail.replyTo, 'reply-to') : null

  let socket: net.Socket | tls.TLSSocket = config.secure
    ? tls.connect({ host: config.host, port: config.port, servername: config.host })
    : net.connect({ host: config.host, port: config.port })

  socket.setTimeout(10000)

  let buffer = ''
  const readResponse = () => new Promise<string>((resolve, reject) => {
    const cleanup = () => {
      socket.off('data', onData)
      socket.off('error', onError)
      socket.off('timeout', onTimeout)
    }
    const onData = (chunk: Buffer) => {
      buffer += chunk.toString('utf8')
      const complete = buffer.split(/\r?\n/).find((line) => /^\d{3} /.test(line))
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
      const secureSocket = tls.connect({ socket, servername: config.host })
      socket = secureSocket
      await waitForSecure(secureSocket)
      await command(`EHLO ${config.host}`, /^250/m)
    }

    if (config.user && config.pass) {
      await command('AUTH LOGIN', /^334/m)
      await command(Buffer.from(config.user).toString('base64'), /^334/m)
      await command(Buffer.from(config.pass).toString('base64'), /^235/m)
    }

    await command(`MAIL FROM:<${config.envelopeFrom}>`, /^250/m)
    await command(`RCPT TO:<${to}>`, /^250|^251/m)
    await command('DATA', /^354/m)

    const headers = [
      `From: ${config.from}`,
      `To: ${to}`,
      replyTo ? `Reply-To: ${replyTo}` : '',
      `Subject: ${encodeSubject(mail.subject)}`,
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=utf-8',
      'Content-Transfer-Encoding: 8bit',
      `Date: ${new Date().toUTCString()}`,
    ].filter(Boolean)

    socket.write(`${[...headers, '', escapeData(mail.text), '.'].join('\r\n')}\r\n`)
    const dataResponse = await readResponse()
    if (!/^250/m.test(dataResponse)) throw new Error('SMTP DATA failed')
    await command('QUIT', /^221/m)
  } finally {
    socket.end()
  }
}
