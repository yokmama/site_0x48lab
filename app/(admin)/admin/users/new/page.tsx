import { requireAdminPage } from '@/lib/auth'
import { AdminShell } from '../../components/AdminShell'
import { UserFormClient } from '../UserFormClient'

export default async function NewUserPage() {
  const user = await requireAdminPage()
  return <AdminShell user={user}><UserFormClient initialData={null} /></AdminShell>
}
