'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { stagger, reveal, viewportOnce } from '@/lib/animations'
import PageVisualHero from '@/components/PageVisualHero/PageVisualHero'
import s from './page.module.css'

type Work = {
  id: number
  slug: string
  industry: string
  service: string
  title: string
  summary: string
  challenge: string
  solution: string
  tech: string[]
  beforePeriod: string
  beforeQuality: string
  afterPeriod: string
  afterQuality: string
  impact: string
  link?: string | null
}

function useTitleInView() {
  const ref = useRef<HTMLElement>(null)
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

function TechTag({ label }: { label: string }) {
  return <span className={s.techTag}>{label}</span>
}

function WorkCard({ work }: { work: Work }) {
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
      <dl className={s.caseDetails}>
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
          <p className={s.comparePeriod}>{work.beforePeriod}</p>
          <p className={s.compareQuality}>{work.beforeQuality}</p>
        </div>
        <div className={s.compareArrow} aria-hidden="true">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 10h12M11 4l6 6-6 6" />
          </svg>
        </div>
        <div className={`${s.compareItem} ${s.compareAfter}`}>
          <p className={s.compareLabel}>当社</p>
          <p className={s.comparePeriod}>{work.afterPeriod}</p>
          <p className={s.compareQuality}>{work.afterQuality}</p>
        </div>
      </div>
      <div className={s.techList}>
        {work.tech.map(t => <TechTag key={t} label={t} />)}
      </div>
      <p className={s.caveat}>匿名化した導入実績です。成果は要件・体制・連携先により変動します。</p>
      {work.link && (
        <a href={work.link} target="_blank" rel="noopener noreferrer" className={s.cardLink}>
          サイトを見る →
        </a>
      )}
    </motion.div>
  )
}

type Props = {
  works: Work[]
  industries: string[]
  serviceFilters: string[]
  serviceLabelMap: Record<string, string>
}

export function WorksPageClient({ works, industries, serviceFilters, serviceLabelMap }: Props) {
  const [activeIndustry, setActiveIndustry] = useState('all')
  const [activeService, setActiveService] = useState('all')
  const [statsRef] = useTitleInView()
  const [worksRef, worksIn] = useTitleInView()

  const filtered = works.filter(w => {
    const industryMatch = activeIndustry === 'all' || w.industry === activeIndustry
    const serviceMatch = activeService === 'all' || serviceLabelMap[w.service] === activeService
    return industryMatch && serviceMatch
  })

  return (
    <div>
      <PageVisualHero
        visualKey="works"
        label="Works"
        title="導入実績"
        subtitle="モバイル・Web・AI・IoTなど多領域にわたる2021〜2026年の開発実績。"
      />

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Works</span>
            <h2 ref={worksRef as React.RefObject<HTMLHeadingElement>} className={`section-title${worksIn ? ' in-view' : ''}`}>導入実績</h2>
          </div>

          <div className={s.filterBar}>
            <div className={s.filterGroup}>
              <span className={s.filterGroupLabel}>業種</span>
              <div className={s.filterPills}>
                {industries.map(ind => (
                  <button key={ind} className={`${s.filterPill}${activeIndustry === ind ? ` ${s.active}` : ''}`} onClick={() => setActiveIndustry(ind)}>
                    {ind === 'all' ? 'すべて' : ind}
                  </button>
                ))}
              </div>
            </div>
            <div className={s.filterGroup}>
              <span className={s.filterGroupLabel}>サービス</span>
              <div className={s.filterPills}>
                {serviceFilters.map(svc => (
                  <button key={svc} className={`${s.filterPill}${activeService === svc ? ` ${s.active}` : ''}`} onClick={() => setActiveService(svc)}>
                    {svc === 'all' ? 'すべて' : svc}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filtered.length > 0 ? (
            <motion.div className={s.grid} key={`${activeIndustry}-${activeService}`} variants={stagger} initial="hidden" animate="visible">
              {filtered.map(work => <WorkCard key={work.slug} work={work} />)}
            </motion.div>
          ) : (
            <motion.div className={s.empty} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <p>該当する実績が見つかりませんでした。</p>
            </motion.div>
          )}
        </div>
      </section>

      <section className={`section section--alt ${s.statsBottomSection}`}>
        <div className="container">
          <motion.div className={s.statsStrip} ref={statsRef as React.RefObject<HTMLDivElement>} variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <motion.div className={s.statItem} variants={reveal}><p className={s.statNum}>{works.length}</p><p className={s.statLabel}>開発実績数</p></motion.div>
            <motion.div className={s.statItem} variants={reveal}><p className={s.statNum}>2021〜2026</p><p className={s.statLabel}>実績期間</p></motion.div>
            <motion.div className={s.statItem} variants={reveal}><p className={s.statNum}>5+</p><p className={s.statLabel}>対応技術ドメイン</p></motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
