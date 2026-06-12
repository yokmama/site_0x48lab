import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import { createSession, sessionCookieHeader } from '@/lib/auth'
import { normalizeLogin, validateLogin } from '@/lib/admin/users'
import type { AdminResponse } from '@/lib/admin/types'

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    const body: AdminResponse = { ok: false, code: 'INVALID_JSON', message: 'JSON payload is required.' }
    return Response.json(body, { status: 400 })
  }

  const data = normalizeLogin(payload)
  if (!data) {
    const body: AdminResponse = { ok: false, code: 'INVALID_PAYLOAD' }
    return Response.json(body, { status: 400 })
  }

  const errors = validateLogin(data)
  if (Object.keys(errors).length > 0) {
    const body: AdminResponse = { ok: false, code: 'VALIDATION_ERROR', fieldErrors: errors }
    return Response.json(body, { status: 422 })
  }

  const user = await prisma.adminUser.findUnique({ where: { email: data.email } })
  if (!user) {
    const body: AdminResponse = { ok: false, code: 'UNAUTHORIZED', message: 'メールアドレスまたはパスワードが正しくありません。' }
    return Response.json(body, { status: 401 })
  }

  const valid = await bcrypt.compare(data.password, user.passwordHash)
  if (!valid) {
    const body: AdminResponse = { ok: false, code: 'UNAUTHORIZED', message: 'メールアドレスまたはパスワードが正しくありません。' }
    return Response.json(body, { status: 401 })
  }

  const sessionId = await createSession(user.id)
  const body: AdminResponse = { ok: true }
  return Response.json(body, {
    status: 200,
    headers: { 'Set-Cookie': sessionCookieHeader(sessionId) },
  })
}
