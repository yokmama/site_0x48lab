"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Team.module.css'

type Member = {
  id: number
  name: string
  role: string
  photo: string | null
  photoFileId: number | null
  initials: string | null
}

const representativeImg = '/assets/representative.jpg'

const PHOTO_MAP: Record<string, string> = {
  representative: representativeImg,
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

function resolvePhoto(member: Member): string | null {
  if (member.photoFileId) return `/api/media/${member.photoFileId}`
  if (member.photo) return PHOTO_MAP[member.photo] ?? null
  return null
}

export default function Team({ members }: { members: Member[] }) {
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
    <section id="team" className={`section section--alt ${styles.section}`}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Team</span>
          <h2 ref={titleRef} className={`section-title${inView ? ' in-view' : ''}`}>
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
          {members.map((member) => {
            const photo = resolvePhoto(member)
            return (
              <motion.div
                key={member.id}
                className={styles.card}
                variants={cardVariants}
                whileHover={{ boxShadow: '0 8px 28px rgba(0,0,0,0.09)', borderColor: 'rgba(36,144,243,0.25)' }}
                transition={{ type: 'tween', duration: 0.22 }}
              >
                {photo ? (
                  <div className={styles.avatar}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo} alt={member.name} />
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
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
