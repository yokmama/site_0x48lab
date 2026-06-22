import { WORKS, WORKS_INDUSTRIES, WORKS_SERVICE_FILTERS, WORKS_SERVICE_LABEL_MAP } from '@/lib/data'
import { WorksPageClient } from './WorksPageClient'

export const metadata = { title: '導入実績 | HackLab Inc.' }

export default function WorksPage() {
  const works = WORKS.map((w, i) => ({
    id: i + 1,
    slug: w.slug,
    industry: w.industry,
    service: w.service,
    title: w.title,
    summary: w.summary,
    challenge: w.challenge,
    solution: w.solution,
    tech: w.tech,
    beforePeriod: w.before.period,
    beforeQuality: w.before.quality,
    afterPeriod: w.after.period,
    afterQuality: w.after.quality,
    impact: w.impact,
    link: w.link ?? null,
  }))
  return (
    <WorksPageClient
      works={works}
      industries={WORKS_INDUSTRIES}
      serviceFilters={WORKS_SERVICE_FILTERS}
      serviceLabelMap={WORKS_SERVICE_LABEL_MAP}
    />
  )
}
