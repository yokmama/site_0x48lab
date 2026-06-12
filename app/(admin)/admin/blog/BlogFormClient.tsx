'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { BlogPost } from '@/generated/prisma/client'
import { AdminFormPage, FormField } from '../components/AdminFormPage'
import { BLOG_CATEGORIES } from '@/lib/data'
import styles from './BlogFormClient.module.css'

type Props = { initialData: BlogPost | null }

export function BlogFormClient({ initialData }: Props) {
  const router = useRouter()
  const isNew = !initialData
  const [form, setForm] = useState({
    slug: initialData?.slug ?? '',
    category: initialData?.category ?? '',
    title: initialData?.title ?? '',
    excerpt: initialData?.excerpt ?? '',
    date: initialData ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    readCount: initialData?.readCount ?? 0,
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
    try {
      const url = isNew ? '/api/admin/blog' : `/api/admin/blog/${initialData!.id}`
      const res = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.ok) {
        router.push('/admin/blog')
        router.refresh()
      } else if (data.fieldErrors) {
        setErrors(data.fieldErrors)
      } else {
        setGlobalError(data.message ?? '保存に失敗しました')
      }
    } catch {
      setGlobalError('通信エラーが発生しました')
    } finally {
      setSubmitting(false)
    }
  }

  const categories = BLOG_CATEGORIES.filter(c => c !== '全て')

  return (
    <AdminFormPage
      title={isNew ? 'ブログ記事 新規作成' : 'ブログ記事 編集'}
      backHref="/admin/blog"
      onSubmit={handleSubmit}
      isSubmitting={submitting}
      error={globalError}
    >
      <FormField label="スラッグ" error={errors.slug} required>
        <input className={styles.input} value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="my-blog-post" />
      </FormField>
      <FormField label="カテゴリ" error={errors.category} required>
        <select className={styles.input} value={form.category} onChange={e => set('category', e.target.value)}>
          <option value="">選択してください</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </FormField>
      <FormField label="タイトル" error={errors.title} required>
        <input className={styles.input} value={form.title} onChange={e => set('title', e.target.value)} />
      </FormField>
      <FormField label="概要" error={errors.excerpt} required>
        <textarea className={styles.textarea} rows={3} value={form.excerpt} onChange={e => set('excerpt', e.target.value)} />
      </FormField>
      <FormField label="公開日" error={errors.date} required>
        <input className={styles.input} type="date" value={form.date} onChange={e => set('date', e.target.value)} />
      </FormField>
      <FormField label="読了時間 (分)" error={errors.readCount}>
        <input className={styles.input} type="number" min={0} value={form.readCount} onChange={e => set('readCount', Number(e.target.value))} />
      </FormField>
      <FormField label="並び順" error={errors.sortOrder}>
        <input className={styles.input} type="number" value={form.sortOrder} onChange={e => set('sortOrder', Number(e.target.value))} />
      </FormField>
      <FormField label="公開状態" error={errors.published}>
        <label className={styles.checkLabel}>
          <input type="checkbox" checked={form.published} onChange={e => set('published', e.target.checked)} />
          {' '}公開する
        </label>
      </FormField>
    </AdminFormPage>
  )
}
