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

async function updateItem(section: Section, id: number, payload: unknown) {
  switch (section) {
    case 'problems': {
      const d = normalizeAiDevProblem(payload); if (!d) return null
      const e = validateAiDevProblem(d); if (Object.keys(e).length) return { errors: e }
      return prisma.aiDevProblem.update({ where: { id }, data: d })
    }
    case 'solutions': {
      const d = normalizeAiDevSolution(payload); if (!d) return null
      const e = validateAiDevSolution(d); if (Object.keys(e).length) return { errors: e }
      return prisma.aiDevSolution.update({ where: { id }, data: d })
    }
    case 'comparison': {
      const d = normalizeAiDevComparisonRow(payload); if (!d) return null
      const e = validateAiDevComparisonRow(d); if (Object.keys(e).length) return { errors: e }
      return prisma.aiDevComparisonRow.update({ where: { id }, data: d })
    }
    case 'packages': {
      const d = normalizeAiDevServicePackage(payload); if (!d) return null
      const e = validateAiDevServicePackage(d); if (Object.keys(e).length) return { errors: e }
      return prisma.aiDevServicePackage.update({ where: { id }, data: d })
    }
    case 'examples': {
      const d = normalizeAiDevExampleProject(payload); if (!d) return null
      const e = validateAiDevExampleProject(d); if (Object.keys(e).length) return { errors: e }
      return prisma.aiDevExampleProject.update({ where: { id }, data: d })
    }
    case 'steps': {
      const d = normalizeAiDevProcessStep(payload); if (!d) return null
      const e = validateAiDevProcessStep(d); if (Object.keys(e).length) return { errors: e }
      return prisma.aiDevProcessStep.update({ where: { id }, data: { ...d, badge: d.badge || null } })
    }
    case 'faq': {
      const d = normalizeAiDevFaqItem(payload); if (!d) return null
      const e = validateAiDevFaqItem(d); if (Object.keys(e).length) return { errors: e }
      return prisma.aiDevFaqItem.update({ where: { id }, data: d })
    }
  }
}

async function deleteItem(section: Section, id: number) {
  switch (section) {
    case 'problems': return prisma.aiDevProblem.delete({ where: { id } })
    case 'solutions': return prisma.aiDevSolution.delete({ where: { id } })
    case 'comparison': return prisma.aiDevComparisonRow.delete({ where: { id } })
    case 'packages': return prisma.aiDevServicePackage.delete({ where: { id } })
    case 'examples': return prisma.aiDevExampleProject.delete({ where: { id } })
    case 'steps': return prisma.aiDevProcessStep.delete({ where: { id } })
    case 'faq': return prisma.aiDevFaqItem.delete({ where: { id } })
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
