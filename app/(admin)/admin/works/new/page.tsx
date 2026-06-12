import { requireAdminPage } from '@/lib/auth'
import { AdminShell } from '../../components/AdminShell'
import { WorkFormClient } from '../WorkFormClient'

export const metadata = { title: '実績・事例 新規作成' }

export default async function NewWorkPage() {
  const user = await requireAdminPage()
  return <AdminShell user={user}><WorkFormClient initialData={null} /></AdminShell>
}
