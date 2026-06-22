import { JOB_OPENINGS, CAREERS_BENEFITS, CAREERS_CULTURE, CAREERS_STEPS } from '@/lib/data'
import { CareersPageClient } from './CareersPageClient'

export const metadata = { title: '採用情報 | HackLab Inc.' }

export default function CareersPage() {
  return (
    <CareersPageClient
      jobs={JOB_OPENINGS}
      culture={CAREERS_CULTURE}
      benefits={CAREERS_BENEFITS}
      steps={CAREERS_STEPS}
    />
  )
}
