import { requireAdminPage } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { AdminShell } from '../components/AdminShell'
import { BlogListClient } from './BlogListClient'

export const metadata = { title: 'ブログ管理' }

export default async function AdminBlogPage() {
  const user = await requireAdminPage()
  const [posts, total] = await prisma.$transaction([
    prisma.blogPost.findMany({ orderBy: { sortOrder: 'asc' }, take: 20 }),
    prisma.blogPost.count(),
  ])
  return (
    <AdminShell user={user}>
      <BlogListClient initialPosts={posts} initialTotal={total} />
    </AdminShell>
  )
}
