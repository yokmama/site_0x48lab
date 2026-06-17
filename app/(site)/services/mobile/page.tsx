"use client"

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  MOBILE_PAGE_COMPARISON,
  MOBILE_PAGE_PROCESS_STEPS,
  MOBILE_PAGE_SERVICE_CARDS,
  MOBILE_PAGE_STATS,
  MOBILE_PAGE_TECH_TAGS,
} from '@/lib/data'
import { reveal, stagger, viewportOnce } from '@/lib/animations'
import ServiceIcon from '@/components/ui/ServiceIcon'
import PageVisualHero from '@/components/PageVisualHero/PageVisualHero'
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

export default function MobilePage() {
  const [svcRef, svcIn] = useTitleInView()
  const [compRef, compIn] = useTitleInView()
  const [processRef, processIn] = useTitleInView()
  const [techRef, techIn] = useTitleInView()

  return (
    <div>
      <PageVisualHero
        visualKey="mobile"
        label="Mobile App Development"
        title="モバイルアプリ開発"
        subtitle="Android黎明期から積み上げた実績と、FlutterによるiOS/Android両対応開発。"
      />

      <section className="section section--alt">
        <div className="container">
          <motion.div
            className={s.statsGrid}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {MOBILE_PAGE_STATS.map((stat) => (
              <motion.div key={stat.label} className={s.statCard} variants={reveal}>
                <p className={s.statNum}>{stat.num}</p>
                <p className={s.statLabel}>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">What We Do</span>
            <h2
              ref={svcRef}
              className={`section-title${svcIn ? ' in-view' : ''}`}
            >
              開発サービス
            </h2>
          </div>
          <motion.div
            className={s.servicesGrid}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {MOBILE_PAGE_SERVICE_CARDS.map((card) => (
              <motion.div
                key={card.title}
                className={s.serviceCard}
                variants={reveal}
                whileHover={{ y: -4, boxShadow: '0 8px 28px rgba(0,0,0,0.09)', borderColor: 'rgba(36,144,243,0.3)' }}
                transition={{ type: 'tween', duration: 0.2 }}
              >
                <div className={s.serviceIcon}>
                  <ServiceIcon type={card.icon} size={28} />
                </div>
                <h3 className={s.serviceTitle}>{card.title}</h3>
                <p className={s.serviceDesc}>{card.desc}</p>
                <div className={s.tagCloud}>
                  {card.tags.map((t) => (
                    <span key={t} className={s.tag}>{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Flutter</span>
            <h2
              ref={compRef}
              className={`section-title${compIn ? ' in-view' : ''}`}
            >
              Flutterを選ぶ理由
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className={s.tableWrap}
          >
            <table className={s.compTable}>
              <thead>
                <tr>
                  <th></th>
                  <th className={s.thFlutter}>Flutter</th>
                  <th>React Native</th>
                  <th>ネイティブ</th>
                </tr>
              </thead>
              <tbody>
                {MOBILE_PAGE_COMPARISON.map((row) => (
                  <tr key={row.feature}>
                    <th scope="row">{row.feature}</th>
                    <td className={s.tdFlutter}>{row.flutter}</td>
                    <td>{row.reactNative}</td>
                    <td>{row.native}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Process</span>
            <h2
              ref={processRef}
              className={`section-title${processIn ? ' in-view' : ''}`}
            >
              開発プロセス
            </h2>
          </div>
          <motion.div
            className={s.processSteps}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {MOBILE_PAGE_PROCESS_STEPS.map((step, idx) => (
              <motion.div key={step.num} className={s.processStep} variants={reveal}>
                <div className={s.processNum}>{step.num}</div>
                {idx < MOBILE_PAGE_PROCESS_STEPS.length - 1 && (
                  <div className={s.processConnector} aria-hidden="true" />
                )}
                <h3 className={s.processTitle}>{step.title}</h3>
                <p className={s.processDesc}>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Tech Stack</span>
            <h2
              ref={techRef}
              className={`section-title${techIn ? ' in-view' : ''}`}
            >
              技術スタック
            </h2>
          </div>
          <motion.div
            className={s.techCloud}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            {MOBILE_PAGE_TECH_TAGS.map((t) => (
              <span key={t} className={s.techTag}>{t}</span>
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
            <h2 className={s.ctaTitle}>アプリ開発の相談をする</h2>
            <p className={s.ctaSub}>ヒアリング・簡易見積もりまで無料です。まずはお気軽にご連絡ください。</p>
            <Link href="/contact?topic=web-mobile" className="btn btn--primary btn--lg">
              無料相談を申し込む
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
