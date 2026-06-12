'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { TeamMember } from '@/generated/prisma/client'
import { AdminFormPage, FormField } from '../components/AdminFormPage'
import styles from '../components/inputs.module.css'
import photoStyles from './photo.module.css'

type Props = { initialData: TeamMember | null }

export function TeamFormClient({ initialData }: Props) {
  const router = useRouter()
  const isNew = !initialData
  const fileRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    name: initialData?.name ?? '',
    role: initialData?.role ?? '',
    photo: initialData?.photo ?? '',
    photoFileId: initialData?.photoFileId ?? null as number | null,
    initials: initialData?.initials ?? '',
    sortOrder: initialData?.sortOrder ?? 0,
  })
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.photoFileId ? `/api/media/${initialData.photoFileId}` : null
  )
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [globalError, setGlobalError] = useState('')

  function set(key: string, value: unknown) {
    setForm(f => ({ ...f, [key]: value }))
    setErrors(e => { const n = { ...e }; delete n[key]; return n })
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadError('')
    setUploading(true)
    const localPreview = URL.createObjectURL(file)
    setPreviewUrl(localPreview)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/media', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.ok) {
        set('photoFileId', data.item.id)
        URL.revokeObjectURL(localPreview)
        setPreviewUrl(`/api/media/${data.item.id}`)
      } else {
        setUploadError(data.message ?? 'アップロードに失敗しました')
        setPreviewUrl(initialData?.photoFileId ? `/api/media/${initialData.photoFileId}` : null)
        set('photoFileId', initialData?.photoFileId ?? null)
      }
    } catch {
      setUploadError('通信エラーが発生しました')
      setPreviewUrl(initialData?.photoFileId ? `/api/media/${initialData.photoFileId}` : null)
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  function handleRemovePhoto() {
    setPreviewUrl(null)
    set('photoFileId', null)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setGlobalError('')
    try {
      const url = isNew ? '/api/admin/team' : `/api/admin/team/${initialData!.id}`
      const res = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.ok) { router.push('/admin/team'); router.refresh() }
      else if (data.fieldErrors) setErrors(data.fieldErrors)
      else setGlobalError(data.message ?? '保存に失敗しました')
    } catch { setGlobalError('通信エラーが発生しました') }
    finally { setSubmitting(false) }
  }

  return (
    <AdminFormPage
      title={isNew ? 'メンバー追加' : 'メンバー編集'}
      backHref="/admin/team"
      onSubmit={handleSubmit}
      isSubmitting={submitting}
      error={globalError}
    >
      <FormField label="名前" error={errors.name} required>
        <input className={styles.input} value={form.name} onChange={e => set('name', e.target.value)} />
      </FormField>

      <FormField label="役職" error={errors.role} required>
        <input className={styles.input} value={form.role} onChange={e => set('role', e.target.value)} placeholder="CEO / CTO / Developer" />
      </FormField>

      <FormField label="写真">
        <div className={photoStyles.photoField}>
          {previewUrl ? (
            <div className={photoStyles.preview}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt="プレビュー" className={photoStyles.previewImg} />
              <div className={photoStyles.previewActions}>
                <button type="button" className={photoStyles.changeBtn} onClick={() => fileRef.current?.click()} disabled={uploading}>
                  変更
                </button>
                <button type="button" className={photoStyles.removeBtn} onClick={handleRemovePhoto} disabled={uploading}>
                  削除
                </button>
              </div>
            </div>
          ) : (
            <div className={photoStyles.dropzone} onClick={() => fileRef.current?.click()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="32" height="32" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <p className={photoStyles.dropzoneText}>クリックして写真を選択</p>
              <p className={photoStyles.dropzoneHint}>JPEG / PNG / WebP · 最大 5 MB</p>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className={photoStyles.fileInput}
            onChange={handleFileChange}
            disabled={uploading}
          />
          {uploading && <p className={photoStyles.status}>アップロード中…</p>}
          {uploadError && <p className={photoStyles.error}>{uploadError}</p>}
        </div>
      </FormField>

      <FormField label="イニシャル (写真なしの場合に表示)" error={errors.initials}>
        <input className={styles.input} value={form.initials} onChange={e => set('initials', e.target.value)} placeholder="MN" />
      </FormField>

      <FormField label="並び順">
        <input className={styles.input} type="number" value={form.sortOrder} onChange={e => set('sortOrder', Number(e.target.value))} />
      </FormField>
    </AdminFormPage>
  )
}
