import { requireAdminPage } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { AdminShell } from '../../components/AdminShell'
import { JobFormClient } from '../JobFormClient'

export const metadata = { title: '採用情報 編集' }

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireAdminPage()
  const { id } = await params
  const job = await prisma.jobOpening.findUnique({ where: { id } })
  if (!job) notFound()
  return <AdminShell user={user}><JobFormClient initialData={job} /></AdminShell>
}
