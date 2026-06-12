const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export type BlogPostInput = {
  slug: string
  category: string
  title: string
  excerpt: string
  date: string
  readCount: number
  published: boolean
  sortOrder: number
}

export type BlogPostErrors = Partial<Record<keyof BlogPostInput, string>>

export function normalizeBlogPost(input: unknown): BlogPostInput | null {
  if (!input || typeof input !== 'object') return null
  const r = input as Record<string, unknown>
  return {
    slug: typeof r.slug === 'string' ? r.slug.trim().slice(0, 100) : '',
    category: typeof r.category === 'string' ? r.category.slice(0, 50) : '',
    title: typeof r.title === 'string' ? r.title.trim().slice(0, 200) : '',
    excerpt: typeof r.excerpt === 'string' ? r.excerpt.slice(0, 1000) : '',
    date: typeof r.date === 'string' ? r.date : '',
    readCount: typeof r.readCount === 'number' ? Math.max(0, Math.floor(r.readCount)) : 0,
    published: typeof r.published === 'boolean' ? r.published : true,
    sortOrder: typeof r.sortOrder === 'number' ? Math.floor(r.sortOrder) : 0,
  }
}

export function validateBlogPost(input: BlogPostInput): BlogPostErrors {
  const errors: BlogPostErrors = {}
  if (!input.slug) errors.slug = 'スラッグを入力してください'
  else if (!slugPattern.test(input.slug)) errors.slug = 'スラッグは小文字英数字とハイフンのみ使用できます'
  if (!input.category) errors.category = 'カテゴリを選択してください'
  if (!input.title.trim()) errors.title = 'タイトルを入力してください'
  if (!input.excerpt.trim()) errors.excerpt = '概要を入力してください'
  if (!input.date) errors.date = '日付を入力してください'
  else if (isNaN(new Date(input.date).getTime())) errors.date = '正しい日付を入力してください'
  return errors
}
