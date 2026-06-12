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

async function listSection(section: Section) {
  switch (section) {
    case 'problems': return prisma.lpProblem.findMany({ orderBy: { sortOrder: 'asc' } })
    case 'solutions': return prisma.lpSolution.findMany({ orderBy: { sortOrder: 'asc' } })
    case 'comparison': return prisma.lpComparisonRow.findMany({ orderBy: { sortOrder: 'asc' } })
    case 'pricing': return prisma.lpPricing.findMany({ orderBy: { sortOrder: 'asc' } })
    case 'results': return prisma.lpResult.findMany({ orderBy: { sortOrder: 'asc' } })
    case 'faq': return prisma.lpFaqItem.findMany({ orderBy: { sortOrder: 'asc' } })
  }
}

async function createItem(section: Section, payload: unknown) {
  switch (section) {
    case 'problems': {
      const d = normalizeLpProblem(payload); if (!d) return null
      const e = validateLpProblem(d); if (Object.keys(e).length) return { errors: e }
      return prisma.lpProblem.create({ data: d })
    }
    case 'solutions': {
      const d = normalizeLpSolution(payload); if (!d) return null
      const e = validateLpSolution(d); if (Object.keys(e).length) return { errors: e }
      return prisma.lpSolution.create({ data: d })
    }
    case 'comparison': {
      const d = normalizeLpComparisonRow(payload); if (!d) return null
      const e = validateLpComparisonRow(d); if (Object.keys(e).length) return { errors: e }
      return prisma.lpComparisonRow.create({ data: d })
    }
    case 'pricing': {
      const d = normalizeLpPricing(payload); if (!d) return null
      const e = validateLpPricing(d); if (Object.keys(e).length) return { errors: e }
      return prisma.lpPricing.create({ data: d })
    }
    case 'results': {
      const d = normalizeLpResult(payload); if (!d) return null
      const e = validateLpResult(d); if (Object.keys(e).length) return { errors: e }
      return prisma.lpResult.create({ data: d })
    }
    case 'faq': {
      const d = normalizeLpFaqItem(payload); if (!d) return null
      const e = validateLpFaqItem(d); if (Object.keys(e).length) return { errors: e }
      return prisma.lpFaqItem.create({ data: d })
    }
  }
}

export async function GET(request: Request, { params }: { params: Promise<{ section: string }> }) {
  const guard = await requireAdmin(request)
  if (guard.ok === false) return guard.response

  const { section } = await params
  if (!isSection(section)) return Response.json({ ok: false, code: 'NOT_FOUND' } as AdminResponse, { status: 404 })

  const items = await listSection(section)
  return Response.json({ ok: true, items, total: items.length, page: 1, limit: 100 } as AdminResponse)
}

export async function POST(request: Request, { params }: { params: Promise<{ section: string }> }) {
  const guard = await requireAdmin(request)
  if (guard.ok === false) return guard.response

  const { section } = await params
  if (!isSection(section)) return Response.json({ ok: false, code: 'NOT_FOUND' } as AdminResponse, { status: 404 })

  let payload: unknown
  try { payload = await request.json() }
  catch { return Response.json({ ok: false, code: 'INVALID_JSON' } as AdminResponse, { status: 400 }) }

  const result = await createItem(section, payload)
  if (!result) return Response.json({ ok: false, code: 'INVALID_PAYLOAD' } as AdminResponse, { status: 400 })
  if ('errors' in result) return Response.json({ ok: false, code: 'VALIDATION_ERROR', fieldErrors: result.errors } as AdminResponse, { status: 422 })

  return Response.json({ ok: true, item: result } as AdminResponse, { status: 201 })
}
