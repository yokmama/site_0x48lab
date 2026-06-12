const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type AdminUserInput = {
  email: string
  name: string
  password: string
}

export type AdminUserUpdateInput = {
  email: string
  name: string
  password?: string
}

export type AdminUserErrors = Partial<Record<keyof AdminUserInput, string>>

export function normalizeAdminUser(input: unknown): AdminUserInput | null {
  if (!input || typeof input !== 'object') return null
  const r = input as Record<string, unknown>
  return {
    email: typeof r.email === 'string' ? r.email.trim().slice(0, 254) : '',
    name: typeof r.name === 'string' ? r.name.trim().slice(0, 100) : '',
    password: typeof r.password === 'string' ? r.password : '',
  }
}

export function normalizeAdminUserUpdate(input: unknown): AdminUserUpdateInput | null {
  if (!input || typeof input !== 'object') return null
  const r = input as Record<string, unknown>
  return {
    email: typeof r.email === 'string' ? r.email.trim().slice(0, 254) : '',
    name: typeof r.name === 'string' ? r.name.trim().slice(0, 100) : '',
    password: typeof r.password === 'string' && r.password ? r.password : undefined,
  }
}

export function validateAdminUser(input: AdminUserInput): AdminUserErrors {
  const errors: AdminUserErrors = {}
  if (!input.email) errors.email = 'メールアドレスを入力してください'
  else if (!emailPattern.test(input.email)) errors.email = '正しいメールアドレスを入力してください'
  if (!input.name.trim()) errors.name = '名前を入力してください'
  if (!input.password) errors.password = 'パスワードを入力してください'
  else if (input.password.length < 8) errors.password = 'パスワードは8文字以上で入力してください'
  else if (input.password.length > 200) errors.password = 'パスワードが長すぎます'
  return errors
}

export function validateAdminUserUpdate(input: AdminUserUpdateInput): AdminUserErrors {
  const errors: AdminUserErrors = {}
  if (!input.email) errors.email = 'メールアドレスを入力してください'
  else if (!emailPattern.test(input.email)) errors.email = '正しいメールアドレスを入力してください'
  if (!input.name.trim()) errors.name = '名前を入力してください'
  if (input.password !== undefined) {
    if (input.password.length < 8) errors.password = 'パスワードは8文字以上で入力してください'
    else if (input.password.length > 200) errors.password = 'パスワードが長すぎます'
  }
  return errors
}

export type LoginInput = { email: string; password: string }
export type LoginErrors = Partial<Record<keyof LoginInput, string>>

export function normalizeLogin(input: unknown): LoginInput | null {
  if (!input || typeof input !== 'object') return null
  const r = input as Record<string, unknown>
  return {
    email: typeof r.email === 'string' ? r.email.trim().slice(0, 254) : '',
    password: typeof r.password === 'string' ? r.password.slice(0, 200) : '',
  }
}

export function validateLogin(input: LoginInput): LoginErrors {
  const errors: LoginErrors = {}
  if (!input.email) errors.email = 'メールアドレスを入力してください'
  if (!input.password) errors.password = 'パスワードを入力してください'
  return errors
}
