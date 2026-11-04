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
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#000000] overflow-hidden select-none"
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

          {/* Golden Snitch (Vídeo Cinemático Realista em Loop com Fusão Perfeita) */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center cursor-pointer select-none group"
            animate={{
              y: hovered ? [-4, 4, -4] : [-8, 8, -8],
              scale: hovered ? 1.05 : 1,
            }}
            transition={{
              duration: hovered ? 1.4 : 3.0,
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
            {/* Ambient Warm Golden Lumos Aura (Sutilmente integrado ao preto) */}
            <div
              className="absolute rounded-full pointer-events-none transition-all duration-700"
              style={{
                width: hovered ? 450 : 360,
                height: hovered ? 450 : 360,
                background:
                  'radial-gradient(circle, rgba(235, 185, 55, 0.3) 0%, rgba(180, 130, 30, 0.12) 40%, transparent 70%)',
                filter: 'blur(35px)',
              }}
            />

            {/* Video Container: Fundo transparente integrado com Screen Blend & Curva de Contraste */}
            <div
              className="relative flex items-center justify-center transition-all duration-300"
              style={{
                width: 620,
                height: 320,
                WebkitMaskImage:
                  'radial-gradient(ellipse 50% 48% at 50% 50%, #000 0%, #000 45%, rgba(0,0,0,0.5) 70%, transparent 95%)',
                maskImage:
                  'radial-gradient(ellipse 50% 48% at 50% 50%, #000 0%, #000 45%, rgba(0,0,0,0.5) 70%, transparent 95%)',
              }}
            >
              <video
                src="./snitch.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover pointer-events-none transition-transform duration-300 group-hover:scale-105"
                style={{
                  mixBlendMode: 'screen',
                  filter: hovered
                    ? 'brightness(1.15) contrast(1.3) drop-shadow(0 0 30px rgba(255, 215, 120, 0.85))'
                    : 'brightness(1.05) contrast(1.2) drop-shadow(0 0 15px rgba(212, 167, 56, 0.5))',
                }}
              />
            </div>
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
