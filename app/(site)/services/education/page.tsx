"use client"

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { EDUCATION_PAGE_BUSINESS_ITEMS, EDUCATION_PAGE_FEATURES } from '@/lib/data'
import { reveal, stagger, viewportOnce } from '@/lib/animations'
import ServiceIcon from '@/components/ui/ServiceIcon'
import PageVisualHero from '@/components/PageVisualHero/PageVisualHero'
import s from './page.module.css'

const logoSrc = '/assets/8x9-logo.png'

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

export default function EducationPage() {
  const [featRef, featIn] = useTitleInView()
  const [bizRef, bizIn] = useTitleInView()

  return (
    <div>
      <PageVisualHero
        visualKey="education"
        label="Programming Education"
        title="プログラミング教育"
        subtitle="マインクラフトを使った独自カリキュラムで、子どもの創造力とプログラミング思考を育てます。"
      />

      <section className="section">
        <div className="container">
          <motion.div
            className={s.aboutCard}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className={s.aboutLogo}>
              <img src={logoSrc} alt="8x9 Kids プログラミングスクール" />
            </div>
            <div className={s.aboutBody}>
              <h2 className={s.aboutTitle}>8x9 Kids プログラミングスクール</h2>
              <p className={s.aboutDesc}>
                2016年開校。マインクラフトを題材にした独自カリキュラムで、プログラミングの基礎から応用までを楽しく学べるスクールです。株式会社ビヨンドとの共同出資により運営。
              </p>
              <a
                href="https://8x9.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                スクールサイトへ
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Features</span>
            <h2
              ref={featRef}
              className={`section-title${featIn ? ' in-view' : ''}`}
            >
              スクールの特徴
            </h2>
          </div>
          <motion.div
            className={s.featuresGrid}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {EDUCATION_PAGE_FEATURES.map((feat) => (
              <motion.div
                key={feat.title}
                className={s.featureCard}
                variants={reveal}
                whileHover={{ y: -4, boxShadow: '0 8px 28px rgba(0,0,0,0.09)', borderColor: 'rgba(36,144,243,0.3)' }}
                transition={{ type: 'tween', duration: 0.2 }}
              >
                <div className={s.featureIcon}>
                  <ServiceIcon type={feat.icon} size={28} />
                </div>
                <h3 className={s.featureTitle}>{feat.title}</h3>
                <p className={s.featureDesc}>{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">For Business</span>
            <h2
              ref={bizRef}
              className={`section-title${bizIn ? ' in-view' : ''}`}
            >
              法人・事業者向けサービス
            </h2>
            <p className="section-desc">
              教育事業者・自治体・企業向けに、教材開発・システム開発など幅広くご支援します。
            </p>
          </div>
          <motion.div
            className={s.bizGrid}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {EDUCATION_PAGE_BUSINESS_ITEMS.map((item) => (
              <motion.div key={item.title} className={s.bizCard} variants={reveal}>
                <div className={s.bizCheckMark} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <h3 className={s.bizTitle}>{item.title}</h3>
                  <p className={s.bizDesc}>{item.desc}</p>
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
            <h2 className={s.ctaTitle}>スクールまたは教材開発についてご相談ください。</h2>
            <p className={s.ctaSub}>スクール入会・法人向けの教材開発・システム開発など、お気軽にお問い合わせください。</p>
            <div className={s.ctaBtns}>
              <a
                href="https://8x9.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost btn--lg"
              >
                スクールサイトへ
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
              <Link href="/contact?topic=education" className="btn btn--orange btn--lg">
                教材開発の相談
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
