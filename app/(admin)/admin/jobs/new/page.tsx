import { requireAdminPage } from '@/lib/auth'
import { AdminShell } from '../../components/AdminShell'
import { JobFormClient } from '../JobFormClient'

export const metadata = { title: '採用情報 新規作成' }

export default async function NewJobPage() {
  const user = await requireAdminPage()
  return <AdminShell user={user}><JobFormClient initialData={null} /></AdminShell>
}
