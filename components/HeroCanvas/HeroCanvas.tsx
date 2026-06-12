"use client"

import { useRef, useEffect } from 'react'
import s from './HeroCanvas.module.css'

// ── Colour channels (rgb tuples for rgba() composition) ────────
const C_ACCENT = '36, 144, 243'
const C_NODE   = '140, 200, 255'
const C_SPARK  = '210, 235, 255'
const C_BG     = '15, 30, 46'

// ── Physics constants ──────────────────────────────────────────
const CONNECT       = 155   // max connection draw distance
const ATTRACT_OUTER = 210   // cursor starts attracting
const REPEL_INNER   = 85    // cursor starts repelling (orbital zone)
const MAX_SPEED     = 2.8
const SPRING        = 0.013 // velocity spring back toward base drift
const FRICTION_60   = 0.985 // friction per 60fps frame

export default function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

    let raf
    let W = 0, H = 0, DPR = 1
    let particles = []
    let ripples   = []

    // Smoothed cursor (sx/sy) trails the raw target (tx/ty)
    const cur = { tx: -9999, ty: -9999, sx: -9999, sy: -9999, active: false }

    // ── Resize: reset canvas buffer + DPR transform ─────────────
    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      W = rect.width || canvas.offsetWidth
      H = rect.height || canvas.offsetHeight
      canvas.width  = Math.round(W * DPR)
      canvas.height = Math.round(H * DPR)
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0) // never accumulates
    }

    // ── Particle factory ─────────────────────────────────────────
    function makeParticle(px?: number, py?: number) {
      const hub   = Math.random() < 0.14
      const ang   = Math.random() * Math.PI * 2
      const spd   = hub ? Math.random() * 0.12 + 0.04 : Math.random() * 0.22 + 0.08
      const bvx   = Math.cos(ang) * spd
      const bvy   = Math.sin(ang) * spd
      return {
        x:     px ?? Math.random() * W,
        y:     py ?? Math.random() * H,
        vx: bvx, vy: bvy,
        bvx, bvy,                                           // base drift (spring target)
        r:     hub ? Math.random() * 1.6 + 2.1 : Math.random() * 0.85 + 0.35,
        hub,
        alpha: hub ? Math.random() * 0.25 + 0.75 : Math.random() * 0.35 + 0.42,
        phase: Math.random() * Math.PI * 2,
        color: hub ? C_NODE : (Math.random() < 0.10 ? C_SPARK : C_ACCENT),
        energy: 0,  // 0–1, charges near cursor, decays each frame
      }
    }

    function spawn() {
      const count = Math.min(100, Math.floor((W * H) / 10000))
      particles = Array.from({ length: count }, () => makeParticle())
    }

    // ── Cursor tracking (on window so canvas stays pointer-events:none) ──
    function onMove(e) {
      const touch = e.touches?.[0] ?? e
      const rect  = canvas.getBoundingClientRect()
      cur.tx     = touch.clientX - rect.left
      cur.ty     = touch.clientY - rect.top
      cur.active = true
    }
    function onLeave() { cur.active = false }
    function onClick(e) {
      const rect = canvas.getBoundingClientRect()
      const cx   = (e.touches?.[0]?.clientX ?? e.clientX) - rect.left
      const cy   = (e.touches?.[0]?.clientY ?? e.clientY) - rect.top
      ripples.push({ x: cx, y: cy, r: 0, born: performance.now() })
    }

    // ── Main loop ─────────────────────────────────────────────────
    let lastT = 0
    function frame(t) {
      // dt normalised to 60 fps (cap at 3 frames to avoid spiral after tab switch)
      const dt = lastT === 0 ? 1 : Math.min((t - lastT) / 16.667, 3)
      lastT = t

      ctx.clearRect(0, 0, W, H)

      // ─ Smooth cursor lerp ─
      cur.sx += (cur.tx - cur.sx) * Math.min(0.16 * dt, 1)
      cur.sy += (cur.ty - cur.sy) * Math.min(0.16 * dt, 1)

      // ─ 1. Deep background spotlight under cursor ─
      if (cur.active) {
        const spotlight = ctx.createRadialGradient(cur.sx, cur.sy, 0, cur.sx, cur.sy, 300)
        spotlight.addColorStop(0, `rgba(${C_ACCENT}, 0.055)`)
        spotlight.addColorStop(1, `rgba(${C_ACCENT}, 0)`)
        ctx.fillStyle = spotlight
        ctx.fillRect(0, 0, W, H)
      }

      // ─ 2. Ripple expansion & shockwave push ─
      const age_ms_limit = 2200
      ripples = ripples.filter(rp => t - rp.born < age_ms_limit)
      for (const rp of ripples) {
        const age  = (t - rp.born) / 1000
        const maxR = Math.hypot(W, H) * 0.65
        rp.r       = maxR * (1 - Math.exp(-age * 3.2))
        const rAlpha = Math.exp(-age * 2.8) * 0.45

        // Shockwave push: force peaks when wavefront passes a particle
        for (const p of particles) {
          const dx   = p.x - rp.x, dy = p.y - rp.y
          const d    = Math.hypot(dx, dy)
          const pass = Math.abs(d - rp.r)
          if (pass < 50 && d > 0.1) {
            const mag = (1 - pass / 50) * 0.5 * Math.exp(-age * 1.2)
            p.vx += (dx / d) * mag
            p.vy += (dy / d) * mag
            p.energy = Math.min(1, p.energy + mag * 0.8)
          }
        }

        // Draw expanding ring
        ctx.beginPath()
        ctx.arc(rp.x, rp.y, Math.max(0, rp.r), 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${C_ACCENT}, ${rAlpha})`
        ctx.lineWidth   = 1.2
        ctx.stroke()

        // Secondary faint inner ring (depth)
        if (rp.r > 20) {
          ctx.beginPath()
          ctx.arc(rp.x, rp.y, Math.max(0, rp.r * 0.6), 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${C_NODE}, ${rAlpha * 0.35})`
          ctx.lineWidth   = 0.6
          ctx.stroke()
        }
      }

      // ─ 3. Update particles ─
      const frictionPerFrame = Math.pow(FRICTION_60, dt) // frame-rate independent friction
      for (const p of particles) {
        // Mouse / touch orbital field
        if (cur.active) {
          const dx = cur.sx - p.x, dy = cur.sy - p.y
          const d  = Math.hypot(dx, dy)
          if (d < ATTRACT_OUTER && d > 0.1) {
            if (d < REPEL_INNER) {
              // Hard repel zone
              const force = (1 - d / REPEL_INNER) * 0.14
              p.vx -= (dx / d) * force * dt
              p.vy -= (dy / d) * force * dt
              p.energy = Math.min(1, p.energy + 0.09 * dt)
            } else {
              // Soft attract zone — creates swirling orbit
              const t_ = (d - REPEL_INNER) / (ATTRACT_OUTER - REPEL_INNER)
              const force = (1 - t_) * (1 - t_) * 0.028
              p.vx += (dx / d) * force * dt
              p.vy += (dy / d) * force * dt
              p.energy = Math.min(1, p.energy + 0.025 * dt)
            }
          }
        }

        // Energy decay
        p.energy *= Math.pow(0.93, dt)

        // Spring back toward natural drift
        p.vx += (p.bvx - p.vx) * SPRING * dt
        p.vy += (p.bvy - p.vy) * SPRING * dt

        // Frame-rate independent friction
        p.vx *= frictionPerFrame
        p.vy *= frictionPerFrame

        // Speed cap
        const spd = Math.hypot(p.vx, p.vy)
        if (spd > MAX_SPEED) { p.vx = p.vx / spd * MAX_SPEED; p.vy = p.vy / spd * MAX_SPEED }

        // Move + wrap
        p.x += p.vx * dt
        p.y += p.vy * dt
        if (p.x < -40) p.x = W + 40
        if (p.x > W + 40) p.x = -40
        if (p.y < -40) p.y = H + 40
        if (p.y > H + 40) p.y = -40
      }

      // ─ 4. Connections ─
      const CC2 = CONNECT * CONNECT
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b  = particles[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 >= CC2) continue
          const d = Math.sqrt(d2)

          const energyBoost = (a.energy + b.energy) * 0.5
          const base  = (1 - d / CONNECT) * (a.hub || b.hub ? 0.26 : 0.11)
          const alpha = Math.min(base * (1 + energyBoost * 2.5), 0.6)
          const width = (a.hub || b.hub ? 1.0 : 0.6) * (1 + energyBoost * 0.6)

          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(${C_ACCENT}, ${alpha})`
          ctx.lineWidth   = width
          ctx.stroke()
        }
      }

      // ─ 5. Particles + glows ─
      for (const p of particles) {
        const pulse = p.hub ? 0.78 + Math.sin(t / 1500 + p.phase) * 0.22 : 1
        const eg    = 1 + p.energy * 1.4
        const a     = Math.min(p.alpha * pulse * eg, 1)
        const r     = p.r * pulse * (1 + p.energy * 0.35)

        if (p.hub) {
          // Wide outer haze
          const glowR = r * 7.5 * (1 + p.energy * 1.0)
          const g1 = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR)
          g1.addColorStop(0,   `rgba(${p.color}, ${a * 0.24})`)
          g1.addColorStop(0.4, `rgba(${p.color}, ${a * 0.08})`)
          g1.addColorStop(1,   `rgba(${p.color}, 0)`)
          ctx.beginPath(); ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2)
          ctx.fillStyle = g1; ctx.fill()

          // Tight inner bloom
          const g2 = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3)
          g2.addColorStop(0,   `rgba(${p.color}, ${a})`)
          g2.addColorStop(0.55, `rgba(${p.color}, ${a * 0.45})`)
          g2.addColorStop(1,   `rgba(${p.color}, 0)`)
          ctx.beginPath(); ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2)
          ctx.fillStyle = g2; ctx.fill()
        } else if (p.energy > 0.15) {
          // Energised regular particles get a small glow too
          const g3 = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4)
          g3.addColorStop(0, `rgba(${p.color}, ${p.energy * 0.35})`)
          g3.addColorStop(1, `rgba(${p.color}, 0)`)
          ctx.beginPath(); ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2)
          ctx.fillStyle = g3; ctx.fill()
        }

        // Solid core
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${a})`
        ctx.fill()
      }

      // ─ 6. Cursor aura (drawn above particles so it's clearly reactive) ─
      if (cur.active) {
        const aura = ctx.createRadialGradient(cur.sx, cur.sy, 0, cur.sx, cur.sy, 90)
        aura.addColorStop(0,   `rgba(${C_ACCENT}, 0.14)`)
        aura.addColorStop(0.45, `rgba(${C_ACCENT}, 0.05)`)
        aura.addColorStop(1,   `rgba(${C_ACCENT}, 0)`)
        ctx.fillStyle = aura
        ctx.beginPath()
        ctx.arc(cur.sx, cur.sy, 90, 0, Math.PI * 2)
        ctx.fill()

        // Tiny bright core dot at exact cursor position
        ctx.beginPath()
        ctx.arc(cur.sx, cur.sy, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${C_ACCENT}, 0.55)`
        ctx.fill()
      }

      // ─ 7. Edge vignette ─
      const vW = W * 0.18, vH = H * 0.15
      const gT = ctx.createLinearGradient(0, 0,      0,  vH);    gT.addColorStop(0,'rgba(15,30,46,1)'); gT.addColorStop(1,'rgba(15,30,46,0)')
      const gB = ctx.createLinearGradient(0, H - vH, 0,  H);     gB.addColorStop(0,'rgba(15,30,46,0)'); gB.addColorStop(1,'rgba(15,30,46,1)')
      const gL = ctx.createLinearGradient(0, 0,      vW, 0);     gL.addColorStop(0,'rgba(15,30,46,1)'); gL.addColorStop(1,'rgba(15,30,46,0)')
      const gR = ctx.createLinearGradient(W - vW, 0, W,  0);     gR.addColorStop(0,'rgba(15,30,46,0)'); gR.addColorStop(1,'rgba(15,30,46,1)')
      ctx.fillStyle = gT; ctx.fillRect(0,      0,      W,  vH)
      ctx.fillStyle = gB; ctx.fillRect(0,      H - vH, W,  vH)
      ctx.fillStyle = gL; ctx.fillRect(0,      0,      vW, H)
      ctx.fillStyle = gR; ctx.fillRect(W - vW, 0,      vW, H)

      if (!reduceMotion) raf = requestAnimationFrame(frame)
    }

    // ── Init & bind ──────────────────────────────────────────────
    resize()
    spawn()
    raf = requestAnimationFrame(frame)

    const onResize = () => { resize(); spawn() }
    window.addEventListener('mousemove',  onMove)
    window.addEventListener('touchmove',  onMove,  { passive: true })
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('touchend',   onLeave)
    window.addEventListener('click',      onClick)
    window.addEventListener('touchstart', onClick, { passive: true })
    window.addEventListener('resize',     onResize)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('mousemove',  onMove)
      window.removeEventListener('touchmove',  onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('touchend',   onLeave)
      window.removeEventListener('click',      onClick)
      window.removeEventListener('touchstart', onClick)
      window.removeEventListener('resize',     onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className={s.canvas} aria-hidden="true" />
}
