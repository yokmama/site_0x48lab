import { requireAdminPage } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { AdminShell } from '../components/AdminShell'
import { LpTabsClient } from './LpTabsClient'

export const metadata = { title: 'LPページ管理' }

export default async function AdminLpPage() {
  const user = await requireAdminPage()
  const [problems, solutions, comparison, pricing, results, faq] = await prisma.$transaction([
    prisma.lpProblem.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.lpSolution.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.lpComparisonRow.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.lpPricing.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.lpResult.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.lpFaqItem.findMany({ orderBy: { sortOrder: 'asc' } }),
  ])
  return (
    <AdminShell user={user}>
      <LpTabsClient data={{ problems, solutions, comparison, pricing, results, faq }} />
    </AdminShell>
  )
}
