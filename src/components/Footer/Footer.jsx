import logoSrc from '../../assets/logo.svg'
import styles from './Footer.module.css'

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <img src={logoSrc} alt="株式会社ハックラボ" />
            </div>
            <p className={styles.address}>
              〒150-0002 東京都渋谷区渋谷2丁目19-19<br />
              和光宮益坂ビル5F
            </p>
            <p className={styles.corporateNum}>法人番号：8140001033003</p>
          </div>

          <nav className={styles.links} aria-label="フッターナビゲーション">
            <div className={styles.linkGroup}>
              <p className={styles.linkGroupTitle}>Company</p>
              <ul className={styles.linkList}>
                <li><a href="#about" className={styles.link}>会社概要</a></li>
                <li><a href="#history" className={styles.link}>沿革</a></li>
                <li><a href="#team" className={styles.link}>チーム</a></li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <p className={styles.linkGroupTitle}>Services</p>
              <ul className={styles.linkList}>
                <li><a href="#strengths" className={styles.link}>強み</a></li>
                <li><a href="#service" className={styles.link}>サービス</a></li>
                <li><a href="#school" className={styles.link}>スクール</a></li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <p className={styles.linkGroupTitle}>External</p>
              <ul className={styles.linkList}>
                <li>
                  <a href="https://8x9.jp/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                    8x9.jp
                  </a>
                </li>
                <li>
                  <a href="https://beyondjapan.com/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                    Beyond Japan
                  </a>
                </li>
                <li>
                  <a href="#contact" className={styles.link}>お問い合わせ</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>© 2025 株式会社ハックラボ All Rights Reserved.</p>
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
