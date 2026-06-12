import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/admin/guard'
import type { AdminResponse } from '@/lib/admin/types'
import {
  normalizeLpProblem, validateLpProblem,
  normalizeLpSolution, validateLpSolution,
  normalizeLpComparisonRow, validateLpComparisonRow,
  normalizeLpPricing, validateLpPricing,
  normalizeLpResult, validateLpResult,
  normalizeLpFaqItem, validateLpFaqItem,
} from '@/lib/admin/lp'

const SECTIONS = ['problems', 'solutions', 'comparison', 'pricing', 'results', 'faq'] as const
type Section = typeof SECTIONS[number]

function isSection(s: string): s is Section {
  return SECTIONS.includes(s as Section)
}

async function updateItem(section: Section, id: number, payload: unknown) {
  switch (section) {
    case 'problems': {
      const d = normalizeLpProblem(payload); if (!d) return null
      const e = validateLpProblem(d); if (Object.keys(e).length) return { errors: e }
      return prisma.lpProblem.update({ where: { id }, data: d })
    }
    case 'solutions': {
      const d = normalizeLpSolution(payload); if (!d) return null
      const e = validateLpSolution(d); if (Object.keys(e).length) return { errors: e }
      return prisma.lpSolution.update({ where: { id }, data: d })
    }
    case 'comparison': {
      const d = normalizeLpComparisonRow(payload); if (!d) return null
      const e = validateLpComparisonRow(d); if (Object.keys(e).length) return { errors: e }
      return prisma.lpComparisonRow.update({ where: { id }, data: d })
    }
    case 'pricing': {
      const d = normalizeLpPricing(payload); if (!d) return null
      const e = validateLpPricing(d); if (Object.keys(e).length) return { errors: e }
      return prisma.lpPricing.update({ where: { id }, data: d })
    }
    case 'results': {
      const d = normalizeLpResult(payload); if (!d) return null
      const e = validateLpResult(d); if (Object.keys(e).length) return { errors: e }
      return prisma.lpResult.update({ where: { id }, data: d })
    }
    case 'faq': {
      const d = normalizeLpFaqItem(payload); if (!d) return null
      const e = validateLpFaqItem(d); if (Object.keys(e).length) return { errors: e }
      return prisma.lpFaqItem.update({ where: { id }, data: d })
    }
  }
}

async function deleteItem(section: Section, id: number) {
  switch (section) {
    case 'problems': return prisma.lpProblem.delete({ where: { id } })
    case 'solutions': return prisma.lpSolution.delete({ where: { id } })
    case 'comparison': return prisma.lpComparisonRow.delete({ where: { id } })
    case 'pricing': return prisma.lpPricing.delete({ where: { id } })
    case 'results': return prisma.lpResult.delete({ where: { id } })
    case 'faq': return prisma.lpFaqItem.delete({ where: { id } })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ section: string; id: string }> }) {
  const guard = await requireAdmin(request)
  if (guard.ok === false) return guard.response

  const { section, id } = await params
  if (!isSection(section)) return Response.json({ ok: false, code: 'NOT_FOUND' } as AdminResponse, { status: 404 })

  let payload: unknown
  try { payload = await request.json() }
  catch { return Response.json({ ok: false, code: 'INVALID_JSON' } as AdminResponse, { status: 400 }) }

  const result = await updateItem(section, Number(id), payload)
  if (!result) return Response.json({ ok: false, code: 'INVALID_PAYLOAD' } as AdminResponse, { status: 400 })
  if ('errors' in result) return Response.json({ ok: false, code: 'VALIDATION_ERROR', fieldErrors: result.errors } as AdminResponse, { status: 422 })

  return Response.json({ ok: true, item: result } as AdminResponse)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ section: string; id: string }> }) {
  const guard = await requireAdmin(request)
  if (guard.ok === false) return guard.response

  const { section, id } = await params
  if (!isSection(section)) return Response.json({ ok: false, code: 'NOT_FOUND' } as AdminResponse, { status: 404 })

  await deleteItem(section, Number(id))
  return Response.json({ ok: true } as AdminResponse)
}
