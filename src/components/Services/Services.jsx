import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Services.module.css'

export default function Services() {
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
    <section id="service" className="section section--alt">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Services</span>
          <h2
            ref={titleRef}
            className={`section-title${inView ? ' in-view' : ''}`}
          >
            サービス
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.banner}>
            <div className={styles.left}>
              <span className={styles.tag}>AI活用型受託開発</span>
              <h3 className={styles.headline}>
                500万円のシステムが、<br />100万円で。
              </h3>
              <p className={styles.subhead}>
                20年の開発実績 × 生成AI ＝ コスト1/5〜1/10。
                業務管理・予約システム・自動化まで対応します。
              </p>
              <ul className={styles.services}>
                <li className={styles.serviceTag}>業務管理システム</li>
                <li className={styles.serviceTag}>予約・顧客対応システム</li>
                <li className={styles.serviceTag}>業務効率化・自動化</li>
              </ul>
            </div>
            <div className={styles.right}>
              <a
                href="/lp/ai-development/"
                className={styles.cta}
              >
                詳細を見る
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
