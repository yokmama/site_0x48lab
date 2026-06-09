import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Strengths.module.css'

const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
  </svg>
)

const IconAI = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
)

const IconBlock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
)

const STRENGTHS = [
  {
    icon: IconPhone,
    title: 'モバイルアプリ開発',
    desc: 'Android黎明期からの深い実績を持ち、現在はFlutterを活用したiOS/Androidクロスプラットフォーム開発を提供しています。',
  },
  {
    icon: IconAI,
    title: 'AI活用開発',
    desc: '設計から開発・テストまでAIを活用した効率的な開発プロセスにより、仕様変更にも柔軟に対応します。',
  },
  {
    icon: IconBlock,
    title: 'マインクラフト開発',
    desc: 'スクール運営で培った知識を活かし、Mod・プラグイン・教材開発まで幅広く対応しています。',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

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
    <section id="strengths" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Strengths</span>
          <h2
            ref={titleRef}
            className={`section-title${inView ? ' in-view' : ''}`}
          >
            私たちの強み
          </h2>
        </div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {STRENGTHS.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              className={styles.card}
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: '0 12px 36px rgba(0,0,0,0.10)', borderColor: 'rgba(36,144,243,0.3)' }}
              transition={{ type: 'tween', duration: 0.22 }}
            >
              <div className={styles.iconWrap}>
                <Icon />
              </div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDesc}>{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
