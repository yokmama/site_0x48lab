import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/admin/guard'
import { normalizeBlogPost, validateBlogPost } from '@/lib/admin/blog'
import type { AdminResponse } from '@/lib/admin/types'
import type { BlogPost } from '@/generated/prisma/client'

export async function GET(request: Request) {
  const guard = await requireAdmin(request)
  if (guard.ok === false) return guard.response

  const url = new URL(request.url)
  const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'))
  const limit = Math.min(50, Number(url.searchParams.get('limit') ?? '20'))
  const [items, total] = await prisma.$transaction([
    prisma.blogPost.findMany({ orderBy: { sortOrder: 'asc' }, skip: (page - 1) * limit, take: limit }),
    prisma.blogPost.count(),
  ])
  const body: AdminResponse<BlogPost> = { ok: true, items, total, page, limit }
  return Response.json(body)
}

export async function POST(request: Request) {
  const guard = await requireAdmin(request)
  if (guard.ok === false) return guard.response

  let payload: unknown
  try { payload = await request.json() }
  catch { return Response.json({ ok: false, code: 'INVALID_JSON' } as AdminResponse, { status: 400 }) }

  const data = normalizeBlogPost(payload)
  if (!data) return Response.json({ ok: false, code: 'INVALID_PAYLOAD' } as AdminResponse, { status: 400 })

  const errors = validateBlogPost(data)
  if (Object.keys(errors).length > 0)
    return Response.json({ ok: false, code: 'VALIDATION_ERROR', fieldErrors: errors } as AdminResponse, { status: 422 })

  const existing = await prisma.blogPost.findUnique({ where: { slug: data.slug } })
  if (existing)
    return Response.json({ ok: false, code: 'CONFLICT', fieldErrors: { slug: 'このスラッグは既に使用されています' } } as AdminResponse, { status: 409 })

  const item = await prisma.blogPost.create({ data: { ...data, date: new Date(data.date) } })
  const body: AdminResponse<BlogPost> = { ok: true, item }
  return Response.json(body, { status: 201 })
}
