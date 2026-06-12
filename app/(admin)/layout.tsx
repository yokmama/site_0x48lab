import type { Metadata } from 'next'
import '@/app/globals.css'
import styles from './admin-layout.module.css'

export const metadata: Metadata = {
  title: { default: 'Admin | HackLab', template: '%s | Admin' },
  robots: 'noindex,nofollow',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.root}>
      {children}
    </div>
  )
}
