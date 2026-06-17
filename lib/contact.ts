export type ContactRequest = {
  company: string
  name: string
  email: string
  phone?: string
  inquiryType?: string
  budgetRange?: string
  timeline?: string
  message: string
  sourcePath?: string
  utm?: Record<string, string>
  privacyConsent: boolean
  website?: string
}

export type ContactErrorCode = 'VALIDATION_ERROR' | 'INVALID_JSON' | 'SAVE_FAILED'

export type ContactResponse =
  | { ok: true; inquiryId: string }
  | {
      ok: false
      code: ContactErrorCode
      message: string
      fieldErrors?: Partial<Record<keyof ContactRequest, string>>
    }

export type ContactFormErrors = Partial<Record<keyof ContactRequest, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const allowedInquiryTypes = new Set(['ai-development', 'business-system', 'web-mobile', 'education', 'other', ''])
const allowedBudgetRanges = new Set(['undecided', 'under-100', '100-300', '300-500', '500-plus', ''])
const allowedTimelines = new Set(['asap', '1-3months', '3-6months', 'undecided', ''])

export function validateContactRequest(input: ContactRequest): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (!input.company.trim()) errors.company = '会社名・団体名を入力してください'
  if (!input.name.trim()) errors.name = 'お名前を入力してください'
  if (!input.email.trim()) errors.email = 'メールアドレスを入力してください'
  else if (!emailPattern.test(input.email)) errors.email = '正しいメールアドレスを入力してください'
  if (input.inquiryType && !allowedInquiryTypes.has(input.inquiryType)) errors.inquiryType = 'お問い合わせ種別を選び直してください'
  if (input.budgetRange && !allowedBudgetRanges.has(input.budgetRange)) errors.budgetRange = 'ご予算感を選び直してください'
  if (input.timeline && !allowedTimelines.has(input.timeline)) errors.timeline = '希望時期を選び直してください'
  if (!input.message.trim()) errors.message = 'お問い合わせ内容を入力してください'
  if (!input.privacyConsent) errors.privacyConsent = 'プライバシーポリシーへの同意が必要です'

  return errors
}

function normalizeUtm(input: unknown): Record<string, string> | undefined {
  if (!input || typeof input !== 'object') return undefined

  const result: Record<string, string> = {}
  for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
    if (!key.startsWith('utm_') || typeof value !== 'string') continue
    result[key.slice(0, 40)] = value.slice(0, 160)
  }

  return Object.keys(result).length > 0 ? result : undefined
}

export function normalizeContactRequest(input: unknown): ContactRequest | null {
  if (!input || typeof input !== 'object') return null

  const record = input as Record<string, unknown>
  const company = typeof record.company === 'string' ? record.company : ''
  const name = typeof record.name === 'string' ? record.name : ''
  const email = typeof record.email === 'string' ? record.email : ''
  const phone = typeof record.phone === 'string' ? record.phone : ''
  const message = typeof record.message === 'string' ? record.message : ''
  const inquiryType = typeof record.inquiryType === 'string' ? record.inquiryType : ''
  const budgetRange = typeof record.budgetRange === 'string' ? record.budgetRange : ''
  const timeline = typeof record.timeline === 'string' ? record.timeline : ''
  const sourcePath = typeof record.sourcePath === 'string' ? record.sourcePath : ''
  const privacyConsent = record.privacyConsent === true
  const website = typeof record.website === 'string' ? record.website : ''

  return {
    company: company.slice(0, 100),
    name: name.slice(0, 50),
    email: email.slice(0, 254),
    phone: phone.slice(0, 50),
    inquiryType: inquiryType.slice(0, 40),
    budgetRange: budgetRange.slice(0, 40),
    timeline: timeline.slice(0, 40),
    message: message.slice(0, 1000),
    sourcePath: sourcePath.slice(0, 240),
    utm: normalizeUtm(record.utm),
    privacyConsent,
    website: website.slice(0, 120),
  }
}
