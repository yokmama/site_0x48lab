import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SCHOOL_PAGE_BUSINESS_ITEMS, SCHOOL_PAGE_FEATURES } from '../lib/data'
import { stagger, reveal, revealLeft, revealRight, viewportOnce } from '../lib/animations'
import ServiceIcon from '../components/ui/ServiceIcon'
import schoolLogo from '../assets/8x9-logo.png'
import s from './SchoolPage.module.css'

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

export default function SchoolPage() {
  return (
    <div className="page-content">
      <div className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="page-hero-label">Education</span>
            <h1 className="page-hero-title">8x9 Kids プログラミングスクール</h1>
            <p className="page-hero-sub">マインクラフトで楽しく学ぶ、子ども向けプログラミング教育。2016年開校。</p>
          </motion.div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={s.aboutLayout}>
            <motion.div
              className={s.logoWrap}
              variants={revealLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <img src={schoolLogo} alt="8x9 Kids プログラミングスクール" className={s.logo} />
              <p className={s.since}>Since 2016</p>
            </motion.div>
            <motion.div
              className={s.aboutBody}
              variants={revealRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <span className="section-label">About</span>
              <h2 className={s.aboutTitle}>マインクラフトで<br />楽しく学ぶプログラミング</h2>
              <p className={s.aboutDesc}>
                8x9 Kids プログラミングスクールは、子どもたちに人気の「マインクラフト」を題材にした
                独自カリキュラムで、プログラミング教育を提供しています。
                ゲームの世界を舞台にしながら、論理的思考・問題解決力・創造力を育むことを目指しています。
              </p>
              <p className={s.aboutDesc}>
                2016年の開校以来、多くの生徒がスクールを通じてプログラミングの楽しさに目覚め、
                将来の可能性を広げています。株式会社ビヨンドとの共同出資により運営しています。
              </p>
              <a
                href="https://8x9.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn--primary ${s.extLink}`}
              >
                スクールサイトへ
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="13" height="13">
                  <path d="M7 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V9M10 1h4m0 0v4m0-4L7 8" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionTitle label="Features" title="スクールの特徴" />
          <motion.div
            className={s.featuresGrid}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {SCHOOL_PAGE_FEATURES.map((f) => (
              <motion.div key={f.title} className={s.featureCard} variants={reveal}>
                <div className={s.featureIcon}>
                  <ServiceIcon type={f.icon} />
                </div>
                <h3 className={s.featureTitle}>{f.title}</h3>
                <p className={s.featureDesc}>{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle label="Business" title="法人・企業向けサービス" />
          <motion.div
            className={s.businessGrid}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {SCHOOL_PAGE_BUSINESS_ITEMS.map((item) => (
              <motion.div key={item.title} className={s.businessCard} variants={reveal}>
                <div className={s.businessAccent} aria-hidden="true" />
                <h3 className={s.businessTitle}>{item.title}</h3>
                <p className={s.businessDesc}>{item.desc}</p>
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
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className={s.ctaTitle}>教育コンテンツの開発も<br />お任せください</h2>
            <p className={s.ctaSub}>教材・カリキュラムの開発からシステム構築まで、教育領域の受託開発をトータルで対応します。</p>
            <div className={s.ctaActions}>
              <a
                href="https://8x9.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost btn--lg"
              >
                スクールサイトへ
              </a>
              <Link to="/contact" className="btn btn--primary btn--lg">
                受託開発の相談
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
