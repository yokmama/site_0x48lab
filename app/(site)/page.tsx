import { prisma } from '@/lib/db'
import Hero from '@/components/Hero/Hero'
import Strengths from '@/components/Strengths/Strengths'
import Services from '@/components/Services/Services'
import History from '@/components/History/History'
import Team from '@/components/Team/Team'
import School from '@/components/School/School'
import Contact from '@/components/Contact/Contact'
import HomeWorks from '@/components/HomeWorks/HomeWorks'
import HomeBlog from '@/components/HomeBlog/HomeBlog'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const members = await prisma.teamMember.findMany({ orderBy: { sortOrder: 'asc' } })
  return (
    <>
      <Hero />
      <Strengths />
      <Services />
      <HomeWorks />
      <History />
      <Team members={members} />
      <School />
      <HomeBlog />
      <Contact />
    </>
  )
}
