import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'
import {
  BLOG_POSTS,
  WORKS,
  AI_DEV_PROBLEMS,
  AI_DEV_SOLUTIONS,
  AI_DEV_COMPARISON_ROWS,
  AI_DEV_SERVICE_PACKAGES,
  AI_DEV_EXAMPLE_PROJECTS,
  AI_DEV_PROCESS_STEPS,
  AI_DEV_FAQ_ITEMS,
  LP_PROBLEMS,
  LP_SOLUTIONS,
  LP_COMPARISON_ROWS,
  LP_PRICING,
  LP_RESULTS,
  LP_FAQ_ITEMS,
  JOB_OPENINGS,
  TEAM_MEMBERS,
} from '../lib/data'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database from data.ts...')

  for (const [i, post] of BLOG_POSTS.entries()) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      create: {
        slug: post.slug,
        category: post.category,
        title: post.title,
        excerpt: post.excerpt,
        date: new Date(post.date),
        readCount: post.readCount,
        published: true,
        sortOrder: i,
      },
      update: {},
    })
  }
  console.log(`  BlogPost: ${BLOG_POSTS.length} records`)

  for (const [i, work] of WORKS.entries()) {
    await prisma.work.upsert({
      where: { slug: work.slug },
      create: {
        slug: work.slug,
        industry: work.industry,
        service: work.service,
        title: work.title,
        summary: work.summary,
        challenge: work.challenge,
        solution: work.solution,
        tech: work.tech,
        beforePeriod: work.before.period,
        beforeQuality: work.before.quality,
        afterPeriod: work.after.period,
        afterQuality: work.after.quality,
        impact: work.impact,
        link: work.link ?? null,
        published: true,
        sortOrder: i,
      },
      update: {},
    })
  }
  console.log(`  Work: ${WORKS.length} records`)

  const aiDevProblemCount = await prisma.aiDevProblem.count()
  if (aiDevProblemCount === 0) {
    await prisma.aiDevProblem.createMany({
      data: AI_DEV_PROBLEMS.map((p, i) => ({ title: p.title, desc: p.desc, sortOrder: i })),
    })
  }
  console.log(`  AiDevProblem: ${AI_DEV_PROBLEMS.length} records`)

  const aiDevSolutionCount = await prisma.aiDevSolution.count()
  if (aiDevSolutionCount === 0) {
    await prisma.aiDevSolution.createMany({
      data: AI_DEV_SOLUTIONS.map((s, i) => ({ num: s.num, title: s.title, desc: s.desc, sortOrder: i })),
    })
  }
  console.log(`  AiDevSolution: ${AI_DEV_SOLUTIONS.length} records`)

  const aiDevCompCount = await prisma.aiDevComparisonRow.count()
  if (aiDevCompCount === 0) {
    await prisma.aiDevComparisonRow.createMany({
      data: AI_DEV_COMPARISON_ROWS.map((r, i) => ({ item: r.item, traditional: r.traditional, ours: r.ours, sortOrder: i })),
    })
  }
  console.log(`  AiDevComparisonRow: ${AI_DEV_COMPARISON_ROWS.length} records`)

  const aiDevPkgCount = await prisma.aiDevServicePackage.count()
  if (aiDevPkgCount === 0) {
    await prisma.aiDevServicePackage.createMany({
      data: AI_DEV_SERVICE_PACKAGES.map((p, i) => ({ title: p.title, delivery: p.delivery, items: p.items, sortOrder: i })),
    })
  }
  console.log(`  AiDevServicePackage: ${AI_DEV_SERVICE_PACKAGES.length} records`)

  const aiDevExCount = await prisma.aiDevExampleProject.count()
  if (aiDevExCount === 0) {
    await prisma.aiDevExampleProject.createMany({
      data: AI_DEV_EXAMPLE_PROJECTS.map((p, i) => ({
        industry: p.industry,
        title: p.title,
        delivery: p.delivery,
        quality: p.quality,
        desc: p.desc,
        sortOrder: i,
      })),
    })
  }
  console.log(`  AiDevExampleProject: ${AI_DEV_EXAMPLE_PROJECTS.length} records`)

  const aiDevStepCount = await prisma.aiDevProcessStep.count()
  if (aiDevStepCount === 0) {
    await prisma.aiDevProcessStep.createMany({
      data: AI_DEV_PROCESS_STEPS.map((s, i) => ({
        num: s.num,
        title: s.title,
        desc: s.desc,
        badge: s.badge ?? null,
        sortOrder: i,
      })),
    })
  }
  console.log(`  AiDevProcessStep: ${AI_DEV_PROCESS_STEPS.length} records`)

  const aiDevFaqCount = await prisma.aiDevFaqItem.count()
  if (aiDevFaqCount === 0) {
    await prisma.aiDevFaqItem.createMany({
      data: AI_DEV_FAQ_ITEMS.map((f, i) => ({ q: f.q, a: f.a, sortOrder: i })),
    })
  }
  console.log(`  AiDevFaqItem: ${AI_DEV_FAQ_ITEMS.length} records`)

  const lpProblemCount = await prisma.lpProblem.count()
  if (lpProblemCount === 0) {
    await prisma.lpProblem.createMany({
      data: LP_PROBLEMS.map((text, i) => ({ text, sortOrder: i })),
    })
  }
  console.log(`  LpProblem: ${LP_PROBLEMS.length} records`)

  const lpSolutionCount = await prisma.lpSolution.count()
  if (lpSolutionCount === 0) {
    await prisma.lpSolution.createMany({
      data: LP_SOLUTIONS.map((s, i) => ({ num: s.num, title: s.title, desc: s.desc, sortOrder: i })),
    })
  }
  console.log(`  LpSolution: ${LP_SOLUTIONS.length} records`)

  const lpCompCount = await prisma.lpComparisonRow.count()
  if (lpCompCount === 0) {
    await prisma.lpComparisonRow.createMany({
      data: LP_COMPARISON_ROWS.map((r, i) => ({ item: r.item, traditional: r.traditional, ours: r.ours, sortOrder: i })),
    })
  }
  console.log(`  LpComparisonRow: ${LP_COMPARISON_ROWS.length} records`)

  const lpPricingCount = await prisma.lpPricing.count()
  if (lpPricingCount === 0) {
    await prisma.lpPricing.createMany({
      data: LP_PRICING.map((p, i) => ({
        title: p.title,
        price: p.price,
        fromPrice: p.from,
        items: p.items,
        sortOrder: i,
      })),
    })
  }
  console.log(`  LpPricing: ${LP_PRICING.length} records`)

  const lpResultCount = await prisma.lpResult.count()
  if (lpResultCount === 0) {
    await prisma.lpResult.createMany({
      data: LP_RESULTS.map((r, i) => ({
        industry: r.industry,
        title: r.title,
        beforeCost: r.before.cost,
        beforePeriod: r.before.period,
        afterCost: r.after.cost,
        afterPeriod: r.after.period,
        saving: r.saving,
        sortOrder: i,
      })),
    })
  }
  console.log(`  LpResult: ${LP_RESULTS.length} records`)

  const lpFaqCount = await prisma.lpFaqItem.count()
  if (lpFaqCount === 0) {
    await prisma.lpFaqItem.createMany({
      data: LP_FAQ_ITEMS.map((f, i) => ({ q: f.q, a: f.a, sortOrder: i })),
    })
  }
  console.log(`  LpFaqItem: ${LP_FAQ_ITEMS.length} records`)

  for (const [i, job] of JOB_OPENINGS.entries()) {
    await prisma.jobOpening.upsert({
      where: { id: job.id },
      create: {
        id: job.id,
        title: job.title,
        type: job.type,
        location: job.location,
        tags: job.tags,
        desc: job.desc,
        published: true,
        sortOrder: i,
      },
      update: {},
    })
  }
  console.log(`  JobOpening: ${JOB_OPENINGS.length} records`)

  const teamCount = await prisma.teamMember.count()
  if (teamCount === 0) {
    await prisma.teamMember.createMany({
      data: TEAM_MEMBERS.map((m, i) => ({
        name: m.name,
        role: m.role,
        photo: m.photo ?? null,
        initials: m.initials ?? null,
        sortOrder: i,
      })),
    })
  }
  console.log(`  TeamMember: ${TEAM_MEMBERS.length} records`)

  console.log('Seed complete.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
