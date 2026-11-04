import { useEffect, useRef } from 'react'

interface Ember {
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
 * Ambient Magical Embers:
 * Delicate, floating golden/amber sparks drifting upward through the dark obsidian canvas.
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

    const count = 55
    const embers: Ember[] = []

    for (let i = 0; i < count; i++) {
      embers.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.6,
        vy: -(Math.random() * 0.45 + 0.15),
        vx: (Math.random() - 0.5) * 0.25,
        alpha: Math.random(),
        maxAlpha: Math.random() * 0.65 + 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        color:
          Math.random() > 0.35
            ? '223, 175, 55' // Lumos Gold
            : '255, 230, 160', // Warm Spark
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < embers.length; i++) {
        const e = embers[i]
        e.y += e.vy
        e.x += e.vx
        e.alpha += e.pulseSpeed

        // Wrap around top
        if (e.y < -10) {
          e.y = h + 10
          e.x = Math.random() * w
        }
        if (e.x < -10) e.x = w + 10
        if (e.x > w + 10) e.x = -10

        const currentAlpha =
          (Math.sin(e.alpha) * 0.5 + 0.5) * e.maxAlpha

        ctx.beginPath()
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${e.color}, ${currentAlpha.toFixed(2)})`
        ctx.shadowColor = `rgba(${e.color}, 0.7)`
        ctx.shadowBlur = 6
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
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    />
  )
}
