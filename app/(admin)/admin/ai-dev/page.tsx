import { requireAdminPage } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { AdminShell } from '../components/AdminShell'
import { AiDevTabsClient } from './AiDevTabsClient'

export const metadata = { title: 'AI開発ページ管理' }

export default async function AdminAiDevPage() {
  const user = await requireAdminPage()
  const [problems, solutions, comparison, packages, examples, steps, faq] = await prisma.$transaction([
    prisma.aiDevProblem.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.aiDevSolution.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.aiDevComparisonRow.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.aiDevServicePackage.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.aiDevExampleProject.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.aiDevProcessStep.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.aiDevFaqItem.findMany({ orderBy: { sortOrder: 'asc' } }),
  ])
  return (
    <AdminShell user={user}>
      <AiDevTabsClient data={{ problems, solutions, comparison, packages, examples, steps, faq }} />
    </AdminShell>
  )
}
