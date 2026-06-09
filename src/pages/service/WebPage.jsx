import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { reveal, stagger, viewportOnce } from '../../lib/animations'
import s from './WebPage.module.css'

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

const SERVICES_CARDS = [
  {
    color: '#0891b2',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'フロントエンド開発',
    desc: 'React・Next.js・Vue.js などのモダンフレームワークで、高速・高品質なUIを構築します。SEO・パフォーマンス最適化も対応。',
    tags: ['React', 'Next.js', 'Vue.js', 'TypeScript'],
  },
  {
    color: 'var(--color-accent)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14" />
        <path d="M12 5l7 7-7 7" />
        <rect x="2" y="4" width="5" height="16" rx="1" />
      </svg>
    ),
    title: 'バックエンドAPI開発',
    desc: 'Node.js・Java・Python など幅広いバックエンド技術に対応。RESTful API・GraphQL・マイクロサービスまで設計から実装します。',
    tags: ['Node.js', 'Java', 'Python', 'PostgreSQL'],
  },
  {
    color: 'var(--color-orange)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: 'クラウドインフラ',
    desc: 'AWS・GCP・Vercel など主要クラウドに対応。スケーラブルで安全なインフラを設計・構築します。CI/CD パイプラインの整備も支援します。',
    tags: ['AWS', 'GCP', 'Vercel', 'Docker'],
  },
]

const STRENGTHS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    title: '要件定義から一貫対応',
    desc: '要件定義・設計・開発・保守まですべてお任せ。窓口を一本化することでコミュニケーションコストを削減します。',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'AI活用でコスト削減',
    desc: '生成AIを設計・実装・テストに積極活用。従来比1/5〜1/10のコストで同品質のシステムを届けます。',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: '長期保守を見据えた設計',
    desc: 'リリースがゴールではありません。運用・保守・機能追加を想定したアーキテクチャで、長く使えるシステムを構築します。',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'アジャイル開発で柔軟対応',
    desc: '小さく始めて素早く改善。要件変更にも柔軟に対応できるアジャイルな開発スタイルで、ビジネスの変化に追従します。',
  },
]

const TECH_TAGS = ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Node.js', 'Java', 'Python', 'AWS', 'PostgreSQL', 'MySQL', 'Docker']

const PROCESS_STEPS = [
  { num: '1', title: '要件定義・設計', desc: '要件をヒアリングし、システム設計書・画面設計を作成します。' },
  { num: '2', title: 'フロントエンド開発', desc: 'UI/UXデザインをもとに、高品質なフロントエンドを実装します。' },
  { num: '3', title: 'バックエンド開発', desc: 'APIサーバー・データベース・インフラを構築します。' },
  { num: '4', title: 'テスト・リリース', desc: '総合テスト後、本番環境へデプロイ。運用移行をサポートします。' },
]

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
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
            {SERVICES_CARDS.map((card) => (
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
                  {card.icon}
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
            {STRENGTHS.map((item) => (
              <motion.div key={item.title} className={s.strengthItem} variants={reveal}>
                <div className={s.strengthIcon}>{item.icon}</div>
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
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {TECH_TAGS.map((t) => (
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
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div key={step.num} className={s.processStep} variants={reveal}>
                <div className={s.processNum}>{step.num}</div>
                {idx < PROCESS_STEPS.length - 1 && (
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
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className={s.ctaTitle}>Webシステムの相談をする</h2>
            <p className={s.ctaSub}>ヒアリング・簡易見積もりまで無料です。まずはお気軽にご連絡ください。</p>
            <Link to="/contact" className="btn btn--primary btn--lg">
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
