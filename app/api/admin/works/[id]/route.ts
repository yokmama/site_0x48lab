import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/admin/guard'
import { normalizeWork, validateWork } from '@/lib/admin/works'
import type { AdminResponse } from '@/lib/admin/types'
import type { Work } from '@/generated/prisma/client'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin(request)
  if (guard.ok === false) return guard.response

  const { id } = await params
  const item = await prisma.work.findUnique({ where: { id: Number(id) } })
  if (!item) return Response.json({ ok: false, code: 'NOT_FOUND' } as AdminResponse, { status: 404 })

  return Response.json({ ok: true, item } as AdminResponse<Work>)
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin(request)
  if (guard.ok === false) return guard.response

  const { id } = await params
  const existing = await prisma.work.findUnique({ where: { id: Number(id) } })
  if (!existing) return Response.json({ ok: false, code: 'NOT_FOUND' } as AdminResponse, { status: 404 })

  let payload: unknown
  try { payload = await request.json() }
  catch { return Response.json({ ok: false, code: 'INVALID_JSON' } as AdminResponse, { status: 400 }) }

  const data = normalizeWork(payload)
  if (!data) return Response.json({ ok: false, code: 'INVALID_PAYLOAD' } as AdminResponse, { status: 400 })

  const errors = validateWork(data)
  if (Object.keys(errors).length > 0)
    return Response.json({ ok: false, code: 'VALIDATION_ERROR', fieldErrors: errors } as AdminResponse, { status: 422 })

  if (data.slug !== existing.slug) {
    const slugConflict = await prisma.work.findUnique({ where: { slug: data.slug } })
    if (slugConflict)
      return Response.json({ ok: false, code: 'CONFLICT', fieldErrors: { slug: 'このスラッグは既に使用されています' } } as AdminResponse, { status: 409 })
  }

  const item = await prisma.work.update({ where: { id: Number(id) }, data: { ...data, link: data.link || null } })
  return Response.json({ ok: true, item } as AdminResponse<Work>)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin(request)
  if (guard.ok === false) return guard.response

  const { id } = await params
  const existing = await prisma.work.findUnique({ where: { id: Number(id) } })
  if (!existing) return Response.json({ ok: false, code: 'NOT_FOUND' } as AdminResponse, { status: 404 })

  await prisma.work.delete({ where: { id: Number(id) } })
  return Response.json({ ok: true } as AdminResponse)
}
