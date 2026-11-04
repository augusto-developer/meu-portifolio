import { useEffect, useRef } from 'react'

interface MarauderInkCanvasProps {
  active: boolean
  onBleedComplete?: () => void
}

interface InkBranch {
  x: number
  y: number
  vx: number
  vy: number
  angle: number
  speed: number
  width: number
  life: number
  maxLife: number
  generation: number
  color: string
}

/**
 * Organic Ink Bleed Simulation (Capillary Action / Dendritic Vein Diffusion).
 * Replicates ink bleeding into paper fibers from a single touchpoint.
 */
export default function MarauderInkCanvas({
  active,
  onBleedComplete,
}: MarauderInkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const branchesRef = useRef<InkBranch[]>([])
  const isCompleteRef = useRef(false)

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = (canvas.width = window.innerWidth)
    const height = (canvas.height = window.innerHeight)
    const centerX = width / 2
    const centerY = height / 2

    // Clear with transparent
    ctx.clearRect(0, 0, width, height)

    // Center pool of ink
    const drawCentralPool = () => {
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        2,
        centerX,
        centerY,
        35
      )
      gradient.addColorStop(0, 'rgba(43, 33, 24, 0.95)')
      gradient.addColorStop(0.5, 'rgba(58, 37, 20, 0.85)')
      gradient.addColorStop(0.85, 'rgba(92, 73, 56, 0.45)')
      gradient.addColorStop(1, 'rgba(92, 73, 56, 0)')

      ctx.beginPath()
      ctx.arc(centerX, centerY, 35, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()
    }
    drawCentralPool()

    // Spawn 24 primary root branches in all radial directions
    const branches: InkBranch[] = []
    const rootCount = 28
    for (let i = 0; i < rootCount; i++) {
      const angle = (i / rootCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.25
      const speed = Math.random() * 2.8 + 2.2
      branches.push({
        x: centerX + Math.cos(angle) * 8,
        y: centerY + Math.sin(angle) * 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        angle,
        speed,
        width: Math.random() * 3.5 + 2.0,
        life: 0,
        maxLife: Math.random() * 70 + 60,
        generation: 0,
        color: Math.random() > 0.4 ? 'rgba(43, 33, 24, ' : 'rgba(58, 37, 20, ',
      })
    }

    branchesRef.current = branches
    isCompleteRef.current = false
    let frame = 0

    const render = () => {
      frame++
      const currentBranches = branchesRef.current
      const newBranches: InkBranch[] = []

      for (let i = currentBranches.length - 1; i >= 0; i--) {
        const b = currentBranches[i]

        // Curvature / meandering motion imitating paper fibers
        b.angle += (Math.random() - 0.5) * 0.35
        b.vx = Math.cos(b.angle) * b.speed
        b.vy = Math.sin(b.angle) * b.speed

        const nextX = b.x + b.vx
        const nextY = b.y + b.vy

        // Calculate opacity based on branch age
        const progress = b.life / b.maxLife
        const alpha = Math.max(0, 0.9 - progress * 0.6)
        const currentWidth = Math.max(0.5, b.width * (1 - progress * 0.75))

        // Draw segment
        ctx.beginPath()
        ctx.moveTo(b.x, b.y)
        ctx.lineTo(nextX, nextY)
        ctx.strokeStyle = `${b.color}${alpha.toFixed(2)})`
        ctx.lineWidth = currentWidth
        ctx.lineCap = 'round'
        ctx.stroke()

        // Occasional ink seep droplet
        if (Math.random() < 0.08) {
          ctx.beginPath()
          ctx.arc(
            nextX + (Math.random() - 0.5) * 4,
            nextY + (Math.random() - 0.5) * 4,
            Math.random() * 1.5 + 0.4,
            0,
            Math.PI * 2
          )
          ctx.fillStyle = `${b.color}${(alpha * 0.8).toFixed(2)})`
          ctx.fill()
        }

        b.x = nextX
        b.y = nextY
        b.life++

        // Sub-branching (capillary fork)
        if (
          b.generation < 2 &&
          b.life > 12 &&
          Math.random() < 0.055 &&
          currentBranches.length + newBranches.length < 180
        ) {
          const forkAngle =
            b.angle + (Math.random() > 0.5 ? 1 : -1) * (0.5 + Math.random() * 0.4)
          newBranches.push({
            x: b.x,
            y: b.y,
            vx: Math.cos(forkAngle) * (b.speed * 0.85),
            vy: Math.sin(forkAngle) * (b.speed * 0.85),
            angle: forkAngle,
            speed: b.speed * 0.85,
            width: b.width * 0.7,
            life: 0,
            maxLife: b.maxLife * 0.65,
            generation: b.generation + 1,
            color: b.color,
          })
        }

        // Kill expired branches
        if (b.life >= b.maxLife) {
          currentBranches.splice(i, 1)
        }
      }

      // Add new sub-branches
      if (newBranches.length > 0) {
        currentBranches.push(...newBranches)
      }

      // Check if finished
      if (currentBranches.length === 0 && !isCompleteRef.current) {
        isCompleteRef.current = true
        if (onBleedComplete) {
          onBleedComplete()
        }
        return
      }

      if (frame < 220) {
        animRef.current = requestAnimationFrame(render)
      } else if (!isCompleteRef.current) {
        isCompleteRef.current = true
        if (onBleedComplete) {
          onBleedComplete()
        }
      }
    }

    render()

    return () => {
      cancelAnimationFrame(animRef.current)
    }
  }, [active, onBleedComplete])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      style={{ mixBlendMode: 'multiply' }}
      aria-hidden="true"
    />
  )
}
