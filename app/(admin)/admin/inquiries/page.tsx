import { requireAdminPage } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { isSmtpConfigured } from '@/lib/server/smtp'
import { AdminShell } from '../components/AdminShell'
import { InquiriesClient, type InquirySummary } from './InquiriesClient'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'お問い合わせ' }

type InquiryRow = {
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

function serializeInquiry(row: InquiryRow): InquirySummary {
  return {
    ...row,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    lastRepliedAt: row.lastRepliedAt?.toISOString() ?? null,
  }
}

export default async function AdminInquiriesPage({ searchParams }: { searchParams?: Promise<{ id?: string }> }) {
  const user = await requireAdminPage()
  const selectedId = (await searchParams)?.id ?? ''
  const rows = await prisma.$queryRaw<InquiryRow[]>`
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
    ORDER BY ci."createdAt" DESC
    LIMIT 100
  `

  return (
    <AdminShell user={user}>
      <InquiriesClient
        initialInquiries={rows.map(serializeInquiry)}
        initialSelectedId={selectedId}
        smtpConfigured={isSmtpConfigured()}
      />
    </AdminShell>
  )
}
