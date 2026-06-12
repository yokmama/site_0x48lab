'use client'

import { useOptimistic, useTransition, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { JobOpening } from '@/generated/prisma/client'
import { AdminListTable } from '../components/AdminListTable'

type Props = { initialJobs: JobOpening[] }

export function JobsListClient({ initialJobs }: Props) {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const [jobs, optimisticDelete] = useOptimistic(initialJobs, (state, id: string) => state.filter(j => j.id !== id))
  const [total, setTotal] = useState(initialJobs.length)

  async function handleDelete(id: number | string) {
    startTransition(async () => {
      optimisticDelete(id as string)
      const res = await fetch(`/api/admin/jobs/${id}`, { method: 'DELETE' })
      if (!res.ok) { router.refresh(); return }
      setTotal(t => t - 1)
    })
  }

  const columns = [
    { key: 'title', label: 'タイトル' },
    { key: 'type', label: '雇用形態' },
    { key: 'location', label: '勤務地' },
    { key: 'published', label: '公開', render: (j: JobOpening) => j.published ? '✓' : '–' },
  ]

  return (
    <AdminListTable title="採用情報" rows={jobs} columns={columns} editBasePath="/admin/jobs" newHref="/admin/jobs/new" onDelete={handleDelete} total={total} page={1} limit={50} />
  )
}
