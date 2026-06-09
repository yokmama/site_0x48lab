import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import s from './ContactForm.module.css'

const FORMSPREE_ID = 'REPLACE_WITH_YOUR_FORMSPREE_ID'

export default function ContactForm({ dark = false }) {
  const [fields, setFields] = useState({
    company: '', name: '', email: '', phone: '', message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState(false)

  const validate = () => {
    const e = {}
    if (!fields.company.trim()) e.company = '会社名・団体名を入力してください'
    if (!fields.name.trim()) e.name = 'お名前を入力してください'
    if (!fields.email.trim()) e.email = 'メールアドレスを入力してください'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = '正しいメールアドレスを入力してください'
    if (!fields.message.trim()) e.message = 'お問い合わせ内容を入力してください'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setServerError(false)
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setServerError(true)
      }
    } catch {
      setServerError(true)
    } finally {
      setLoading(false)
    }
  }

  const set = (key) => (e) => {
    setFields((f) => ({ ...f, [key]: e.target.value }))
    setErrors((er) => { const n = { ...er }; delete n[key]; return n })
  }

  if (submitted) {
    return (
      <motion.div
        className={s.thankYou}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className={s.thankYouIcon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <p className={s.thankYouTitle}>送信が完了しました</p>
        <p className={s.thankYouDesc}>
          お問い合わせありがとうございます。<br />
          内容を確認のうえ、担当者よりご連絡いたします。
        </p>
      </motion.div>
    )
  }

  const inputClass = (key) => `${s.input}${errors[key] ? ` ${s.inputError}` : ''}${dark ? ` ${s.inputDark}` : ''}`

  return (
    <form className={`${s.form}${dark ? ` ${s.formDark}` : ''}`} onSubmit={handleSubmit} noValidate>
      {[
        { key: 'company', label: '会社名・団体名', required: true, placeholder: '例：株式会社〇〇', maxLength: 100 },
        { key: 'name', label: 'お名前', required: true, placeholder: '例：山田 太郎', maxLength: 50 },
        { key: 'email', label: 'メールアドレス', required: true, placeholder: '例：info@example.com', type: 'email' },
        { key: 'phone', label: '電話番号', required: false, placeholder: '例：090-1234-5678', type: 'tel' },
      ].map(({ key, label, required, placeholder, type = 'text', maxLength }) => (
        <div className={s.group} key={key}>
          <label className={`${s.label}${dark ? ` ${s.labelDark}` : ''}`}>
            {label}
            {required && <span className={s.required}>必須</span>}
          </label>
          <input
            type={type}
            className={inputClass(key)}
            value={fields[key]}
            onChange={set(key)}
            placeholder={placeholder}
            maxLength={maxLength}
          />
          <AnimatePresence>
            {errors[key] && (
              <motion.p
                className={s.errorMsg}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {errors[key]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      ))}

      <div className={s.group}>
        <label className={`${s.label}${dark ? ` ${s.labelDark}` : ''}`}>
          お問い合わせ内容 <span className={s.required}>必須</span>
        </label>
        <textarea
          className={`${s.textarea}${errors.message ? ` ${s.inputError}` : ''}${dark ? ` ${s.inputDark}` : ''}`}
          value={fields.message}
          onChange={set('message')}
          placeholder="例：顧客管理システムの開発を検討しています。現状の課題や要件をお聞かせください。"
          maxLength={1000}
          rows={5}
        />
        <AnimatePresence>
          {errors.message && (
            <motion.p className={s.errorMsg} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {errors.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {serverError && (
        <p className={s.serverError}>送信に失敗しました。しばらくしてから再度お試しください。</p>
      )}

      <button type="submit" className={s.submit} disabled={loading}>
        {loading
          ? <span className={s.spinner} aria-label="送信中" />
          : '無料相談を申し込む'}
      </button>

      <p className={`${s.note}${dark ? ` ${s.noteDark}` : ''}`}>
        ヒアリング・簡易見積もりまで無料です。お気軽にご相談ください。
      </p>
    </form>
  )
}
