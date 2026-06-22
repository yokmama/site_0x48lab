import { TEAM_MEMBERS } from '@/lib/data'
import Hero from '@/components/Hero/Hero'
import Strengths from '@/components/Strengths/Strengths'
import Services from '@/components/Services/Services'
import History from '@/components/History/History'
import Team from '@/components/Team/Team'
import School from '@/components/School/School'
import Contact from '@/components/Contact/Contact'
import HomeWorks from '@/components/HomeWorks/HomeWorks'
import HomeBlog from '@/components/HomeBlog/HomeBlog'
import HomeDecisionSupport from '@/components/HomeDecisionSupport/HomeDecisionSupport'

export default function HomePage() {
  const members = TEAM_MEMBERS.map((m, i) => ({
    id: i + 1,
    name: m.name,
    role: m.role,
    photo: m.photo ?? null,
    photoFileId: null,
    initials: m.initials ?? null,
  }))
  return (
    <>
      <Hero />
      <Strengths />
      <Services />
      <HomeWorks />
      <HomeDecisionSupport />
      <Contact />
      <History />
      <Team members={members} />
      <School />
      <HomeBlog />
    </>
  )
}
