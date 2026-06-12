import { deleteSession, clearSessionCookieHeader } from '@/lib/auth'
import { requireAdmin } from '@/lib/admin/guard'
import type { AdminResponse } from '@/lib/admin/types'

export async function POST(request: Request) {
  const guard = await requireAdmin(request)
  if (guard.ok) {
    await deleteSession(guard.sessionId)
  }
  const body: AdminResponse = { ok: true }
  return Response.json(body, {
    status: 200,
    headers: { 'Set-Cookie': clearSessionCookieHeader() },
  })
}
