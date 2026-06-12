'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { stagger, reveal } from '@/lib/animations'
import s from './page.module.css'

type Post = {
  id: number
  slug: string
  category: string
  title: string
  excerpt: string
  date: Date | string
  readCount: number
}

function formatDate(date: Date | string) {
  const d = new Date(date)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

export function BlogPageClient({ posts, categories }: { posts: Post[]; categories: string[] }) {
  const [active, setActive] = useState('全て')
  const filtered = active === '全て' ? posts : posts.filter(p => p.category === active)

  return (
    <div className="page-content">
      <div className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <span className="page-hero-label">Blog</span>
            <h1 className="page-hero-title">ブログ・技術情報</h1>
            <p className="page-hero-sub">開発事例・技術記事・お知らせを発信しています。</p>
          </motion.div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <motion.div
            className={s.filters}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
          >
            {categories.map(cat => (
              <button
                key={cat}
                className={`${s.pill}${active === cat ? ` ${s.pillActive}` : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <motion.div key={active} className={s.grid} variants={stagger} initial="hidden" animate="visible">
            {filtered.map(post => (
              <motion.article key={post.slug} className={s.card} variants={reveal} onClick={() => alert('この記事のページは準備中です')}>
                <div className={s.cardMeta}>
                  <span className={s.category}>{post.category}</span>
                  <time className={s.date}>{formatDate(post.date)}</time>
                </div>
                <h2 className={s.cardTitle}>{post.title}</h2>
                <p className={s.excerpt}>{post.excerpt}</p>
                <div className={s.cardFooter}>
                  <span className={s.readCount}>{post.readCount}人が読みました</span>
                  <span className={s.readMore}>
                    続きを読む
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="12" height="12">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </span>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {filtered.length === 0 && <p className={s.empty}>該当する記事が見つかりませんでした。</p>}
        </div>
      </section>
    </div>
  )
}
