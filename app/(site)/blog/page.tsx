import { prisma } from '@/lib/db'
import { BLOG_CATEGORIES } from '@/lib/data'
import { BlogPageClient } from './BlogPageClient'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'ブログ・技術情報 | HackLab Inc.' }

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { date: 'desc' },
  })
  return <BlogPageClient posts={posts} categories={BLOG_CATEGORIES} />
}
