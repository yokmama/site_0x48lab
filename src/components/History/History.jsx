import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './History.module.css'

const EVENTS = [
  {
    year: '2010年',
    title: '株式会社Re.Kayo-System 設立',
    desc: '神戸にてWebシステム開発会社として創業。JavaサーバーサイドやXML、Androidアプリ開発を中心に事業展開。',
  },
  {
    year: '2012年',
    title: '技術書を出版',
    desc: '翔泳社より「10日でおぼえるAndroidアプリ開発入門教室」を出版。教育事業へ本格参入。',
  },
  {
    year: '2016年1月',
    title: '8x9 Kids プログラミングスクール 開校',
    desc: 'マインクラフトを題材にした独自カリキュラムの子ども向けプログラミングスクールを開校。教材・教育システムの開発も開始。',
  },
  {
    year: '2021年1月',
    title: '株式会社ハックラボへ商号変更',
    desc: '神戸・灘区への移転を機に商号を変更。AI活用開発・モバイル開発へ事業を拡張。',
  },
  {
    year: '2025年7月',
    title: '東京・渋谷へ本社移転',
    desc: '東京渋谷に本社を移転。首都圏での事業基盤を強化し、さらなる成長を推進。',
  },
]

export default function History() {
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
    <section id="history" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">History</span>
          <h2 ref={titleRef} className={`section-title${inView ? ' in-view' : ''}`}>
            沿革
          </h2>
        </div>

        <div className={styles.timeline}>
          <div className={styles.line}>
            <motion.div
              className={styles.lineInner}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {EVENTS.map((event, i) => (
            <motion.div
              key={event.year}
              className={styles.entry}
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.dot} aria-hidden="true" />
              <div className={styles.entryCard}>
                <p className={styles.year}>{event.year}</p>
                <h3 className={styles.entryTitle}>{event.title}</h3>
                <p className={styles.entryDesc}>{event.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
