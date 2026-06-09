export default function ServiceIcon({ type, size = 24, ...props }) {
  const s = { width: size, height: size }
  const base = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    viewBox: '0 0 24 24',
    ...s,
    ...props,
  }

  if (type === 'ai') return (
    <svg {...base}>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  )

  if (type === 'mobile') return (
    <svg {...base}>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
    </svg>
  )

  if (type === 'web') return (
    <svg {...base}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  )

  if (type === 'education') return (
    <svg {...base}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
    </svg>
  )

  if (type === 'arrow') return (
    <svg {...base}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )

  if (type === 'check') return (
    <svg {...base}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )

  if (type === 'external') return (
    <svg {...base}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )

  return null
}
