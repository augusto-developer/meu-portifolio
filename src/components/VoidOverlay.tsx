import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface VoidOverlayProps {
  visible: boolean
  onOrbClick: () => void
}

/** Floating mystical particle */
interface Particle {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 4,
    duration: Math.random() * 4 + 5,
  }))
}

const PARTICLES = generateParticles(45)

export default function VoidOverlay({ visible, onOrbClick }: VoidOverlayProps) {
  const [hovered, setHovered] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)

  // Star-field ambient dust
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.1 + 0.2,
      alpha: Math.random(),
      speed: Math.random() * 0.005 + 0.002,
      dir: Math.random() > 0.5 ? 1 : -1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      stars.forEach((s) => {
        s.alpha += s.speed * s.dir
        if (s.alpha > 1 || s.alpha < 0.05) s.dir *= -1
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(197, 154, 63, ${s.alpha * 0.55})`
        ctx.fill()
      })
      animFrameRef.current = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="void"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0f] overflow-hidden select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: 'easeInOut' }}
        >
          {/* Subtle star-field canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          />

          {/* Floating golden dust particles */}
          {PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-accent-gold/30 pointer-events-none"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{
                y: [0, -18, 0],
                opacity: [0.15, 0.7, 0.15],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Concentric mystical rings */}
          <motion.div
            className="absolute rounded-full border border-accent-gold/10 pointer-events-none"
            style={{ width: 280, height: 280 }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.1, 0.25] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute rounded-full border border-accent-amber/8 pointer-events-none"
            style={{ width: 440, height: 440 }}
            animate={{ scale: [1, 1.06, 1], opacity: [0.15, 0.05, 0.15] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          {/* The Lumos Orb */}
          <motion.button
            className="relative z-10 rounded-full cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-accent-gold/50"
            style={{ width: 92, height: 92 }}
            animate={{
              boxShadow: hovered
                ? [
                    '0 0 35px 12px rgba(223,155,50,0.8), 0 0 90px 35px rgba(255,215,120,0.55)',
                    '0 0 50px 18px rgba(223,155,50,0.95), 0 0 120px 50px rgba(255,215,120,0.7)',
                    '0 0 35px 12px rgba(223,155,50,0.8), 0 0 90px 35px rgba(255,215,120,0.55)',
                  ]
                : [
                    '0 0 18px 4px rgba(223,155,50,0.45), 0 0 55px 12px rgba(255,215,120,0.25)',
                    '0 0 30px 10px rgba(223,155,50,0.7), 0 0 80px 25px rgba(255,215,120,0.45)',
                    '0 0 18px 4px rgba(223,155,50,0.45), 0 0 55px 12px rgba(255,215,120,0.25)',
                  ],
              scale: hovered ? 1.12 : 1,
            }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            onClick={onOrbClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            aria-label="Revelar o mapa"
          >
            {/* Orb core */}
            <div
              className="w-full h-full rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 38% 38%, #fff4cf 0%, #df9b32 40%, #c59a3f 70%, #6e4e08 100%)',
              }}
            />
            {/* Intense light center */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              style={{
                width: 24,
                height: 24,
                background: 'radial-gradient(circle, rgba(255,255,240,0.95) 0%, transparent 70%)',
              }}
            />
          </motion.button>

          {/* Caption */}
          <motion.p
            className="mt-9 z-10 text-center select-none"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '1.2rem',
              letterSpacing: '0.14em',
              color: 'rgba(215, 178, 105, 0.85)',
            }}
            animate={{ opacity: [0.45, 0.95, 0.45] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {hovered ? '— toque para revelar —' : 'Clique para revelar'}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
