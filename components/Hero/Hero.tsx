"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import HeroCanvas from '../HeroCanvas/HeroCanvas'
import styles from './Hero.module.css'

const HERO_VIDEO_SRC = '/assets/hero-engineers-discussion.mp4'
const HERO_VIDEO_POSTER = '/assets/hero-engineers-discussion-poster.jpg'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showMotion, setShowMotion] = useState(false)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobileQuery = window.matchMedia('(max-width: 768px)')

    const syncVideoMotion = () => {
      const shouldShowMotion = !motionQuery.matches && !mobileQuery.matches
      setShowMotion(shouldShowMotion)

      const video = videoRef.current
      if (!video) return

      if (!shouldShowMotion) {
        video.pause()
        video.currentTime = 0
        return
      }

      void video.play()
    }

    syncVideoMotion()
    motionQuery.addEventListener('change', syncVideoMotion)
    mobileQuery.addEventListener('change', syncVideoMotion)

    return () => {
      motionQuery.removeEventListener('change', syncVideoMotion)
      mobileQuery.removeEventListener('change', syncVideoMotion)
    }
  }, [])

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.backgroundMedia} aria-hidden="true">
        {showMotion && (
          <video
            ref={videoRef}
            className={styles.backgroundVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={HERO_VIDEO_POSTER}
            tabIndex={-1}
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        )}
      </div>
      {showMotion && (
        <div className={styles.canvasLayer} aria-hidden="true">
          <HeroCanvas />
        </div>
      )}

      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span className={styles.eyebrow} variants={itemVariants}>
          AI-Powered Business System Development
        </motion.span>

        <motion.h1 className={styles.heroTitle} variants={itemVariants}>
          AIで業務システム開発を<br />
          短く、確実に。
        </motion.h1>

        <motion.p className={styles.heroLead} variants={itemVariants}>
          2010年創業の開発経験と生成AIを組み合わせ、業務管理・予約・自動化システムを
          2〜4週間単位で段階リリース。AI任せにせず、シニアエンジニアが設計と品質を確認します。
        </motion.p>

        <motion.dl className={styles.proofGrid} variants={itemVariants}>
          {[
            { value: '2010年', label: '創業' },
            { value: '300+', label: 'プロジェクト' },
            { value: '2〜4週間', label: '段階リリース目安' },
            { value: '人がレビュー', label: 'AI任せにしない品質管理' },
          ].map((item) => (
            <div key={item.label} className={styles.proofItem}>
              <dt>{item.value}</dt>
              <dd>{item.label}</dd>
            </div>
          ))}
        </motion.dl>

        <motion.div className={styles.heroCtas} variants={itemVariants}>
          <Link href="/contact?topic=ai-development" className={`btn ${styles.ctaOrange}`}>
            無料相談する
          </Link>
          <Link href="/works" className="btn btn--ghost">
            実績を見る
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <span className={styles.scrollText}>Scroll</span>
        <span className={styles.scrollArrow} aria-hidden="true" />
      </motion.div>
    </section>
  )
}
