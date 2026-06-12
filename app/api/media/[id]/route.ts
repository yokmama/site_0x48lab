import { prisma } from '@/lib/db'

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const numId = Number(id)
  if (!Number.isInteger(numId) || numId < 1) {
    return new Response('Not Found', { status: 404 })
  }

  const file = await prisma.mediaFile.findUnique({
    where: { id: numId },
    select: { data: true, mime: true, filename: true },
  })

  if (!file) return new Response('Not Found', { status: 404 })

  return new Response(file.data, {
    headers: {
      'Content-Type': file.mime,
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Disposition': `inline; filename="${encodeURIComponent(file.filename)}"`,
    },
  })
}
