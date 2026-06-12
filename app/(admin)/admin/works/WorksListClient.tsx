'use client'

import { useOptimistic, useTransition, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Work } from '@/generated/prisma/client'
import { AdminListTable } from '../components/AdminListTable'

type Props = { initialWorks: Work[]; initialTotal: number }

export function WorksListClient({ initialWorks, initialTotal }: Props) {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const [works, optimisticDelete] = useOptimistic(initialWorks, (state, id: number) => state.filter(w => w.id !== id))
  const [total, setTotal] = useState(initialTotal)

  async function handleDelete(id: number | string) {
    startTransition(async () => {
      optimisticDelete(id as number)
      const res = await fetch(`/api/admin/works/${id}`, { method: 'DELETE' })
      if (!res.ok) { router.refresh(); return }
      setTotal(t => t - 1)
    })
  }

  const columns = [
    { key: 'title', label: 'タイトル' },
    { key: 'industry', label: '業種' },
    { key: 'service', label: 'サービス' },
    { key: 'published', label: '公開', render: (w: Work) => w.published ? '✓' : '–' },
  ]

  return (
    <AdminListTable
      title="実績・事例"
      rows={works}
      columns={columns}
      editBasePath="/admin/works"
      newHref="/admin/works/new"
      onDelete={handleDelete}
      total={total}
      page={1}
      limit={20}
    />
  )
}
