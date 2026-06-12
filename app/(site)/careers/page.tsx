import { prisma } from '@/lib/db'
import { CAREERS_BENEFITS, CAREERS_CULTURE, CAREERS_STEPS } from '@/lib/data'
import { CareersPageClient } from './CareersPageClient'

export const dynamic = 'force-dynamic'
export const metadata = { title: '採用情報 | HackLab Inc.' }

export default async function CareersPage() {
  const jobs = await prisma.jobOpening.findMany({
    where: { published: true },
    orderBy: { sortOrder: 'asc' },
  })
  return <CareersPageClient jobs={jobs} culture={CAREERS_CULTURE} benefits={CAREERS_BENEFITS} steps={CAREERS_STEPS} />
}
