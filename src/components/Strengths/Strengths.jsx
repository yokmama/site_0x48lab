import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { HOME_STRENGTHS } from '../../lib/data'
import { stagger, reveal, viewportOnce } from '../../lib/animations'
import ServiceIcon from '../ui/ServiceIcon'
import styles from './Strengths.module.css'

export default function Strengths() {
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
    <section id="strengths" className="section section--alt">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Strengths</span>
          <h2 ref={titleRef} className={`section-title${inView ? ' in-view' : ''}`}>
            私たちの強み
          </h2>
          <p className="section-desc">
            創業15年以上で積み上げたノウハウと、最新のAI技術を融合させたサービスを提供します。
          </p>
        </div>

        <motion.div
          className={styles.grid}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {HOME_STRENGTHS.map(({ icon, title, desc }) => (
            <motion.div
              key={title}
              className={styles.card}
              variants={reveal}
              whileHover={{ y: -6, boxShadow: '0 12px 36px rgba(0,0,0,0.10)', borderColor: 'rgba(36,144,243,0.3)' }}
              transition={{ type: 'tween', duration: 0.22 }}
            >
              <div className={styles.iconWrap}>
                <ServiceIcon type={icon} />
              </div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDesc}>{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
