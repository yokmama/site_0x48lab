import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './About.module.css'

const ROWS = [
  { label: '会社名', value: '株式会社ハックラボ（HackLab Inc.）' },
  { label: '法人番号', value: '8140001033003' },
  { label: '設立', value: '2010年（商号変更：2021年1月12日）' },
  { label: '代表取締役', value: '寺園聖文' },
  {
    label: '所在地',
    value: '〒150-0002 東京都渋谷区渋谷2丁目19-19 和光宮益坂ビル5F',
  },
  {
    label: '事業内容',
    value: 'システム開発・受託開発 / プログラミング教育事業 / 教材開発',
  },
]

export default function About() {
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
    <section id="about" className="section section--alt">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Company</span>
          <h2
            ref={titleRef}
            className={`section-title${inView ? ' in-view' : ''}`}
          >
            会社概要
          </h2>
        </div>

        <motion.div
          className={styles.tableWrap}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <table className={styles.table}>
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
  )
}
