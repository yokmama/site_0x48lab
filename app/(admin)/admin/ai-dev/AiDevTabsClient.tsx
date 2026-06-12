'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useState, useTransition } from 'react'
import styles from './page.module.css'

type Row = Record<string, unknown> & { id: number; sortOrder: number }

type AiDevData = {
  problems: Row[]
  solutions: Row[]
  comparison: Row[]
  packages: Row[]
  examples: Row[]
  steps: Row[]
  faq: Row[]
}

const TABS = [
  { key: 'problems', label: '課題' },
  { key: 'solutions', label: 'ソリューション' },
  { key: 'comparison', label: '比較表' },
  { key: 'packages', label: 'サービスパッケージ' },
  { key: 'examples', label: '事例プロジェクト' },
  { key: 'steps', label: 'プロセス' },
  { key: 'faq', label: 'FAQ' },
] as const

type TabKey = typeof TABS[number]['key']

const FIELDS: Record<TabKey, { key: string; label: string; type?: string; multiline?: boolean; array?: boolean }[]> = {
  problems: [
    { key: 'title', label: 'タイトル' },
    { key: 'desc', label: '説明', multiline: true },
  ],
  solutions: [
    { key: 'num', label: '番号' },
    { key: 'title', label: 'タイトル' },
    { key: 'desc', label: '説明', multiline: true },
  ],
  comparison: [
    { key: 'item', label: '項目' },
    { key: 'traditional', label: '従来' },
    { key: 'ours', label: '私たち' },
  ],
  packages: [
    { key: 'title', label: 'タイトル' },
    { key: 'delivery', label: '納期' },
    { key: 'items', label: '内容 (1行1項目)', multiline: true, array: true },
  ],
  examples: [
    { key: 'industry', label: '業界' },
    { key: 'title', label: 'タイトル' },
    { key: 'delivery', label: '納期' },
    { key: 'quality', label: '品質' },
    { key: 'desc', label: '説明', multiline: true },
  ],
  steps: [
    { key: 'num', label: '番号' },
    { key: 'title', label: 'タイトル' },
    { key: 'desc', label: '説明', multiline: true },
    { key: 'badge', label: 'バッジ (任意)' },
  ],
  faq: [
    { key: 'q', label: '質問' },
    { key: 'a', label: '回答', multiline: true },
  ],
}

function emptyRow(tab: TabKey): Record<string, string> {
  return Object.fromEntries(FIELDS[tab].map(f => [f.key, '']))
}

function rowToForm(row: Row, tab: TabKey): Record<string, string> {
  const out: Record<string, string> = {}
  for (const f of FIELDS[tab]) {
    const v = row[f.key]
    out[f.key] = f.array && Array.isArray(v) ? (v as string[]).join('\n') : String(v ?? '')
  }
  return out
}

function formToPayload(form: Record<string, string>, tab: TabKey): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const f of FIELDS[tab]) {
    out[f.key] = f.array ? form[f.key].split('\n').map(s => s.trim()).filter(Boolean) : form[f.key]
  }
  return out
}

type RowEditorProps = {
  tab: TabKey
  row: Row | null
  onSaved: () => void
  onCancel: () => void
}

