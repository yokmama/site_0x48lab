"use client"

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { stagger, reveal, viewportOnce } from '@/lib/animations'
import { WORKS, WORKS_INDUSTRIES, WORKS_SERVICE_FILTERS, WORKS_SERVICE_LABEL_MAP } from '@/lib/data'
import s from './page.module.css'

function useTitleInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, inView] as const
}

function TechTag({ label }) {
  return <span className={s.techTag}>{label}</span>
}

function WorkCard({ work }) {
  return (
    <motion.div
      className={s.card}
      variants={reveal}
      whileHover={{ y: -4, boxShadow: '0 12px 36px rgba(0,0,0,0.10)', borderColor: 'rgba(36,144,243,0.25)' }}
      transition={{ type: 'tween', duration: 0.22 }}
    >
      <div className={s.cardHead}>
        <span className={s.industryTag}>{work.industry}</span>
        <span className={s.impactBadge}>{work.impact}</span>
      </div>
      <h3 className={s.cardTitle}>{work.title}</h3>
      <p className={s.cardSummary}>{work.summary}</p>
      <div className={s.compare}>
        <div className={s.compareItem}>
          <p className={s.compareLabel}>従来</p>
          <p className={s.comparePeriod}>{work.before.period}</p>
          <p className={s.compareQuality}>{work.before.quality}</p>
        </div>
        <div className={s.compareArrow} aria-hidden="true">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 10h12M11 4l6 6-6 6" />
          </svg>
        </div>
        <div className={`${s.compareItem} ${s.compareAfter}`}>
          <p className={s.compareLabel}>当社</p>
          <p className={s.comparePeriod}>{work.after.period}</p>
          <p className={s.compareQuality}>{work.after.quality}</p>
        </div>
      </div>
      <div className={s.techList}>
        {work.tech.map((t) => (
          <TechTag key={t} label={t} />
        ))}
      </div>
    </motion.div>
  )
}

export default function WorksPage() {
  const [activeIndustry, setActiveIndustry] = useState('all')
  const [activeService, setActiveService] = useState('all')
  const [statsRef] = useTitleInView()
  const [worksRef, worksIn] = useTitleInView()

  const filtered = WORKS.filter((w) => {
    const industryMatch = activeIndustry === 'all' || w.industry === activeIndustry
    const serviceMatch = activeService === 'all' || WORKS_SERVICE_LABEL_MAP[w.service] === activeService
    return industryMatch && serviceMatch
  })

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <motion.span
            className="page-hero-label"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          >
            Works
          </motion.span>
          <motion.h1
            className="page-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] as const }}
          >
            導入実績
          </motion.h1>
          <motion.p
            className="page-hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] as const }}
          >
            AI×専門知識で実現した、短納期・高品質な開発の実例。
          </motion.p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Works</span>
            <h2 ref={worksRef} className={`section-title${worksIn ? ' in-view' : ''}`}>
              導入実績
            </h2>
          </div>

          <div className={s.filterBar}>
            <div className={s.filterGroup}>
              <span className={s.filterGroupLabel}>業種</span>
              <div className={s.filterPills}>
                {WORKS_INDUSTRIES.map((ind) => (
                  <button
                    key={ind}
                    className={`${s.filterPill}${activeIndustry === ind ? ` ${s.active}` : ''}`}
                    onClick={() => setActiveIndustry(ind)}
                  >
                    {ind === 'all' ? 'すべて' : ind}
                  </button>
                ))}
              </div>
            </div>
            <div className={s.filterGroup}>
              <span className={s.filterGroupLabel}>サービス</span>
              <div className={s.filterPills}>
                {WORKS_SERVICE_FILTERS.map((svc) => (
                  <button
                    key={svc}
                    className={`${s.filterPill}${activeService === svc ? ` ${s.active}` : ''}`}
                    onClick={() => setActiveService(svc)}
                  >
                    {svc === 'all' ? 'すべて' : svc}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filtered.length > 0 ? (
            <motion.div
              className={s.grid}
              key={`${activeIndustry}-${activeService}`}
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {filtered.map((work) => (
                <WorkCard key={work.slug} work={work} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              className={s.empty}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <p>該当する実績が見つかりませんでした。</p>
            </motion.div>
          )}
        </div>
      </section>

      <section className={`section section--alt ${s.statsBottomSection}`}>
        <div className="container">
          <motion.div
            className={s.statsStrip}
            ref={statsRef}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div className={s.statItem} variants={reveal}>
              <p className={s.statNum}>2〜4週間</p>
              <p className={s.statLabel}>主要案件の納品期間</p>
            </motion.div>
            <motion.div className={s.statItem} variants={reveal}>
              <p className={s.statNum}>全案件</p>
              <p className={s.statLabel}>設計・品質レビュー</p>
            </motion.div>
            <motion.div className={s.statItem} variants={reveal}>
              <p className={s.statNum}>10+</p>
              <p className={s.statLabel}>対応業種</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
