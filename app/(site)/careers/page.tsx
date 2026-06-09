"use client"

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CAREERS_BENEFITS, CAREERS_CULTURE, CAREERS_STEPS, JOB_OPENINGS } from '@/lib/data'
import { stagger, reveal, viewportOnce } from '@/lib/animations'
import ServiceIcon from '@/components/ui/ServiceIcon'
import s from './page.module.css'

function SectionTitle({ label, title }) {
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
  return (
    <div className="section-header">
      <span className="section-label">{label}</span>
      <h2 ref={ref} className={`section-title${inView ? ' in-view' : ''}`}>{title}</h2>
    </div>
  )
}

export default function CareersPage() {
  return (
    <div className="page-content">
      <div className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <span className="page-hero-label">Careers</span>
            <h1 className="page-hero-title">採用情報</h1>
            <p className="page-hero-sub">テクノロジーで未来を創造する仲間を募集しています。</p>
          </motion.div>
        </div>
      </div>

      <section className="section section--alt">
        <div className="container">
          <SectionTitle label="Culture" title="私たちの働き方" />
          <motion.div
            className={s.cultureGrid}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {CAREERS_CULTURE.map((item) => (
              <motion.div key={item.title} className={s.cultureCard} variants={reveal}>
                <div className={s.cultureIcon}>
                  <ServiceIcon type={item.icon} />
                </div>
                <h3 className={s.cultureTitle}>{item.title}</h3>
                <p className={s.cultureDesc}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle label="Openings" title="募集職種" />
          <motion.div
            className={s.jobList}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {JOB_OPENINGS.map((job) => (
              <motion.div key={job.id} className={s.jobCard} variants={reveal}>
                <div className={s.jobHeader}>
                  <h3 className={s.jobTitle}>{job.title}</h3>
                  <span className={s.jobType}>{job.type}</span>
                </div>
                <div className={s.jobLocation}>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="13" height="13">
                    <path d="M8 1C5.8 1 4 2.8 4 5c0 3 4 9 4 9s4-6 4-9c0-2.2-1.8-4-4-4z" />
                    <circle cx="8" cy="5" r="1.5" />
                  </svg>
                  {job.location}
                </div>
                <div className={s.jobTags}>
                  {job.tags.map((tag) => (
                    <span key={tag} className={s.tag}>{tag}</span>
                  ))}
                </div>
                <p className={s.jobDesc}>{job.desc}</p>
                <div className={s.jobAction}>
                  <Link href="/contact" className="btn btn--primary btn--sm">
                    詳細・応募はこちら
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="12" height="12">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionTitle label="Benefits" title="福利厚生" />
          <motion.div
            className={s.benefitsGrid}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {CAREERS_BENEFITS.map((b) => (
              <motion.div key={b.label} className={s.benefitCard} variants={reveal}>
                <span className={s.benefitIcon}>{b.icon}</span>
                <div>
                  <p className={s.benefitLabel}>{b.label}</p>
                  <p className={s.benefitSub}>{b.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle label="Process" title="選考フロー" />
          <motion.div
            className={s.steps}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {CAREERS_STEPS.map((step, i) => (
              <motion.div key={step.num} className={s.step} variants={reveal}>
                <div className={s.stepConnector}>
                  <div className={s.stepNum}>{step.num}</div>
                  {i < CAREERS_STEPS.length - 1 && <div className={s.stepLine} aria-hidden="true" />}
                </div>
                <div className={s.stepBody}>
                  <p className={s.stepLabel}>{step.label}</p>
                  <p className={s.stepDesc}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className={s.ctaSection}>
        <div className="container">
          <motion.div
            className={s.ctaInner}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <p className={s.ctaEyebrow}>Join Us</p>
            <h2 className={s.ctaTitle}>まずはカジュアルに話しましょう。</h2>
            <p className={s.ctaSub}>選考とは関係なく、どんな会社なのか気軽に聞いていただいて構いません。</p>
            <Link href="/contact" className="btn btn--primary btn--lg">
              お問い合わせ・カジュアル面談
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
