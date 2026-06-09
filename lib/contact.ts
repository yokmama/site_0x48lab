export type ContactRequest = {
  company: string
  name: string
  email: string
  phone?: string
  message: string
}

export type ContactErrorCode = 'VALIDATION_ERROR' | 'INVALID_JSON' | 'NOT_CONFIGURED'

export type ContactResponse =
  | { ok: true }
  | {
      ok: false
      code: ContactErrorCode
      message: string
      fieldErrors?: Partial<Record<keyof ContactRequest, string>>
    }

export type ContactFormErrors = Partial<Record<keyof ContactRequest, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactRequest(input: ContactRequest): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (!input.company.trim()) errors.company = '会社名・団体名を入力してください'
  if (!input.name.trim()) errors.name = 'お名前を入力してください'
  if (!input.email.trim()) errors.email = 'メールアドレスを入力してください'
  else if (!emailPattern.test(input.email)) errors.email = '正しいメールアドレスを入力してください'
  if (!input.message.trim()) errors.message = 'お問い合わせ内容を入力してください'

  return errors
}

export function normalizeContactRequest(input: unknown): ContactRequest | null {
  if (!input || typeof input !== 'object') return null

  const record = input as Record<string, unknown>
  const company = typeof record.company === 'string' ? record.company : ''
  const name = typeof record.name === 'string' ? record.name : ''
  const email = typeof record.email === 'string' ? record.email : ''
  const phone = typeof record.phone === 'string' ? record.phone : ''
  const message = typeof record.message === 'string' ? record.message : ''

  return {
    company: company.slice(0, 100),
    name: name.slice(0, 50),
    email: email.slice(0, 254),
    phone: phone.slice(0, 50),
    message: message.slice(0, 1000),
  }
}
