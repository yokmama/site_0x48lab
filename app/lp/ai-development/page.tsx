import {
  LP_PROBLEMS,
  LP_SOLUTIONS,
  LP_COMPARISON_ROWS,
  LP_PRICING,
  LP_RESULTS,
  LP_FAQ_ITEMS,
} from '@/lib/data'
import { LpPageClient } from './LpPageClient'

export const metadata = { title: 'AI活用型受託開発 | HackLab Inc.' }

export default function LPPage() {
  const problems = LP_PROBLEMS.map((text, i) => ({ id: i + 1, text }))
  const solutions = LP_SOLUTIONS.map((s, i) => ({ id: i + 1, ...s }))
  const comparisonRows = LP_COMPARISON_ROWS.map((r, i) => ({ id: i + 1, ...r }))
  const pricing = LP_PRICING.map((p, i) => ({
    id: i + 1,
    title: p.title,
    price: p.price,
    fromPrice: p.from,
    items: p.items,
  }))
  const results = LP_RESULTS.map((r, i) => ({
    id: i + 1,
    industry: r.industry,
    title: r.title,
    beforeCost: r.before.cost,
    beforePeriod: r.before.period,
    afterCost: r.after.cost,
    afterPeriod: r.after.period,
    saving: r.saving,
  }))
  const faqItems = LP_FAQ_ITEMS.map((f, i) => ({ id: i + 1, ...f }))
  return (
    <LpPageClient
      problems={problems}
      solutions={solutions}
      comparisonRows={comparisonRows}
      pricing={pricing}
      results={results}
      faqItems={faqItems}
    />
  )
}
