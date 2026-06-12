import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/admin/guard'
import type { AdminResponse } from '@/lib/admin/types'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE = 5 * 1024 * 1024 // 5 MB

export async function POST(request: Request) {
  const guard = await requireAdmin(request)
  if (guard.ok === false) return guard.response

  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.includes('multipart/form-data')) {
    return Response.json({ ok: false, code: 'INVALID_CONTENT_TYPE' } as AdminResponse, { status: 400 })
  }

  let formData: FormData
  try { formData = await request.formData() }
  catch { return Response.json({ ok: false, code: 'INVALID_FORM' } as AdminResponse, { status: 400 }) }

  const file = formData.get('file')
  if (!(file instanceof File)) {
    return Response.json({ ok: false, code: 'NO_FILE', message: 'fileフィールドが必要です' } as AdminResponse, { status: 400 })
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return Response.json({ ok: false, code: 'INVALID_TYPE', message: '対応形式: JPEG, PNG, WebP, GIF' } as AdminResponse, { status: 400 })
  }

  if (file.size > MAX_SIZE) {
    return Response.json({ ok: false, code: 'FILE_TOO_LARGE', message: 'ファイルサイズは5MB以下にしてください' } as AdminResponse, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const media = await prisma.mediaFile.create({
    data: { filename: file.name, mime: file.type, size: file.size, data: buffer },
    select: { id: true, filename: true, mime: true, size: true, createdAt: true },
  })

  return Response.json({ ok: true, item: { ...media, url: `/api/media/${media.id}` } } as AdminResponse, { status: 201 })
}
