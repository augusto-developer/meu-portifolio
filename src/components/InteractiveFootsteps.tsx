import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoePrint } from './Footprints'

interface WalkerStep {
  id: string
  x: number
  y: number
  angle: number
  isLeft: boolean
  createdAt: number
}

interface ClickTrail {
  id: string
  targetX: number
  targetY: number
  steps: WalkerStep[]
  name: string
}

/**
 * Interactive Footsteps Engine:
 * When the visitor clicks anywhere on the parchment, a series of footsteps
 * walks across the map to that coordinate, leaving authentic ink prints and a name tag!
 */
export default function InteractiveFootsteps() {
  const [trails, setTrails] = useState<ClickTrail[]>([])
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't trigger if clicking interactive buttons or links
      const target = e.target as HTMLElement
      if (target.closest('a, button, input, textarea, select')) return

      const clickX = e.pageX
      const clickY = e.pageY

      const startX = lastPos ? lastPos.x : clickX - 120
      const startY = lastPos ? lastPos.y : clickY - 80

      const dx = clickX - startX
      const dy = clickY - startY
      const dist = Math.hypot(dx, dy)
      const stepDistance = 24
      const stepCount = Math.max(3, Math.min(10, Math.floor(dist / stepDistance)))
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90

      const newSteps: WalkerStep[] = []
      const trailId = Math.random().toString(36).substring(7)

      for (let i = 0; i <= stepCount; i++) {
        const t = i / stepCount
        const curX = startX + dx * t
        const curY = startY + dy * t
        const isLeft = i % 2 === 0
        const perpAngle = ((angle + 90) * Math.PI) / 180
        const lateralOffset = isLeft ? -6 : 6

        newSteps.push({
          id: `${trailId}-${i}`,
          x: curX + Math.cos(perpAngle) * lateralOffset,
          y: curY + Math.sin(perpAngle) * lateralOffset,
          angle: angle + (isLeft ? -4 : 4),
          isLeft,
          createdAt: Date.now() + i * 160,
        })
      }

      const newTrail: ClickTrail = {
        id: trailId,
        targetX: clickX,
        targetY: clickY,
        steps: newSteps,
        name: 'Visitante',
      }

      setTrails((prev) => [...prev.slice(-3), newTrail])
      setLastPos({ x: clickX, y: clickY })
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [lastPos])

  // Clean up old trails after 8 seconds
  useEffect(() => {
    if (trails.length === 0) return
    const interval = setInterval(() => {
      const now = Date.now()
      setTrails((prev) =>
        prev.filter((trail) => {
          const lastStep = trail.steps[trail.steps.length - 1]
          return lastStep && now - lastStep.createdAt < 7000
        })
      )
    }, 2000)
    return () => clearInterval(interval)
  }, [trails])

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
      <svg className="w-full h-full min-h-screen" style={{ position: 'absolute', top: 0, left: 0 }}>
        <AnimatePresence>
          {trails.map((trail) => (
            <g key={trail.id}>
              {trail.steps.map((step, idx) => (
                <motion.g
                  key={step.id}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 0.85, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    delay: idx * 0.16,
                    duration: 0.35,
                    ease: 'easeOut',
                  }}
                >
                  <ShoePrint
                    x={step.x}
                    y={step.y}
                    rotation={step.angle}
                    isLeft={step.isLeft}
                    scale={0.65}
                    color="#3a2514"
                    opacity={0.8}
                  />
                </motion.g>
              ))}

              {/* Little name banner floating above the final step */}
              <motion.g
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.9, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  delay: trail.steps.length * 0.16 + 0.1,
                  duration: 0.4,
                }}
                transform={`translate(${trail.targetX + 10}, ${trail.targetY - 14})`}
              >
                <rect
                  x="-2"
                  y="-12"
                  width="68"
                  height="16"
                  fill="#f6ecd8"
                  stroke="#5a3d24"
                  strokeWidth="0.8"
                  strokeDasharray="2,1"
                  rx="3"
                />
                <text
                  x="4"
                  y="0"
                  fontFamily='"Cinzel", serif'
                  fontSize="8"
                  fill="#2e1c10"
                  fontWeight="600"
                  letterSpacing="0.08em"
                >
                  VISITANTE
                </text>
              </motion.g>
            </g>
          ))}
        </AnimatePresence>
      </svg>
    </div>
  )
}
