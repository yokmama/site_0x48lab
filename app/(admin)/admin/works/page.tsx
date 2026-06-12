import { requireAdminPage } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { AdminShell } from '../components/AdminShell'
import { WorksListClient } from './WorksListClient'

export const metadata = { title: '実績・事例管理' }

export default async function AdminWorksPage() {
  const user = await requireAdminPage()
  const [works, total] = await prisma.$transaction([
    prisma.work.findMany({ orderBy: { sortOrder: 'asc' }, take: 20 }),
    prisma.work.count(),
  ])
  return (
    <AdminShell user={user}>
      <WorksListClient initialWorks={works} initialTotal={total} />
    </AdminShell>
  )
}
