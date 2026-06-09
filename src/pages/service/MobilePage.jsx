import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { reveal, stagger, viewportOnce } from '../../lib/animations'
import s from './MobilePage.module.css'

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

const STATS = [
  { num: '15+年', label: 'モバイル開発実績' },
  { num: 'Flutter', label: 'クロスプラットフォーム対応' },
  { num: 'iOS & Android', label: '両プラットフォーム対応' },
  { num: 'オフライン対応', label: '実績あり' },
]

const SERVICES_CARDS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
      </svg>
    ),
    title: 'Flutterクロスプラットフォーム開発',
    desc: '1つのコードベースでiOSとAndroid両方に対応。開発コストを抑えながら、ネイティブ品質のUXを実現します。',
    tags: ['Flutter', 'Dart', 'iOS', 'Android'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    title: 'ネイティブアプリ開発',
    desc: 'iOS (Swift) / Android (Kotlin) のネイティブ開発にも対応。高度なハードウェア連携や最大限のパフォーマンスが必要な場合に最適です。',
    tags: ['Swift', 'Kotlin', 'iOS', 'Android'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: 'PWA・Webアプリ',
    desc: 'ネイティブアプリが不要なケースはPWAやWebアプリも選択肢に。用途・予算・ユーザー層に合わせて最適な形を提案します。',
    tags: ['PWA', 'React', 'Next.js', 'TypeScript'],
  },
]

const COMPARISON = [
  {
    feature: '開発コスト',
    flutter: '低コスト（1コードで両OS）',
    reactNative: '低コスト',
    native: '高コスト（iOS+Android別開発）',
  },
  {
    feature: '品質・パフォーマンス',
    flutter: '高品質・ネイティブに近い',
    reactNative: '普通（JSブリッジのオーバーヘッド）',
    native: '最高品質',
  },
  {
    feature: '保守性',
    flutter: '高い（統一コードベース）',
    reactNative: '普通（依存パッケージが多い）',
    native: '低い（2コードベース）',
  },
  {
    feature: '対応OS',
    flutter: 'iOS / Android / Web',
    reactNative: 'iOS / Android',
    native: 'iOS または Android',
  },
]

const PROCESS_STEPS = [
  { num: '1', title: '要件定義', desc: '機能・UX要件を整理し、技術スタックを選定します。' },
  { num: '2', title: 'UI/UXデザイン', desc: 'Figmaでワイヤーフレーム・モックアップを作成します。' },
  { num: '3', title: '開発', desc: 'AI×経験豊富なエンジニアでスピーディに実装します。' },
  { num: '4', title: 'テスト', desc: '実機テストと自動テストで品質を担保します。' },
  { num: '5', title: 'リリース・運用', desc: 'ストア申請から運用サポートまで一貫して対応します。' },
]

const TECH_TAGS = ['Flutter', 'Dart', 'Firebase', 'iOS', 'Android', 'Swift', 'Kotlin']

export default function MobilePage() {
  const [svcRef, svcIn] = useTitleInView()
  const [compRef, compIn] = useTitleInView()
  const [processRef, processIn] = useTitleInView()
  const [techRef, techIn] = useTitleInView()

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="page-hero-label">Mobile App Development</span>
            <h1 className="page-hero-title">モバイルアプリ開発</h1>
            <p className="page-hero-sub">Android黎明期から積み上げた実績と、FlutterによるiOS/Android両対応開発。</p>
          </motion.div>
        </div>
      </div>

      <section className="section section--alt">
        <div className="container">
          <motion.div
            className={s.statsGrid}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {STATS.map((stat) => (
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
            {SERVICES_CARDS.map((card) => (
              <motion.div
                key={card.title}
                className={s.serviceCard}
                variants={reveal}
                whileHover={{ y: -4, boxShadow: '0 8px 28px rgba(0,0,0,0.09)', borderColor: 'rgba(36,144,243,0.3)' }}
                transition={{ type: 'tween', duration: 0.2 }}
              >
                <div className={s.serviceIcon}>{card.icon}</div>
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
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
                {COMPARISON.map((row) => (
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
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {TECH_TAGS.map((t) => (
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
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className={s.ctaTitle}>アプリ開発の相談をする</h2>
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
