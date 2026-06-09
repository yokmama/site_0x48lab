"use client"

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { stagger, reveal, viewportOnce } from '../../lib/animations'
import { WORKS } from '../../lib/data'
import ServiceIcon from '../ui/ServiceIcon'
import s from './HomeWorks.module.css'

const FEATURED = WORKS.slice(0, 3)

export default function HomeWorks() {
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
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Works</span>
          <h2 ref={titleRef} className={`section-title${inView ? ' in-view' : ''}`}>
            導入実績
          </h2>
          <p className="section-desc">AIと20年の専門知識が生み出す、短納期で高品質な導入実績。</p>
        </div>

        <motion.div
          className={s.grid}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {FEATURED.map((work) => (
            <motion.div key={work.slug} className={s.card} variants={reveal}>
              <div className={s.cardHead}>
                <span className={s.industry}>{work.industry}</span>
                <span className={s.impact}>{work.impact}</span>
              </div>
              <h3 className={s.cardTitle}>{work.title}</h3>
              <p className={s.summary}>{work.summary}</p>
              <div className={s.compare}>
                <div className={s.compareItem}>
                  <p className={s.compareLabel}>従来</p>
                  <p className={s.comparePeriod}>{work.before.period}</p>
                  <p className={s.compareQuality}>{work.before.quality}</p>
                </div>
                <div className={s.arrow}>
                  <ServiceIcon type="arrow" size={18} />
                </div>
                <div className={`${s.compareItem} ${s.compareAfter}`}>
                  <p className={s.compareLabel}>当社</p>
                  <p className={s.comparePeriod}>{work.after.period}</p>
                  <p className={s.compareQuality}>{work.after.quality}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={s.cta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/works" className="btn btn--outline">
            すべての実績を見る
            <ServiceIcon type="arrow" size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
