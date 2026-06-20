export const VISUAL_ASSETS = {
  consulting: '/assets/bg-consulting-workflow.png',
  software: '/assets/bg-software-delivery.png',
  education: '/assets/bg-programming-classroom.png',
} as const

const workVisualsBySlug: Record<string, string> = {
  'ai-edu-platform': VISUAL_ASSETS.education,
  'online-lesson-tool': VISUAL_ASSETS.education,
  'line-booking-system': VISUAL_ASSETS.software,
  '3d-scan-system': VISUAL_ASSETS.software,
  'ai-pose-detection': VISUAL_ASSETS.software,
  'payment-app': VISUAL_ASSETS.software,
  'video-streaming-app': VISUAL_ASSETS.software,
  'iot-smarthome-app': VISUAL_ASSETS.software,
  'healthcare-ble-app': VISUAL_ASSETS.software,
  'blockchain-management': VISUAL_ASSETS.software,
  'child-safety-app': VISUAL_ASSETS.software,
  'salesforce-ec-site': VISUAL_ASSETS.software,
}

export function getWorkVisual(work: { slug?: string; service?: string; industry?: string }) {
  if (work.slug && workVisualsBySlug[work.slug]) return workVisualsBySlug[work.slug]
  if (work.service === 'edtech' || work.industry?.includes('教育')) return VISUAL_ASSETS.education
  return VISUAL_ASSETS.software
}

export function getExampleVisual(project: { industry?: string; title?: string }) {
  const industry = project.industry ?? ''
  const title = project.title ?? ''
  if (industry.includes('教育') || title.includes('受講')) return VISUAL_ASSETS.education
  if (industry.includes('製造') || industry.includes('建設') || industry.includes('物流')) {
    return VISUAL_ASSETS.consulting
  }
  return VISUAL_ASSETS.software
}

export function getServiceVisual(slug: string) {
  if (slug === 'education') return VISUAL_ASSETS.education
  if (slug === 'mobile' || slug === 'web') return VISUAL_ASSETS.software
  return VISUAL_ASSETS.consulting
}
