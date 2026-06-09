import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { stagger, reveal, viewportOnce } from '../lib/animations'
import representativeImg from '../assets/representative.jpg'
import s from './CompanyPage.module.css'

const ROWS = [
  { label: '会社名', value: '株式会社ハックラボ（HackLab Inc.）' },
  { label: '法人番号', value: '8140001033003' },
  { label: '設立', value: '2010年（商号変更：2021年1月12日）' },
  { label: '代表取締役', value: '寺園聖文' },
  { label: '所在地', value: '〒150-0002 東京都渋谷区渋谷2丁目19-19 和光宮益坂ビル5F' },
  { label: '事業内容', value: 'システム開発・受託開発 / プログラミング教育事業 / 教材開発' },
]

const HISTORY = [
  {
    year: '2010年',
    title: '株式会社Re.Kayo-System 設立',
    desc: '神戸にてWebシステム開発会社として創業。JavaサーバーサイドやXML、Androidアプリ開発を中心に事業展開。',
  },
  {
    year: '2012年',
    title: '技術書を出版',
    desc: '翔泳社より「10日でおぼえるAndroidアプリ開発入門教室」を出版。教育事業へ本格参入。',
  },
  {
    year: '2016年1月',
    title: '8x9 Kids プログラミングスクール 開校',
    desc: null,
  },
  {
    year: '2021年1月',
    title: '株式会社ハックラボへ商号変更',
    desc: null,
  },
  {
    year: '2025年7月',
    title: '東京・渋谷へ本社移転',
    desc: null,
  },
]

const MEMBERS = [
  {
    name: '寺園 聖文',
    role: 'Representative Director / CEO',
    photo: representativeImg,
    initials: null,
  },
  {
    name: 'Maciej Nowakiewicz',
    role: 'CTO',
    photo: null,
    initials: 'MN',
  },
]

const STRENGTHS = [
  {
    title: 'モバイルアプリ開発',
    desc: 'Android黎明期からの深い実績を持ち、FlutterによるiOS/Android両対応開発を提供。',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    title: 'AI活用開発',
    desc: '設計から開発・テストまでAIを活用した効率的な開発プロセスにより、仕様変更にも柔軟に対応。',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: 'プログラミング教育',
    desc: 'スクール運営で培った知識を活かし、マインクラフトを使った教材・カリキュラム開発まで対応。',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
]

const STATS = [
  { num: '15+', label: '年の開発実績' },
  { num: '300+', label: 'プロジェクト' },
  { num: '4', label: 'つのサービス領域' },
  { num: '2016年〜', label: '教育事業' },
]

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
  return [ref, inView]
}

export default function CompanyPage() {
  const [missionRef, missionIn] = useTitleInView()
  const [overviewRef, overviewIn] = useTitleInView()
  const [historyRef, historyIn] = useTitleInView()
  const [teamRef, teamIn] = useTitleInView()
  const [strengthsRef, strengthsIn] = useTitleInView()

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <motion.span
            className="page-hero-label"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Company
          </motion.span>
          <motion.h1
            className="page-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            会社概要
          </motion.h1>
          <motion.p
            className="page-hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            テクノロジーで未来を創造する株式会社ハックラボ（HackLab Inc.）
          </motion.p>
        </div>
      </div>

      <section className={`section section--alt ${s.statsSection}`}>
        <div className="container">
          <motion.div
            className={s.statsStrip}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {STATS.map((stat) => (
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
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <table className={s.table}>
              <tbody>
                {ROWS.map((row) => (
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
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            {HISTORY.map((event, i) => (
              <motion.div
                key={event.year}
                className={s.timelineEntry}
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
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
            {MEMBERS.map((member) => (
              <motion.div
                key={member.name}
                className={s.teamCard}
                variants={reveal}
                whileHover={{ boxShadow: '0 8px 28px rgba(0,0,0,0.09)', borderColor: 'rgba(36,144,243,0.25)' }}
                transition={{ type: 'tween', duration: 0.22 }}
              >
                {member.photo ? (
                  <div className={s.teamAvatar}>
                    <img src={member.photo} alt={member.name} />
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
            ))}
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
            {STRENGTHS.map((item) => (
              <motion.div
                key={item.title}
                className={s.strengthCard}
                variants={reveal}
                whileHover={{ y: -6, boxShadow: '0 12px 36px rgba(0,0,0,0.10)', borderColor: 'rgba(36,144,243,0.3)' }}
                transition={{ type: 'tween', duration: 0.22 }}
              >
                <div className={s.strengthIconWrap}>{item.icon}</div>
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
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={s.ctaText}>プロジェクトのご相談はお気軽にどうぞ</p>
            <Link to="/contact" className="btn btn--primary btn--lg">お問い合わせ</Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
