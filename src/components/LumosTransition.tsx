import { useEffect, useRef } from 'react'

interface LumosTransitionProps {
  active: boolean
  onMidpoint?: () => void
  onEnd?: () => void
}

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  maxAlpha: number
  life: number
  maxLife: number
  isStar: boolean
  color: string
}

/**
 * Lumos Wave & Starlight Sparks Transition:
 * Buttery 60fps golden wand burst with expanding luminous rings and twinkling starlight glints.
 * Ultra-lightweight, zero lag, silky smooth, and instantly responsive.
 */
export default function LumosTransition({
  active,
  onMidpoint,
  onEnd,
}: LumosTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  const midpointCbRef = useRef(onMidpoint)
  midpointCbRef.current = onMidpoint
  const endCbRef = useRef(onEnd)
  endCbRef.current = onEnd

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = (canvas.width = window.innerWidth)
    const h = (canvas.height = window.innerHeight)
    const cx = w / 2
    const cy = h / 2

    // Generate golden starlight sparks
    const sparks: Spark[] = []
    const sparkCount = 65

    for (let i = 0; i < sparkCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 9 + 3
      const dist = Math.random() * 30

      const isStar = Math.random() > 0.45
      const color =
        Math.random() > 0.35
          ? 'rgba(255, 238, 175, ' // Brilliant white-gold
          : 'rgba(235, 185, 65, ' // Warm amber-gold

      sparks.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: isStar ? Math.random() * 5 + 3 : Math.random() * 2.5 + 1.2,
        alpha: 0,
        maxAlpha: Math.random() * 0.6 + 0.4,
        life: 0,
        maxLife: Math.random() * 12 + 18,
        isStar,
        color,
      })
    }

    let frame = 0
    const totalFrames = 26 // ~420ms at 60fps - snappy and ultra-responsive
    let midpointFired = false

    const drawStar = (
      x: number,
      y: number,
      r: number,
      alpha: number,
      colorPrefix: string
    ) => {
      ctx.save()
      ctx.fillStyle = `${colorPrefix}${alpha.toFixed(2)})`
      ctx.beginPath()
      // 4-pointed starlight flare
      ctx.moveTo(x, y - r * 2.2)
      ctx.quadraticCurveTo(x, y, x + r * 2.2, y)
      ctx.quadraticCurveTo(x, y, x, y + r * 2.2)
      ctx.quadraticCurveTo(x, y, x - r * 2.2, y)
      ctx.quadraticCurveTo(x, y, x, y - r * 2.2)
      ctx.fill()

      // Small central sparkle glow
      ctx.beginPath()
      ctx.arc(x, y, r * 0.6, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`
      ctx.fill()
      ctx.restore()
    }

    const render = () => {
      frame++
      ctx.clearRect(0, 0, w, h)

      const prog = frame / totalFrames

      // 1. Central Lumos Wand Burst (0ms to 240ms)
      if (frame <= 16) {
        const flashProg = frame / 16
        const flashRadius = flashProg * Math.max(w, h) * 0.45 + 50
        const flashAlpha =
          flashProg < 0.45
            ? (flashProg / 0.45) * 0.55
            : (1 - (flashProg - 0.45) / 0.55) * 0.55

        if (flashAlpha > 0.01) {
          const grad = ctx.createRadialGradient(
            cx,
            cy,
            0,
            cx,
            cy,
            flashRadius
          )
          grad.addColorStop(0, `rgba(255, 250, 220, ${flashAlpha.toFixed(2)})`)
          grad.addColorStop(0.3, `rgba(235, 190, 75, ${(flashAlpha * 0.65).toFixed(2)})`)
          grad.addColorStop(0.7, `rgba(215, 150, 40, ${(flashAlpha * 0.25).toFixed(2)})`)
          grad.addColorStop(1, 'rgba(215, 150, 40, 0)')

          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(cx, cy, flashRadius, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // 2. Expanding Concentric Shockwave Ring
      const ringRadius = prog * Math.max(w, h) * 0.75 + 20
      const ringAlpha = (1 - prog) * 0.6
      if (ringAlpha > 0.01) {
        ctx.save()
        ctx.lineWidth = Math.max(1, (1 - prog) * 4)
        ctx.strokeStyle = `rgba(255, 225, 130, ${ringAlpha.toFixed(2)})`
        ctx.shadowColor = 'rgba(235, 190, 65, 0.8)'
        ctx.shadowBlur = 14
        ctx.beginPath()
        ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }

      // 3. Midpoint trigger: swap view exactly at peak expansion (~180ms)
      if (frame >= 11 && !midpointFired) {
        midpointFired = true
        if (midpointCbRef.current) {
          midpointCbRef.current()
        }
      }

      // 4. Starlight Sparks & Glints
      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i]
        s.life++
        s.x += s.vx
        s.y += s.vy
        s.vx *= 0.94
        s.vy *= 0.94

        const p = s.life / s.maxLife
        if (p < 0.3) {
          s.alpha = (p / 0.3) * s.maxAlpha
        } else {
          s.alpha = (1 - (p - 0.3) / 0.7) * s.maxAlpha
        }

        if (s.alpha <= 0.01) continue

        if (s.isStar) {
          drawStar(s.x, s.y, s.size, s.alpha, s.color)
        } else {
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
          ctx.fillStyle = `${s.color}${s.alpha.toFixed(2)})`
          ctx.shadowColor = 'rgba(235, 190, 65, 0.7)'
          ctx.shadowBlur = 6
          ctx.fill()
        }
      }

      if (frame < totalFrames) {
        animRef.current = requestAnimationFrame(render)
      } else {
        ctx.clearRect(0, 0, w, h)
        if (endCbRef.current) {
          endCbRef.current()
        }
      }
    }

    render()

    return () => {
      cancelAnimationFrame(animRef.current)
    }
  }, [active])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      style={{
        width: '100vw',
        height: '100vh',
        mixBlendMode: 'screen',
      }}
      aria-hidden="true"
    />
  )
}