function RowEditor({ tab, row, onSaved, onCancel }: RowEditorProps) {
  const isNew = !row
  const [form, setForm] = useState<Record<string, string>>(row ? rowToForm(row, tab) : emptyRow(tab))
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [globalError, setGlobalError] = useState('')
  const [saving, setSaving] = useState(false)

  function set(key: string, value: string) {
    setForm(f => ({ ...f, [key]: value }))
    setErrors(e => { const n = { ...e }; delete n[key]; return n })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setGlobalError('')
    try {
      const url = isNew ? `/api/admin/ai-dev/${tab}` : `/api/admin/ai-dev/${tab}/${row!.id}`
      const res = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formToPayload(form, tab)),
      })
      const data = await res.json()
      if (data.ok) { onSaved() }
      else if (data.fieldErrors) setErrors(data.fieldErrors)
      else setGlobalError(data.message ?? '保存に失敗しました')
    } catch { setGlobalError('通信エラーが発生しました') }
    finally { setSaving(false) }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.rowEditor}>
      {globalError && <p className={styles.globalError}>{globalError}</p>}
      {FIELDS[tab].map(f => (
        <div key={f.key} className={styles.field}>
          <label className={styles.label}>{f.label}</label>
          {f.multiline
            ? <textarea className={styles.textarea} value={form[f.key]} onChange={e => set(f.key, e.target.value)} rows={f.array ? 4 : 3} />
            : <input className={styles.input} value={form[f.key]} onChange={e => set(f.key, e.target.value)} />
          }
          {errors[f.key] && <span className={styles.fieldError}>{errors[f.key]}</span>}
        </div>
      ))}
      <div className={styles.rowActions}>
        <button type="submit" className={styles.saveBtn} disabled={saving}>{saving ? '保存中…' : '保存'}</button>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}>キャンセル</button>
      </div>
    </form>
  )
}

export function AiDevTabsClient({ data }: { data: AiDevData }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  const activeTab = (searchParams.get('tab') ?? 'problems') as TabKey
  const rows = data[activeTab] as Row[]
  const [editingId, setEditingId] = useState<number | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [deleting, setDeleting] = useState<number | null>(null)

  function setTab(key: TabKey) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', key)
    router.push(`${pathname}?${params.toString()}`)
    setEditingId(null)
    setShowNew(false)
  }

  function refresh() {
    startTransition(() => { router.refresh() })
    setEditingId(null)
    setShowNew(false)
  }

  async function handleDelete(id: number) {
    if (!confirm('削除しますか？')) return
    setDeleting(id)
    try {
      await fetch(`/api/admin/ai-dev/${activeTab}/${id}`, { method: 'DELETE' })
      router.refresh()
    } finally { setDeleting(null) }
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>AI開発ページ管理</h1>
      <nav className={styles.tabs}>
        {TABS.map(t => (
          <button key={t.key} className={`${styles.tab} ${activeTab === t.key ? styles.tabActive : ''}`} onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </nav>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.count}>{rows.length} 件</span>
          <button className={styles.addBtn} onClick={() => { setShowNew(true); setEditingId(null) }}>+ 追加</button>
        </div>

        {showNew && (
          <div className={styles.newRowWrapper}>
            <RowEditor tab={activeTab} row={null} onSaved={refresh} onCancel={() => setShowNew(false)} />
          </div>
        )}

        <table className={styles.table}>
          <thead>
            <tr>
              <th>順序</th>
              {FIELDS[activeTab].slice(0, 2).map(f => <th key={f.key}>{f.label}</th>)}
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <>
                <tr key={row.id} className={editingId === row.id ? styles.editingRow : ''}>
                  <td>{row.sortOrder}</td>
                  {FIELDS[activeTab].slice(0, 2).map(f => (
                    <td key={f.key} className={styles.cell}>
                      {String(Array.isArray(row[f.key]) ? (row[f.key] as string[]).join(', ') : row[f.key] ?? '')}
                    </td>
                  ))}
                  <td className={styles.actions}>
                    <button className={styles.editBtn} onClick={() => { setEditingId(editingId === row.id ? null : row.id); setShowNew(false) }}>
                      {editingId === row.id ? '閉じる' : '編集'}
                    </button>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(row.id)} disabled={deleting === row.id}>削除</button>
                  </td>
                </tr>
                {editingId === row.id && (
                  <tr key={`edit-${row.id}`}>
                    <td colSpan={FIELDS[activeTab].slice(0, 2).length + 2}>
                      <RowEditor tab={activeTab} row={row} onSaved={refresh} onCancel={() => setEditingId(null)} />
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
