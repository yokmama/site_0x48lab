export type InquiryReplyInput = {
  subject: string
  body: string
}

export type InquiryReplyErrors = Partial<Record<keyof InquiryReplyInput, string>>

export const INQUIRY_TYPE_LABELS: Record<string, string> = {
  'ai-development': 'AI活用型の業務システム開発',
  'business-system': '業務システム・社内DX',
  'web-mobile': 'Web / モバイルアプリ開発',
  education: '教育・教材開発',
  other: 'その他の相談',
}

export function inquiryTypeLabel(value?: string | null) {
  if (!value) return '未選択'
  return INQUIRY_TYPE_LABELS[value] ?? value
}

export function normalizeInquiryReply(input: unknown): InquiryReplyInput | null {
  if (!input || typeof input !== 'object') return null
  const record = input as Record<string, unknown>
  return {
    subject: typeof record.subject === 'string' ? record.subject.trim().slice(0, 160) : '',
    body: typeof record.body === 'string' ? record.body.trim().slice(0, 5000) : '',
  }
}

export function validateInquiryReply(input: InquiryReplyInput): InquiryReplyErrors {
  const errors: InquiryReplyErrors = {}
  if (!input.subject) errors.subject = '件名を入力してください'
  else if (input.subject.length > 160) errors.subject = '件名は160文字以内で入力してください'
  if (!input.body) errors.body = '返信本文を入力してください'
  else if (input.body.length > 5000) errors.body = '返信本文は5000文字以内で入力してください'
  return errors
}
