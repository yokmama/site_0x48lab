import { prisma } from '@/lib/db'
import { LpPageClient } from './LpPageClient'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'AI活用型受託開発 | HackLab Inc.' }

export default async function LPPage() {
  const [problems, solutions, comparisonRows, pricing, results, faqItems] = await prisma.$transaction([
    prisma.lpProblem.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.lpSolution.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.lpComparisonRow.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.lpPricing.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.lpResult.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.lpFaqItem.findMany({ orderBy: { sortOrder: 'asc' } }),
  ])
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
