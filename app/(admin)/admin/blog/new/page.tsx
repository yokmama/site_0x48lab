import { requireAdminPage } from '@/lib/auth'
import { AdminShell } from '../../components/AdminShell'
import { BlogFormClient } from '../BlogFormClient'

export const metadata = { title: 'ブログ記事 新規作成' }

export default async function NewBlogPage() {
  const user = await requireAdminPage()
  return (
    <AdminShell user={user}>
      <BlogFormClient initialData={null} />
    </AdminShell>
  )
}
