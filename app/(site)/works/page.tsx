import { prisma } from '@/lib/db'
import { WORKS_INDUSTRIES, WORKS_SERVICE_FILTERS, WORKS_SERVICE_LABEL_MAP } from '@/lib/data'
import { WorksPageClient } from './WorksPageClient'

export const dynamic = 'force-dynamic'
export const metadata = { title: '導入実績 | HackLab Inc.' }

export default async function WorksPage() {
  const works = await prisma.work.findMany({
    where: { published: true },
    orderBy: { sortOrder: 'asc' },
  })
  return (
    <WorksPageClient
      works={works}
      industries={WORKS_INDUSTRIES}
      serviceFilters={WORKS_SERVICE_FILTERS}
      serviceLabelMap={WORKS_SERVICE_LABEL_MAP}
    />
  )
}
