import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { stagger, reveal, viewportOnce } from '../../lib/animations'
import { SERVICES } from '../../lib/data'
import ServiceIcon from '../ui/ServiceIcon'
import s from './Services.module.css'

export default function Services() {
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
    <section id="service" className="section section--alt">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Services</span>
          <h2 ref={titleRef} className={`section-title${inView ? ' in-view' : ''}`}>
            サービス
          </h2>
          <p className="section-desc">
            受託開発からモバイルアプリ、プログラミング教育まで。テクノロジーで課題を解決します。
          </p>
        </div>

        <motion.div
          className={s.grid}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {SERVICES.map((svc) => (
            <motion.div key={svc.slug} className={s.card} variants={reveal}>
              <div className={s.cardTop}>
                <div className={s.iconWrap}>
                  <ServiceIcon type={svc.icon} size={22} />
                </div>
                <span className={s.titleEn}>{svc.titleEn}</span>
              </div>
              <h3 className={s.cardTitle}>{svc.title}</h3>
              <p className={s.cardDesc}>{svc.desc}</p>
              <ul className={s.features}>
                {svc.features.map((f) => (
                  <li key={f} className={s.feature}>
                    <ServiceIcon type="check" size={13} />
                    {f}
                  </li>
                ))}
              </ul>
              <div className={s.cardFooter}>
                {svc.externalPath ? (
                  <a
                    href={svc.externalPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={s.cardLink}
                  >
                    詳細を見る
                    <ServiceIcon type="external" size={13} />
                  </a>
                ) : (
                  <Link to={svc.path} className={s.cardLink}>
                    詳細を見る
                    <ServiceIcon type="arrow" size={13} />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={s.cta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/services" className="btn btn--primary">
            すべてのサービスを見る
            <ServiceIcon type="arrow" size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
