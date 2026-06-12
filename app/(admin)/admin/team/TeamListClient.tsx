'use client'

import { useOptimistic, useTransition, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { TeamMember } from '@/generated/prisma/client'
import { AdminListTable } from '../components/AdminListTable'

type Props = { initialMembers: TeamMember[] }

export function TeamListClient({ initialMembers }: Props) {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const [members, optimisticDelete] = useOptimistic(initialMembers, (state, id: number) => state.filter(m => m.id !== id))
  const [total, setTotal] = useState(initialMembers.length)

  async function handleDelete(id: number | string) {
    startTransition(async () => {
      optimisticDelete(id as number)
      const res = await fetch(`/api/admin/team/${id}`, { method: 'DELETE' })
      if (!res.ok) { router.refresh(); return }
      setTotal(t => t - 1)
    })
  }

  const columns = [
    { key: 'name', label: '名前' },
    { key: 'role', label: '役職' },
    { key: 'photo', label: '写真ID', render: (m: TeamMember) => m.photo ?? '–' },
    { key: 'initials', label: 'イニシャル', render: (m: TeamMember) => m.initials ?? '–' },
  ]

  return (
    <AdminListTable title="チームメンバー" rows={members} columns={columns} editBasePath="/admin/team" newHref="/admin/team/new" onDelete={handleDelete} total={total} page={1} limit={50} />
  )
}
