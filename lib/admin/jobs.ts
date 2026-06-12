const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export type JobOpeningInput = {
  id: string
  title: string
  type: string
  location: string
  tags: string[]
  desc: string
  published: boolean
  sortOrder: number
}

export type JobErrors = Partial<Record<keyof JobOpeningInput, string>>

export function normalizeJobOpening(input: unknown): JobOpeningInput | null {
  if (!input || typeof input !== 'object') return null
  const r = input as Record<string, unknown>
  return {
    id: typeof r.id === 'string' ? r.id.trim().slice(0, 100) : '',
    title: typeof r.title === 'string' ? r.title.trim().slice(0, 200) : '',
    type: typeof r.type === 'string' ? r.type.trim().slice(0, 100) : '',
    location: typeof r.location === 'string' ? r.location.trim().slice(0, 200) : '',
    tags: Array.isArray(r.tags) ? (r.tags as unknown[]).filter(t => typeof t === 'string').map(t => (t as string).trim()).filter(Boolean) : [],
    desc: typeof r.desc === 'string' ? r.desc.trim() : '',
    published: typeof r.published === 'boolean' ? r.published : true,
    sortOrder: typeof r.sortOrder === 'number' ? Math.floor(r.sortOrder) : 0,
  }
}

export function validateJobOpening(input: JobOpeningInput): JobErrors {
  const errors: JobErrors = {}
  if (!input.id) errors.id = 'IDを入力してください'
  else if (!idPattern.test(input.id)) errors.id = 'IDは小文字英数字とハイフンのみ使用できます'
  if (!input.title.trim()) errors.title = 'タイトルを入力してください'
  if (!input.type.trim()) errors.type = '雇用形態を入力してください'
  if (!input.location.trim()) errors.location = '勤務地を入力してください'
  if (!input.desc.trim()) errors.desc = '職務内容を入力してください'
  return errors
}
