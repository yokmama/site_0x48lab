import { motion } from 'framer-motion'
import s from './PrivacyPage.module.css'

export default function PrivacyPage() {
  return (
    <div className="page-content">
      <div className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="page-hero-label">Privacy Policy</span>
            <h1 className="page-hero-title">プライバシーポリシー</h1>
          </motion.div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <motion.div
            className={s.prose}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={s.updated}>最終更新日：2025年7月1日</p>
            <p className={s.lead}>
              株式会社ハックラボ（以下「当社」）は、お客様の個人情報の保護を重要な責務と認識し、
              個人情報の保護に関する法律（以下「個人情報保護法」）およびその他関連法令を遵守し、
              以下のプライバシーポリシーに従い個人情報を取り扱います。
            </p>

            <section className={s.policySection}>
              <h2 className={s.h2}>1. 個人情報の収集について</h2>
              <p>
                当社は、お問い合わせフォームを通じて、以下の個人情報を収集することがあります。
              </p>
              <ul className={s.list}>
                <li>氏名</li>
                <li>会社名・団体名</li>
                <li>メールアドレス</li>
                <li>電話番号</li>
                <li>その他お問い合わせ内容に含まれる情報</li>
              </ul>
            </section>

            <section className={s.policySection}>
              <h2 className={s.h2}>2. 個人情報の利用目的</h2>
              <p>収集した個人情報は、以下の目的のために利用します。</p>
              <ul className={s.list}>
                <li>お問い合わせへの対応</li>
                <li>サービスのご案内</li>
                <li>資料・見積書の送付</li>
                <li>契約の履行に必要な業務連絡</li>
              </ul>
              <p>上記の目的以外での利用は、ご本人の同意なく行いません。</p>
            </section>

            <section className={s.policySection}>
              <h2 className={s.h2}>3. 第三者提供</h2>
              <p>
                当社は、以下の場合を除き、ご本人の同意なく個人情報を第三者に提供しません。
              </p>
              <ul className={s.list}>
                <li>法令に基づく場合</li>
                <li>人の生命・身体または財産の保護のために必要がある場合</li>
                <li>国または地方公共団体等が公的な事務を実施するうえで協力する必要がある場合</li>
              </ul>
            </section>

            <section className={s.policySection}>
              <h2 className={s.h2}>4. 個人情報の管理</h2>
              <p>
                当社は、収集した個人情報について適切な安全管理措置を講じ、
                個人情報の漏洩・滅失・毀損を防止します。
                また、個人情報を取り扱う従業員および委託先に対して、
                必要かつ適切な監督を行います。
              </p>
            </section>

            <section className={s.policySection}>
              <h2 className={s.h2}>5. 個人情報の開示・訂正・削除</h2>
              <p>
                ご本人からの個人情報の開示・訂正・削除・利用停止の請求に対し、
                本人確認を行ったうえで、合理的な期間内に対応いたします。
                ご請求の手続きについては、下記のお問い合わせ窓口までご連絡ください。
              </p>
            </section>

            <section className={s.policySection}>
              <h2 className={s.h2}>6. Cookieについて</h2>
              <p>
                当社ウェブサイトでは、サービスの利便性向上および利用状況の分析のためにCookieを使用しています。
                お使いのブラウザの設定によりCookieを無効にすることができますが、
                一部の機能がご利用いただけなくなる場合があります。
              </p>
              <p>
                アクセス解析のためにGoogle Analyticsを使用しており、取得したデータは
                Googleのプライバシーポリシーに基づき管理されます。
              </p>
            </section>

            <section className={s.policySection}>
              <h2 className={s.h2}>7. プライバシーポリシーの変更</h2>
              <p>
                当社は、法令の改正その他必要に応じて本プライバシーポリシーの内容を変更することがあります。
                変更した場合は、本ページにて速やかに公表いたします。
                変更後のプライバシーポリシーは、本ページに掲載した時点から効力を生じるものとします。
              </p>
            </section>

            <section className={s.policySection}>
              <h2 className={s.h2}>8. お問い合わせ</h2>
              <p>本プライバシーポリシーに関するご質問・お問い合わせは、下記までご連絡ください。</p>
              <div className={s.contactBox}>
                <dl className={s.contactDl}>
                  <div className={s.contactRow}>
                    <dt>会社名</dt>
                    <dd>株式会社ハックラボ</dd>
                  </div>
                  <div className={s.contactRow}>
                    <dt>所在地</dt>
                    <dd>〒150-0002 東京都渋谷区渋谷2丁目19-19 和光宮益坂ビル5F</dd>
                  </div>
                  <div className={s.contactRow}>
                    <dt>メール</dt>
                    <dd>
                      <a href="mailto:info@hacklab.jp" className={s.mailLink}>info@hacklab.jp</a>
                    </dd>
                  </div>
                </dl>
              </div>
            </section>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
