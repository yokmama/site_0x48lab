import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ContactForm from '../ContactForm/ContactForm'
import s from './Contact.module.css'

export default function Contact() {
  const titleRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="contact" className={`section ${s.section}`}>
      <div className="container">
        <div className="section-header">
          <span className={`section-label section-label--light`}>Contact</span>
          <h2
            ref={titleRef}
            className={`${s.sectionTitle}${inView ? ` ${s.inView}` : ''}`}
          >
            お問い合わせ
          </h2>
          <p className={s.lead}>
            ヒアリング・簡易見積もりまで無料です。お気軽にご相談ください。
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <ContactForm dark />
        </motion.div>
      </div>
    </section>
  )
}
