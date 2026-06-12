'use client'

import Link from 'next/link'
import styles from './AdminFormPage.module.css'

type Props = {
  title: string
  backHref: string
  onSubmit: (e: React.FormEvent) => void
  isSubmitting: boolean
  children: React.ReactNode
  error?: string
}

export function AdminFormPage({ title, backHref, onSubmit, isSubmitting, children, error }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <Link href={backHref} className={styles.backLink}>← 戻る</Link>
        <h1 className={styles.title}>{title}</h1>
      </div>
      {error && <div className={styles.errorBanner}>{error}</div>}
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        {children}
        <div className={styles.actions}>
          <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? '保存中...' : '保存する'}
          </button>
          <Link href={backHref} className={styles.cancelBtn}>キャンセル</Link>
        </div>
      </form>
    </div>
  )
}

type FieldProps = {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}

export function FormField({ label, error, required, children }: FieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </label>
      {children}
      {error && <p className={styles.fieldError}>{error}</p>}
    </div>
  )
}
