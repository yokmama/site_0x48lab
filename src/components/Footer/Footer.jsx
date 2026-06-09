import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const YEAR = new Date().getFullYear()

const FOOTER_NAV = [
  {
    title: 'Services',
    links: [
      { label: 'AI活用型受託開発', to: '/services/ai-development' },
      { label: 'モバイルアプリ開発', to: '/services/mobile' },
      { label: 'Webシステム開発', to: '/services/web' },
      { label: 'プログラミング教育', to: '/services/education' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: '会社概要', to: '/company' },
      { label: '実績・事例', to: '/works' },
      { label: 'ブログ', to: '/blog' },
      { label: '採用情報', to: '/careers' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'お問い合わせ', to: '/contact' },
      { label: 'プライバシーポリシー', to: '/privacy' },
      { label: '8x9.jp', href: 'https://8x9.jp/', external: true },
    ],
  },
]

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <img src="/logo-footer.svg" alt="株式会社ハックラボ" />
            </div>
            <p className={styles.tagline}>テクノロジーで未来を創造する</p>
            <p className={styles.address}>
              〒150-0002 東京都渋谷区渋谷2丁目19-19<br />
              和光宮益坂ビル5F
            </p>
            <p className={styles.corporateNum}>法人番号：8140001033003</p>

            <div className={styles.social}>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter/X">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.256 5.622 5.908-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </div>
          </div>

          <nav className={styles.links} aria-label="フッターナビゲーション">
            {FOOTER_NAV.map((group) => (
              <div key={group.title} className={styles.linkGroup}>
                <p className={styles.linkGroupTitle}>{group.title}</p>
                <ul className={styles.linkList}>
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                          {link.label}
                        </a>
                      ) : (
                        <Link to={link.to} className={styles.link}>{link.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {YEAR} 株式会社ハックラボ All Rights Reserved.
          </p>
          <div className={styles.legalLinks}>
            <Link to="/privacy" className={styles.legalLink}>プライバシーポリシー</Link>
          </div>
          <button className={styles.backTop} onClick={scrollTop} aria-label="ページトップへ戻る">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 13V3M3 8l5-5 5 5" />
            </svg>
            PAGE TOP
          </button>
        </div>
      </div>
    </footer>
  )
}
