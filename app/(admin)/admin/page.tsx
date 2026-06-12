import { requireAdminPage } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { AdminShell } from './components/AdminShell'
import styles from './page.module.css'

export const metadata = { title: 'ダッシュボード' }

export default async function AdminDashboard() {
  const user = await requireAdminPage()

  const [blogCount, worksCount, jobsCount, teamCount, aiDevExCount, lpFaqCount] = await prisma.$transaction([
    prisma.blogPost.count(),
    prisma.work.count(),
    prisma.jobOpening.count(),
    prisma.teamMember.count(),
    prisma.aiDevExampleProject.count(),
    prisma.lpFaqItem.count(),
  ])

  const recentPosts = await prisma.blogPost.findMany({ orderBy: { updatedAt: 'desc' }, take: 5 })
  const recentWorks = await prisma.work.findMany({ orderBy: { updatedAt: 'desc' }, take: 3 })

  const stats = [
    { label: 'ブログ記事', count: blogCount, href: '/admin/blog' },
    { label: '実績・事例', count: worksCount, href: '/admin/works' },
    { label: '採用情報', count: jobsCount, href: '/admin/jobs' },
    { label: 'チームメンバー', count: teamCount, href: '/admin/team' },
    { label: 'AI開発事例', count: aiDevExCount, href: '/admin/ai-dev?tab=examples' },
    { label: 'LP FAQ', count: lpFaqCount, href: '/admin/lp?tab=faq' },
  ]

  return (
    <AdminShell user={user}>
      <div className={styles.page}>
        <h1 className={styles.heading}>ダッシュボード</h1>
        <div className={styles.statsGrid}>
          {stats.map(s => (
            <a key={s.label} href={s.href} className={styles.statCard}>
              <div className={styles.statCount}>{s.count}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </a>
          ))}
        </div>
        <div className={styles.recentSection}>
          <h2 className={styles.sectionTitle}>最近のブログ記事</h2>
          <div className={styles.recentList}>
            {recentPosts.map(p => (
              <a key={p.id} href={`/admin/blog/${p.id}`} className={styles.recentItem}>
                <span className={styles.recentTitle}>{p.title}</span>
                <span className={styles.recentMeta}>{p.category} · {new Date(p.date).toLocaleDateString('ja-JP')}</span>
              </a>
            ))}
          </div>
        </div>
        <div className={styles.recentSection}>
          <h2 className={styles.sectionTitle}>最近の実績・事例</h2>
          <div className={styles.recentList}>
            {recentWorks.map(w => (
              <a key={w.id} href={`/admin/works/${w.id}`} className={styles.recentItem}>
                <span className={styles.recentTitle}>{w.title}</span>
                <span className={styles.recentMeta}>{w.industry} · {w.service}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
