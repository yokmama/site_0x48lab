'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminFormPage, FormField } from '../components/AdminFormPage'
import styles from '../components/inputs.module.css'

type SafeUser = { id: number; email: string; name: string }

type Props = { initialData: SafeUser | null }

export function UserFormClient({ initialData }: Props) {
  const router = useRouter()
  const isNew = !initialData
  const [form, setForm] = useState({
    email: initialData?.email ?? '',
    name: initialData?.name ?? '',
    password: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [globalError, setGlobalError] = useState('')

  function set(key: string, value: unknown) {
    setForm(f => ({ ...f, [key]: value }))
    setErrors(e => { const n = { ...e }; delete n[key]; return n })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setGlobalError('')
    const payload = isNew ? form : { email: form.email, name: form.name, ...(form.password ? { password: form.password } : {}) }
    try {
      const url = isNew ? '/api/admin/users' : `/api/admin/users/${initialData!.id}`
      const res = await fetch(url, { method: isNew ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (data.ok) { router.push('/admin/users'); router.refresh() }
      else if (data.fieldErrors) setErrors(data.fieldErrors)
      else setGlobalError(data.message ?? '保存に失敗しました')
    } catch { setGlobalError('通信エラーが発生しました') }
    finally { setSubmitting(false) }
  }

  return (
    <AdminFormPage title={isNew ? '管理ユーザー追加' : '管理ユーザー編集'} backHref="/admin/users" onSubmit={handleSubmit} isSubmitting={submitting} error={globalError}>
      <FormField label="メールアドレス" error={errors.email} required><input className={styles.input} type="email" value={form.email} onChange={e => set('email', e.target.value)} /></FormField>
      <FormField label="名前" error={errors.name} required><input className={styles.input} value={form.name} onChange={e => set('name', e.target.value)} /></FormField>
      <FormField label={isNew ? 'パスワード' : '新しいパスワード (変更する場合のみ)'} error={errors.password} required={isNew}>
        <input className={styles.input} type="password" value={form.password} onChange={e => set('password', e.target.value)} autoComplete="new-password" />
      </FormField>
    </AdminFormPage>
  )
}
