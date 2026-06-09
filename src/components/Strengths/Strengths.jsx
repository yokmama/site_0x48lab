import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { stagger, reveal, viewportOnce } from '../../lib/animations'
import styles from './Strengths.module.css'

const STRENGTHS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'AI活用開発',
    desc: '生成AIを設計・実装・テストに組み込み、コスト1/5〜1/10・納期最大1/10を実現。20年の設計ノウハウがAIを正しく活用する鍵です。',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
      </svg>
    ),
    title: 'モバイルアプリ開発',
    desc: 'Android黎明期からの深い実績を持ち、Flutterを活用したiOS/Androidクロスプラットフォーム開発を提供。ネイティブ品質のUXをスピーディに実現します。',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: 'Webシステム開発',
    desc: 'React・Next.js・Javaなど幅広いスタックに対応。要件定義から設計・開発・保守まで一貫して担当し、長期運用を見据えたアーキテクチャを提案します。',
  },
]

export default function Strengths() {
  const titleRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="strengths" className="section section--alt">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Strengths</span>
          <h2 ref={titleRef} className={`section-title${inView ? ' in-view' : ''}`}>
            私たちの強み
          </h2>
          <p className="section-desc">
            創業15年以上で積み上げたノウハウと、最新のAI技術を融合させたサービスを提供します。
          </p>
        </div>

        <motion.div
          className={styles.grid}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {STRENGTHS.map(({ icon, title, desc }) => (
            <motion.div
              key={title}
              className={styles.card}
              variants={reveal}
              whileHover={{ y: -6, boxShadow: '0 12px 36px rgba(0,0,0,0.10)', borderColor: 'rgba(36,144,243,0.3)' }}
              transition={{ type: 'tween', duration: 0.22 }}
            >
              <div className={styles.iconWrap}>{icon}</div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDesc}>{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
