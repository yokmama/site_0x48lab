// ── Problems ─────────────────────────────────────────────────

export type AiDevProblemInput = { title: string; desc: string; sortOrder: number }
export type AiDevProblemErrors = Partial<Record<keyof AiDevProblemInput, string>>

export function normalizeAiDevProblem(input: unknown): AiDevProblemInput | null {
  if (!input || typeof input !== 'object') return null
  const r = input as Record<string, unknown>
  return {
    title: typeof r.title === 'string' ? r.title.trim().slice(0, 200) : '',
    desc: typeof r.desc === 'string' ? r.desc.trim() : '',
    sortOrder: typeof r.sortOrder === 'number' ? Math.floor(r.sortOrder) : 0,
  }
}

export function validateAiDevProblem(input: AiDevProblemInput): AiDevProblemErrors {
  const errors: AiDevProblemErrors = {}
  if (!input.title.trim()) errors.title = 'タイトルを入力してください'
  if (!input.desc.trim()) errors.desc = '説明を入力してください'
  return errors
}

// ── Solutions ─────────────────────────────────────────────────

export type AiDevSolutionInput = { num: string; title: string; desc: string; sortOrder: number }
export type AiDevSolutionErrors = Partial<Record<keyof AiDevSolutionInput, string>>

export function normalizeAiDevSolution(input: unknown): AiDevSolutionInput | null {
  if (!input || typeof input !== 'object') return null
  const r = input as Record<string, unknown>
  return {
    num: typeof r.num === 'string' ? r.num.trim().slice(0, 10) : '',
    title: typeof r.title === 'string' ? r.title.trim().slice(0, 200) : '',
    desc: typeof r.desc === 'string' ? r.desc.trim() : '',
    sortOrder: typeof r.sortOrder === 'number' ? Math.floor(r.sortOrder) : 0,
  }
}

export function validateAiDevSolution(input: AiDevSolutionInput): AiDevSolutionErrors {
  const errors: AiDevSolutionErrors = {}
  if (!input.num.trim()) errors.num = '番号を入力してください'
  if (!input.title.trim()) errors.title = 'タイトルを入力してください'
  if (!input.desc.trim()) errors.desc = '説明を入力してください'
  return errors
}

// ── Comparison Rows ───────────────────────────────────────────

export type AiDevComparisonRowInput = { item: string; traditional: string; ours: string; sortOrder: number }
export type AiDevComparisonRowErrors = Partial<Record<keyof AiDevComparisonRowInput, string>>

export function normalizeAiDevComparisonRow(input: unknown): AiDevComparisonRowInput | null {
  if (!input || typeof input !== 'object') return null
  const r = input as Record<string, unknown>
  return {
    item: typeof r.item === 'string' ? r.item.trim().slice(0, 100) : '',
    traditional: typeof r.traditional === 'string' ? r.traditional.trim().slice(0, 200) : '',
    ours: typeof r.ours === 'string' ? r.ours.trim().slice(0, 200) : '',
    sortOrder: typeof r.sortOrder === 'number' ? Math.floor(r.sortOrder) : 0,
  }
}

export function validateAiDevComparisonRow(input: AiDevComparisonRowInput): AiDevComparisonRowErrors {
  const errors: AiDevComparisonRowErrors = {}
  if (!input.item.trim()) errors.item = '項目を入力してください'
  if (!input.traditional.trim()) errors.traditional = '従来の方法を入力してください'
  if (!input.ours.trim()) errors.ours = '当社の方法を入力してください'
  return errors
}

// ── Service Packages ──────────────────────────────────────────

export type AiDevServicePackageInput = { title: string; delivery: string; items: string[]; sortOrder: number }
export type AiDevServicePackageErrors = Partial<Record<keyof AiDevServicePackageInput, string>>

export function normalizeAiDevServicePackage(input: unknown): AiDevServicePackageInput | null {
  if (!input || typeof input !== 'object') return null
  const r = input as Record<string, unknown>
  return {
    title: typeof r.title === 'string' ? r.title.trim().slice(0, 200) : '',
    delivery: typeof r.delivery === 'string' ? r.delivery.trim().slice(0, 100) : '',
    items: Array.isArray(r.items) ? (r.items as unknown[]).filter(i => typeof i === 'string').map(i => (i as string).trim()).filter(Boolean) : [],
    sortOrder: typeof r.sortOrder === 'number' ? Math.floor(r.sortOrder) : 0,
  }
}

