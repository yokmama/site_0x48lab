import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logoSrc from '../../assets/logo.svg'
import styles from './Header.module.css'

const NAV_LINKS = [
  { label: '会社概要', href: '#about' },
  { label: '強み', href: '#strengths' },
  { label: 'サービス', href: '#service' },
  { label: '沿革', href: '#history' },
  { label: 'チーム', href: '#team' },
  { label: 'スクール', href: '#school' },
  { label: 'お問い合わせ', href: '#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <header className={`${styles.header}${scrolled ? ` ${styles.scrolled}` : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.logo} onClick={(e) => handleNavClick(e, '#root')}>
          <img src={logoSrc} alt="株式会社ハックラボ" />
        </a>

        <nav className={styles.nav} aria-label="グローバルナビゲーション">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.navLink}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className={`${styles.hamburger}${menuOpen ? ` ${styles.open}` : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileNav}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
          >
            <nav className={styles.mobileNavInner} aria-label="モバイルナビゲーション">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
