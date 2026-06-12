import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/admin/guard'
import { normalizeAdminUserUpdate, validateAdminUserUpdate } from '@/lib/admin/users'
import type { AdminResponse } from '@/lib/admin/types'
import type { AdminUser } from '@/generated/prisma/client'

type SafeUser = Omit<AdminUser, 'passwordHash'>

function safe(user: AdminUser): SafeUser {
  const { passwordHash: _, ...rest } = user
  return rest
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin(request)
  if (guard.ok === false) return guard.response

  const { id } = await params
  const user = await prisma.adminUser.findUnique({ where: { id: Number(id) } })
  if (!user) return Response.json({ ok: false, code: 'NOT_FOUND' } as AdminResponse, { status: 404 })

  const body: AdminResponse<SafeUser> = { ok: true, item: safe(user) }
  return Response.json(body)
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin(request)
  if (guard.ok === false) return guard.response

  const { id } = await params
  const existing = await prisma.adminUser.findUnique({ where: { id: Number(id) } })
  if (!existing) return Response.json({ ok: false, code: 'NOT_FOUND' } as AdminResponse, { status: 404 })

  let payload: unknown
  try { payload = await request.json() }
  catch { return Response.json({ ok: false, code: 'INVALID_JSON' } as AdminResponse, { status: 400 }) }

  const data = normalizeAdminUserUpdate(payload)
  if (!data) return Response.json({ ok: false, code: 'INVALID_PAYLOAD' } as AdminResponse, { status: 400 })

  const errors = validateAdminUserUpdate(data)
  if (Object.keys(errors).length > 0)
    return Response.json({ ok: false, code: 'VALIDATION_ERROR', fieldErrors: errors } as AdminResponse, { status: 422 })

  const emailConflict = await prisma.adminUser.findFirst({ where: { email: data.email, NOT: { id: Number(id) } } })
  if (emailConflict)
    return Response.json({ ok: false, code: 'CONFLICT', fieldErrors: { email: 'このメールアドレスは既に使用されています' } } as AdminResponse, { status: 409 })

  const updateData: { email: string; name: string; passwordHash?: string } = { email: data.email, name: data.name }
  if (data.password) updateData.passwordHash = await bcrypt.hash(data.password, 12)

  const user = await prisma.adminUser.update({ where: { id: Number(id) }, data: updateData })
  const body: AdminResponse<SafeUser> = { ok: true, item: safe(user) }
  return Response.json(body)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin(request)
  if (guard.ok === false) return guard.response

  const { id } = await params

  if (guard.user.userId === Number(id)) {
    return Response.json({ ok: false, code: 'FORBIDDEN', message: '自分自身のアカウントは削除できません' } as AdminResponse, { status: 403 })
  }

  const existing = await prisma.adminUser.findUnique({ where: { id: Number(id) } })
  if (!existing) return Response.json({ ok: false, code: 'NOT_FOUND' } as AdminResponse, { status: 404 })

  const total = await prisma.adminUser.count()
  if (total <= 1)
    return Response.json({ ok: false, code: 'FORBIDDEN', message: '最後の管理者は削除できません' } as AdminResponse, { status: 403 })

  await prisma.adminUser.delete({ where: { id: Number(id) } })
  return Response.json({ ok: true } as AdminResponse)
}
