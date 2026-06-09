import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import representativeImg from '../../assets/representative.jpg'
import styles from './Team.module.css'

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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function Team() {
  const titleRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="team" className="section section--alt">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Team</span>
          <h2
            ref={titleRef}
            className={`section-title${inView ? ' in-view' : ''}`}
          >
            チーム
          </h2>
        </div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {MEMBERS.map((member) => (
            <motion.div
              key={member.name}
              className={styles.card}
              variants={cardVariants}
              whileHover={{ boxShadow: '0 8px 28px rgba(0,0,0,0.09)', borderColor: 'rgba(36,144,243,0.25)' }}
              transition={{ type: 'tween', duration: 0.22 }}
            >
              {member.photo ? (
                <div className={styles.avatar}>
                  <img src={member.photo} alt={member.name} />
                </div>
              ) : (
                <div className={styles.avatarInitials} aria-label={member.name}>
                  {member.initials}
                </div>
              )}
              <div className={styles.info}>
                <p className={styles.name}>{member.name}</p>
                <p className={styles.role}>{member.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
