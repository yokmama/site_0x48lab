import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/admin/guard'
import type { AdminResponse } from '@/lib/admin/types'

export const runtime = 'nodejs'

type InquiryDetailRow = {
  id: string
  company: string
  name: string
  email: string
  phone: string | null
  inquiryType: string | null
  budgetRange: string | null
  timeline: string | null
  message: string
  sourcePath: string | null
  status: string
  adminNotes: string | null
  createdAt: Date
  updatedAt: Date
  lastRepliedAt: Date | null
  lastRepliedByName: string | null
  replyCount: number
}

type ReplyRow = {
  id: string
  toEmail: string
  fromEmail: string
  subject: string
  body: string
  deliveryStatus: string
  sentAt: Date
  adminName: string | null
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin(request)
  if (guard.ok === false) return guard.response

  const { id } = await params
  const [item] = await prisma.$queryRaw<InquiryDetailRow[]>`
    SELECT
      ci."id",
      ci."company",
      ci."name",
      ci."email",
      ci."phone",
      ci."inquiryType",
      ci."budgetRange",
      ci."timeline",
      ci."message",
      ci."sourcePath",
      ci."status",
      ci."adminNotes",
      ci."createdAt",
      ci."updatedAt",
      ci."lastRepliedAt",
      au."name" AS "lastRepliedByName",
      COALESCE(rc."replyCount", 0)::int AS "replyCount"
    FROM "ContactInquiry" ci
    LEFT JOIN "AdminUser" au ON au."id" = ci."lastRepliedById"
    LEFT JOIN (
      SELECT "inquiryId", COUNT(*)::int AS "replyCount"
      FROM "ContactInquiryReply"
      GROUP BY "inquiryId"
    ) rc ON rc."inquiryId" = ci."id"
    WHERE ci."id" = ${id}
    LIMIT 1
  `

  if (!item) return Response.json({ ok: false, code: 'NOT_FOUND' } as AdminResponse, { status: 404 })

  const replies = await prisma.$queryRaw<ReplyRow[]>`
    SELECT
      r."id",
      r."toEmail",
      r."fromEmail",
      r."subject",
      r."body",
      r."deliveryStatus",
      r."sentAt",
      au."name" AS "adminName"
    FROM "ContactInquiryReply" r
    LEFT JOIN "AdminUser" au ON au."id" = r."adminUserId"
    WHERE r."inquiryId" = ${id}
    ORDER BY r."sentAt" DESC
  `

  return Response.json({ ok: true, item: { ...item, replies } })
}
