import { requireAdminPage } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { AdminShell } from '../../components/AdminShell'
import { WorkFormClient } from '../WorkFormClient'

export const metadata = { title: '実績・事例 編集' }

export default async function EditWorkPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireAdminPage()
  const { id } = await params
  const work = await prisma.work.findUnique({ where: { id: Number(id) } })
  if (!work) notFound()
  return <AdminShell user={user}><WorkFormClient initialData={work} /></AdminShell>
}
