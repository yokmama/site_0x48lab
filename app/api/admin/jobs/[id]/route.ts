import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/admin/guard'
import { normalizeJobOpening, validateJobOpening } from '@/lib/admin/jobs'
import type { AdminResponse } from '@/lib/admin/types'
import type { JobOpening } from '@/generated/prisma/client'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin(request)
  if (guard.ok === false) return guard.response

  const { id } = await params
  const item = await prisma.jobOpening.findUnique({ where: { id } })
  if (!item) return Response.json({ ok: false, code: 'NOT_FOUND' } as AdminResponse, { status: 404 })

  return Response.json({ ok: true, item } as AdminResponse<JobOpening>)
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin(request)
  if (guard.ok === false) return guard.response

  const { id } = await params
  const existing = await prisma.jobOpening.findUnique({ where: { id } })
  if (!existing) return Response.json({ ok: false, code: 'NOT_FOUND' } as AdminResponse, { status: 404 })

  let payload: unknown
  try { payload = await request.json() }
  catch { return Response.json({ ok: false, code: 'INVALID_JSON' } as AdminResponse, { status: 400 }) }

  const data = normalizeJobOpening(payload)
  if (!data) return Response.json({ ok: false, code: 'INVALID_PAYLOAD' } as AdminResponse, { status: 400 })

  const errors = validateJobOpening(data)
  if (Object.keys(errors).length > 0)
    return Response.json({ ok: false, code: 'VALIDATION_ERROR', fieldErrors: errors } as AdminResponse, { status: 422 })

  if (data.id !== existing.id) {
    const idConflict = await prisma.jobOpening.findUnique({ where: { id: data.id } })
    if (idConflict)
      return Response.json({ ok: false, code: 'CONFLICT', fieldErrors: { id: 'このIDは既に使用されています' } } as AdminResponse, { status: 409 })
    // ID change: delete old + create new
    await prisma.$transaction([
      prisma.jobOpening.delete({ where: { id: existing.id } }),
      prisma.jobOpening.create({ data }),
    ])
    const item = await prisma.jobOpening.findUnique({ where: { id: data.id } })
    return Response.json({ ok: true, item } as AdminResponse<JobOpening>)
  }

  const item = await prisma.jobOpening.update({ where: { id }, data })
  return Response.json({ ok: true, item } as AdminResponse<JobOpening>)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin(request)
  if (guard.ok === false) return guard.response

  const { id } = await params
  const existing = await prisma.jobOpening.findUnique({ where: { id } })
  if (!existing) return Response.json({ ok: false, code: 'NOT_FOUND' } as AdminResponse, { status: 404 })

  await prisma.jobOpening.delete({ where: { id } })
  return Response.json({ ok: true } as AdminResponse)
}
