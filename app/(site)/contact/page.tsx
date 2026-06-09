"use client"

import { motion } from 'framer-motion'
import { CONTACT_PROCESS } from '@/lib/data'
import { revealLeft, revealRight, viewportOnce } from '@/lib/animations'
import ContactForm from '@/components/ContactForm/ContactForm'
import s from './page.module.css'

export default function ContactPage() {
  return (
    <div className="page-content">
      <div className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <span className="page-hero-label">Contact</span>
            <h1 className="page-hero-title">お問い合わせ・無料相談</h1>
            <p className="page-hero-sub">まずはお気軽にご相談ください。ヒアリング・簡易見積もりまで無料。</p>
          </motion.div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={s.layout}>
            <motion.div
              className={s.info}
              variants={revealLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <div className={s.infoBlock}>
                <h2 className={s.infoTitle}>無料相談の流れ</h2>
                <ol className={s.processList}>
                  {CONTACT_PROCESS.map((step, i) => (
                    <li key={step.num} className={s.processItem}>
                      <div className={s.processConnector}>
                        <div className={s.processNum}>{step.num}</div>
                        {i < CONTACT_PROCESS.length - 1 && <div className={s.processLine} aria-hidden="true" />}
                      </div>
                      <div className={s.processBody}>
                        <p className={s.processLabel}>{step.label}</p>
                        <p className={s.processDesc}>{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className={s.infoBlock}>
                <h2 className={s.infoTitle}>お電話でのお問い合わせ</h2>
                <div className={s.phoneNotice}>
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="16" height="16">
                    <circle cx="10" cy="10" r="9" />
                    <path d="M10 6v4M10 14h.01" />
                  </svg>
                  <p>電話対応は現在承っておりません。フォームよりお問い合わせください。</p>
                </div>
              </div>

              <div className={s.infoBlock}>
                <h2 className={s.infoTitle}>所在地</h2>
                <address className={s.address}>
                  <span className={s.postcode}>〒150-0002</span>
                  東京都渋谷区渋谷2丁目19-19<br />
                  和光宮益坂ビル5F
                </address>
              </div>
            </motion.div>

            <motion.div
              className={s.formWrap}
              variants={revealRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <div className={s.formCard}>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
