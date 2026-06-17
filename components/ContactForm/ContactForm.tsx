"use client"

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  validateContactRequest,
  type ContactFormErrors,
  type ContactRequest,
  type ContactResponse,
} from '../../lib/contact'
import s from './ContactForm.module.css'

type ContactFormProps = {
  dark?: boolean
}

const contactFields: Array<{
  key: 'company' | 'name' | 'email' | 'phone'
  label: string
  required: boolean
  placeholder: string
  type?: string
  maxLength?: number
}> = [
  { key: 'company', label: '会社名・団体名', required: true, placeholder: '例：株式会社〇〇', maxLength: 100 },
  { key: 'name', label: 'お名前', required: true, placeholder: '例：山田 太郎', maxLength: 50 },
  { key: 'email', label: 'メールアドレス', required: true, placeholder: '例：info@example.com', type: 'email' },
  { key: 'phone', label: '電話番号', required: false, placeholder: '例：090-1234-5678', type: 'tel' },
]

const inquiryOptions = [
  { value: 'ai-development', label: 'AI活用型の業務システム開発' },
  { value: 'business-system', label: '業務システム・社内DX' },
  { value: 'web-mobile', label: 'Web / モバイルアプリ開発' },
  { value: 'education', label: '教育・教材開発' },
  { value: 'other', label: 'その他の相談' },
]

const budgetOptions = [
  { value: 'undecided', label: '未定・相談して決めたい' },
  { value: 'under-100', label: '100万円未満' },
  { value: '100-300', label: '100万〜300万円' },
  { value: '300-500', label: '300万〜500万円' },
  { value: '500-plus', label: '500万円以上' },
]

const timelineOptions = [
  { value: 'asap', label: 'できるだけ早く' },
  { value: '1-3months', label: '1〜3ヶ月以内' },
  { value: '3-6months', label: '3〜6ヶ月以内' },
  { value: 'undecided', label: '時期は未定' },
]

type ContactInputElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

