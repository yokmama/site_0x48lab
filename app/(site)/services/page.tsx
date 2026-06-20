"use client"

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  SERVICES,
  SERVICES_PAGE_ICON_BG,
  SERVICES_PAGE_PROCESS_STEPS,
  SERVICES_PAGE_WHY_ITEMS,
} from '@/lib/data'
import { reveal, stagger, viewportOnce } from '@/lib/animations'
import { getServiceVisual } from '@/lib/projectVisuals'
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

export default function ServicesPage() {
  const [gridRef, gridIn] = useTitleInView()
  const [processRef, processIn] = useTitleInView()
  const [whyRef, whyIn] = useTitleInView()

  return (
    <div>
      <PageVisualHero
        visualKey="services"
        label="Services"
        title="サービス一覧"
        subtitle="受託開発からモバイルアプリ、プログラミング教育まで。"
      />

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">All Services</span>
            <h2
              ref={gridRef}
              className={`section-title${gridIn ? ' in-view' : ''}`}
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
            {SERVICES.map((svc) => (
              <motion.div key={svc.slug} className={s.serviceCard} variants={reveal}>
                <div className={s.cardVisual} style={{ backgroundImage: `url(${getServiceVisual(svc.slug)})` }} aria-hidden="true" />
                <div
                  className={s.cardIconArea}
                  style={{ backgroundColor: SERVICES_PAGE_ICON_BG[svc.slug] || 'var(--color-accent)' }}
                >
                  <ServiceIcon type={svc.icon} size={32} color="#fff" />
                </div>
                <div className={s.cardBody}>
                  <span className={s.cardTitleEn}>{svc.titleEn}</span>
                  <h3 className={s.cardTitle}>{svc.title}</h3>
                  <p className={s.cardTagline}>{svc.tagline}</p>
                  <p className={s.cardDesc}>{svc.desc}</p>
                  <ul className={s.featureList}>
                    {svc.features.map((f) => (
                      <li key={f} className={s.featureItem}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={s.checkIcon}>
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className={s.cardCta}>
                    {svc.externalPath ? (
                      <a
                        href={svc.externalPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--outline"
                      >
                        スクールサイトへ
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    ) : (
                      <Link href={svc.path} className="btn btn--primary">
                        詳細を見る
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
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
              開発の流れ
            </h2>
          </div>
          <motion.div
            className={s.processSteps}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {SERVICES_PAGE_PROCESS_STEPS.map((step, idx) => (
              <motion.div key={step.num} className={s.processStep} variants={reveal}>
                <div className={s.processNum}>{step.num}</div>
                {idx < SERVICES_PAGE_PROCESS_STEPS.length - 1 && (
                  <div className={s.processConnector} aria-hidden="true" />
                )}
                <h3 className={s.processTitle}>{step.title}</h3>
                <p className={s.processDesc}>{step.desc}</p>
                {step.free && <span className={s.processFree}>無料</span>}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why HackLab</span>
            <h2
              ref={whyRef}
              className={`section-title${whyIn ? ' in-view' : ''}`}
            >
              選ばれる理由
            </h2>
          </div>
          <motion.div
            className={s.whyGrid}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {SERVICES_PAGE_WHY_ITEMS.map((item) => (
              <motion.div key={item.title} className={s.whyCard} variants={reveal}>
                <div className={s.whyNum}>
                  <span className={s.whyNumValue}>{item.num}</span>
                  <span className={s.whyNumUnit}>{item.unit}</span>
                </div>
                <h3 className={s.whyTitle}>{item.title}</h3>
                <p className={s.whyDesc}>{item.desc}</p>
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
            <h2 className={s.ctaTitle}>まずは無料相談から。</h2>
            <p className={s.ctaSub}>ヒアリング・簡易見積もりまで費用はかかりません。お気軽にご相談ください。</p>
            <Link href="/contact?topic=ai-development" className="btn btn--orange btn--lg">
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
