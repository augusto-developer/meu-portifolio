import { useEffect, useRef } from 'react'

interface MagicalSmokeProps {
  active: boolean
  onSmokeMidpoint?: () => void
  onSmokeEnd?: () => void
}

interface SmokePuff {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  growth: number
  alpha: number
  maxAlpha: number
  life: number
  maxLife: number
  rotation: number
  vRot: number
  colorR: number
  colorG: number
  colorB: number
}

/**
 * Ethereal Apparition Smoke Transition:
 * Bilowing mist of dark obsidian, silvery atmospheric fog, and subtle golden Lumos wisps.
 * Triggers view swap at midpoint when the viewport is enveloped, then dissolves cleanly.
 */
export default function MagicalSmoke({
  active,
  onSmokeMidpoint,
  onSmokeEnd,
}: MagicalSmokeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  // Use refs for callbacks to prevent restarting animation on parent state updates
  const midpointCbRef = useRef(onSmokeMidpoint)
  midpointCbRef.current = onSmokeMidpoint
  const endCbRef = useRef(onSmokeEnd)
  endCbRef.current = onSmokeEnd

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = (canvas.width = window.innerWidth)
    const height = (canvas.height = window.innerHeight)
    let midpointFired = false

    // Multi-center smoke generation for full-viewport atmospheric coverage
    const centers = [
      { x: width * 0.5, y: height * 0.5, weight: 30 },
      { x: width * 0.3, y: height * 0.45, weight: 15 },
      { x: width * 0.7, y: height * 0.55, weight: 15 },
      { x: width * 0.2, y: height * 0.7, weight: 10 },
      { x: width * 0.8, y: height * 0.3, weight: 10 },
    ]

    const puffs: SmokePuff[] = []

    centers.forEach((origin) => {
      for (let i = 0; i < origin.weight; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 4.5 + 1.5
        const offset = Math.random() * 90

        // Color variety: 60% silver mist, 25% deep shadow mist, 15% warm lumos gold
        const randType = Math.random()
        let r = 200, g = 215, b = 240 // Silver mist
        if (randType < 0.25) {
          r = 15; g = 18; b = 28 // Obsidian deep shadow
        } else if (randType > 0.82) {
          r = 235; g = 195; b = 85 // Lumos golden wisp
        }

        puffs.push({
          x: origin.x + Math.cos(angle) * offset,
          y: origin.y + Math.sin(angle) * offset,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.4,
          radius: Math.random() * 110 + 90,
          growth: Math.random() * 5 + 4,
          alpha: 0,
          maxAlpha: Math.random() * 0.55 + 0.35,
          life: 0,
          maxLife: Math.random() * 25 + 50,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.03,
          colorR: r,
          colorG: g,
          colorB: b,
        })
      }
    })

    let frame = 0
    const totalFrames = 62

    const render = () => {
      frame++
      ctx.clearRect(0, 0, width, height)

      // Envelope veil progress (0 -> 1 -> 0)
      const progress = frame / totalFrames
      let veilAlpha = 0
      if (progress < 0.42) {
        veilAlpha = (progress / 0.42) * 0.88
      } else if (progress < 0.58) {
        veilAlpha = 0.88
      } else {
        veilAlpha = (1 - (progress - 0.58) / 0.42) * 0.88
      }

      // Draw atmospheric base veil
      if (veilAlpha > 0.01) {
        ctx.fillStyle = `rgba(7, 8, 13, ${veilAlpha.toFixed(3)})`
        ctx.fillRect(0, 0, width, height)
      }

      // Midpoint trigger: switch view content when fully veiled
      if (frame >= 25 && !midpointFired) {
        midpointFired = true
        if (midpointCbRef.current) {
          midpointCbRef.current()
        }
      }

      // Render individual billowing smoke puffs
      for (let i = 0; i < puffs.length; i++) {
        const p = puffs[i]
        p.life++
        p.x += p.vx
        p.y += p.vy
        p.radius += p.growth
        p.rotation += p.vRot
        p.vx *= 0.95
        p.vy *= 0.95

        const puffProg = p.life / p.maxLife
        if (puffProg < 0.35) {
          p.alpha = (puffProg / 0.35) * p.maxAlpha
        } else {
          p.alpha = (1 - (puffProg - 0.35) / 0.65) * p.maxAlpha
        }

        if (p.alpha <= 0.01) continue

        const grad = ctx.createRadialGradient(
          p.x,
          p.y,
          p.radius * 0.06,
          p.x,
          p.y,
          p.radius
        )
        grad.addColorStop(0, `rgba(${p.colorR}, ${p.colorG}, ${p.colorB}, ${(p.alpha).toFixed(3)})`)
        grad.addColorStop(0.5, `rgba(${p.colorR}, ${p.colorG}, ${p.colorB}, ${(p.alpha * 0.55).toFixed(3)})`)
        grad.addColorStop(1, `rgba(${p.colorR}, ${p.colorG}, ${p.colorB}, 0)`)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }

      if (frame < totalFrames) {
        animRef.current = requestAnimationFrame(render)
      } else {
        ctx.clearRect(0, 0, width, height)
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
      aria-hidden="true"
    />
  )
}