export default function ContactForm({ dark = false }: ContactFormProps) {
  const [fields, setFields] = useState<ContactRequest>({
    company: '',
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    budgetRange: '',
    timeline: '',
    message: '',
    sourcePath: '',
    utm: undefined,
    privacyConsent: false,
    website: '',
  })
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [inquiryId, setInquiryId] = useState('')
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState(false)

  useEffect(() => {
    const url = new URL(window.location.href)
    const topic = url.searchParams.get('topic') || ''
    const utm: Record<string, string> = {}
    for (const [key, value] of url.searchParams.entries()) {
      if (key.startsWith('utm_')) utm[key] = value
    }

    setFields((current) => ({
      ...current,
      inquiryType: current.inquiryType || (inquiryOptions.some((option) => option.value === topic) ? topic : ''),
      sourcePath: `${url.pathname}${url.search}`,
      utm: Object.keys(utm).length > 0 ? utm : undefined,
    }))
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errs = validateContactRequest(fields)
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setLoading(true)
    setServerError(false)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      })
      const data = await res.json() as ContactResponse
      if (res.ok && data.ok) {
        setInquiryId(data.inquiryId)
        setSubmitted(true)
      } else {
        if ('fieldErrors' in data && data.fieldErrors) {
          setErrors(data.fieldErrors)
        } else {
          setServerError(true)
        }
      }
    } catch {
      setServerError(true)
    } finally {
      setLoading(false)
    }
  }

  const set = (key: keyof ContactRequest) => (e: ChangeEvent<ContactInputElement>) => {
    setFields((f) => ({ ...f, [key]: e.target.value }))
    setErrors((er) => { const n = { ...er }; delete n[key]; return n })
  }

  const setConsent = (e: ChangeEvent<HTMLInputElement>) => {
    setFields((f) => ({ ...f, privacyConsent: e.target.checked }))
    setErrors((er) => { const n = { ...er }; delete n.privacyConsent; return n })
  }

  if (submitted) {
    return (
      <motion.div
        className={`${s.thankYou}${dark ? ` ${s.thankYouDark}` : ''}`}
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
          内容を確認のうえ、原則1〜2営業日以内に担当者よりご連絡いたします。
        </p>
        {inquiryId && <p className={s.thankYouMeta}>受付番号: {inquiryId}</p>}
      </motion.div>
    )
  }

  const inputClass = (key: keyof ContactRequest) => `${s.input}${errors[key] ? ` ${s.inputError}` : ''}${dark ? ` ${s.inputDark}` : ''}`
  const selectClass = (key: keyof ContactRequest) => `${s.select}${errors[key] ? ` ${s.inputError}` : ''}${dark ? ` ${s.inputDark}` : ''}`

  return (
    <form className={`${s.form}${dark ? ` ${s.formDark}` : ''}`} onSubmit={handleSubmit} noValidate>
      {contactFields.map(({ key, label, required, placeholder, type = 'text', maxLength }) => (
        <div className={s.group} key={key}>
          <label className={`${s.label}${dark ? ` ${s.labelDark}` : ''}`} htmlFor={`contact-${key}`}>
            {label}
            {required && <span className={s.required}>必須</span>}
          </label>
          <input
            type={type}
            id={`contact-${key}`}
            className={inputClass(key)}
            value={fields[key]}
            onChange={set(key)}
            placeholder={placeholder}
            maxLength={maxLength}
            aria-invalid={Boolean(errors[key])}
            aria-describedby={errors[key] ? `contact-${key}-error` : undefined}
          />
          <AnimatePresence>
            {errors[key] && (
              <motion.p
                id={`contact-${key}-error`}
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

      <div className={s.splitGrid}>
        <div className={s.group}>
          <label className={`${s.label}${dark ? ` ${s.labelDark}` : ''}`} htmlFor="contact-inquiryType">
            ご相談内容
          </label>
          <select
            id="contact-inquiryType"
            className={selectClass('inquiryType')}
            value={fields.inquiryType}
            onChange={set('inquiryType')}
            aria-invalid={Boolean(errors.inquiryType)}
            aria-describedby={errors.inquiryType ? 'contact-inquiryType-error' : undefined}
          >
            <option value="">選択してください</option>
            {inquiryOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          {errors.inquiryType && <p id="contact-inquiryType-error" className={s.errorMsg}>{errors.inquiryType}</p>}
        </div>

        <div className={s.group}>
          <label className={`${s.label}${dark ? ` ${s.labelDark}` : ''}`} htmlFor="contact-timeline">
            希望時期
          </label>
          <select
            id="contact-timeline"
            className={selectClass('timeline')}
            value={fields.timeline}
            onChange={set('timeline')}
            aria-invalid={Boolean(errors.timeline)}
            aria-describedby={errors.timeline ? 'contact-timeline-error' : undefined}
          >
            <option value="">選択してください</option>
            {timelineOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          {errors.timeline && <p id="contact-timeline-error" className={s.errorMsg}>{errors.timeline}</p>}
        </div>
      </div>

      <div className={s.group}>
        <label className={`${s.label}${dark ? ` ${s.labelDark}` : ''}`} htmlFor="contact-budgetRange">
          ご予算感
        </label>
        <select
          id="contact-budgetRange"
          className={selectClass('budgetRange')}
          value={fields.budgetRange}
          onChange={set('budgetRange')}
          aria-invalid={Boolean(errors.budgetRange)}
          aria-describedby={errors.budgetRange ? 'contact-budgetRange-error' : undefined}
        >
          <option value="">選択してください</option>
          {budgetOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <p className={`${s.fieldHint}${dark ? ` ${s.fieldHintDark}` : ''}`}>未定でも問題ありません。初回相談で優先順位と実現範囲を整理します。</p>
        {errors.budgetRange && <p id="contact-budgetRange-error" className={s.errorMsg}>{errors.budgetRange}</p>}
      </div>

      <div className={s.group}>
        <label className={`${s.label}${dark ? ` ${s.labelDark}` : ''}`} htmlFor="contact-message">
          お問い合わせ内容 <span className={s.required}>必須</span>
        </label>
        <textarea
          id="contact-message"
          className={`${s.textarea}${errors.message ? ` ${s.inputError}` : ''}${dark ? ` ${s.inputDark}` : ''}`}
          value={fields.message}
          onChange={set('message')}
          placeholder="例：顧客管理システムの開発を検討しています。現在はExcelで管理しており、入力漏れと集計工数が課題です。"
          maxLength={1000}
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
        />
        <AnimatePresence>
          {errors.message && (
            <motion.p id="contact-message-error" className={s.errorMsg} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {errors.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <input
        type="text"
        name="website"
        className={s.honeypot}
        value={fields.website}
        onChange={set('website')}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className={s.consentGroup}>
        <label className={`${s.consentLabel}${dark ? ` ${s.consentLabelDark}` : ''}`}>
          <input
            type="checkbox"
            checked={fields.privacyConsent}
            onChange={setConsent}
            aria-invalid={Boolean(errors.privacyConsent)}
            aria-describedby={errors.privacyConsent ? 'contact-privacyConsent-error' : undefined}
          />
          <span>
            <a href="/privacy" target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>に同意して送信します
          </span>
        </label>
        {errors.privacyConsent && <p id="contact-privacyConsent-error" className={s.errorMsg}>{errors.privacyConsent}</p>}
      </div>

      {serverError && (
        <p className={s.serverError}>送信に失敗しました。時間をおいて再度お試しいただくか、内容を控えてお問い合わせください。</p>
      )}

      <button type="submit" className={s.submit} disabled={loading}>
        {loading
          ? <span className={s.spinner} aria-label="送信中" />
          : '無料相談を申し込む'}
      </button>

      <p className={`${s.note}${dark ? ` ${s.noteDark}` : ''}`}>
        ヒアリング・簡易見積もりまで無料です。機密情報は初回フォームに記載せず、必要に応じてNDA締結後に共有ください。
      </p>
    </form>
  )
}
