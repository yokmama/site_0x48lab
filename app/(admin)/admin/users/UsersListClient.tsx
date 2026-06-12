'use client'

import { useOptimistic, useTransition, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminListTable } from '../components/AdminListTable'

type SafeUser = { id: number; email: string; name: string; createdAt: Date; updatedAt: Date }

type Props = { initialUsers: SafeUser[]; currentUserId: number }

export function UsersListClient({ initialUsers, currentUserId }: Props) {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const [users, optimisticDelete] = useOptimistic(initialUsers, (state, id: number) => state.filter(u => u.id !== id))
  const [total, setTotal] = useState(initialUsers.length)

  async function handleDelete(id: number | string) {
    if (id === currentUserId) { alert('自分自身のアカウントは削除できません'); return }
    startTransition(async () => {
      optimisticDelete(id as number)
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
      if (!res.ok) { router.refresh(); return }
      setTotal(t => t - 1)
    })
  }

  const columns = [
    { key: 'name', label: '名前' },
    { key: 'email', label: 'メールアドレス' },
    { key: 'createdAt', label: '作成日', render: (u: SafeUser) => new Date(u.createdAt).toLocaleDateString('ja-JP') },
  ]

  return (
    <AdminListTable title="管理ユーザー" rows={users} columns={columns} editBasePath="/admin/users" newHref="/admin/users/new" onDelete={handleDelete} total={total} page={1} limit={50} />
  )
}
