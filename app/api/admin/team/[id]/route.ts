import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/admin/guard'
import { normalizeTeamMember, validateTeamMember } from '@/lib/admin/team'
import type { AdminResponse } from '@/lib/admin/types'
import type { TeamMember } from '@/generated/prisma/client'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin(request)
  if (guard.ok === false) return guard.response

  const { id } = await params
  const item = await prisma.teamMember.findUnique({ where: { id: Number(id) } })
  if (!item) return Response.json({ ok: false, code: 'NOT_FOUND' } as AdminResponse, { status: 404 })

  return Response.json({ ok: true, item } as AdminResponse<TeamMember>)
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin(request)
  if (guard.ok === false) return guard.response

  const { id } = await params
  const existing = await prisma.teamMember.findUnique({ where: { id: Number(id) } })
  if (!existing) return Response.json({ ok: false, code: 'NOT_FOUND' } as AdminResponse, { status: 404 })

  let payload: unknown
  try { payload = await request.json() }
  catch { return Response.json({ ok: false, code: 'INVALID_JSON' } as AdminResponse, { status: 400 }) }

  const data = normalizeTeamMember(payload)
  if (!data) return Response.json({ ok: false, code: 'INVALID_PAYLOAD' } as AdminResponse, { status: 400 })

  const errors = validateTeamMember(data)
  if (Object.keys(errors).length > 0)
    return Response.json({ ok: false, code: 'VALIDATION_ERROR', fieldErrors: errors } as AdminResponse, { status: 422 })

  const item = await prisma.teamMember.update({ where: { id: Number(id) }, data: { ...data, photo: data.photo || null, initials: data.initials || null, photoFileId: data.photoFileId || null } })
  return Response.json({ ok: true, item } as AdminResponse<TeamMember>)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin(request)
  if (guard.ok === false) return guard.response

  const { id } = await params
  const existing = await prisma.teamMember.findUnique({ where: { id: Number(id) } })
  if (!existing) return Response.json({ ok: false, code: 'NOT_FOUND' } as AdminResponse, { status: 404 })

  await prisma.teamMember.delete({ where: { id: Number(id) } })
  return Response.json({ ok: true } as AdminResponse)
}
