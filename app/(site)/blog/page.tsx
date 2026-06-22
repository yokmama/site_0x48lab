import { BLOG_POSTS, BLOG_CATEGORIES } from '@/lib/data'
import { BlogPageClient } from './BlogPageClient'

export const metadata = { title: 'ブログ・技術情報 | HackLab Inc.' }

export default function BlogPage() {
  const posts = BLOG_POSTS.map((p, i) => ({ id: i + 1, ...p }))
  return <BlogPageClient posts={posts} categories={BLOG_CATEGORIES} />
}
