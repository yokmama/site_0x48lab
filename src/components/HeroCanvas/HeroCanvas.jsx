import { useRef, useEffect } from 'react'
import s from './HeroCanvas.module.css'

const ACCENT = '36, 144, 243'   // --color-accent rgb
const NODE   = '130, 195, 255'  // lighter blue for hub nodes
const WHITE  = '255, 255, 255'  // accent white sparks

export default function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let particles = []
    const CONNECT = 145  // max distance for connections

    function resize() {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width  = width  || canvas.offsetWidth
      canvas.height = height || canvas.offsetHeight
    }

    function spawn() {
      const { width, height } = canvas
      const count = Math.min(90, Math.floor((width * height) / 11000))
      particles = Array.from({ length: count }, () => {
        const hub = Math.random() < 0.14
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (hub ? 0.18 : 0.32),
          vy: (Math.random() - 0.5) * (hub ? 0.18 : 0.32),
          r: hub ? Math.random() * 1.6 + 2.2 : Math.random() * 0.9 + 0.5,
          hub,
          alpha: hub ? Math.random() * 0.25 + 0.75 : Math.random() * 0.35 + 0.45,
          phase: Math.random() * Math.PI * 2,
          color: hub ? NODE : (Math.random() < 0.12 ? WHITE : ACCENT),
        }
      })
    }

    const onResize = () => { resize(); spawn() }
    window.addEventListener('resize', onResize)
    resize()
    spawn()

    function frame(t) {
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)

      // Move
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy
        if (p.x < -30) p.x = W + 30
        if (p.x > W + 30) p.x = -30
        if (p.y < -30) p.y = H + 30
        if (p.y > H + 30) p.y = -30
      }

      // Connections
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d >= CONNECT) continue
          const alpha = (1 - d / CONNECT) * (a.hub || b.hub ? 0.22 : 0.12)
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(${ACCENT}, ${alpha})`
          ctx.lineWidth = a.hub || b.hub ? 1 : 0.7
          ctx.stroke()
        }
      }

      // Particles
      for (const p of particles) {
        const pulse = p.hub ? 0.75 + Math.sin(t / 1600 + p.phase) * 0.25 : 1
        const a = p.alpha * pulse
        const r = p.r * pulse

        if (p.hub) {
          // Soft outer glow
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 7)
          g.addColorStop(0, `rgba(${p.color}, ${a * 0.28})`)
          g.addColorStop(1, `rgba(${p.color}, 0)`)
          ctx.beginPath()
          ctx.arc(p.x, p.y, r * 7, 0, Math.PI * 2)
          ctx.fillStyle = g
          ctx.fill()

          // Inner glow ring
          const g2 = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 2.5)
          g2.addColorStop(0, `rgba(${p.color}, ${a})`)
          g2.addColorStop(1, `rgba(${p.color}, 0)`)
          ctx.beginPath()
          ctx.arc(p.x, p.y, r * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = g2
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${a})`
        ctx.fill()
      }

      // Edge vignette — fades particles at borders so they don't look clipped
      const vW = W * 0.15, vH = H * 0.12
      const vTop = ctx.createLinearGradient(0, 0, 0, vH)
      vTop.addColorStop(0, 'rgba(15,30,46,1)')
      vTop.addColorStop(1, 'rgba(15,30,46,0)')
      const vBot = ctx.createLinearGradient(0, H - vH, 0, H)
      vBot.addColorStop(0, 'rgba(15,30,46,0)')
      vBot.addColorStop(1, 'rgba(15,30,46,1)')
      const vL = ctx.createLinearGradient(0, 0, vW, 0)
      vL.addColorStop(0, 'rgba(15,30,46,1)')
      vL.addColorStop(1, 'rgba(15,30,46,0)')
      const vR = ctx.createLinearGradient(W - vW, 0, W, 0)
      vR.addColorStop(0, 'rgba(15,30,46,0)')
      vR.addColorStop(1, 'rgba(15,30,46,1)')

      ctx.fillStyle = vTop; ctx.fillRect(0, 0, W, vH)
      ctx.fillStyle = vBot; ctx.fillRect(0, H - vH, W, vH)
      ctx.fillStyle = vL;   ctx.fillRect(0, 0, vW, H)
      ctx.fillStyle = vR;   ctx.fillRect(W - vW, 0, vW, H)

      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className={s.canvas} aria-hidden="true" />
}
