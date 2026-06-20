"use client"

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { stagger, reveal, viewportOnce } from '../../lib/animations'
import { BLOG_POSTS } from '../../lib/data'
import ServiceIcon from '../ui/ServiceIcon'
import s from './HomeBlog.module.css'

const RECENT = BLOG_POSTS.slice(0, 3)

export default function HomeBlog() {
  const titleRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className={`section section--alt ${s.section}`}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Blog</span>
          <h2 ref={titleRef} className={`section-title${inView ? ' in-view' : ''}`}>
            ブログ・技術情報
          </h2>
        </div>

        <motion.div
          className={s.grid}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {RECENT.map((post) => (
            <motion.article key={post.slug} className={s.card} variants={reveal}>
              <div className={s.meta}>
                <span className={s.category}>{post.category}</span>
                <span className={s.date}>{post.date}</span>
              </div>
              <h3 className={s.title}>{post.title}</h3>
              <p className={s.excerpt}>{post.excerpt}</p>
              <div className={s.footer}>
                <span className={s.readCount}>{post.readCount}人が読みました</span>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className={s.cta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/blog" className="btn btn--outline">
            すべての記事を見る
            <ServiceIcon type="arrow" size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
