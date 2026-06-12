'use client'

import { useOptimistic, useTransition, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { BlogPost } from '@/generated/prisma/client'
import { AdminListTable } from '../components/AdminListTable'

type Props = { initialPosts: BlogPost[]; initialTotal: number }

export function BlogListClient({ initialPosts, initialTotal }: Props) {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const [posts, optimisticDelete] = useOptimistic(initialPosts, (state, id: number) => state.filter(p => p.id !== id))
  const [total, setTotal] = useState(initialTotal)
  const [page, setPage] = useState(1)
  const limit = 20

  async function handleDelete(id: number | string) {
    startTransition(async () => {
      optimisticDelete(id as number)
      const res = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' })
      if (!res.ok) { router.refresh(); return }
      setTotal(t => t - 1)
    })
  }

  async function handlePageChange(newPage: number) {
    const res = await fetch(`/api/admin/blog?page=${newPage}&limit=${limit}`)
    const data = await res.json()
    if (data.ok) {
      setPage(newPage)
      router.refresh()
    }
  }

  const columns = [
    { key: 'title', label: 'タイトル' },
    { key: 'category', label: 'カテゴリ' },
    { key: 'date', label: '日付', render: (p: BlogPost) => new Date(p.date).toLocaleDateString('ja-JP') },
    { key: 'published', label: '公開', render: (p: BlogPost) => p.published ? '✓' : '–' },
  ]

  return (
    <AdminListTable
      title="ブログ記事"
      rows={posts}
      columns={columns}
      editBasePath="/admin/blog"
      newHref="/admin/blog/new"
      onDelete={handleDelete}
      total={total}
      page={page}
      limit={limit}
      onPageChange={handlePageChange}
    />
  )
}
