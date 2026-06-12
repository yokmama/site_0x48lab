import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/admin/guard'
import { normalizeAdminUser, validateAdminUser } from '@/lib/admin/users'
import type { AdminResponse } from '@/lib/admin/types'
import type { AdminUser } from '@/generated/prisma/client'

type SafeUser = Omit<AdminUser, 'passwordHash'>

function safe(user: AdminUser): SafeUser {
  const { passwordHash: _, ...rest } = user
  return rest
}

export async function GET(request: Request) {
  const guard = await requireAdmin(request)
  if (guard.ok === false) return guard.response

  const url = new URL(request.url)
  const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'))
  const limit = Math.min(50, Number(url.searchParams.get('limit') ?? '20'))
  const [users, total] = await prisma.$transaction([
    prisma.adminUser.findMany({ orderBy: { id: 'asc' }, skip: (page - 1) * limit, take: limit }),
    prisma.adminUser.count(),
  ])
  const body: AdminResponse<SafeUser> = { ok: true, items: users.map(safe), total, page, limit }
  return Response.json(body)
}

export async function POST(request: Request) {
  const guard = await requireAdmin(request)
  if (guard.ok === false) return guard.response

  let payload: unknown
  try { payload = await request.json() }
  catch { return Response.json({ ok: false, code: 'INVALID_JSON' } as AdminResponse, { status: 400 }) }

  const data = normalizeAdminUser(payload)
  if (!data) return Response.json({ ok: false, code: 'INVALID_PAYLOAD' } as AdminResponse, { status: 400 })

  const errors = validateAdminUser(data)
  if (Object.keys(errors).length > 0)
    return Response.json({ ok: false, code: 'VALIDATION_ERROR', fieldErrors: errors } as AdminResponse, { status: 422 })

  const existing = await prisma.adminUser.findUnique({ where: { email: data.email } })
  if (existing)
    return Response.json({ ok: false, code: 'CONFLICT', fieldErrors: { email: 'このメールアドレスは既に使用されています' } } as AdminResponse, { status: 409 })

  const passwordHash = await bcrypt.hash(data.password, 12)
  const user = await prisma.adminUser.create({ data: { email: data.email, name: data.name, passwordHash } })
  const body: AdminResponse<SafeUser> = { ok: true, item: safe(user) }
  return Response.json(body, { status: 201 })
}
