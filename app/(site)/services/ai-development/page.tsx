"use client"

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { reveal, stagger, viewportOnce } from '@/lib/animations'
import {
  AI_DEV_COMPARISON_ROWS,
  AI_DEV_EXAMPLE_PROJECTS,
  AI_DEV_FAQ_ITEMS,
  AI_DEV_PROBLEMS,
  AI_DEV_PROCESS_STEPS,
  AI_DEV_SERVICE_PACKAGES,
  AI_DEV_SOLUTIONS,
} from '@/lib/data'
import s from './page.module.css'

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
  return [ref, inView] as const
}

function FaqItem({ item, index }) {
  const [open, setOpen] = useState(index === 0)
  return (
    <div className={s.faqItem}>
      <button
        className={s.faqQuestion}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className={s.faqQ}>Q</span>
        <span className={s.faqQuestionText}>{item.q}</span>
        <svg
          className={`${s.faqIcon}${open ? ` ${s.open}` : ''}`}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M10 4v12M4 10h12" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className={s.faqAnswer}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
          >
            <p className={s.faqAnswerInner}>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function AiDevPage() {
  const [probRef, probIn] = useTitleInView()
  const [solRef, solIn] = useTitleInView()
  const [compRef, compIn] = useTitleInView()
  const [examplesRef, examplesIn] = useTitleInView()
  const [packagesRef, packagesIn] = useTitleInView()
  const [processRef, processIn] = useTitleInView()
  const [faqRef, faqIn] = useTitleInView()

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <span className="page-hero-label">AI-Powered Development</span>
            <h1 className="page-hero-title">AI活用型受託開発</h1>
            <p className="page-hero-sub">20年の開発実績×生成AIで、短納期と高品質を両立する業務システム開発。</p>
          </motion.div>
        </div>
      </div>

      <section className="section section--alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Problems</span>
            <h2
              ref={probRef}
              className={`section-title${probIn ? ' in-view' : ''}`}
            >
              こんな課題、ありませんか？
            </h2>
          </div>
          <motion.div
            className={s.problemsGrid}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {AI_DEV_PROBLEMS.map((p) => (
              <motion.div key={p.title} className={s.problemCard} variants={reveal}>
                <div className={s.problemIcon} aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M15 5L5 15M5 5l10 10" />
                  </svg>
                </div>
                <h3 className={s.problemTitle}>{p.title}</h3>
                <p className={s.problemDesc}>{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Solution</span>
            <h2
              ref={solRef}
              className={`section-title${solIn ? ' in-view' : ''}`}
            >
              その課題、今なら解決できます。
            </h2>
            <p className="section-desc">
              AIの進化がシステム開発の進め方を変えました。20年の設計ノウハウ × AIの生産性で、短いサイクルでも品質を落とさない開発が可能です。
            </p>
          </div>
          <motion.div
            className={s.solutionGrid}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {AI_DEV_SOLUTIONS.map((item) => (
              <motion.div
                key={item.num}
                className={s.solutionCard}
                variants={reveal}
                whileHover={{ y: -4, boxShadow: '0 8px 28px rgba(0,0,0,0.09)', borderColor: 'rgba(36,144,243,0.3)' }}
                transition={{ type: 'tween', duration: 0.2 }}
              >
                <span className={s.solutionNum}>{item.num}</span>
                <h3 className={s.solutionTitle}>{item.title}</h3>
                <p className={s.solutionDesc}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Comparison</span>
            <h2
              ref={compRef}
              className={`section-title${compIn ? ' in-view' : ''}`}
            >
              従来の開発会社との違い
            </h2>
          </div>
          <motion.div
            className={s.tableWrap}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <table className={s.compTable}>
              <thead>
                <tr>
                  <th></th>
                  <th>従来のSI企業</th>
                  <th className={s.thOurs}>当社（AI活用）</th>
                </tr>
              </thead>
              <tbody>
                {AI_DEV_COMPARISON_ROWS.map((row) => (
                  <tr key={row.item}>
                    <th scope="row">{row.item}</th>
                    <td className={s.compBad}>{row.traditional}</td>
                    <td className={s.compGood}>{row.ours}</td>
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
            <span className="section-label">Example Projects</span>
            <h2
              ref={examplesRef}
              className={`section-title${examplesIn ? ' in-view' : ''}`}
            >
              相談できる開発例
            </h2>
            <p className="section-desc">
              業種ごとの小さな業務改善から、複数部門をまたぐ管理システムまで対応します。
            </p>
          </div>
          <motion.div
            className={s.examplesGrid}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {AI_DEV_EXAMPLE_PROJECTS.map((project) => (
              <motion.article
                key={`${project.industry}-${project.title}`}
                className={s.exampleCard}
                variants={reveal}
                whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.08)', borderColor: 'rgba(36,144,243,0.28)' }}
                transition={{ type: 'tween', duration: 0.18 }}
              >
                <div className={s.exampleHead}>
                  <span className={s.exampleIndustry}>{project.industry}</span>
                  <span className={s.exampleDelivery}>{project.delivery}</span>
                </div>
                <h3 className={s.exampleTitle}>{project.title}</h3>
                <p className={s.exampleDesc}>{project.desc}</p>
                <p className={s.exampleQuality}>{project.quality}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Services &amp; Delivery</span>
            <h2
              ref={packagesRef}
              className={`section-title${packagesIn ? ' in-view' : ''}`}
            >
              提供サービス・参考納期
            </h2>
          </div>
          <motion.div
            className={s.pricingGrid}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {AI_DEV_SERVICE_PACKAGES.map((card) => (
              <motion.div
                key={card.title}
                className={s.pricingCard}
                variants={reveal}
                whileHover={{ y: -4, boxShadow: '0 8px 28px rgba(0,0,0,0.09)', borderColor: 'rgba(36,144,243,0.3)' }}
                transition={{ type: 'tween', duration: 0.2 }}
              >
                <h3 className={s.pricingTitle}>{card.title}</h3>
                <p className={s.pricingPrice}>
                  {card.delivery}<span>目安</span>
                </p>
                <ul className={s.pricingItems}>
                  {card.items.map((item) => (
                    <li key={item} className={s.pricingItem}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          <p className={s.pricingNote}>※ 納期は参考目安です。要件・連携先・確認範囲に合わせて調整します。</p>
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
              導入の流れ
            </h2>
          </div>
          <motion.div
            className={s.processSteps}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {AI_DEV_PROCESS_STEPS.map((step, idx) => (
              <motion.div key={step.num} className={s.processStep} variants={reveal}>
                <div className={s.processNum}>{step.num}</div>
                {idx < AI_DEV_PROCESS_STEPS.length - 1 && (
                  <div className={s.processConnector} aria-hidden="true" />
                )}
                <h3 className={s.processTitle}>{step.title}</h3>
                <p className={s.processDesc}>{step.desc}</p>
                {step.badge && <span className={s.processFree}>{step.badge}</span>}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">FAQ</span>
            <h2
              ref={faqRef}
              className={`section-title${faqIn ? ' in-view' : ''}`}
            >
              よくある質問
            </h2>
          </div>
          <motion.div
            className={s.faqList}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            {AI_DEV_FAQ_ITEMS.map((item, i) => (
              <FaqItem key={i} item={item} index={i} />
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
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <h2 className={s.ctaTitle}>まずは開発したい業務をお聞かせください。</h2>
            <p className={s.ctaSub}>短く届けるべき中核機能と、品質確認が必要なポイントを一緒に整理します。</p>
            <Link href="/contact" className="btn btn--orange btn--lg">
              相談を申し込む
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
