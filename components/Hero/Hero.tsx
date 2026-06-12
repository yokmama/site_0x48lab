"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { siteVisuals } from '@/lib/siteVisuals'
import HeroCanvas from '../HeroCanvas/HeroCanvas'
import styles from './Hero.module.css'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function Hero() {
  const visual = siteVisuals.home

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.backgroundPhoto} aria-hidden="true">
        <Image
          src={visual.src}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={84}
          className={styles.backgroundImage}
        />
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
