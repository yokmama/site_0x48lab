export const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export const revealLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export const revealRight = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

export const viewportOnce = { once: true, margin: '-60px' }

export const hoverLift = {
  whileHover: { y: -6, boxShadow: '0 12px 36px rgba(0,0,0,0.10)', borderColor: 'rgba(36,144,243,0.3)' },
  transition: { type: 'tween', duration: 0.22 },
}
