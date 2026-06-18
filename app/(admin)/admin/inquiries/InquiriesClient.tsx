'use client'

import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { inquiryTypeLabel } from '@/lib/admin/inquiries'
import styles from './page.module.css'

export type InquirySummary = {
  id: string
  company: string
  name: string
  email: string
  phone: string | null
  inquiryType: string | null
  budgetRange: string | null
  timeline: string | null
  message: string
  sourcePath: string | null
  status: string
  adminNotes: string | null
  createdAt: string
  updatedAt: string
  lastRepliedAt: string | null
  lastRepliedByName: string | null
  replyCount: number
}

type ReplyRecord = {
  id: string
  toEmail: string
  fromEmail: string
  subject: string
  body: string
  deliveryStatus: string
  sentAt: string
  adminName: string | null
}

type InquiryDetail = InquirySummary & {
  replies: ReplyRecord[]
}

type DetailResponse =
  | { ok: true; item: InquiryDetail }
  | { ok: false; code: string; message?: string }

type ReplyResponse =
  | { ok: true; item: ReplyRecord }
  | {
      ok: false
      code: string
      message?: string
      fieldErrors?: Partial<Record<'subject' | 'body', string>>
    }

type Props = {
  initialInquiries: InquirySummary[]
  initialSelectedId?: string
  smtpConfigured: boolean
}

const budgetLabels: Record<string, string> = {
  undecided: '未定・相談して決めたい',
  'under-100': '100万円未満',
  '100-300': '100万〜300万円',
  '300-500': '300万〜500万円',
  '500-plus': '500万円以上',
}

const timelineLabels: Record<string, string> = {
  asap: 'できるだけ早く',
  '1-3months': '1〜3ヶ月以内',
  '3-6months': '3〜6ヶ月以内',
  undecided: '時期は未定',
}

