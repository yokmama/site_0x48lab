import { requireAdminPage } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { AdminShell } from '../components/AdminShell'
import { UsersListClient } from './UsersListClient'

export const metadata = { title: 'ユーザー管理' }

export default async function AdminUsersPage() {
  const user = await requireAdminPage()
  const users = await prisma.adminUser.findMany({ orderBy: { id: 'asc' }, select: { id: true, email: true, name: true, createdAt: true, updatedAt: true } })
  return <AdminShell user={user}><UsersListClient currentUserId={user.userId} initialUsers={users} /></AdminShell>
}
