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

          {/* Golden Snitch (Pomo de Ouro Realista) */}
          <motion.div
            className="relative z-10 flex items-center justify-center cursor-pointer select-none"
            animate={{
              y: hovered ? [-3, 3, -3] : [-10, 10, -10],
              x: hovered ? [-2, 2, -2] : [0, 0, 0],
              rotate: hovered ? [-1.5, 1.5, -1.5] : [-3, 3, -3],
            }}
            transition={{
              duration: hovered ? 1.2 : 3.0,
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
            {/* Ambient Warm Golden Aura */}
            <div
              className="absolute rounded-full pointer-events-none transition-all duration-500"
              style={{
                width: hovered ? 240 : 180,
                height: hovered ? 240 : 180,
                background:
                  'radial-gradient(circle, rgba(255, 215, 120, 0.35) 0%, rgba(212, 167, 56, 0.15) 45%, transparent 70%)',
                filter: 'blur(16px)',
              }}
            />

            {/* Left Wing (Realistic Articulated Snitch Wing) */}
            <motion.div
              className="absolute right-[65%] top-[18%] origin-bottom-right pointer-events-none z-0"
              style={{ width: 175, height: 75 }}
              animate={{
                rotateZ: hovered ? [-28, 28, -28] : [-18, 18, -18],
                scaleY: hovered ? [0.75, 1.2, 0.75] : [0.88, 1.12, 0.88],
                skewX: hovered ? [-8, 8, -8] : [-4, 4, -4],
              }}
              transition={{
                duration: hovered ? 0.14 : 0.48,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <svg
                viewBox="0 0 200 85"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[0_0_15px_rgba(255,235,160,0.7)]"
              >
                <defs>
                  <linearGradient id="leftWingMembrane" x1="200" y1="45" x2="0" y2="15" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="25%" stopColor="#fff2be" stopOpacity="0.85" />
                    <stop offset="60%" stopColor="#dfb75c" stopOpacity="0.6" />
                    <stop offset="90%" stopColor="#96742a" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ffd778" stopOpacity="0.05" />
                  </linearGradient>
                  <linearGradient id="leftSpineGrad" x1="200" y1="50" x2="10" y2="15" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="40%" stopColor="#ffe699" />
                    <stop offset="100%" stopColor="#c59837" />
                  </linearGradient>
                </defs>

                {/* Primary Feather Layer */}
                <path
                  d="M200 48 C 170 25, 110 5, 5 18 C 30 32, 65 38, 95 48 C 135 60, 175 58, 200 48 Z"
                  fill="url(#leftWingMembrane)"
                  stroke="#ffd778"
                  strokeWidth="1.2"
                  strokeOpacity="0.85"
                />

                {/* Secondary Feather Overlap (Feather Plumes) */}
                <path
                  d="M190 52 C 160 38, 105 22, 25 32 C 55 45, 95 52, 130 58 C 160 62, 180 58, 190 52 Z"
                  fill="url(#leftWingMembrane)"
                  fillOpacity="0.75"
                />

                {/* Mechanical/Filigree Feather Quills (Rachis) */}
                <path d="M200 48 C 150 25, 90 18, 10 18" stroke="url(#leftSpineGrad)" strokeWidth="2" strokeLinecap="round" />
                <path d="M175 46 C 140 32, 85 28, 35 32" stroke="#fff8dc" strokeWidth="1.2" strokeOpacity="0.8" />
                <path d="M150 48 C 120 40, 80 38, 50 42" stroke="#fff8dc" strokeWidth="1" strokeOpacity="0.7" />
                <path d="M125 50 C 100 46, 75 46, 60 50" stroke="#fff8dc" strokeWidth="0.8" strokeOpacity="0.6" />

                {/* Feather Barbs & Fine Details */}
                <path d="M160 30 L 140 45" stroke="#ffffff" strokeWidth="0.7" strokeOpacity="0.5" />
                <path d="M130 24 L 110 42" stroke="#ffffff" strokeWidth="0.7" strokeOpacity="0.5" />
                <path d="M100 20 L 80 40" stroke="#ffffff" strokeWidth="0.7" strokeOpacity="0.5" />
                <path d="M70 18 L 55 35" stroke="#ffffff" strokeWidth="0.7" strokeOpacity="0.5" />
                <path d="M40 18 L 30 30" stroke="#ffffff" strokeWidth="0.7" strokeOpacity="0.5" />
              </svg>
            </motion.div>

            {/* Right Wing (Realistic Articulated Snitch Wing) */}
            <motion.div
              className="absolute left-[65%] top-[18%] origin-bottom-left pointer-events-none z-0"
              style={{ width: 175, height: 75 }}
              animate={{
                rotateZ: hovered ? [28, -28, 28] : [18, -18, 18],
                scaleY: hovered ? [0.75, 1.2, 0.75] : [0.88, 1.12, 0.88],
                skewX: hovered ? [8, -8, 8] : [4, -4, 4],
              }}
              transition={{
                duration: hovered ? 0.14 : 0.48,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <svg
                viewBox="0 0 200 85"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[0_0_15px_rgba(255,235,160,0.7)]"
              >
                <defs>
                  <linearGradient id="rightWingMembrane" x1="0" y1="45" x2="200" y2="15" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="25%" stopColor="#fff2be" stopOpacity="0.85" />
                    <stop offset="60%" stopColor="#dfb75c" stopOpacity="0.6" />
                    <stop offset="90%" stopColor="#96742a" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ffd778" stopOpacity="0.05" />
                  </linearGradient>
                  <linearGradient id="rightSpineGrad" x1="0" y1="50" x2="190" y2="15" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="40%" stopColor="#ffe699" />
                    <stop offset="100%" stopColor="#c59837" />
                  </linearGradient>
                </defs>

                {/* Primary Feather Layer */}
                <path
                  d="M0 48 C 30 25, 90 5, 195 18 C 170 32, 135 38, 105 48 C 65 60, 25 58, 0 48 Z"
                  fill="url(#rightWingMembrane)"
                  stroke="#ffd778"
                  strokeWidth="1.2"
                  strokeOpacity="0.85"
                />

                {/* Secondary Feather Overlap */}
                <path
                  d="M10 52 C 40 38, 95 22, 175 32 C 145 45, 105 52, 70 58 C 40 62, 20 58, 10 52 Z"
                  fill="url(#rightWingMembrane)"
                  fillOpacity="0.75"
                />

                {/* Mechanical/Filigree Feather Quills */}
                <path d="M0 48 C 50 25, 110 18, 190 18" stroke="url(#rightSpineGrad)" strokeWidth="2" strokeLinecap="round" />
                <path d="M25 46 C 60 32, 115 28, 165 32" stroke="#fff8dc" strokeWidth="1.2" strokeOpacity="0.8" />
                <path d="M50 48 C 80 40, 120 38, 150 42" stroke="#fff8dc" strokeWidth="1" strokeOpacity="0.7" />
                <path d="M75 50 C 100 46, 125 46, 140 50" stroke="#fff8dc" strokeWidth="0.8" strokeOpacity="0.6" />

                {/* Feather Barbs */}
                <path d="M40 30 L 60 45" stroke="#ffffff" strokeWidth="0.7" strokeOpacity="0.5" />
                <path d="M70 24 L 90 42" stroke="#ffffff" strokeWidth="0.7" strokeOpacity="0.5" />
                <path d="M100 20 L 120 40" stroke="#ffffff" strokeWidth="0.7" strokeOpacity="0.5" />
                <path d="M130 18 L 145 35" stroke="#ffffff" strokeWidth="0.7" strokeOpacity="0.5" />
                <path d="M160 18 L 170 30" stroke="#ffffff" strokeWidth="0.7" strokeOpacity="0.5" />
              </svg>
            </motion.div>

            {/* The Golden Snitch Core Sphere (3D Burnished Gold with Movie Filigree) */}
            <motion.div
              className="relative z-10 rounded-full focus:outline-none"
              style={{ width: 88, height: 88 }}
              animate={{
                boxShadow: hovered
                  ? [
                      '0 0 35px 10px rgba(255,215,100,0.85), 0 0 85px 30px rgba(212,167,56,0.6), inset 0 2px 4px rgba(255,255,255,0.8), inset 0 -4px 10px rgba(70,40,5,0.9)',
                      '0 0 55px 16px rgba(255,230,130,0.95), 0 0 115px 45px rgba(235,185,55,0.75), inset 0 2px 6px rgba(255,255,255,0.9), inset 0 -4px 12px rgba(70,40,5,0.9)',
                      '0 0 35px 10px rgba(255,215,100,0.85), 0 0 85px 30px rgba(212,167,56,0.6), inset 0 2px 4px rgba(255,255,255,0.8), inset 0 -4px 10px rgba(70,40,5,0.9)',
                    ]
                  : [
                      '0 0 22px 5px rgba(212,167,56,0.6), 0 0 50px 15px rgba(160,115,25,0.35), inset 0 2px 4px rgba(255,255,255,0.7), inset 0 -4px 10px rgba(60,35,5,0.85)',
                      '0 0 32px 8px rgba(240,195,75,0.75), 0 0 70px 22px rgba(212,167,56,0.5), inset 0 2px 4px rgba(255,255,255,0.8), inset 0 -4px 10px rgba(60,35,5,0.85)',
                      '0 0 22px 5px rgba(212,167,56,0.6), 0 0 50px 15px rgba(160,115,25,0.35), inset 0 2px 4px rgba(255,255,255,0.7), inset 0 -4px 10px rgba(60,35,5,0.85)',
                    ],
                scale: hovered ? 1.08 : 1,
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Photorealistic 3D Metallic Sphere */}
              <div
                className="w-full h-full rounded-full relative overflow-hidden border border-[#ffeaa8]/80"
                style={{
                  background:
                    'radial-gradient(circle at 32% 28%, #ffffff 0%, #fff0b8 16%, #f3c348 38%, #c99327 65%, #7a500f 88%, #361f03 100%)',
                }}
              >
                {/* Movie-Accurate Filigree & Grooves Pattern */}
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="grooveShadow" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#4a2c04" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#221201" stopOpacity="0.95" />
                    </linearGradient>
                    <linearGradient id="grooveHighlight" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#fff8e0" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#f3c348" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>

                  {/* Left & Right Wing Socket Joint Rings */}
                  <circle cx="12" cy="50" r="7" stroke="url(#grooveShadow)" strokeWidth="1.6" />
                  <circle cx="12" cy="50" r="5" stroke="url(#grooveHighlight)" strokeWidth="0.8" fill="#523205" />
                  <circle cx="88" cy="50" r="7" stroke="url(#grooveShadow)" strokeWidth="1.6" />
                  <circle cx="88" cy="50" r="5" stroke="url(#grooveHighlight)" strokeWidth="0.8" fill="#523205" />

                  {/* Upper Curving Swirl (I Open at the Close) */}
                  <path
                    d="M 16 46 C 28 32, 45 28, 50 28 C 55 28, 72 32, 84 46"
                    stroke="url(#grooveShadow)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 16 45 C 28 31, 45 27, 50 27 C 55 27, 72 31, 84 45"
                    stroke="url(#grooveHighlight)"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                  />

                  {/* Lower Curving Swirl */}
                  <path
                    d="M 16 54 C 28 68, 45 72, 50 72 C 55 72, 72 68, 84 54"
                    stroke="url(#grooveShadow)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 16 55 C 28 69, 45 73, 50 73 C 55 73, 72 69, 84 55"
                    stroke="url(#grooveHighlight)"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                  />

                  {/* Central Geometric Medallion */}
                  <circle cx="50" cy="50" r="13" stroke="url(#grooveShadow)" strokeWidth="1.6" />
                  <circle cx="50" cy="50" r="12" stroke="url(#grooveHighlight)" strokeWidth="0.8" />
                  <circle cx="50" cy="50" r="6" fill="#fff5d0" fillOpacity="0.85" />
                  <circle cx="50" cy="50" r="3" fill="#ffffff" />
                  <path d="M 40 50 L 60 50" stroke="url(#grooveShadow)" strokeWidth="1.2" />
                  <path d="M 50 40 L 50 60" stroke="url(#grooveShadow)" strokeWidth="1.2" />
                </svg>

                {/* Primary Specular Glint (Reflexo de Luz Realista) */}
                <div
                  className="absolute top-2 left-3 rounded-full pointer-events-none"
                  style={{
                    width: 26,
                    height: 16,
                    transform: 'rotate(-35deg)',
                    background:
                      'radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(255,255,240,0.7) 45%, transparent 85%)',
                    filter: 'blur(0.5px)',
                  }}
                />

                {/* Secondary Edge Glint (Bounce Light) */}
                <div
                  className="absolute bottom-2 right-3 rounded-full pointer-events-none opacity-60"
                  style={{
                    width: 20,
                    height: 10,
                    transform: 'rotate(-40deg)',
                    background:
                      'radial-gradient(ellipse at center, rgba(255,240,180,0.8) 0%, transparent 80%)',
                  }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Caption */}
          <motion.div className="mt-10 z-10 text-center select-none flex flex-col items-center gap-1.5">
            <motion.p
              style={{
                fontFamily: '"Cinzel", serif',
                fontSize: '1.2rem',
                letterSpacing: '0.14em',
                color: '#ffe599',
                textShadow: '0 0 14px rgba(255, 215, 120, 0.65)',
              }}
              animate={{ opacity: [0.65, 1, 0.65] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              {hovered ? '— capturar pomo de ouro —' : 'Toque no Pomo de Ouro'}
            </motion.p>
            <span className="text-[11px] font-mono text-[#d4a738]/80 tracking-wider">
              {hovered ? '✦ Abrir os portões do atelier ✦' : 'para ingressar no atelier'}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
