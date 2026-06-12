import { requireAdminPage } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { AdminShell } from '../../components/AdminShell'
import { TeamFormClient } from '../TeamFormClient'

export default async function EditTeamPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireAdminPage()
  const { id } = await params
  const member = await prisma.teamMember.findUnique({ where: { id: Number(id) } })
  if (!member) notFound()
  return <AdminShell user={user}><TeamFormClient initialData={member} /></AdminShell>
}
