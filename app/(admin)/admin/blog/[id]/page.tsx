import { requireAdminPage } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { AdminShell } from '../../components/AdminShell'
import { BlogFormClient } from '../BlogFormClient'

export const metadata = { title: 'ブログ記事 編集' }

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireAdminPage()
  const { id } = await params
  const post = await prisma.blogPost.findUnique({ where: { id: Number(id) } })
  if (!post) notFound()
  return (
    <AdminShell user={user}>
      <BlogFormClient initialData={post} />
    </AdminShell>
  )
}
