'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Work } from '@/generated/prisma/client'
import { AdminFormPage, FormField } from '../components/AdminFormPage'
import styles from '../components/inputs.module.css'

const SERVICE_OPTIONS = [
  { value: 'ai-development', label: 'AI活用開発' },
  { value: 'mobile', label: 'モバイル' },
  { value: 'web', label: 'Web' },
  { value: 'edtech', label: 'EdTech' },
  { value: 'iot', label: 'IoT / BLE' },
]

type Props = { initialData: Work | null }

export function WorkFormClient({ initialData }: Props) {
  const router = useRouter()
  const isNew = !initialData
  const [form, setForm] = useState({
    slug: initialData?.slug ?? '',
    industry: initialData?.industry ?? '',
    service: initialData?.service ?? '',
    title: initialData?.title ?? '',
    summary: initialData?.summary ?? '',
    challenge: initialData?.challenge ?? '',
    solution: initialData?.solution ?? '',
    tech: initialData?.tech.join(', ') ?? '',
    beforePeriod: initialData?.beforePeriod ?? '',
    beforeQuality: initialData?.beforeQuality ?? '',
    afterPeriod: initialData?.afterPeriod ?? '',
    afterQuality: initialData?.afterQuality ?? '',
    impact: initialData?.impact ?? '',
    link: initialData?.link ?? '',
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
    const payload = { ...form, tech: form.tech.split(',').map(t => t.trim()).filter(Boolean) }
    try {
      const url = isNew ? '/api/admin/works' : `/api/admin/works/${initialData!.id}`
      const res = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.ok) { router.push('/admin/works'); router.refresh() }
      else if (data.fieldErrors) setErrors(data.fieldErrors)
      else setGlobalError(data.message ?? '保存に失敗しました')
    } catch { setGlobalError('通信エラーが発生しました') }
    finally { setSubmitting(false) }
  }

  return (
    <AdminFormPage title={isNew ? '実績・事例 新規作成' : '実績・事例 編集'} backHref="/admin/works" onSubmit={handleSubmit} isSubmitting={submitting} error={globalError}>
      <FormField label="スラッグ" error={errors.slug} required><input className={styles.input} value={form.slug} onChange={e => set('slug', e.target.value)} /></FormField>
      <FormField label="業種" error={errors.industry} required><input className={styles.input} value={form.industry} onChange={e => set('industry', e.target.value)} /></FormField>
      <FormField label="サービス" error={errors.service} required>
        <select className={styles.input} value={form.service} onChange={e => set('service', e.target.value)}>
          <option value="">選択してください</option>
          {SERVICE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </FormField>
      <FormField label="タイトル" error={errors.title} required><input className={styles.input} value={form.title} onChange={e => set('title', e.target.value)} /></FormField>
      <FormField label="概要" error={errors.summary} required><textarea className={styles.textarea} rows={3} value={form.summary} onChange={e => set('summary', e.target.value)} /></FormField>
      <FormField label="課題" error={errors.challenge} required><textarea className={styles.textarea} rows={3} value={form.challenge} onChange={e => set('challenge', e.target.value)} /></FormField>
      <FormField label="解決策" error={errors.solution} required><textarea className={styles.textarea} rows={3} value={form.solution} onChange={e => set('solution', e.target.value)} /></FormField>
      <FormField label="技術スタック (カンマ区切り)" error={errors.tech} required><input className={styles.input} value={form.tech} onChange={e => set('tech', e.target.value)} placeholder="React, Next.js, TypeScript" /></FormField>
      <FormField label="導入前 — 期間" error={errors.beforePeriod} required><input className={styles.input} value={form.beforePeriod} onChange={e => set('beforePeriod', e.target.value)} /></FormField>
      <FormField label="導入前 — 品質" error={errors.beforeQuality} required><input className={styles.input} value={form.beforeQuality} onChange={e => set('beforeQuality', e.target.value)} /></FormField>
      <FormField label="導入後 — 期間" error={errors.afterPeriod} required><input className={styles.input} value={form.afterPeriod} onChange={e => set('afterPeriod', e.target.value)} /></FormField>
      <FormField label="導入後 — 品質" error={errors.afterQuality} required><input className={styles.input} value={form.afterQuality} onChange={e => set('afterQuality', e.target.value)} /></FormField>
      <FormField label="成果" error={errors.impact} required><input className={styles.input} value={form.impact} onChange={e => set('impact', e.target.value)} /></FormField>
      <FormField label="外部リンク" error={errors.link}><input className={styles.input} value={form.link} onChange={e => set('link', e.target.value)} type="url" /></FormField>
      <FormField label="並び順"><input className={styles.input} type="number" value={form.sortOrder} onChange={e => set('sortOrder', Number(e.target.value))} /></FormField>
      <FormField label="公開状態">
        <label className={styles.checkLabel}><input type="checkbox" checked={form.published} onChange={e => set('published', e.target.checked)} />{' '}公開する</label>
      </FormField>
    </AdminFormPage>
  )
}
