import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Contact.module.css'

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScvRv7GRD_amzFjgmpO6VWGWyy5f1K6HuIdd3wyqVnsyZiBgA/viewform?embedded=true'

export default function Contact() {
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
    <section id="contact" className={`section ${styles.section}`}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Contact</span>
          <h2
            ref={titleRef}
            className={`${styles.sectionTitle}${inView ? ` ${styles.inView}` : ''}`}
          >
            お問い合わせ
          </h2>
          <p className={styles.lead}>
            お気軽にお問い合わせください
          </p>
        </div>

        <motion.div
          className={styles.formWrap}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <iframe
            src={FORM_URL}
            title="お問い合わせフォーム"
            loading="lazy"
          >
            読み込んでいます…
          </iframe>
        </motion.div>
      </div>
    </section>
  )
}
