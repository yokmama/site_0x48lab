import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logoSrc from '../../assets/logo.svg'
import s from './Header.module.css'

const SERVICES_DROPDOWN = [
  { label: 'AI活用型受託開発', sub: 'コスト1/5〜1/10', path: '/services/ai-development' },
  { label: 'モバイルアプリ開発', sub: 'Flutter / iOS / Android', path: '/services/mobile' },
  { label: 'Webシステム開発', sub: 'React / Next.js / Java', path: '/services/web' },
  { label: 'プログラミング教育', sub: '8x9 Kids スクール', path: '/services/education' },
]

const NAV = [
  { label: 'サービス', path: '/services', dropdown: SERVICES_DROPDOWN },
  { label: '実績', path: '/works' },
  { label: '会社概要', path: '/company' },
  { label: 'ブログ', path: '/blog' },
  { label: '採用', path: '/careers' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const dropdownRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setOpenDropdown(null)
  }, [location])

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header className={`${s.header}${scrolled ? ` ${s.scrolled}` : ''}`}>
      <div className={`container ${s.inner}`}>
        <Link to="/" className={s.logo}>
          <img src={logoSrc} alt="株式会社ハックラボ" />
        </Link>

        <nav className={s.nav} ref={dropdownRef} aria-label="グローバルナビゲーション">
          {NAV.map((item) => (
            <div key={item.path} className={s.navItem}>
              {item.dropdown ? (
                <button
                  className={`${s.navBtn}${isActive(item.path) ? ` ${s.active}` : ''}`}
                  onClick={() => setOpenDropdown(openDropdown === item.path ? null : item.path)}
                  aria-expanded={openDropdown === item.path}
                >
                  {item.label}
                  <svg className={`${s.chevron}${openDropdown === item.path ? ` ${s.chevronOpen}` : ''}`} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                    <path d="M2 4l4 4 4-4" />
                  </svg>
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive: ia }) => `${s.navLink}${ia ? ` ${s.active}` : ''}`}
                >
                  {item.label}
                </NavLink>
              )}

              {item.dropdown && (
                <AnimatePresence>
                  {openDropdown === item.path && (
                    <motion.div
                      className={s.dropdown}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                    >
                      {item.dropdown.map((d) => (
                        <Link key={d.path} to={d.path} className={s.dropItem}>
                          <span className={s.dropItemLabel}>{d.label}</span>
                          <span className={s.dropItemSub}>{d.sub}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        <Link to="/contact" className={s.ctaBtn}>
          無料相談する
        </Link>

        <button
          className={`${s.hamburger}${menuOpen ? ` ${s.open}` : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={s.mobileNav}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
          >
            <nav className={s.mobileNavInner} aria-label="モバイルナビゲーション">
              {NAV.map((item) => (
                <div key={item.path}>
                  <Link to={item.path} className={`${s.mobileNavLink}${isActive(item.path) ? ` ${s.mobileNavActive}` : ''}`}>
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <div className={s.mobileSubLinks}>
                      {item.dropdown.map((d) => (
                        <Link key={d.path} to={d.path} className={s.mobileSubLink}>
                          {d.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link to="/contact" className={s.mobileCtaBtn}>
                無料相談する
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
