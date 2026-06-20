import Link from 'next/link'
import {
  AI_DEV_EXAMPLE_PROJECTS,
  AI_DEV_FAQ_ITEMS,
  AI_DEV_FIT_ITEMS,
  AI_DEV_LIMIT_ITEMS,
  AI_DEV_PROCESS_STEPS,
  AI_DEV_SERVICE_PACKAGES,
  AI_DEV_TRUST_ITEMS,
} from '@/lib/data'
import { getExampleVisual } from '@/lib/projectVisuals'
import s from './HomeDecisionSupport.module.css'

const featuredExamples = AI_DEV_EXAMPLE_PROJECTS.slice(0, 6)
const featuredFaq = AI_DEV_FAQ_ITEMS.slice(0, 4)

export default function HomeDecisionSupport() {
  return (
    <section className={`section ${s.section}`} aria-labelledby="decision-title">
      <div className="container">
        <div className={s.headerGrid}>
          <div>
            <span className="section-label">Decision Support</span>
            <h2 id="decision-title" className={s.title}>
              問い合わせ前に、判断材料を揃える。
            </h2>
          </div>
          <p className={s.lead}>
            日本のBtoB検討では、面談前に候補を絞ることが一般的です。費用・納期・安全性・進め方を先に確認できるよう、匿名の課題と成果を中心に整理しています。
          </p>
        </div>

        <div className={s.examplesBlock}>
          <div className={s.blockHead}>
            <h3>業種別の相談例</h3>
            <Link href="/services/ai-development#examples">すべて見る</Link>
          </div>
          <div className={s.exampleGrid}>
            {featuredExamples.map((item) => (
              <article key={`${item.industry}-${item.title}`} className={s.exampleCard}>
                <div className={s.exampleVisual} style={{ backgroundImage: `url(${getExampleVisual(item)})` }} aria-hidden="true" />
                <div className={s.cardMeta}>
                  <span>{item.industry}</span>
                  <strong>{item.delivery}</strong>
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
                <small>{item.quality}</small>
              </article>
            ))}
          </div>
        </div>

        <div id="pricing" className={s.infoGrid}>
          <div className={s.infoPanel}>
            <div className={s.blockHead}>
              <h3>料金・納期の目安</h3>
              <Link href="/services/ai-development#pricing">詳細を見る</Link>
            </div>
            <div className={s.packageList}>
              {AI_DEV_SERVICE_PACKAGES.map((item) => (
                <div key={item.title} className={s.packageItem}>
                  <span>{item.title}</span>
                  <strong>{item.delivery}</strong>
                </div>
              ))}
            </div>
            <p className={s.panelNote}>最初から大きく作り込まず、現場で使う中核機能から段階的に開発します。</p>
          </div>

          <div className={s.infoPanel}>
            <div className={s.blockHead}>
              <h3>セキュリティ・AI利用方針</h3>
              <Link href="/services/ai-development#trust">確認する</Link>
            </div>
            <div className={s.trustList}>
              {AI_DEV_TRUST_ITEMS.map((item) => (
                <article key={item.title}>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

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

        <div id="process" className={s.processBlock}>
          <div className={s.blockHead}>
            <h3>導入の流れ</h3>
            <Link href="/services/ai-development#process">詳しく見る</Link>
          </div>
          <ol className={s.processList}>
            {AI_DEV_PROCESS_STEPS.map((step) => (
              <li key={step.num}>
                <span>{step.num}</span>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div id="faq" className={s.faqBlock}>
          <div className={s.blockHead}>
            <h3>よくある質問</h3>
            <Link href="/services/ai-development#faq">FAQを見る</Link>
          </div>
          <div className={s.faqGrid}>
            {featuredFaq.map((item) => (
              <article key={item.q} className={s.faqItem}>
                <h4>{item.q}</h4>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
        </div>

        <div className={s.ctaBand}>
          <div>
            <h3>まずは開発したい業務をお聞かせください。</h3>
            <p>ヒアリングと簡易見積もりまで無料です。機密情報はNDA締結後に扱えます。</p>
          </div>
          <Link href="/contact?topic=ai-development" className="btn btn--orange btn--lg">
            無料相談する
          </Link>
        </div>
      </div>
    </section>
  )
}