function formatDate(value?: string | null) {
  if (!value) return '未対応'
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

function statusLabel(status: string) {
  if (status === 'replied') return '返信済み'
  if (status === 'closed') return '完了'
  return '未返信'
}

function defaultSubject(inquiry: InquirySummary) {
  return `Re: ${inquiry.company} ${inquiry.name}様 お問い合わせの件`
}

function fieldValue(value?: string | null, labels?: Record<string, string>) {
  if (!value) return '未選択'
  return labels?.[value] ?? value
}

export function InquiriesClient({ initialInquiries, initialSelectedId, smtpConfigured }: Props) {
  const [inquiries, setInquiries] = useState(initialInquiries)
  const requestedSelectedId = initialSelectedId ?? ''
  const firstSelectedId = requestedSelectedId && initialInquiries.some((item) => item.id === requestedSelectedId)
    ? requestedSelectedId
    : initialInquiries[0]?.id ?? ''
  const [selectedId, setSelectedId] = useState(firstSelectedId)
  const [detail, setDetail] = useState<InquiryDetail | null>(null)
  const [loadingDetail, setLoadingDetail] = useState(false)
  const initiallySelected = initialInquiries.find((item) => item.id === firstSelectedId)
  const [subject, setSubject] = useState(initiallySelected ? defaultSubject(initiallySelected) : '')
  const [body, setBody] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<'subject' | 'body', string>>>({})
  const [sendError, setSendError] = useState('')
  const [sending, setSending] = useState(false)

  const selectedSummary = useMemo(
    () => inquiries.find((item) => item.id === selectedId) ?? null,
    [inquiries, selectedId],
  )
  const selected = detail?.id === selectedId ? detail : selectedSummary

  useEffect(() => {
    if (!selectedId) return
    const controller = new AbortController()
    setLoadingDetail(true)
    fetch(`/api/admin/inquiries/${selectedId}`, { signal: controller.signal })
      .then(async (res) => {
        const data = await res.json() as DetailResponse
        if (res.ok && data.ok) setDetail(data.item)
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setSendError('お問い合わせ詳細を読み込めませんでした')
      })
      .finally(() => setLoadingDetail(false))
    return () => controller.abort()
  }, [selectedId])

  useEffect(() => {
    if (!selectedSummary) return
    setSubject(defaultSubject(selectedSummary))
    setBody('')
    setFieldErrors({})
    setSendError('')
  }, [selectedSummary])

  async function handleReply(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!selected) return
    setSending(true)
    setSendError('')
    setFieldErrors({})

    try {
      const res = await fetch(`/api/admin/inquiries/${selected.id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ subject, body }),
      })
      const data = await res.json() as ReplyResponse
      if (!res.ok || !data.ok) {
        if ('fieldErrors' in data && data.fieldErrors) setFieldErrors(data.fieldErrors)
        setSendError(data.message || '返信を送信できませんでした')
        return
      }

      setDetail((current) => current && current.id === selected.id
        ? {
            ...current,
            status: 'replied',
            lastRepliedAt: data.item.sentAt,
            lastRepliedByName: data.item.adminName,
            replyCount: current.replyCount + 1,
            replies: [data.item, ...current.replies],
          }
        : current)
      setInquiries((current) => current.map((item) => item.id === selected.id
        ? {
            ...item,
            status: 'replied',
            lastRepliedAt: data.item.sentAt,
            lastRepliedByName: data.item.adminName,
            replyCount: item.replyCount + 1,
          }
        : item))
      setBody('')
    } catch {
      setSendError('通信に失敗しました。時間をおいて再度お試しください')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.heading}>お問い合わせ</h1>
          <p className={styles.lead}>フォームから届いた相談内容を確認し、SMTP経由で返信できます。</p>
        </div>
        <div className={styles.summaryPill}>
          未返信 {inquiries.filter((item) => item.status === 'new').length} / 全 {inquiries.length}
        </div>
      </div>

      {!smtpConfigured && (
        <div className={styles.alert} role="status">
          SMTP設定が未完了です。返信するには `SMTP_HOST`、`SMTP_FROM_EMAIL` または `SMTP_USER`、認証情報を環境変数に設定してください。
        </div>
      )}

      <div className={styles.layout}>
        <aside className={styles.list} aria-label="お問い合わせ一覧">
          {inquiries.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.listItem}${item.id === selectedId ? ` ${styles.listItemActive}` : ''}`}
              onClick={() => setSelectedId(item.id)}
            >
              <span className={`${styles.status}${item.status === 'replied' ? ` ${styles.statusReplied}` : ''}`}>
                {statusLabel(item.status)}
              </span>
              <strong>{item.company}</strong>
              <span>{item.name} / {inquiryTypeLabel(item.inquiryType)}</span>
              <time>{formatDate(item.createdAt)}</time>
            </button>
          ))}
          {inquiries.length === 0 && <p className={styles.empty}>お問い合わせはまだありません。</p>}
        </aside>

        <section className={styles.detail} aria-live="polite">
          {!selected && <p className={styles.empty}>お問い合わせを選択してください。</p>}
          {selected && (
            <>
              <div className={styles.detailHeader}>
                <div>
                  <div className={styles.detailMeta}>
                    <span className={`${styles.status}${selected.status === 'replied' ? ` ${styles.statusReplied}` : ''}`}>
                      {statusLabel(selected.status)}
                    </span>
                    <span>受付: {formatDate(selected.createdAt)}</span>
                    <span>返信: {formatDate(selected.lastRepliedAt)}</span>
                  </div>
                  <h2>{selected.company}</h2>
                  <p>{selected.name} / <a href={`mailto:${selected.email}`}>{selected.email}</a></p>
                </div>
              </div>

              <dl className={styles.facts}>
                <div><dt>相談内容</dt><dd>{inquiryTypeLabel(selected.inquiryType)}</dd></div>
                <div><dt>希望時期</dt><dd>{fieldValue(selected.timeline, timelineLabels)}</dd></div>
                <div><dt>予算感</dt><dd>{fieldValue(selected.budgetRange, budgetLabels)}</dd></div>
                <div><dt>電話番号</dt><dd>{selected.phone || '未入力'}</dd></div>
                <div><dt>流入ページ</dt><dd>{selected.sourcePath || '不明'}</dd></div>
              </dl>

              <div className={styles.messageBlock}>
                <h3>お問い合わせ内容</h3>
                <p>{selected.message}</p>
              </div>

              <form className={styles.replyForm} onSubmit={handleReply}>
                <h3>返信を作成</h3>
                <label>
                  <span>件名</span>
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    maxLength={160}
                    aria-invalid={Boolean(fieldErrors.subject)}
                  />
                  {fieldErrors.subject && <em>{fieldErrors.subject}</em>}
                </label>
                <label>
                  <span>本文</span>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={9}
                    maxLength={5000}
                    placeholder={`${selected.name}様\n\nお問い合わせありがとうございます。\n株式会社ハックラボの...`}
                    aria-invalid={Boolean(fieldErrors.body)}
                  />
                  {fieldErrors.body && <em>{fieldErrors.body}</em>}
                </label>
                {sendError && <p className={styles.error}>{sendError}</p>}
                <div className={styles.formActions}>
                  <span>送信先: {selected.email}</span>
                  <button type="submit" disabled={!smtpConfigured || sending}>
                    {sending ? '送信中...' : '返信を送信'}
                  </button>
                </div>
              </form>

              <div className={styles.replyHistory}>
                <h3>返信履歴</h3>
                {loadingDetail && <p className={styles.muted}>読み込み中...</p>}
                {'replies' in selected && selected.replies.length > 0 && selected.replies.map((reply) => (
                  <article key={reply.id} className={styles.replyItem}>
                    <div>
                      <strong>{reply.subject}</strong>
                      <span>{formatDate(reply.sentAt)} / {reply.adminName || '管理者'}</span>
                    </div>
                    <p>{reply.body}</p>
                  </article>
                ))}
                {'replies' in selected && selected.replies.length === 0 && !loadingDetail && (
                  <p className={styles.muted}>返信履歴はありません。</p>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  )
}
