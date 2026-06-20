"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './School.module.css'

const schoolLogoSrc = '/assets/8x9-logo.png'

export default function School() {
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
    <section id="school" className={`section ${styles.section}`}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Education</span>
          <h2
            ref={titleRef}
            className={`section-title${inView ? ' in-view' : ''}`}
          >
            プログラミングスクール
          </h2>
        </div>

        <motion.div
          className={styles.inner}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div className={styles.logoWrap}>
            <img src={schoolLogoSrc} alt="8x9 Kids プログラミングスクール" />
          </div>

          <div className={styles.body}>
            <p className={styles.established}>Since 2016</p>
            <h3 className={styles.schoolTitle}>8x9 Kids プログラミングスクール</h3>
            <p className={styles.desc}>
              マインクラフトを題材にした独自カリキュラムで、プログラミングの基礎から応用までを楽しく学べるスクールです。
              株式会社ビヨンドとの共同出資により運営しています。
            </p>
            <a
              href="https://8x9.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              スクールサイトへ
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
