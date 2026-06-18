'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import styles from './AdminShell.module.css'

const NAV = [
  { label: 'ダッシュボード', href: '/admin' },
  { label: 'お問い合わせ', href: '/admin/inquiries' },
  { label: 'ブログ', href: '/admin/blog' },
  { label: '実績・事例', href: '/admin/works' },
  { label: '採用情報', href: '/admin/jobs' },
  { label: 'チームメンバー', href: '/admin/team' },
  { label: 'AI開発ページ', href: '/admin/ai-dev' },
  { label: 'LPページ', href: '/admin/lp' },
  { label: 'ユーザー管理', href: '/admin/users' },
]

export function AdminShell({ user, children }: { user: { email: string; name: string }; children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>HackLab Admin</div>
        <nav className={styles.nav}>
          {NAV.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href)) ? styles.navLinkActive : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>{user.name}</div>
          <div className={styles.userEmail}>{user.email}</div>
          <button className={styles.logoutBtn} onClick={handleLogout}>ログアウト</button>
        </div>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  )
}
