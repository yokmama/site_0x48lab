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
    <section id="works" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Works</span>
          <h2 ref={titleRef} className={`section-title${inView ? ' in-view' : ''}`}>
            導入実績
          </h2>
          <p className="section-desc">業種・課題・対応内容を整理した、判断材料として見られる導入実績。</p>
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
              <dl className={s.caseFacts}>
                <div>
                  <dt>課題</dt>
                  <dd>{work.challenge}</dd>
                </div>
                <div>
                  <dt>対応</dt>
                  <dd>{work.solution}</dd>
                </div>
              </dl>
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
              <p className={s.caveat}>匿名化した課題と成果です。詳細条件は個別相談で確認します。</p>
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
