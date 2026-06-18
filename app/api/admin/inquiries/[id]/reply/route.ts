import { randomUUID } from 'node:crypto'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/admin/guard'
import { normalizeInquiryReply, validateInquiryReply } from '@/lib/admin/inquiries'
import type { AdminResponse } from '@/lib/admin/types'
import { isSmtpConfigured, sendSmtpMail, smtpFromAddress } from '@/lib/server/smtp'

export const runtime = 'nodejs'

type InquiryRow = {
  id: string
  email: string
}

type ReplyPayload = {
  id: string
  toEmail: string
  fromEmail: string
  subject: string
  body: string
  deliveryStatus: string
  sentAt: string
  adminName: string
}

function replyMailBody(body: string, inquiryId: string) {
  return [
    body,
    '',
    '---',
    `お問い合わせID: ${inquiryId}`,
    '株式会社ハックラボ',
  ].join('\n')
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin(request)
  if (guard.ok === false) return guard.response

  const { id } = await params
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return Response.json({ ok: false, code: 'INVALID_JSON' } as AdminResponse, { status: 400 })
  }

  const data = normalizeInquiryReply(payload)
  if (!data) return Response.json({ ok: false, code: 'INVALID_PAYLOAD' } as AdminResponse, { status: 400 })

  const errors = validateInquiryReply(data)
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, code: 'VALIDATION_ERROR', fieldErrors: errors } as AdminResponse, { status: 422 })
  }

  const [inquiry] = await prisma.$queryRaw<InquiryRow[]>`
    SELECT "id", "email"
    FROM "ContactInquiry"
    WHERE "id" = ${id}
    LIMIT 1
  `

  if (!inquiry) return Response.json({ ok: false, code: 'NOT_FOUND' } as AdminResponse, { status: 404 })
  if (!isSmtpConfigured()) {
    return Response.json({
      ok: false,
      code: 'SMTP_NOT_CONFIGURED',
      message: 'SMTP settings are required before replying to inquiries.',
    } as AdminResponse, { status: 503 })
  }

  const fromEmail = smtpFromAddress()
  const replyBody = replyMailBody(data.body, inquiry.id)
  const sentAt = new Date()

  try {
    await sendSmtpMail({
      to: inquiry.email,
      subject: data.subject,
      text: replyBody,
    })
  } catch (error) {
    console.error('Contact inquiry reply failed', error)
    return Response.json({
      ok: false,
      code: 'EMAIL_SEND_FAILED',
      message: 'Email could not be sent.',
    } as AdminResponse, { status: 502 })
  }

  const replyId = randomUUID()
  await prisma.$transaction([
    prisma.$executeRaw`
      INSERT INTO "ContactInquiryReply" (
        "id",
        "inquiryId",
        "adminUserId",
        "toEmail",
        "fromEmail",
        "subject",
        "body",
        "deliveryStatus",
        "sentAt"
      ) VALUES (
        ${replyId},
        ${inquiry.id},
        ${guard.user.userId},
        ${inquiry.email},
        ${fromEmail},
        ${data.subject},
        ${replyBody},
        'sent',
        ${sentAt}
      )
    `,
    prisma.$executeRaw`
      UPDATE "ContactInquiry"
      SET
        "status" = 'replied',
        "lastRepliedAt" = ${sentAt},
        "lastRepliedById" = ${guard.user.userId},
        "updatedAt" = CURRENT_TIMESTAMP
      WHERE "id" = ${inquiry.id}
    `,
  ])

  const reply: ReplyPayload = {
    id: replyId,
    toEmail: inquiry.email,
    fromEmail,
    subject: data.subject,
    body: replyBody,
    deliveryStatus: 'sent',
    sentAt: sentAt.toISOString(),
    adminName: guard.user.name,
  }

  return Response.json({ ok: true, item: reply })
}
