"use client"

import { useEffect, useRef } from 'react'
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

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const syncVideoMotion = () => {
      const video = videoRef.current
      if (!video) return

      if (motionQuery.matches) {
        video.pause()
        video.currentTime = 0
        return
      }

      void video.play()
    }

    syncVideoMotion()
    motionQuery.addEventListener('change', syncVideoMotion)

    return () => {
      motionQuery.removeEventListener('change', syncVideoMotion)
    }
  }, [])

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.backgroundMedia} aria-hidden="true">
        <video
          ref={videoRef}
          className={styles.backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={HERO_VIDEO_POSTER}
          tabIndex={-1}
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
      </div>
      <HeroCanvas />

      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span className={styles.eyebrow} variants={itemVariants}>
          Technology for the Future
        </motion.span>

        <motion.h1 className={styles.companyJa} variants={itemVariants}>
          株式会社ハックラボ
        </motion.h1>

        <motion.p className={styles.companyEn} variants={itemVariants}>
          HackLab Inc.
        </motion.p>

        <motion.div className={styles.divider} variants={itemVariants} />

        <motion.p className={styles.tagline} variants={itemVariants}>
          テクノロジーで未来を創造する
        </motion.p>

        <motion.div className={styles.heroCtas} variants={itemVariants}>
          <Link href="/services" className="btn btn--ghost">
            サービスを見る
          </Link>
          <Link href="/contact" className={`btn ${styles.ctaOrange}`}>
            無料相談する
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
