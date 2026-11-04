import { useEffect, useRef } from 'react'

interface Sparkle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  color: string
}

/**
 * Magical Wand Cursor & Lumos Sparkle Trail:
 * Spawns delicate starlight sparks and motes from the wand tip as the cursor moves or clicks.
 * Pure lightweight 2D canvas, disabled on touch devices.
 */
export default function WandCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Only run on devices with a mouse/fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const sparkles: Sparkle[] = []
    let lastX = 0
    let lastY = 0
    let animId = 0

    const addSparkle = (x: number, y: number, burst = false) => {
      const count = burst ? 8 : 1
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = burst ? Math.random() * 2.5 + 0.8 : Math.random() * 0.8 + 0.2

        sparkles.push({
          x: x + (Math.random() - 0.5) * 4,
          y: y + (Math.random() - 0.5) * 4,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed + 0.15,
          size: Math.random() * 2.5 + 1.2,
          alpha: 1,
          color:
            Math.random() > 0.3
              ? '255, 225, 120' // Gold spark
              : '255, 250, 210', // White-hot Lumos core
        })
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY)
      if (dist > 18) {
        addSparkle(e.clientX, e.clientY)
        lastX = e.clientX
        lastY = e.clientY
      }
    }

    const onMouseDown = (e: MouseEvent) => {
      addSparkle(e.clientX, e.clientY, true)
    }

    const render = () => {
      ctx.clearRect(0, 0, w, h)

      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i]
        s.x += s.vx
        s.y += s.vy
        s.alpha -= 0.04
        s.size *= 0.96

        if (s.alpha <= 0.01) {
          sparkles.splice(i, 1)
          continue
        }

        // Draw starlight spark glint
        ctx.save()
        ctx.fillStyle = `rgba(${s.color}, ${s.alpha.toFixed(2)})`
        ctx.shadowColor = `rgba(${s.color}, 0.8)`
        ctx.shadowBlur = 4
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      animId = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown, { passive: true })
    animId = requestAnimationFrame(render)

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] w-full h-full"
      aria-hidden="true"
    />
  )
}

