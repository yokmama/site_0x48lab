"use client"

import type { SVGProps } from 'react'

type ServiceIconProps = SVGProps<SVGSVGElement> & {
  type: string
  size?: number
}

export default function ServiceIcon({ type, size = 24, ...props }: ServiceIconProps) {
  const s = { width: size, height: size }
  const base: SVGProps<SVGSVGElement> = {
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

  if (type === 'desktop-code') return (
    <svg {...base}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="M7 8l3 3-3 3M13 14h4" />
    </svg>
  )

  if (type === 'education') return (
    <svg {...base}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
    </svg>
  )

  if (type === 'play') return (
    <svg {...base}>
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )

  if (type === 'users') return (
    <svg {...base}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )

  if (type === 'grid') return (
    <svg {...base}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )

  if (type === 'location-pin') return (
    <svg {...base}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )

  if (type === 'code') return (
    <svg {...base}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )

  if (type === 'api') return (
    <svg {...base}>
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
      <rect x="2" y="4" width="5" height="16" rx="1" />
    </svg>
  )

  if (type === 'infrastructure') return (
    <svg {...base}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )

  if (type === 'check-panel') return (
    <svg {...base}>
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  )

  if (type === 'clock') return (
    <svg {...base}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )

  if (type === 'chat') return (
    <svg {...base}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
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
