import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface VoidOverlayProps {
  visible: boolean
  onOrbClick: () => void
}

/** Floating particle data */
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

const PARTICLES = generateParticles(55)

export default function VoidOverlay({ visible, onOrbClick }: VoidOverlayProps) {
  const [hovered, setHovered] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)

  // Subtle star-field on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const stars = Array.from({ length: 160 }, () => ({
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
        ctx.fillStyle = `rgba(197, 154, 63, ${s.alpha * 0.6})`
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
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0c0d12] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          {/* Star-field canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          />

          {/* Floating dust particles */}
          {PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-accent-gold/40 pointer-events-none"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{
                y: [0, -18, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Atmospheric outer ring */}
          <motion.div
            className="absolute rounded-full border border-accent-gold/10"
            style={{ width: 320, height: 320 }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute rounded-full border border-accent-amber/8"
            style={{ width: 480, height: 480 }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.05, 0.15] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          {/* The Lumos Orb */}
          <motion.button
            className="relative z-10 rounded-full cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-accent-gold/50"
            style={{ width: 100, height: 100 }}
            animate={{
              boxShadow: hovered
                ? [
                    '0 0 40px 14px rgba(223,155,50,0.85), 0 0 100px 40px rgba(255,215,120,0.6)',
                    '0 0 55px 20px rgba(223,155,50,1), 0 0 130px 60px rgba(255,215,120,0.75)',
                    '0 0 40px 14px rgba(223,155,50,0.85), 0 0 100px 40px rgba(255,215,120,0.6)',
                  ]
                : [
                    '0 0 20px 5px rgba(223,155,50,0.5), 0 0 60px 15px rgba(255,215,120,0.3)',
                    '0 0 35px 12px rgba(223,155,50,0.75), 0 0 90px 30px rgba(255,215,120,0.5)',
                    '0 0 20px 5px rgba(223,155,50,0.5), 0 0 60px 15px rgba(255,215,120,0.3)',
                  ],
              scale: hovered ? 1.15 : 1,
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            onClick={onOrbClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            aria-label="Revelar o portfólio"
          >
            {/* Orb core */}
            <div
              className="w-full h-full rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 38% 38%, #ffd778 0%, #df9b32 45%, #c59a3f 70%, #8b6914 100%)',
              }}
            />
            {/* Inner sparkle */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              style={{
                width: 28,
                height: 28,
                background: 'radial-gradient(circle, rgba(255,255,220,0.95) 0%, transparent 70%)',
              }}
            />
          </motion.button>

          {/* Caption */}
          <motion.p
            className="mt-10 z-10 text-center select-none"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1.15rem',
              letterSpacing: '0.12em',
              color: 'rgba(197,154,63,0.75)',
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {hovered ? '— toque para revelar —' : 'Clique para revelar'}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

