"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ABOUT_ROWS,
  COMPANY_HISTORY,
  COMPANY_MEMBERS,
  COMPANY_PAGE_STATS,
  COMPANY_PAGE_STRENGTHS,
} from '@/lib/data'
import { stagger, reveal, viewportOnce } from '@/lib/animations'
import ServiceIcon from '@/components/ui/ServiceIcon'
import PageVisualHero from '@/components/PageVisualHero/PageVisualHero'
import s from './page.module.css'

const representativeImg = '/assets/representative.jpg'

const PHOTO_MAP = {
  representative: representativeImg,
}

function useTitleInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, inView] as const
}

export default function CompanyPage() {
  const [missionRef, missionIn] = useTitleInView()
  const [overviewRef, overviewIn] = useTitleInView()
  const [historyRef, historyIn] = useTitleInView()
  const [teamRef, teamIn] = useTitleInView()
  const [strengthsRef, strengthsIn] = useTitleInView()

  return (
    <div>
      <PageVisualHero
        visualKey="company"
        label="Company"
        title="会社概要"
        subtitle="テクノロジーで未来を創造する株式会社ハックラボ（HackLab Inc.）"
      />

      <section className={`section section--alt ${s.statsSection}`}>
        <div className="container">
          <motion.div
            className={s.statsStrip}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {COMPANY_PAGE_STATS.map((stat) => (
              <motion.div key={stat.label} className={s.statItem} variants={reveal}>
                <p className={s.statNum}>{stat.num}</p>
                <p className={s.statLabel}>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Mission</span>
            <h2 ref={missionRef} className={`section-title${missionIn ? ' in-view' : ''}`}>
              私たちについて
            </h2>
          </div>
          <motion.p
            className={s.missionText}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            株式会社ハックラボは2010年の創業以来、Webシステム・モバイルアプリ・業務システムを中心に300件以上のプロジェクトを手がけてきました。生成AIの進化を活用し、従来の1/5〜1/10のコストと納期で高品質なシステム開発を実現しています。
          </motion.p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Overview</span>
            <h2 ref={overviewRef} className={`section-title${overviewIn ? ' in-view' : ''}`}>
              会社概要
            </h2>
          </div>
          <motion.div
            className={s.tableWrap}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <table className={s.table}>
              <tbody>
                {ABOUT_ROWS.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">History</span>
            <h2 ref={historyRef} className={`section-title${historyIn ? ' in-view' : ''}`}>
              沿革
            </h2>
          </div>
          <div className={s.timeline}>
            <div className={s.timelineLine}>
              <motion.div
                className={s.timelineLineInner}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
              />
            </div>
            {COMPANY_HISTORY.map((event, i) => (
              <motion.div
                key={event.year}
                className={s.timelineEntry}
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
              >
                <span className={s.timelineDot} aria-hidden="true" />
                <div className={s.timelineCard}>
                  <p className={s.timelineYear}>{event.year}</p>
                  <h3 className={s.timelineTitle}>{event.title}</h3>
                  {event.desc && <p className={s.timelineDesc}>{event.desc}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Team</span>
            <h2 ref={teamRef} className={`section-title${teamIn ? ' in-view' : ''}`}>
              チーム
            </h2>
          </div>
          <motion.div
            className={s.teamGrid}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {COMPANY_MEMBERS.map((member) => {
              const photo = member.photo ? PHOTO_MAP[member.photo] : null
              return (
              <motion.div
                key={member.name}
                className={s.teamCard}
                variants={reveal}
                whileHover={{ boxShadow: '0 8px 28px rgba(0,0,0,0.09)', borderColor: 'rgba(36,144,243,0.25)' }}
                transition={{ type: 'tween', duration: 0.22 }}
              >
                {photo ? (
                  <div className={s.teamAvatar}>
                    <img src={photo} alt={member.name} />
                  </div>
                ) : (
                  <div className={s.teamAvatarInitials} aria-label={member.name}>
                    {member.initials}
                  </div>
                )}
                <div className={s.teamInfo}>
                  <p className={s.teamName}>{member.name}</p>
                  <p className={s.teamRole}>{member.role}</p>
                </div>
              </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Strengths</span>
            <h2 ref={strengthsRef} className={`section-title${strengthsIn ? ' in-view' : ''}`}>
              私たちの強み
            </h2>
          </div>
          <motion.div
            className={s.strengthsGrid}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {COMPANY_PAGE_STRENGTHS.map((item) => (
              <motion.div
                key={item.title}
                className={s.strengthCard}
                variants={reveal}
                whileHover={{ y: -6, boxShadow: '0 12px 36px rgba(0,0,0,0.10)', borderColor: 'rgba(36,144,243,0.3)' }}
                transition={{ type: 'tween', duration: 0.22 }}
              >
                <div className={s.strengthIconWrap}>
                  <ServiceIcon type={item.icon} />
                </div>
                <h3 className={s.strengthTitle}>{item.title}</h3>
                <p className={s.strengthDesc}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className={`section section--alt ${s.ctaSection}`}>
        <div className="container">
          <motion.div
            className={s.ctaInner}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <p className={s.ctaText}>プロジェクトのご相談はお気軽にどうぞ</p>
            <Link href="/contact" className="btn btn--primary btn--lg">お問い合わせ</Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
