import { useEffect, useRef } from 'react'

interface CandleMote {
  x: number
  y: number
  r: number
  vy: number
  vx: number
  alpha: number
  maxAlpha: number
  pulseSpeed: number
  color: string
}

/**
 * Library Candlelight & Fireplace Motes:
 * Gentle amber, gold and subtle ruby sparks drifting softly like candlelight in a grand gothic library.
 */
export default function AmbientEmbers() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const count = 48
    const motes: CandleMote[] = []

    for (let i = 0; i < count; i++) {
      const randType = Math.random()
      let color = '229, 186, 72' // Candlelight Amber-Gold
      if (randType < 0.22) {
        color = '165, 36, 54' // Gryffindor Hearth Ruby
      } else if (randType > 0.75) {
        color = '255, 235, 175' // Starlight Spark
      }

      motes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.6,
        vy: -(Math.random() * 0.35 + 0.12),
        vx: (Math.random() - 0.5) * 0.22,
        alpha: Math.random(),
        maxAlpha: Math.random() * 0.65 + 0.2,
        pulseSpeed: Math.random() * 0.018 + 0.006,
        color,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < motes.length; i++) {
        const m = motes[i]
        m.y += m.vy
        m.x += m.vx
        m.alpha += m.pulseSpeed

        if (m.y < -10) {
          m.y = h + 10
          m.x = Math.random() * w
        }
        if (m.x < -10) m.x = w + 10
        if (m.x > w + 10) m.x = -10

        const currentAlpha = (Math.sin(m.alpha) * 0.5 + 0.5) * m.maxAlpha

        ctx.beginPath()
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${m.color}, ${currentAlpha.toFixed(2)})`
        ctx.shadowColor = `rgba(${m.color}, 0.8)`
        ctx.shadowBlur = 8
        ctx.fill()
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      style={{ opacity: 0.8 }}
      aria-hidden="true"
    />
  )
}