export function validateAiDevServicePackage(input: AiDevServicePackageInput): AiDevServicePackageErrors {
  const errors: AiDevServicePackageErrors = {}
  if (!input.title.trim()) errors.title = 'タイトルを入力してください'
  if (!input.delivery.trim()) errors.delivery = '納期を入力してください'
  if (input.items.length === 0) errors.items = '機能を1つ以上入力してください'
  return errors
}

// ── Example Projects ──────────────────────────────────────────

export type AiDevExampleProjectInput = { industry: string; title: string; delivery: string; quality: string; desc: string; sortOrder: number }
export type AiDevExampleProjectErrors = Partial<Record<keyof AiDevExampleProjectInput, string>>

export function normalizeAiDevExampleProject(input: unknown): AiDevExampleProjectInput | null {
  if (!input || typeof input !== 'object') return null
  const r = input as Record<string, unknown>
  return {
    industry: typeof r.industry === 'string' ? r.industry.trim().slice(0, 100) : '',
    title: typeof r.title === 'string' ? r.title.trim().slice(0, 200) : '',
    delivery: typeof r.delivery === 'string' ? r.delivery.trim().slice(0, 50) : '',
    quality: typeof r.quality === 'string' ? r.quality.trim().slice(0, 200) : '',
    desc: typeof r.desc === 'string' ? r.desc.trim() : '',
    sortOrder: typeof r.sortOrder === 'number' ? Math.floor(r.sortOrder) : 0,
  }
}

export function validateAiDevExampleProject(input: AiDevExampleProjectInput): AiDevExampleProjectErrors {
  const errors: AiDevExampleProjectErrors = {}
  if (!input.industry.trim()) errors.industry = '業種を入力してください'
  if (!input.title.trim()) errors.title = 'タイトルを入力してください'
  if (!input.delivery.trim()) errors.delivery = '納期を入力してください'
  if (!input.quality.trim()) errors.quality = '品質ポイントを入力してください'
  if (!input.desc.trim()) errors.desc = '説明を入力してください'
  return errors
}

// ── Process Steps ─────────────────────────────────────────────

export type AiDevProcessStepInput = { num: string; title: string; desc: string; badge: string; sortOrder: number }
export type AiDevProcessStepErrors = Partial<Record<keyof AiDevProcessStepInput, string>>

export function normalizeAiDevProcessStep(input: unknown): AiDevProcessStepInput | null {
  if (!input || typeof input !== 'object') return null
  const r = input as Record<string, unknown>
  return {
    num: typeof r.num === 'string' ? r.num.trim().slice(0, 10) : '',
    title: typeof r.title === 'string' ? r.title.trim().slice(0, 200) : '',
    desc: typeof r.desc === 'string' ? r.desc.trim() : '',
    badge: typeof r.badge === 'string' ? r.badge.trim().slice(0, 50) : '',
    sortOrder: typeof r.sortOrder === 'number' ? Math.floor(r.sortOrder) : 0,
  }
}

export function validateAiDevProcessStep(input: AiDevProcessStepInput): AiDevProcessStepErrors {
  const errors: AiDevProcessStepErrors = {}
  if (!input.num.trim()) errors.num = '番号を入力してください'
  if (!input.title.trim()) errors.title = 'タイトルを入力してください'
  if (!input.desc.trim()) errors.desc = '説明を入力してください'
  return errors
}

// ── FAQ Items ─────────────────────────────────────────────────

export type AiDevFaqItemInput = { q: string; a: string; sortOrder: number }
export type AiDevFaqItemErrors = Partial<Record<keyof AiDevFaqItemInput, string>>

export function normalizeAiDevFaqItem(input: unknown): AiDevFaqItemInput | null {
  if (!input || typeof input !== 'object') return null
  const r = input as Record<string, unknown>
  return {
    q: typeof r.q === 'string' ? r.q.trim() : '',
    a: typeof r.a === 'string' ? r.a.trim() : '',
    sortOrder: typeof r.sortOrder === 'number' ? Math.floor(r.sortOrder) : 0,
  }
}

export function validateAiDevFaqItem(input: AiDevFaqItemInput): AiDevFaqItemErrors {
  const errors: AiDevFaqItemErrors = {}
  if (!input.q.trim()) errors.q = '質問を入力してください'
  if (!input.a.trim()) errors.a = '回答を入力してください'
  return errors
}
