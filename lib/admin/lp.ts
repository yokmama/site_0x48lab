// ── Problems ─────────────────────────────────────────────────

export type LpProblemInput = { text: string; sortOrder: number }
export type LpProblemErrors = Partial<Record<keyof LpProblemInput, string>>

export function normalizeLpProblem(input: unknown): LpProblemInput | null {
  if (!input || typeof input !== 'object') return null
  const r = input as Record<string, unknown>
  return {
    text: typeof r.text === 'string' ? r.text.trim().slice(0, 500) : '',
    sortOrder: typeof r.sortOrder === 'number' ? Math.floor(r.sortOrder) : 0,
  }
}

export function validateLpProblem(input: LpProblemInput): LpProblemErrors {
  const errors: LpProblemErrors = {}
  if (!input.text.trim()) errors.text = '内容を入力してください'
  return errors
}

// ── Solutions ─────────────────────────────────────────────────

export type LpSolutionInput = { num: string; title: string; desc: string; sortOrder: number }
export type LpSolutionErrors = Partial<Record<keyof LpSolutionInput, string>>

export function normalizeLpSolution(input: unknown): LpSolutionInput | null {
  if (!input || typeof input !== 'object') return null
  const r = input as Record<string, unknown>
  return {
    num: typeof r.num === 'string' ? r.num.trim().slice(0, 10) : '',
    title: typeof r.title === 'string' ? r.title.trim().slice(0, 200) : '',
    desc: typeof r.desc === 'string' ? r.desc.trim() : '',
    sortOrder: typeof r.sortOrder === 'number' ? Math.floor(r.sortOrder) : 0,
  }
}

export function validateLpSolution(input: LpSolutionInput): LpSolutionErrors {
  const errors: LpSolutionErrors = {}
  if (!input.num.trim()) errors.num = '番号を入力してください'
  if (!input.title.trim()) errors.title = 'タイトルを入力してください'
  if (!input.desc.trim()) errors.desc = '説明を入力してください'
  return errors
}

// ── Comparison Rows ───────────────────────────────────────────

export type LpComparisonRowInput = { item: string; traditional: string; ours: string; sortOrder: number }
export type LpComparisonRowErrors = Partial<Record<keyof LpComparisonRowInput, string>>

export function normalizeLpComparisonRow(input: unknown): LpComparisonRowInput | null {
  if (!input || typeof input !== 'object') return null
  const r = input as Record<string, unknown>
  return {
    item: typeof r.item === 'string' ? r.item.trim().slice(0, 100) : '',
    traditional: typeof r.traditional === 'string' ? r.traditional.trim().slice(0, 200) : '',
    ours: typeof r.ours === 'string' ? r.ours.trim().slice(0, 200) : '',
    sortOrder: typeof r.sortOrder === 'number' ? Math.floor(r.sortOrder) : 0,
  }
}

export function validateLpComparisonRow(input: LpComparisonRowInput): LpComparisonRowErrors {
  const errors: LpComparisonRowErrors = {}
  if (!input.item.trim()) errors.item = '項目を入力してください'
  if (!input.traditional.trim()) errors.traditional = '従来の方法を入力してください'
  if (!input.ours.trim()) errors.ours = '当社の方法を入力してください'
  return errors
}

// ── Pricing ───────────────────────────────────────────────────

export type LpPricingInput = { title: string; price: string; fromPrice: boolean; items: string[]; sortOrder: number }
export type LpPricingErrors = Partial<Record<keyof LpPricingInput, string>>

export function normalizeLpPricing(input: unknown): LpPricingInput | null {
  if (!input || typeof input !== 'object') return null
  const r = input as Record<string, unknown>
  return {
    title: typeof r.title === 'string' ? r.title.trim().slice(0, 200) : '',
    price: typeof r.price === 'string' ? r.price.trim().slice(0, 50) : '',
    fromPrice: typeof r.fromPrice === 'boolean' ? r.fromPrice : true,
    items: Array.isArray(r.items) ? (r.items as unknown[]).filter(i => typeof i === 'string').map(i => (i as string).trim()).filter(Boolean) : [],
    sortOrder: typeof r.sortOrder === 'number' ? Math.floor(r.sortOrder) : 0,
  }
}

export function validateLpPricing(input: LpPricingInput): LpPricingErrors {
  const errors: LpPricingErrors = {}
  if (!input.title.trim()) errors.title = 'タイトルを入力してください'
  if (!input.price.trim()) errors.price = '価格を入力してください'
  if (input.items.length === 0) errors.items = '機能を1つ以上入力してください'
  return errors
}

// ── Results ───────────────────────────────────────────────────

export type LpResultInput = { industry: string; title: string; beforeCost: string; beforePeriod: string; afterCost: string; afterPeriod: string; saving: string; sortOrder: number }
export type LpResultErrors = Partial<Record<keyof LpResultInput, string>>

export function normalizeLpResult(input: unknown): LpResultInput | null {
  if (!input || typeof input !== 'object') return null
  const r = input as Record<string, unknown>
  return {
    industry: typeof r.industry === 'string' ? r.industry.trim().slice(0, 100) : '',
    title: typeof r.title === 'string' ? r.title.trim().slice(0, 200) : '',
    beforeCost: typeof r.beforeCost === 'string' ? r.beforeCost.trim().slice(0, 50) : '',
    beforePeriod: typeof r.beforePeriod === 'string' ? r.beforePeriod.trim().slice(0, 50) : '',
    afterCost: typeof r.afterCost === 'string' ? r.afterCost.trim().slice(0, 50) : '',
    afterPeriod: typeof r.afterPeriod === 'string' ? r.afterPeriod.trim().slice(0, 50) : '',
    saving: typeof r.saving === 'string' ? r.saving.trim().slice(0, 100) : '',
    sortOrder: typeof r.sortOrder === 'number' ? Math.floor(r.sortOrder) : 0,
  }
}

export function validateLpResult(input: LpResultInput): LpResultErrors {
  const errors: LpResultErrors = {}
  if (!input.industry.trim()) errors.industry = '業種を入力してください'
  if (!input.title.trim()) errors.title = 'タイトルを入力してください'
  if (!input.beforeCost.trim()) errors.beforeCost = '導入前コストを入力してください'
  if (!input.beforePeriod.trim()) errors.beforePeriod = '導入前期間を入力してください'
  if (!input.afterCost.trim()) errors.afterCost = '導入後コストを入力してください'
  if (!input.afterPeriod.trim()) errors.afterPeriod = '導入後期間を入力してください'
  if (!input.saving.trim()) errors.saving = '削減率を入力してください'
  return errors
}

// ── FAQ Items ─────────────────────────────────────────────────

export type LpFaqItemInput = { q: string; a: string; sortOrder: number }
export type LpFaqItemErrors = Partial<Record<keyof LpFaqItemInput, string>>

export function normalizeLpFaqItem(input: unknown): LpFaqItemInput | null {
  if (!input || typeof input !== 'object') return null
  const r = input as Record<string, unknown>
  return {
    q: typeof r.q === 'string' ? r.q.trim() : '',
    a: typeof r.a === 'string' ? r.a.trim() : '',
    sortOrder: typeof r.sortOrder === 'number' ? Math.floor(r.sortOrder) : 0,
  }
}

export function validateLpFaqItem(input: LpFaqItemInput): LpFaqItemErrors {
  const errors: LpFaqItemErrors = {}
  if (!input.q.trim()) errors.q = '質問を入力してください'
  if (!input.a.trim()) errors.a = '回答を入力してください'
  return errors
}
