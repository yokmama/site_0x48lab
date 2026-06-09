"use client"

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  WEB_PAGE_PROCESS_STEPS,
  WEB_PAGE_SERVICE_CARDS,
  WEB_PAGE_STRENGTHS,
  WEB_PAGE_TECH_TAGS,
} from '@/lib/data'
import { reveal, stagger, viewportOnce } from '@/lib/animations'
import ServiceIcon from '@/components/ui/ServiceIcon'
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

export default function WebPage() {
  const [svcRef, svcIn] = useTitleInView()
  const [strengthRef, strengthIn] = useTitleInView()
  const [techRef, techIn] = useTitleInView()
  const [processRef, processIn] = useTitleInView()

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <span className="page-hero-label">Web System Development</span>
            <h1 className="page-hero-title">Webシステム開発</h1>
            <p className="page-hero-sub">React・Next.js・Javaなど幅広いスタックで、スケールする設計のWebシステムを構築。</p>
          </motion.div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Services</span>
            <h2
              ref={svcRef}
              className={`section-title${svcIn ? ' in-view' : ''}`}
            >
              提供サービス
            </h2>
          </div>
          <motion.div
            className={s.servicesGrid}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {WEB_PAGE_SERVICE_CARDS.map((card) => (
              <motion.div
                key={card.title}
                className={s.serviceCard}
                variants={reveal}
                whileHover={{ y: -4, boxShadow: '0 8px 28px rgba(0,0,0,0.09)', borderColor: 'rgba(36,144,243,0.3)' }}
                transition={{ type: 'tween', duration: 0.2 }}
              >
                <div
                  className={s.serviceIcon}
                  style={{
                    backgroundColor: `${card.color}18`,
                    color: card.color,
                  }}
                >
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
            <span className="section-label">Strengths</span>
            <h2
              ref={strengthRef}
              className={`section-title${strengthIn ? ' in-view' : ''}`}
            >
              強み
            </h2>
          </div>
          <motion.div
            className={s.strengthsList}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {WEB_PAGE_STRENGTHS.map((item) => (
              <motion.div key={item.title} className={s.strengthItem} variants={reveal}>
                <div className={s.strengthIcon}>
                  <ServiceIcon type={item.icon} size={22} />
                </div>
                <div className={s.strengthBody}>
                  <h3 className={s.strengthTitle}>{item.title}</h3>
                  <p className={s.strengthDesc}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section">
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
            {WEB_PAGE_TECH_TAGS.map((t) => (
              <span key={t} className={s.techTag}>{t}</span>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section section--alt">
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
            {WEB_PAGE_PROCESS_STEPS.map((step, idx) => (
              <motion.div key={step.num} className={s.processStep} variants={reveal}>
                <div className={s.processNum}>{step.num}</div>
                {idx < WEB_PAGE_PROCESS_STEPS.length - 1 && (
                  <div className={s.processConnector} aria-hidden="true" />
                )}
                <h3 className={s.processTitle}>{step.title}</h3>
                <p className={s.processDesc}>{step.desc}</p>
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
            <h2 className={s.ctaTitle}>Webシステムの相談をする</h2>
            <p className={s.ctaSub}>ヒアリング・簡易見積もりまで無料です。まずはお気軽にご連絡ください。</p>
            <Link href="/contact" className="btn btn--primary btn--lg">
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
