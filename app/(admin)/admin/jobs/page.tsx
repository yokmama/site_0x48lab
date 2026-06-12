import { requireAdminPage } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { AdminShell } from '../components/AdminShell'
import { JobsListClient } from './JobsListClient'

export const metadata = { title: '採用情報管理' }

export default async function AdminJobsPage() {
  const user = await requireAdminPage()
  const jobs = await prisma.jobOpening.findMany({ orderBy: { sortOrder: 'asc' } })
  return <AdminShell user={user}><JobsListClient initialJobs={jobs} /></AdminShell>
}
