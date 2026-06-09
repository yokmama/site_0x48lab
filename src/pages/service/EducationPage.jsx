import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { reveal, stagger, viewportOnce } from '../../lib/animations'
import logoSrc from '../../assets/8x9-logo.png'
import s from './EducationPage.module.css'

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
  return [ref, inView]
}

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
    title: 'マインクラフトを使った体験型学習',
    desc: '子どもたちが大好きなマインクラフトを題材に、ゲームを作りながらプログラミングの基礎から応用まで自然に身につけます。',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: '小学生〜中学生対応',
    desc: '年齢・習熟度に合わせたクラス分けで、はじめてプログラミングに触れる子どもから発展的な学習を望む子どもまで幅広く対応。',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
      </svg>
    ),
    title: 'オリジナル教材・カリキュラム',
    desc: '株式会社ハックラボが独自に開発した教材とカリキュラムを使用。プログラミング的思考力と創造性を同時に育みます。',
  },
]

const BUSINESS_ITEMS = [
  {
    title: '教材・カリキュラム開発受託',
    desc: 'プログラミング教育向けの教材やカリキュラムの設計・開発をお受けします。学習目標・対象年齢に合わせてカスタマイズします。',
  },
  {
    title: 'Mod・プラグイン開発',
    desc: 'マインクラフト向けのMod・プラグインの受託開発に対応。学習用コンテンツから独自ゲーム体験まで幅広く対応できます。',
  },
  {
    title: '教育システム開発',
    desc: '受講管理・進捗トラッキング・保護者向けポータルなど、教育事業者向けのWebシステム開発を承ります。',
  },
]

export default function EducationPage() {
  const [featRef, featIn] = useTitleInView()
  const [bizRef, bizIn] = useTitleInView()

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="page-hero-label">Programming Education</span>
            <h1 className="page-hero-title">プログラミング教育</h1>
            <p className="page-hero-sub">マインクラフトを使った独自カリキュラムで、子どもの創造力とプログラミング思考を育てます。</p>
          </motion.div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <motion.div
            className={s.aboutCard}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
            {FEATURES.map((feat) => (
              <motion.div
                key={feat.title}
                className={s.featureCard}
                variants={reveal}
                whileHover={{ y: -4, boxShadow: '0 8px 28px rgba(0,0,0,0.09)', borderColor: 'rgba(36,144,243,0.3)' }}
                transition={{ type: 'tween', duration: 0.2 }}
              >
                <div className={s.featureIcon}>{feat.icon}</div>
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
            {BUSINESS_ITEMS.map((item) => (
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
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
              <Link to="/contact" className="btn btn--orange btn--lg">
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
