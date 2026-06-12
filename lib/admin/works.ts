const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const SERVICE_VALUES = ['ai-development', 'mobile', 'web', 'edtech', 'iot'] as const

export type WorkInput = {
  slug: string
  industry: string
  service: string
  title: string
  summary: string
  challenge: string
  solution: string
  tech: string[]
  beforePeriod: string
  beforeQuality: string
  afterPeriod: string
  afterQuality: string
  impact: string
  link: string
  published: boolean
  sortOrder: number
}

export type WorkErrors = Partial<Record<keyof WorkInput, string>>

export function normalizeWork(input: unknown): WorkInput | null {
  if (!input || typeof input !== 'object') return null
  const r = input as Record<string, unknown>
  return {
    slug: typeof r.slug === 'string' ? r.slug.trim().slice(0, 100) : '',
    industry: typeof r.industry === 'string' ? r.industry.trim().slice(0, 100) : '',
    service: typeof r.service === 'string' ? r.service.trim() : '',
    title: typeof r.title === 'string' ? r.title.trim().slice(0, 200) : '',
    summary: typeof r.summary === 'string' ? r.summary.trim() : '',
    challenge: typeof r.challenge === 'string' ? r.challenge.trim() : '',
    solution: typeof r.solution === 'string' ? r.solution.trim() : '',
    tech: Array.isArray(r.tech) ? (r.tech as unknown[]).filter(t => typeof t === 'string').map(t => (t as string).trim()).filter(Boolean) : [],
    beforePeriod: typeof r.beforePeriod === 'string' ? r.beforePeriod.trim().slice(0, 100) : '',
    beforeQuality: typeof r.beforeQuality === 'string' ? r.beforeQuality.trim().slice(0, 200) : '',
    afterPeriod: typeof r.afterPeriod === 'string' ? r.afterPeriod.trim().slice(0, 100) : '',
    afterQuality: typeof r.afterQuality === 'string' ? r.afterQuality.trim().slice(0, 200) : '',
    impact: typeof r.impact === 'string' ? r.impact.trim().slice(0, 200) : '',
    link: typeof r.link === 'string' ? r.link.trim().slice(0, 500) : '',
    published: typeof r.published === 'boolean' ? r.published : true,
    sortOrder: typeof r.sortOrder === 'number' ? Math.floor(r.sortOrder) : 0,
  }
}

export function validateWork(input: WorkInput): WorkErrors {
  const errors: WorkErrors = {}
  if (!input.slug) errors.slug = 'スラッグを入力してください'
  else if (!slugPattern.test(input.slug)) errors.slug = 'スラッグは小文字英数字とハイフンのみ使用できます'
  if (!input.industry.trim()) errors.industry = '業種を入力してください'
  if (!input.service || !SERVICE_VALUES.includes(input.service as typeof SERVICE_VALUES[number]))
    errors.service = 'サービスを選択してください'
  if (!input.title.trim()) errors.title = 'タイトルを入力してください'
  if (!input.summary.trim()) errors.summary = '概要を入力してください'
  if (!input.challenge.trim()) errors.challenge = '課題を入力してください'
  if (!input.solution.trim()) errors.solution = '解決策を入力してください'
  if (input.tech.length === 0) errors.tech = '技術スタックを1つ以上入力してください'
  if (!input.beforePeriod.trim()) errors.beforePeriod = '導入前の期間を入力してください'
  if (!input.beforeQuality.trim()) errors.beforeQuality = '導入前の品質を入力してください'
  if (!input.afterPeriod.trim()) errors.afterPeriod = '導入後の期間を入力してください'
  if (!input.afterQuality.trim()) errors.afterQuality = '導入後の品質を入力してください'
  if (!input.impact.trim()) errors.impact = '成果を入力してください'
  return errors
}
