import { prisma } from '@/lib/db'
import { AiDevPageClient } from './AiDevPageClient'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'AI活用型受託開発 | HackLab Inc.' }

export default async function AiDevPage() {
  const [problems, solutions, comparisonRows, packages, examples, steps, faqItems] = await prisma.$transaction([
    prisma.aiDevProblem.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.aiDevSolution.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.aiDevComparisonRow.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.aiDevServicePackage.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.aiDevExampleProject.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.aiDevProcessStep.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.aiDevFaqItem.findMany({ orderBy: { sortOrder: 'asc' } }),
  ])
  return (
    <AiDevPageClient
      problems={problems}
      solutions={solutions}
      comparisonRows={comparisonRows}
      packages={packages}
      examples={examples}
      steps={steps}
      faqItems={faqItems}
    />
  )
}
