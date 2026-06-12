import { requireAdminPage } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { AdminShell } from '../components/AdminShell'
import { TeamListClient } from './TeamListClient'

export const metadata = { title: 'チームメンバー管理' }

export default async function AdminTeamPage() {
  const user = await requireAdminPage()
  const members = await prisma.teamMember.findMany({ orderBy: { sortOrder: 'asc' } })
  return <AdminShell user={user}><TeamListClient initialMembers={members} /></AdminShell>
}
