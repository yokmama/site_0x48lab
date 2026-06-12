import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/admin/guard'
import { normalizeWork, validateWork } from '@/lib/admin/works'
import type { AdminResponse } from '@/lib/admin/types'
import type { Work } from '@/generated/prisma/client'

export async function GET(request: Request) {
  const guard = await requireAdmin(request)
  if (guard.ok === false) return guard.response

  const url = new URL(request.url)
  const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'))
  const limit = Math.min(50, Number(url.searchParams.get('limit') ?? '20'))
  const [items, total] = await prisma.$transaction([
    prisma.work.findMany({ orderBy: { sortOrder: 'asc' }, skip: (page - 1) * limit, take: limit }),
    prisma.work.count(),
  ])
  const body: AdminResponse<Work> = { ok: true, items, total, page, limit }
  return Response.json(body)
}

export async function POST(request: Request) {
  const guard = await requireAdmin(request)
  if (guard.ok === false) return guard.response

  let payload: unknown
  try { payload = await request.json() }
  catch { return Response.json({ ok: false, code: 'INVALID_JSON' } as AdminResponse, { status: 400 }) }

  const data = normalizeWork(payload)
  if (!data) return Response.json({ ok: false, code: 'INVALID_PAYLOAD' } as AdminResponse, { status: 400 })

  const errors = validateWork(data)
  if (Object.keys(errors).length > 0)
    return Response.json({ ok: false, code: 'VALIDATION_ERROR', fieldErrors: errors } as AdminResponse, { status: 422 })

  const existing = await prisma.work.findUnique({ where: { slug: data.slug } })
  if (existing)
    return Response.json({ ok: false, code: 'CONFLICT', fieldErrors: { slug: 'このスラッグは既に使用されています' } } as AdminResponse, { status: 409 })

  const item = await prisma.work.create({ data: { ...data, link: data.link || null } })
  const body: AdminResponse<Work> = { ok: true, item }
  return Response.json(body, { status: 201 })
}
