import { requireAdminPage } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { AdminShell } from '../../components/AdminShell'
import { UserFormClient } from '../UserFormClient'

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireAdminPage()
  const { id } = await params
  const adminUser = await prisma.adminUser.findUnique({ where: { id: Number(id) }, select: { id: true, email: true, name: true, createdAt: true, updatedAt: true } })
  if (!adminUser) notFound()
  return <AdminShell user={user}><UserFormClient initialData={adminUser} /></AdminShell>
}
