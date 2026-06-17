"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { HEADER_NAV } from '../../lib/data'
import s from './Header.module.css'

const logoSrc = '/assets/logo.svg'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLElement | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => {
      setMenuOpen(false)
      setOpenDropdown(null)
    }, 0)
    return () => window.clearTimeout(id)
  }, [pathname])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isActive = (path: string) => {
    if (path.includes('#')) return false
    const basePath = path.split('#')[0]
    if (basePath === '/') return pathname === '/'
    return pathname.startsWith(basePath)
  }

  return (
    <header className={`${s.header}${scrolled ? ` ${s.scrolled}` : ''}`}>
      <div className={`container ${s.inner}`}>
        <Link href="/" className={s.logo}>
          <img src={logoSrc} alt="株式会社ハックラボ" />
        </Link>

        <nav className={s.nav} ref={dropdownRef} aria-label="グローバルナビゲーション">
          {HEADER_NAV.map((item) => (
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
                <Link
                  href={item.path}
                  className={`${s.navLink}${isActive(item.path) ? ` ${s.active}` : ''}`}
                >
                  {item.label}
                </Link>
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
                        <Link key={d.path} href={d.path} className={s.dropItem}>
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

        <Link href="/contact?topic=ai-development" className={s.ctaBtn}>
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
              {HEADER_NAV.map((item) => (
                <div key={item.path}>
                  <Link href={item.path} className={`${s.mobileNavLink}${isActive(item.path) ? ` ${s.mobileNavActive}` : ''}`}>
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <div className={s.mobileSubLinks}>
                      {item.dropdown.map((d) => (
                        <Link key={d.path} href={d.path} className={s.mobileSubLink}>
                          {d.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link href="/contact?topic=ai-development" className={s.mobileCtaBtn}>
                無料相談する
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
