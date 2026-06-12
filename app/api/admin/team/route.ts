import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/admin/guard'
import { normalizeTeamMember, validateTeamMember } from '@/lib/admin/team'
import type { AdminResponse } from '@/lib/admin/types'
import type { TeamMember } from '@/generated/prisma/client'

export async function GET(request: Request) {
  const guard = await requireAdmin(request)
  if (guard.ok === false) return guard.response

  const items = await prisma.teamMember.findMany({ orderBy: { sortOrder: 'asc' } })
  const body: AdminResponse<TeamMember> = { ok: true, items, total: items.length, page: 1, limit: 50 }
  return Response.json(body)
}

export async function POST(request: Request) {
  const guard = await requireAdmin(request)
  if (guard.ok === false) return guard.response

  let payload: unknown
  try { payload = await request.json() }
  catch { return Response.json({ ok: false, code: 'INVALID_JSON' } as AdminResponse, { status: 400 }) }

  const data = normalizeTeamMember(payload)
  if (!data) return Response.json({ ok: false, code: 'INVALID_PAYLOAD' } as AdminResponse, { status: 400 })

  const errors = validateTeamMember(data)
  if (Object.keys(errors).length > 0)
    return Response.json({ ok: false, code: 'VALIDATION_ERROR', fieldErrors: errors } as AdminResponse, { status: 422 })

  const item = await prisma.teamMember.create({ data: { ...data, photo: data.photo || null, initials: data.initials || null, photoFileId: data.photoFileId || null } })
  const body: AdminResponse<TeamMember> = { ok: true, item }
  return Response.json(body, { status: 201 })
}
