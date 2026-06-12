import { validateSession } from '@/lib/auth'
import type { AdminResponse } from './types'

type GuardOk = { ok: true; sessionId: string; user: { userId: number; email: string; name: string } }
type GuardFail = { ok: false; response: Response }
export type GuardResult = GuardOk | GuardFail

export async function requireAdmin(request: Request): Promise<GuardResult> {
  const cookie = request.headers.get('cookie') ?? ''
  const match = cookie.match(/admin_session=([a-f0-9]{64})/)
  const id = match?.[1]

  if (!id) {
    const body: AdminResponse = { ok: false, code: 'UNAUTHORIZED' }
    return { ok: false, response: Response.json(body, { status: 401 }) }
  }

  const user = await validateSession(id)
  if (!user) {
    const body: AdminResponse = { ok: false, code: 'SESSION_EXPIRED' }
    return { ok: false, response: Response.json(body, { status: 401 }) }
  }

  return { ok: true, sessionId: id, user }
}
