"use client"

import type { CSSProperties, ReactNode } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import AmbientCanvas from '@/components/AmbientCanvas/AmbientCanvas'
import { siteVisuals, type SiteVisualKey } from '@/lib/siteVisuals'
import s from './PageVisualHero.module.css'

type PageVisualHeroProps = {
  visualKey: SiteVisualKey
  label: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
  children?: ReactNode
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function PageVisualHero({
  visualKey,
  label,
  title,
  subtitle,
  align = 'center',
  children,
}: PageVisualHeroProps) {
  const visual = siteVisuals[visualKey]
  const style = {
    '--hero-accent': visual.accent,
    '--hero-position': visual.position || 'center',
    '--hero-dim': visual.dim ?? 0.68,
  } as CSSProperties

  return (
    <section className={s.hero} style={style}>
      <div className={s.imageWrap} aria-hidden="true">
        <Image
          className={s.image}
          src={visual.src}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={82}
        />
      </div>
      <div className={s.shade} aria-hidden="true" />
      <div className={s.grid} aria-hidden="true" />
      <div className={s.accentGlow} aria-hidden="true" />
      <div className={s.canvasWrap} aria-hidden="true">
        <AmbientCanvas variant={visual.canvas} accent={visual.accent} />
      </div>

      <div className={`container ${s.container}`}>
        <motion.div
          className={`${s.content} ${s[align]}`}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.span className={s.label} variants={item}>{label}</motion.span>
          <motion.h1 className={s.title} variants={item}>{title}</motion.h1>
          {subtitle && <motion.p className={s.sub} variants={item}>{subtitle}</motion.p>}
          {children}
        </motion.div>
      </div>
    </section>
  )
}
