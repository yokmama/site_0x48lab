"use client"

import { useEffect, useRef } from 'react'
import s from './AmbientCanvas.module.css'

export type AmbientCanvasVariant =
  | 'network'
  | 'gridFlow'
  | 'orbit'
  | 'timeline'
  | 'educationBlocks'
  | 'formSignal'
  | 'staticDots'

type AmbientCanvasProps = {
  variant?: AmbientCanvasVariant
  accent?: string
  intensity?: number
}

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  phase: number
}

function hexToRgb(hex: string) {
  const safe = hex.replace('#', '')
  const value = safe.length === 3
    ? safe.split('').map((c) => `${c}${c}`).join('')
    : safe
  const num = Number.parseInt(value, 16)
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  }
}

function rgba(rgb: { r: number; g: number; b: number }, alpha: number) {
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
}

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

export default function AmbientCanvas({
  variant = 'network',
  accent = '#1769AA',
  intensity = 1,
}: AmbientCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = prefersReducedMotion()
    const rgb = hexToRgb(accent)
    const particles: Particle[] = []
    const cursor = { x: -1000, y: -1000, active: false }
    let width = 0
    let height = 0
    let dpr = 1
    let raf = 0
    let last = 0
    let hidden = false

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width || canvas.offsetWidth
      height = rect.height || canvas.offsetHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const baseCount = variant === 'educationBlocks' ? 34 : variant === 'staticDots' ? 42 : 62
      const count = Math.min(92, Math.floor(baseCount * intensity * Math.max(0.72, width / 1200)))
      particles.length = 0
      for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * Math.PI * 2
        const speed = variant === 'orbit' ? 0.08 + Math.random() * 0.1 : 0.05 + Math.random() * 0.12
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: variant === 'educationBlocks' ? 5 + Math.random() * 10 : 1 + Math.random() * 2.2,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      cursor.x = event.clientX - rect.left
      cursor.y = event.clientY - rect.top
      cursor.active = true
    }

    const onPointerLeave = () => {
      cursor.active = false
    }

    const drawGridFlow = (time: number) => {
      const gap = 56
      const offset = reduceMotion ? 0 : (time * 0.018) % gap
      ctx.lineWidth = 1
      for (let x = -gap; x < width + gap; x += gap) {
        const alpha = x % (gap * 3) === 0 ? 0.16 : 0.07
        ctx.strokeStyle = rgba(rgb, alpha)
        ctx.beginPath()
        ctx.moveTo(x + offset, 0)
        ctx.lineTo(x + offset + height * 0.18, height)
        ctx.stroke()
      }
      for (let y = -gap; y < height + gap; y += gap) {
        ctx.strokeStyle = rgba(rgb, 0.055)
        ctx.beginPath()
        ctx.moveTo(0, y - offset)
        ctx.lineTo(width, y - offset)
        ctx.stroke()
      }
    }

    const drawNetwork = (dt: number, time: number) => {
      const connect = variant === 'staticDots' ? 92 : 126
      for (const p of particles) {
        if (!reduceMotion && variant !== 'staticDots') {
          if (cursor.active) {
            const dx = cursor.x - p.x
            const dy = cursor.y - p.y
            const distance = Math.hypot(dx, dy)
            if (distance > 1 && distance < 150) {
              const force = (1 - distance / 150) * 0.018
              p.vx += (dx / distance) * force * dt
              p.vy += (dy / distance) * force * dt
            }
          }
          p.x += p.vx * dt
          p.y += p.vy * dt
          p.vx *= 0.992
          p.vy *= 0.992
          if (p.x < -12) p.x = width + 12
          if (p.x > width + 12) p.x = -12
          if (p.y < -12) p.y = height + 12
          if (p.y > height + 12) p.y = -12
        }
      }

      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.hypot(dx, dy)
          if (distance < connect) {
            ctx.strokeStyle = rgba(rgb, (1 - distance / connect) * 0.16)
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (const p of particles) {
        const pulse = reduceMotion ? 1 : 0.75 + Math.sin(time * 0.002 + p.phase) * 0.25
        ctx.fillStyle = rgba(rgb, 0.26 * pulse)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const drawOrbit = (time: number) => {
      const cx = width * 0.76
      const cy = height * 0.48
      const max = Math.min(width, height) * 0.46
      for (let i = 0; i < 5; i += 1) {
        const radius = max * (0.28 + i * 0.14)
        const shift = reduceMotion ? 0 : time * 0.00035 * (i % 2 ? -1 : 1)
        ctx.strokeStyle = rgba(rgb, 0.08 + i * 0.018)
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.ellipse(cx, cy, radius * 1.42, radius, -0.2, shift, Math.PI * 1.35 + shift)
        ctx.stroke()

        const px = cx + Math.cos(shift + i) * radius * 1.42
        const py = cy + Math.sin(shift + i) * radius
        ctx.fillStyle = rgba(rgb, 0.32)
        ctx.beginPath()
        ctx.arc(px, py, 2.2 + i * 0.2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const drawTimeline = (time: number) => {
      const columns = 5
      for (let i = 0; i < columns; i += 1) {
        const x = width * (0.14 + i * 0.18)
        ctx.strokeStyle = rgba(rgb, 0.09)
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(x, height * 0.14)
        ctx.lineTo(x, height * 0.9)
        ctx.stroke()

        for (let j = 0; j < 4; j += 1) {
          const y = height * (0.2 + j * 0.18)
          const pulse = reduceMotion ? 1 : 0.7 + Math.sin(time * 0.002 + i + j) * 0.3
          ctx.fillStyle = rgba(rgb, 0.12 * pulse)
          ctx.beginPath()
          ctx.arc(x, y, 10 + pulse * 3, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = rgba(rgb, 0.32 * pulse)
          ctx.beginPath()
          ctx.arc(x, y, 2.4, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const drawEducationBlocks = (time: number) => {
      for (const p of particles) {
        const y = p.y + (reduceMotion ? 0 : Math.sin(time * 0.0016 + p.phase) * 7)
        ctx.save()
        ctx.translate(p.x, y)
        ctx.rotate(reduceMotion ? 0 : Math.sin(time * 0.0008 + p.phase) * 0.08)
        ctx.fillStyle = rgba(rgb, 0.08)
        ctx.strokeStyle = rgba(rgb, 0.22)
        ctx.lineWidth = 1
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        ctx.strokeRect(-p.size / 2, -p.size / 2, p.size, p.size)
        ctx.restore()
      }
    }

    const drawFormSignal = (time: number) => {
      const lines = 6
      for (let i = 0; i < lines; i += 1) {
        const y = height * (0.22 + i * 0.1)
        const wave = reduceMotion ? 0 : Math.sin(time * 0.0014 + i) * 18
        ctx.strokeStyle = rgba(rgb, 0.08 + i * 0.018)
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.moveTo(width * 0.08, y)
        ctx.bezierCurveTo(width * 0.32, y + wave, width * 0.58, y - wave, width * 0.92, y + wave * 0.3)
        ctx.stroke()
      }

      if (cursor.active && !reduceMotion) {
        const glow = ctx.createRadialGradient(cursor.x, cursor.y, 0, cursor.x, cursor.y, 160)
        glow.addColorStop(0, rgba(rgb, 0.16))
        glow.addColorStop(1, rgba(rgb, 0))
        ctx.fillStyle = glow
        ctx.fillRect(0, 0, width, height)
      }
    }

    const draw = (time: number) => {
      raf = 0
      const dt = last ? Math.min((time - last) / 16.667, 2.5) : 1
      last = time
      ctx.clearRect(0, 0, width, height)

      if (variant === 'gridFlow') drawGridFlow(time)
      if (variant === 'orbit') drawOrbit(time)
      if (variant === 'timeline') drawTimeline(time)
      if (variant === 'educationBlocks') drawEducationBlocks(time)
      if (variant === 'formSignal') drawFormSignal(time)
      if (variant === 'network' || variant === 'staticDots') drawNetwork(dt, time)

      if (cursor.active && !reduceMotion) {
        const glow = ctx.createRadialGradient(cursor.x, cursor.y, 0, cursor.x, cursor.y, 150)
        glow.addColorStop(0, rgba(rgb, 0.14))
        glow.addColorStop(0.48, rgba(rgb, 0.045))
        glow.addColorStop(1, rgba(rgb, 0))
        ctx.fillStyle = glow
        ctx.fillRect(0, 0, width, height)
      }

      if (!reduceMotion && !hidden) {
        raf = requestAnimationFrame(draw)
      }
    }

    const onVisibility = () => {
      hidden = document.visibilityState === 'hidden'
      if (!hidden && !raf && !reduceMotion) {
        raf = requestAnimationFrame(draw)
      }
    }

    resize()
    draw(0)

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibility)
    if (!reduceMotion) raf = requestAnimationFrame(draw)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [accent, intensity, variant])

  return <canvas ref={canvasRef} className={s.canvas} aria-hidden="true" />
}
