import { requireAdminPage } from '@/lib/auth'
import { AdminShell } from '../../components/AdminShell'
import { TeamFormClient } from '../TeamFormClient'

export default async function NewTeamPage() {
  const user = await requireAdminPage()
  return <AdminShell user={user}><TeamFormClient initialData={null} /></AdminShell>
}
