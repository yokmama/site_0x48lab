'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import ContactForm from '@/components/ContactForm/ContactForm'
import { AI_DEV_FIT_ITEMS, AI_DEV_LIMIT_ITEMS, AI_DEV_TRUST_ITEMS } from '@/lib/data'
import { getExampleVisual } from '@/lib/projectVisuals'
import s from './page.module.css'

type LpProblem = { id: number; text: string }
type LpSolution = { id: number; num: string; title: string; desc: string }
type LpComparisonRow = { id: number; item: string; traditional: string; ours: string }
type LpPricing = { id: number; title: string; price: string; fromPrice: boolean; items: string[] }
type LpResult = { id: number; industry: string; title: string; beforeCost: string; beforePeriod: string; afterCost: string; afterPeriod: string; saving: string }
type LpFaqItem = { id: number; q: string; a: string }

type LpPageProps = {
  problems: LpProblem[]
  solutions: LpSolution[]
  comparisonRows: LpComparisonRow[]
  pricing: LpPricing[]
  results: LpResult[]
  faqItems: LpFaqItem[]
}

const logoSrc = '/assets/logo.svg'
const representativeImg = '/assets/representative.jpg'

/* ─── Helpers ──────────────────────────────────────────────── */
function useSectionTitle() {
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

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

function scrollToContact() {
  document.getElementById('lp-contact')?.scrollIntoView({ behavior: 'smooth' })
}

/* ─── Sub-components ────────────────────────────────────────── */
function FaqItem({ item, index }) {
  const [open, setOpen] = useState(index === 0)
  return (
    <div className={s.faqItem}>
      <button
        className={s.faqQuestion}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className={s.faqLabel}>Q</span>
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

/* ─── Page ──────────────────────────────────────────────────── */
export function LpPageClient({ problems, solutions, comparisonRows, pricing, results, faqItems }: LpPageProps) {
  const LP_PROBLEMS = problems
  const LP_SOLUTIONS = solutions
  const LP_COMPARISON_ROWS = comparisonRows
  const LP_PRICING = pricing
  const LP_RESULTS = results
  const LP_FAQ_ITEMS = faqItems

  const [problemsRef, problemsIn] = useSectionTitle()
  const [solutionRef, solutionIn] = useSectionTitle()
  const [compRef, compIn] = useSectionTitle()
  const [pricingRef, pricingIn] = useSectionTitle()
  const [trustRef, trustIn] = useSectionTitle()
  const [resultsRef, resultsIn] = useSectionTitle()
  const [messageRef, messageIn] = useSectionTitle()
  const [processRef, processIn] = useSectionTitle()
  const [faqRef, faqIn] = useSectionTitle()
  const [contactRef, contactIn] = useSectionTitle()

  return (
    <div className={s.page}>

      {/* ── LP Header ── */}
      <header className={s.lpHeader}>
        <div className={s.lpHeaderInner}>
          <Link href="/" className={s.lpLogo}>
            <img src={logoSrc} alt="株式会社ハックラボ" />
          </Link>
          <button className={s.lpHeaderCta} onClick={scrollToContact}>
            無料相談する
          </button>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className={s.hero}>
        <div className={s.heroInner}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }}
          >
            <motion.span className={s.heroLabel} variants={reveal}>
              2010年創業の開発経験 × 生成AI
            </motion.span>
            <motion.h1 className={s.heroTitle} variants={reveal}>
              AIで業務システム開発を、<br />
              <em>短く、確実に。</em>
            </motion.h1>
            <motion.p className={s.heroCatch} variants={reveal}>
              生成AIと2010年創業の開発経験を組み合わせ、業務管理・予約・自動化システムを2〜4週間単位で段階導入。<br />
              AI任せにせず、シニアエンジニアが設計・実装・QAを確認します。
            </motion.p>
            <motion.div className={s.heroStats} variants={reveal}>
              {[
                { num: '2010年', label: '創業' },
                { num: '300+', label: 'プロジェクト' },
                { num: '2〜4週間', label: '段階リリース目安' },
              ].map((stat) => (
                <div key={stat.label} className={s.heroStat}>
                  <p className={s.heroStatNum}>{stat.num}</p>
                  <p className={s.heroStatLabel}>{stat.label}</p>
                </div>
              ))}
            </motion.div>
            <motion.div variants={reveal}>
              <button className={s.heroCta} onClick={scrollToContact}>
                まずは無料相談する
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Problems ── */}
      <section className={s.section}>
        <div className={s.inner}>
          <div className={s.sectionHeader}>
            <span className={s.sectionLabel}>Problems</span>
            <h2
              ref={problemsRef}
              className={`${s.sectionTitle}${problemsIn ? ` ${s.inView}` : ''}`}
            >
              こんな経験、ありませんか？
            </h2>
          </div>
          <motion.div
            className={s.problemGrid}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {LP_PROBLEMS.map((problem, i) => (
              <motion.div key={i} className={s.problemCard} variants={reveal}>
                <div className={s.problemIcon}>
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M15 5L5 15M5 5l10 10" />
                  </svg>
                </div>
                <p className={s.problemText}>{problem.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Solution ── */}
      <section className={s.sectionAlt}>
        <div className={s.inner}>
          <div className={s.sectionHeader}>
            <span className={s.sectionLabel}>Solution</span>
            <h2
              ref={solutionRef}
              className={`${s.sectionTitle}${solutionIn ? ` ${s.inView}` : ''}`}
            >
              その課題、今なら解決できます。
            </h2>
          </div>
          <motion.p
            className={s.solutionLead}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            AIの進化がシステム開発の進め方を変えました。生成AIの生産性とシニアレビューを組み合わせ、短い単位で確認しながら業務システムを段階導入します。
          </motion.p>
          <motion.div
            className={s.solutionGrid}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {LP_SOLUTIONS.map((item) => (
              <motion.div key={item.num} className={s.solutionCard} variants={reveal}
                whileHover={{ y: -4, boxShadow: '0 8px 28px rgba(0,0,0,0.09)', borderColor: 'rgba(36,144,243,0.3)' }}
                transition={{ type: 'tween', duration: 0.2 }}
              >
                <span className={s.solutionNum}>{item.num}</span>
                <h3 className={s.solutionCardTitle}>{item.title}</h3>
                <p className={s.solutionCardDesc}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Comparison ── */}
      <section className={s.section}>
        <div className={s.inner}>
          <div className={s.sectionHeader}>
            <span className={s.sectionLabel}>Comparison</span>
            <h2
              ref={compRef}
              className={`${s.sectionTitle}${compIn ? ` ${s.inView}` : ''}`}
            >
              従来の開発会社との違い
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <table className={s.comparisonTable}>
              <thead>
                <tr>
                  <th></th>
                  <th>従来のSI企業</th>
                  <th>当社（AI活用）</th>
                </tr>
              </thead>
              <tbody>
                {LP_COMPARISON_ROWS.map((row) => (
                  <tr key={row.item}>
                    <th scope="row">{row.item}</th>
                    <td className={s.compBad}>{row.traditional}</td>
                    <td>{row.ours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className={s.sectionAlt}>
        <div className={s.inner}>
          <div className={s.sectionHeader}>
            <span className={s.sectionLabel}>Services &amp; Pricing</span>
            <h2
              ref={pricingRef}
              className={`${s.sectionTitle}${pricingIn ? ` ${s.inView}` : ''}`}
            >
              提供サービス
            </h2>
          </div>
          <motion.div
            className={s.pricingGrid}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {LP_PRICING.map((card) => (
              <motion.div key={card.title} className={s.pricingCard} variants={reveal}
                whileHover={{ y: -4, boxShadow: '0 8px 28px rgba(0,0,0,0.09)', borderColor: 'rgba(36,144,243,0.3)' }}
                transition={{ type: 'tween', duration: 0.2 }}
              >
                <h3 className={s.pricingCardTitle}>{card.title}</h3>
                <p className={s.pricingPrice}>
                  {card.price}<span>〜（税別）</span>
                </p>
                <ul className={s.pricingItems}>
                  {card.items.map((item) => (
                    <li key={item} className={s.pricingItem}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          <p style={{ marginTop: 20, fontSize: 12, color: 'var(--color-body-light)', textAlign: 'center' }}>
            ※ 価格は参考価格です。要件に合わせてお見積もりします。
          </p>
        </div>
      </section>

      {/* ── Trust ── */}
      <section className={s.section} id="lp-trust">
        <div className={s.inner}>
          <div className={s.sectionHeader}>
            <span className={s.sectionLabel}>Trust &amp; Security</span>
            <h2
              ref={trustRef}
              className={`${s.sectionTitle}${trustIn ? ` ${s.inView}` : ''}`}
            >
              AI利用・機密情報・納品範囲を明確にします
            </h2>
          </div>
          <motion.div
            className={s.trustGrid}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {AI_DEV_TRUST_ITEMS.map((item) => (
              <motion.article key={item.title} className={s.trustCard} variants={reveal}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.article>
            ))}
          </motion.div>
          <div className={s.fitGrid}>
            <div className={s.fitCard}>
              <h3>相談しやすい内容</h3>
              <ul>
                {AI_DEV_FIT_ITEMS.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className={s.fitCard}>
              <h3>向かない進め方</h3>
              <ul>
                {AI_DEV_LIMIT_ITEMS.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Results ── */}
      <section className={s.section}>
        <div className={s.inner}>
          <div className={s.sectionHeader}>
            <span className={s.sectionLabel}>Results</span>
            <h2
              ref={resultsRef}
              className={`${s.sectionTitle}${resultsIn ? ` ${s.inView}` : ''}`}
            >
              導入実績
            </h2>
          </div>
          <motion.div
            className={s.resultsGrid}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {LP_RESULTS.map((r) => (
              <motion.div key={r.title} className={s.resultCard} variants={reveal}>
                <div className={s.resultVisual} style={{ backgroundImage: `url(${getExampleVisual(r)})` }} aria-hidden="true" />
                <p className={s.resultIndustry}>{r.industry}</p>
                <p className={s.resultTitle}>{r.title}</p>
                <div className={s.resultCompare}>
                  <div className={s.resultBefore}>
                    <p className={s.resultCompareLabel}>従来</p>
                    <p className={s.resultCompareVal}>{r.beforeCost}</p>
                    <p className={s.resultCompareVal} style={{ fontSize: 12, fontWeight: 400, color: 'var(--color-body-light)' }}>{r.beforePeriod}</p>
                  </div>
                  <div className={s.resultAfter}>
                    <p className={s.resultCompareLabel}>当社</p>
                    <p className={s.resultCompareVal}>{r.afterCost}</p>
                    <p className={s.resultCompareVal} style={{ fontSize: 12, fontWeight: 400, color: 'var(--color-accent)' }}>{r.afterPeriod}</p>
                  </div>
                </div>
                <span className={s.resultSaving}>{r.saving}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CEO Message ── */}
      <section className={s.sectionAlt}>
        <div className={s.inner}>
          <div className={s.sectionHeader}>
            <span className={s.sectionLabel}>Message</span>
            <h2
              ref={messageRef}
              className={`${s.sectionTitle}${messageIn ? ` ${s.inView}` : ''}`}
            >
              代表メッセージ
            </h2>
          </div>
          <motion.div
            className={s.message}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className={s.messagePhoto}>
              <img src={representativeImg} alt="寺園聖文" />
            </div>
            <div className={s.messageBody}>
              <p className={s.messageName}>寺園 聖文</p>
              <p className={s.messageRole}>代表取締役 CEO</p>
              <p className={s.messageText}>
                2010年の創業以来、Webシステム・モバイル・業務システムと数百件のプロジェクトを手がけてきました。
                AIの進化によって、要件整理・設計・実装補助の進め方は大きく変わりました。人の設計判断とQAを組み合わせるからこそ、AIを実務で安全に活用できます。
                「費用が高くて諦めた」というシステムをぜひご相談ください。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className={s.section}>
        <div className={s.inner}>
          <div className={s.sectionHeader}>
            <span className={s.sectionLabel}>Process</span>
            <h2
              ref={processRef}
              className={`${s.sectionTitle}${processIn ? ` ${s.inView}` : ''}`}
            >
              導入の流れ
            </h2>
          </div>
          <motion.div
            className={s.processSteps}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {[
              { num: '1', title: 'ヒアリング', desc: '課題・要件をお伺いします。オンライン30分、無料。', free: true },
              { num: '2', title: '簡易設計・見積もり', desc: '機能の整理とコスト・納期をご提示。ここまで無料。', free: true },
              { num: '3', title: '開発', desc: 'AI＋経験豊富なエンジニアで開発。進捗を随時報告。', free: false },
              { num: '4', title: '納品・運用開始', desc: '検証後に納品。修正・機能追加も低コストで対応。', free: false },
            ].map((step) => (
              <motion.div key={step.num} className={s.processStep} variants={reveal}>
                <div className={s.processNum}>{step.num}</div>
                <h3 className={s.processStepTitle}>{step.title}</h3>
                <p className={s.processStepDesc}>{step.desc}</p>
                {step.free && <span className={s.processFree}>無料</span>}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className={s.sectionAlt}>
        <div className={s.inner}>
          <div className={s.sectionHeader}>
            <span className={s.sectionLabel}>FAQ</span>
            <h2
              ref={faqRef}
              className={`${s.sectionTitle}${faqIn ? ` ${s.inView}` : ''}`}
            >
              よくある質問
            </h2>
          </div>
          <motion.div
            className={s.faqList}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            {LP_FAQ_ITEMS.map((item, i) => (
              <FaqItem key={i} item={item} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className={s.sectionDark} id="lp-contact">
        <div className={s.inner}>
          <div className={s.sectionHeader}>
            <span className={`${s.sectionLabel} ${s.sectionLabelDark}`}>Contact</span>
            <h2
              ref={contactRef}
              className={`${s.sectionTitle} ${s.sectionTitleDark}${contactIn ? ` ${s.inView}` : ''}`}
            >
              無料相談・お問い合わせ
            </h2>
            <p style={{ marginTop: 14, fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8 }}>
              まずはお気軽にご相談ください。ヒアリング・簡易見積もりまで無料です。
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <ContactForm dark />
          </motion.div>
        </div>
      </section>

      {/* ── LP Footer ── */}
      <footer className={s.lpFooter}>
        <p className={s.lpFooterText}>
          © 2025 株式会社ハックラボ All Rights Reserved.&ensp;|&ensp;
          <Link href="/" style={{ color: 'rgba(255,255,255,0.3)' }}>メインサイトへ</Link>
        </p>
      </footer>
    </div>
  )
}
