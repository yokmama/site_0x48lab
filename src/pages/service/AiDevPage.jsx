import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { reveal, stagger, viewportOnce } from '../../lib/animations'
import s from './AiDevPage.module.css'

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
  return [ref, inView]
}

const PROBLEMS = [
  {
    title: 'コストが高すぎる',
    desc: '見積もりを取ったら500万円以上になり、諦めてしまった。予算内で必要な機能を実現できないか悩んでいる。',
  },
  {
    title: 'ノーコードでは限界がある',
    desc: 'ノーコードツールで自作を試みたが、機能の限界・拡張性のなさで頓挫。本格的なシステムが必要。',
  },
  {
    title: 'エンジニア不足・コスト増加',
    desc: 'エンジニアの採用難・単価高騰で開発コストが年々上昇。外注しても割に合わないと感じている。',
  },
]

const SOLUTIONS = [
  {
    num: '01',
    title: 'コスト1/5〜1/10',
    desc: 'AIが設計・実装・テストを加速し、人件費を大幅削減。削減分をそのままお客様に還元します。',
  },
  {
    num: '02',
    title: '納期最大1/10',
    desc: '数ヶ月かかっていた案件が数週間に。ビジネスのスピードに合わせた開発が実現します。',
  },
  {
    num: '03',
    title: '必要なものだけを作る',
    desc: '大きなパッケージを買わなくていい。最小限のコストで要件にぴったりのシステムを構築します。',
  },
]

const COMPARISON_ROWS = [
  { item: '費用', traditional: '500万円以上', ours: '50万円〜（1/5〜1/10）' },
  { item: '期間', traditional: '3〜6ヶ月', ours: '2〜4週間（最大1/10）' },
  { item: '柔軟性', traditional: '変更に弱い', ours: '小規模イテレーション・低コスト修正' },
  { item: '品質保証', traditional: '手動QAが中心', ours: 'AI＋人間の20年QA知識' },
]

const PRICING = [
  {
    title: '業務管理システム',
    price: '¥500,000',
    items: ['CRM・顧客管理', '案件・プロジェクト管理', '営業パイプライン管理'],
  },
  {
    title: '予約・顧客対応システム',
    price: '¥800,000',
    items: ['予約管理', 'LINE連携', '自動返信・通知'],
  },
  {
    title: '業務効率化・自動化',
    price: '¥300,000',
    items: ['データ入力自動化', 'レポート自動生成', '社内業務の効率化'],
  },
]

const PROCESS_STEPS = [
  { num: '1', title: 'ヒアリング（無料）', desc: '課題・要件をお伺いします。オンライン30分、無料です。', free: true },
  { num: '2', title: '設計・見積もり（無料）', desc: '機能の整理とコスト・納期をご提示。ここまで費用なし。', free: true },
  { num: '3', title: '開発', desc: 'AI×20年の経験で高速・高品質に開発。進捗を随時共有。', free: false },
  { num: '4', title: '納品・運用', desc: '検証後に納品。修正・機能追加も低コストで継続対応。', free: false },
]

const FAQ_ITEMS = [
  {
    q: 'なぜこんなに安くできるのですか？',
    a: 'AIが設計・実装・テストの工数を大幅に削減するため、従来比1/5〜1/10のコストが実現できます。その削減分をそのままお客様に還元しています。',
  },
  {
    q: '品質は大丈夫ですか？',
    a: '20年の設計・検証ノウハウを持つシニアエンジニアがAIの出力をすべてレビューします。AI任せにせず、人間の経験と組み合わせることで高品質を担保しています。',
  },
  {
    q: 'AIを使うことで安全性は問題ありませんか？',
    a: 'AIはあくまでもツールです。要件定義・設計・QAはすべて人間が主導します。機密情報はAIに入力しない運用ルールを徹底しています。',
  },
  {
    q: '納期はどのくらいですか？',
    a: '規模によりますが、標準的なシステムで2〜4週間を想定しています。従来の開発と比べて最大1/10の期間で納品が可能です。',
  },
  {
    q: '納品後のサポートはありますか？',
    a: 'はい。修正・機能追加も低コストで対応します。継続的なサポートも承りますのでご相談ください。',
  },
  {
    q: 'どんな業種・業態でも対応できますか？',
    a: '製造業・サービス業・小売・卸売など多様な業種の実績があります。業種・規模を問わず、まずはお気軽にご相談ください。',
  },
]

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
  const [priceRef, priceIn] = useTitleInView()
  const [processRef, processIn] = useTitleInView()
  const [faqRef, faqIn] = useTitleInView()

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="page-hero-label">AI-Powered Development</span>
            <h1 className="page-hero-title">AI活用型受託開発</h1>
            <p className="page-hero-sub">20年の開発実績×生成AIで、コスト1/5〜1/10・納期最大1/10を実現。</p>
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
            {PROBLEMS.map((p) => (
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
              AIの進化がシステム開発のパラダイムを変えました。20年の設計ノウハウ × AIの生産性 ＝ コスト1/5〜1/10、納期1/10が現実になっています。
            </p>
          </div>
          <motion.div
            className={s.solutionGrid}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {SOLUTIONS.map((item) => (
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
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
                {COMPARISON_ROWS.map((row) => (
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
            <span className="section-label">Services &amp; Pricing</span>
            <h2
              ref={priceRef}
              className={`section-title${priceIn ? ' in-view' : ''}`}
            >
              提供サービス・参考価格
            </h2>
          </div>
          <motion.div
            className={s.pricingGrid}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {PRICING.map((card) => (
              <motion.div
                key={card.title}
                className={s.pricingCard}
                variants={reveal}
                whileHover={{ y: -4, boxShadow: '0 8px 28px rgba(0,0,0,0.09)', borderColor: 'rgba(36,144,243,0.3)' }}
                transition={{ type: 'tween', duration: 0.2 }}
              >
                <h3 className={s.pricingTitle}>{card.title}</h3>
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
          <p className={s.pricingNote}>※ 価格は参考価格です。要件に合わせてお見積もりします。</p>
        </div>
      </section>

      <section className="section section--alt">
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
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div key={step.num} className={s.processStep} variants={reveal}>
                <div className={s.processNum}>{step.num}</div>
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className={s.processConnector} aria-hidden="true" />
                )}
                <h3 className={s.processTitle}>{step.title}</h3>
                <p className={s.processDesc}>{step.desc}</p>
                {step.free && <span className={s.processFree}>無料</span>}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section">
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
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {FAQ_ITEMS.map((item, i) => (
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
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className={s.ctaTitle}>まずは無料相談から。</h2>
            <p className={s.ctaSub}>ヒアリング・簡易見積もりまで費用はかかりません。お気軽にご相談ください。</p>
            <Link to="/contact" className="btn btn--orange btn--lg">
              無料相談を申し込む
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
