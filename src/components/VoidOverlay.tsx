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

          {/* Golden Snitch (Pomo de Ouro) */}
          <motion.div
            className="relative z-10 flex items-center justify-center cursor-pointer select-none"
            animate={{
              y: hovered ? [-4, 4, -4] : [-8, 8, -8],
              rotate: hovered ? [-1, 1, -1] : [-2, 2, -2],
            }}
            transition={{
              duration: hovered ? 1.4 : 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            onClick={onOrbClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            role="button"
            tabIndex={0}
            aria-label="Capturar o Pomo de Ouro para entrar no portfólio"
          >
            {/* Left Silver Feathered Wing */}
            <motion.div
              className="absolute right-[80%] top-1/2 origin-right pointer-events-none"
              style={{ width: 110, height: 42 }}
              animate={{
                rotateZ: hovered ? [-25, 25, -25] : [-16, 16, -16],
                scaleY: hovered ? [0.85, 1.15, 0.85] : [0.92, 1.08, 0.92],
              }}
              transition={{
                duration: hovered ? 0.22 : 0.65,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <svg
                viewBox="0 0 120 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[0_0_12px_rgba(255,240,190,0.65)]"
              >
                <path
                  d="M120 25 C90 10, 45 0, 5 8 C25 18, 55 24, 75 32 C95 38, 110 32, 120 25 Z"
                  fill="url(#leftWingGradient)"
                  stroke="#ffd778"
                  strokeWidth="1"
                  strokeOpacity="0.8"
                />
                {/* Feathers internal ribs */}
                <path d="M100 24 C80 16, 50 12, 20 12" stroke="#fff5d1" strokeWidth="0.8" strokeOpacity="0.7" />
                <path d="M85 27 C68 22, 45 20, 30 22" stroke="#fff5d1" strokeWidth="0.7" strokeOpacity="0.6" />
                <path d="M110 25 C95 24, 75 28, 60 30" stroke="#fff5d1" strokeWidth="0.7" strokeOpacity="0.6" />
                <defs>
                  <linearGradient id="leftWingGradient" x1="120" y1="25" x2="0" y2="10" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#fff8e7" stopOpacity="0.95" />
                    <stop offset="40%" stopColor="#dfba63" stopOpacity="0.75" />
                    <stop offset="85%" stopColor="#8c6a28" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#ffd778" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Right Silver Feathered Wing */}
            <motion.div
              className="absolute left-[80%] top-1/2 origin-left pointer-events-none"
              style={{ width: 110, height: 42 }}
              animate={{
                rotateZ: hovered ? [25, -25, 25] : [16, -16, 16],
                scaleY: hovered ? [0.85, 1.15, 0.85] : [0.92, 1.08, 0.92],
              }}
              transition={{
                duration: hovered ? 0.22 : 0.65,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <svg
                viewBox="0 0 120 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[0_0_12px_rgba(255,240,190,0.65)]"
              >
                <path
                  d="M0 25 C30 10, 75 0, 115 8 C95 18, 65 24, 45 32 C25 38, 10 32, 0 25 Z"
                  fill="url(#rightWingGradient)"
                  stroke="#ffd778"
                  strokeWidth="1"
                  strokeOpacity="0.8"
                />
                {/* Feathers internal ribs */}
                <path d="M20 24 C40 16, 70 12, 100 12" stroke="#fff5d1" strokeWidth="0.8" strokeOpacity="0.7" />
                <path d="M35 27 C52 22, 75 20, 90 22" stroke="#fff5d1" strokeWidth="0.7" strokeOpacity="0.6" />
                <path d="M10 25 C25 24, 45 28, 60 30" stroke="#fff5d1" strokeWidth="0.7" strokeOpacity="0.6" />
                <defs>
                  <linearGradient id="rightWingGradient" x1="0" y1="25" x2="120" y2="10" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#fff8e7" stopOpacity="0.95" />
                    <stop offset="40%" stopColor="#dfba63" stopOpacity="0.75" />
                    <stop offset="85%" stopColor="#8c6a28" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#ffd778" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* The Golden Snitch Spherical Body */}
            <motion.div
              className="relative rounded-full focus:outline-none"
              style={{ width: 84, height: 84 }}
              animate={{
                boxShadow: hovered
                  ? [
                      '0 0 35px 12px rgba(235,185,55,0.9), 0 0 95px 35px rgba(255,225,120,0.65)',
                      '0 0 55px 18px rgba(255,200,60,1), 0 0 130px 50px rgba(255,235,140,0.85)',
                      '0 0 35px 12px rgba(235,185,55,0.9), 0 0 95px 35px rgba(255,225,120,0.65)',
                    ]
                  : [
                      '0 0 20px 4px rgba(212,167,56,0.6), 0 0 55px 12px rgba(255,215,120,0.3)',
                      '0 0 32px 10px rgba(235,185,55,0.8), 0 0 80px 22px rgba(255,225,130,0.5)',
                      '0 0 20px 4px rgba(212,167,56,0.6), 0 0 55px 12px rgba(255,215,120,0.3)',
                    ],
                scale: hovered ? 1.08 : 1,
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Spherical Metallic Body with Engravings */}
              <div
                className="w-full h-full rounded-full relative overflow-hidden border border-[#ffeaa8]"
                style={{
                  background:
                    'radial-gradient(circle at 35% 30%, #fffbf0 0%, #ffd86b 22%, #d4a738 52%, #8f6515 82%, #422904 100%)',
                }}
              >
                {/* Ancient Snitch Intricate Seam Engravings */}
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
                  fill="none"
                >
                  <path
                    d="M15 48 C 30 38, 70 38, 85 48"
                    stroke="#573804"
                    strokeWidth="1.5"
                    strokeOpacity="0.8"
                  />
                  <path
                    d="M15 52 C 30 62, 70 62, 85 52"
                    stroke="#573804"
                    strokeWidth="1.5"
                    strokeOpacity="0.8"
                  />
                  <path
                    d="M48 15 C 38 30, 38 70, 48 85"
                    stroke="#fff5d1"
                    strokeWidth="1"
                    strokeOpacity="0.6"
                  />
                  <path
                    d="M52 15 C 62 30, 62 70, 52 85"
                    stroke="#fff5d1"
                    strokeWidth="1"
                    strokeOpacity="0.6"
                  />
                  {/* Central Swirl Emblem */}
                  <circle cx="50" cy="50" r="14" stroke="#ffe394" strokeWidth="1.2" strokeDasharray="3 2" />
                  <circle cx="50" cy="50" r="5" fill="#fffbe8" fillOpacity="0.9" />
                </svg>

                {/* Intense light reflection spot */}
                <div
                  className="absolute top-3 left-4 rounded-full pointer-events-none"
                  style={{
                    width: 22,
                    height: 14,
                    transform: 'rotate(-30deg)',
                    background:
                      'radial-gradient(ellipse at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                  }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Caption */}
          <motion.p
            className="mt-9 z-10 text-center select-none"
            style={{
              fontFamily: '"Cinzel", serif',
              fontSize: '1.15rem',
              letterSpacing: '0.12em',
              color: 'rgba(215, 178, 105, 0.85)',
            }}
            animate={{ opacity: [0.45, 0.95, 0.45] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {hovered ? '— capturar pomo —' : 'Toque no Pomo de Ouro para entrar'}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
