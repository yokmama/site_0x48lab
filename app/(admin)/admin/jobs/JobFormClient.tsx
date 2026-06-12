'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { JobOpening } from '@/generated/prisma/client'
import { AdminFormPage, FormField } from '../components/AdminFormPage'
import styles from '../components/inputs.module.css'

type Props = { initialData: JobOpening | null }

export function JobFormClient({ initialData }: Props) {
  const router = useRouter()
  const isNew = !initialData
  const [form, setForm] = useState({
    id: initialData?.id ?? '',
    title: initialData?.title ?? '',
    type: initialData?.type ?? '',
    location: initialData?.location ?? '',
    tags: initialData?.tags.join(', ') ?? '',
    desc: initialData?.desc ?? '',
    published: initialData?.published ?? true,
    sortOrder: initialData?.sortOrder ?? 0,
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
    const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) }
    try {
      const url = isNew ? '/api/admin/jobs' : `/api/admin/jobs/${initialData!.id}`
      const res = await fetch(url, { method: isNew ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (data.ok) { router.push('/admin/jobs'); router.refresh() }
      else if (data.fieldErrors) setErrors(data.fieldErrors)
      else setGlobalError(data.message ?? '保存に失敗しました')
    } catch { setGlobalError('通信エラーが発生しました') }
    finally { setSubmitting(false) }
  }

  return (
    <AdminFormPage title={isNew ? '採用情報 新規作成' : '採用情報 編集'} backHref="/admin/jobs" onSubmit={handleSubmit} isSubmitting={submitting} error={globalError}>
      <FormField label="ID (URLスラッグ)" error={errors.id} required><input className={styles.input} value={form.id} onChange={e => set('id', e.target.value)} placeholder="engineer-fullstack" disabled={!isNew} /></FormField>
      <FormField label="タイトル" error={errors.title} required><input className={styles.input} value={form.title} onChange={e => set('title', e.target.value)} /></FormField>
      <FormField label="雇用形態" error={errors.type} required><input className={styles.input} value={form.type} onChange={e => set('type', e.target.value)} placeholder="正社員 / 業務委託" /></FormField>
      <FormField label="勤務地" error={errors.location} required><input className={styles.input} value={form.location} onChange={e => set('location', e.target.value)} /></FormField>
      <FormField label="タグ (カンマ区切り)" error={errors.tags}><input className={styles.input} value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="React, TypeScript, Node.js" /></FormField>
      <FormField label="職務内容" error={errors.desc} required><textarea className={styles.textarea} rows={4} value={form.desc} onChange={e => set('desc', e.target.value)} /></FormField>
      <FormField label="並び順"><input className={styles.input} type="number" value={form.sortOrder} onChange={e => set('sortOrder', Number(e.target.value))} /></FormField>
      <FormField label="公開状態"><label className={styles.checkLabel}><input type="checkbox" checked={form.published} onChange={e => set('published', e.target.checked)} />{' '}公開する</label></FormField>
    </AdminFormPage>
  )
}
