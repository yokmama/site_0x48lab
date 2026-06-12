import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/admin/guard'
import type { AdminResponse } from '@/lib/admin/types'
import {
  normalizeAiDevProblem, validateAiDevProblem,
  normalizeAiDevSolution, validateAiDevSolution,
  normalizeAiDevComparisonRow, validateAiDevComparisonRow,
  normalizeAiDevServicePackage, validateAiDevServicePackage,
  normalizeAiDevExampleProject, validateAiDevExampleProject,
  normalizeAiDevProcessStep, validateAiDevProcessStep,
  normalizeAiDevFaqItem, validateAiDevFaqItem,
} from '@/lib/admin/ai-dev'

const SECTIONS = ['problems', 'solutions', 'comparison', 'packages', 'examples', 'steps', 'faq'] as const
type Section = typeof SECTIONS[number]

function isSection(s: string): s is Section {
  return SECTIONS.includes(s as Section)
}

async function listSection(section: Section) {
  switch (section) {
    case 'problems': return prisma.aiDevProblem.findMany({ orderBy: { sortOrder: 'asc' } })
    case 'solutions': return prisma.aiDevSolution.findMany({ orderBy: { sortOrder: 'asc' } })
    case 'comparison': return prisma.aiDevComparisonRow.findMany({ orderBy: { sortOrder: 'asc' } })
    case 'packages': return prisma.aiDevServicePackage.findMany({ orderBy: { sortOrder: 'asc' } })
    case 'examples': return prisma.aiDevExampleProject.findMany({ orderBy: { sortOrder: 'asc' } })
    case 'steps': return prisma.aiDevProcessStep.findMany({ orderBy: { sortOrder: 'asc' } })
    case 'faq': return prisma.aiDevFaqItem.findMany({ orderBy: { sortOrder: 'asc' } })
  }
}

async function createItem(section: Section, payload: unknown) {
  switch (section) {
    case 'problems': {
      const d = normalizeAiDevProblem(payload); if (!d) return null
      const e = validateAiDevProblem(d); if (Object.keys(e).length) return { errors: e }
      return prisma.aiDevProblem.create({ data: d })
    }
    case 'solutions': {
      const d = normalizeAiDevSolution(payload); if (!d) return null
      const e = validateAiDevSolution(d); if (Object.keys(e).length) return { errors: e }
      return prisma.aiDevSolution.create({ data: d })
    }
    case 'comparison': {
      const d = normalizeAiDevComparisonRow(payload); if (!d) return null
      const e = validateAiDevComparisonRow(d); if (Object.keys(e).length) return { errors: e }
      return prisma.aiDevComparisonRow.create({ data: d })
    }
    case 'packages': {
      const d = normalizeAiDevServicePackage(payload); if (!d) return null
      const e = validateAiDevServicePackage(d); if (Object.keys(e).length) return { errors: e }
      return prisma.aiDevServicePackage.create({ data: d })
    }
    case 'examples': {
      const d = normalizeAiDevExampleProject(payload); if (!d) return null
      const e = validateAiDevExampleProject(d); if (Object.keys(e).length) return { errors: e }
      return prisma.aiDevExampleProject.create({ data: d })
    }
    case 'steps': {
      const d = normalizeAiDevProcessStep(payload); if (!d) return null
      const e = validateAiDevProcessStep(d); if (Object.keys(e).length) return { errors: e }
      return prisma.aiDevProcessStep.create({ data: { ...d, badge: d.badge || null } })
    }
    case 'faq': {
      const d = normalizeAiDevFaqItem(payload); if (!d) return null
      const e = validateAiDevFaqItem(d); if (Object.keys(e).length) return { errors: e }
      return prisma.aiDevFaqItem.create({ data: d })
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
