'use client'

import Link from 'next/link'
import styles from './AdminListTable.module.css'

export type Column<T> = {
  key: string
  label: string
  render?: (row: T) => React.ReactNode
}

type Props<T extends { id: number | string }> = {
  rows: T[]
  columns: Column<T>[]
  editBasePath: string
  onDelete: (id: number | string) => void
  newHref: string
  title: string
  total: number
  page: number
  limit: number
  onPageChange?: (page: number) => void
}

export function AdminListTable<T extends { id: number | string }>({
  rows, columns, editBasePath, onDelete, newHref, title, total, page, limit, onPageChange
}: Props<T>) {
  const totalPages = Math.ceil(total / limit)

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <Link href={newHref} className={styles.newBtn}>＋ 新規作成</Link>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map(c => <th key={c.key}>{c.label}</th>)}
              <th className={styles.actionCol}>操作</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id}>
                {columns.map(c => (
                  <td key={c.key}>
                    {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? '')}
                  </td>
                ))}
                <td className={styles.actions}>
                  <Link href={`${editBasePath}/${row.id}`} className={styles.editBtn}>編集</Link>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => {
                      if (confirm('削除しますか？')) onDelete(row.id)
                    }}
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className={styles.empty}>データがありません</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button disabled={page <= 1} onClick={() => onPageChange?.(page - 1)} className={styles.pageBtn}>‹</button>
          <span className={styles.pageInfo}>{page} / {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => onPageChange?.(page + 1)} className={styles.pageBtn}>›</button>
        </div>
      )}
    </div>
  )
}
