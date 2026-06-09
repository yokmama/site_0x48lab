"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { NOT_FOUND_QUICK_LINKS } from '@/lib/data'
import s from './not-found.module.css'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="page-content">
        <div className={s.root}>
          <motion.div
            className={s.content}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <p className={s.code}>404</p>
            <h1 className={s.title}>ページが見つかりません</h1>
            <p className={s.sub}>お探しのページは存在しないか、移動した可能性があります。</p>

            <div className={s.actions}>
              <Link href="/" className="btn btn--primary btn--lg">
                トップへ戻る
              </Link>
              <Link href="/contact" className="btn btn--outline btn--lg">
                お問い合わせ
              </Link>
            </div>

            <div className={s.quickLinks}>
              <p className={s.quickLinksLabel}>よく見られているページ</p>
              <div className={s.quickLinksRow}>
                {NOT_FOUND_QUICK_LINKS.map((lk) => (
                  <Link key={lk.label} href={lk.to} className={s.quickLink}>
                    {lk.label}
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="11" height="11">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
