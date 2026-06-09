import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { HOME_HISTORY_EVENTS } from '../../lib/data'
import styles from './History.module.css'

export default function History() {
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
    <section id="history" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">History</span>
          <h2 ref={titleRef} className={`section-title${inView ? ' in-view' : ''}`}>
            沿革
          </h2>
        </div>

        <div className={styles.timeline}>
          <div className={styles.line}>
            <motion.div
              className={styles.lineInner}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {HOME_HISTORY_EVENTS.map((event, i) => (
            <motion.div
              key={event.year}
              className={styles.entry}
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.dot} aria-hidden="true" />
              <div className={styles.entryCard}>
                <p className={styles.year}>{event.year}</p>
                <h3 className={styles.entryTitle}>{event.title}</h3>
                <p className={styles.entryDesc}>{event.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
