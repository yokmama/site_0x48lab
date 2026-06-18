import {
  normalizeContactRequest,
  type ContactRequest,
  type ContactResponse,
  validateContactRequest,
} from '@/lib/contact'
import { prisma } from '@/lib/db'
import { isSmtpConfigured, sendSmtpMail } from '@/lib/server/smtp'
import { randomUUID } from 'node:crypto'

export const runtime = 'nodejs'

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
  const to = process.env.CONTACT_TO_EMAIL
  if (!to || !isSmtpConfigured()) return false

  await sendSmtpMail({
    to,
    replyTo: contact.email,
    subject: `【HackLab】無料相談 ${contact.company}`,
    text: mailBody(contact, inquiryId),
  })
  return true
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
