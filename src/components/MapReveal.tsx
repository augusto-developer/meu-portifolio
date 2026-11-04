import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MarauderInkCanvas from './MarauderInkCanvas'
import { AnimatedFootstepTrail, StepPoint } from './Footprints'
import { magicAudio } from '../utils/audio'

interface MapRevealProps {
  onComplete: () => void
}

/** Pre-calculated corridor paths for the iconic Marauder footsteps */
function generateCorridorSteps(
  startX: number,
  startY: number,
  count: number,
  dx: number,
  dy: number,
  startDelay: number
): StepPoint[] {
  const steps: StepPoint[] = []
  let x = startX
  let y = startY
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90

  for (let i = 0; i < count; i++) {
    const isLeft = i % 2 === 0
    // Stride offset perpendicular to walking direction
    const perpAngle = angle + 90
    const rad = (perpAngle * Math.PI) / 180
    const offset = isLeft ? -7 : 7

    steps.push({
      x: x + Math.cos(rad) * offset,
      y: y + Math.sin(rad) * offset,
      angle: angle + (isLeft ? -4 : 4),
      isLeft,
      delay: startDelay + i * 0.38,
    })

    x += dx
    y += dy
  }
  return steps
}

const TRAIL_A = generateCorridorSteps(120, 480, 8, 38, -26, 2.8)
const TRAIL_B = generateCorridorSteps(720, 150, 7, -35, 28, 3.6)

export default function MapReveal({ onComplete }: MapRevealProps) {
  const [stage, setStage] = useState<'bleed' | 'corridors' | 'oath' | 'unfold'>('bleed')

  useEffect(() => {
    // Play initial sound
    magicAudio.playLumosChime()

    // Timeline of the magical reveal
    const tBleedSound = setTimeout(() => magicAudio.playQuillScratch(1.2), 600)
    const tCorridors = setTimeout(() => {
      setStage('corridors')
      magicAudio.playQuillScratch(0.8)
    }, 2200)

    const tOath = setTimeout(() => {
      setStage('oath')
      magicAudio.playQuillScratch(1.4)
    }, 4200)

    const tUnfold = setTimeout(() => {
      setStage('unfold')
      magicAudio.playMapUnfold()
    }, 8400)

    const tDone = setTimeout(() => {
      onComplete()
    }, 9600)

    return () => {
      clearTimeout(tBleedSound)
      clearTimeout(tCorridors)
      clearTimeout(tOath)
      clearTimeout(tUnfold)
      clearTimeout(tDone)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-[#f4ede0] select-none">
      {/* Authentic parchment background with aged texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: '#f3ece0',
          backgroundImage: `
            radial-gradient(#3a2514 0.65px, transparent 0.65px),
            radial-gradient(#8c735d 0.5px, #f3ece0 0.5px)
          `,
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px',
        }}
        aria-hidden="true"
      />

      {/* Deep parchment vignette edges (burned-in antique paper effect) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow:
            'inset 0 0 160px rgba(58, 37, 20, 0.4), inset 0 0 60px rgba(43, 33, 24, 0.25)',
        }}
        aria-hidden="true"
      />

      {/* Fold lines of the physical map (accordion creases) */}
      <div className="absolute inset-0 pointer-events-none flex" aria-hidden="true">
        <div className="w-1/3 h-full border-r border-[#5c4938]/15" />
        <div className="w-1/3 h-full border-r border-[#5c4938]/15" />
        <div className="w-1/3 h-full" />
      </div>

      {/* Canvas with the organic branching ink capillary bleed */}
      <MarauderInkCanvas active={true} />

      {/* ── ARCHITECTURAL CORRIDORS & CASTLE BLUEPRINT LINES ── */}
      <svg
        viewBox="0 0 900 600"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.82 }}
        aria-hidden="true"
      >
        {/* Castle Corridor A (diagonal corridor with hatchings) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: stage !== 'bleed' ? 1 : 0 }}
          transition={{ duration: 1.2 }}
        >
          {/* Corridor outer walls */}
          <path
            d="M 80,520 L 420,290"
            stroke="#5c4938"
            strokeWidth="1.5"
            strokeDasharray="4,2"
            fill="none"
          />
          <path
            d="M 120,560 L 460,330"
            stroke="#5c4938"
            strokeWidth="1.5"
            strokeDasharray="4,2"
            fill="none"
          />
          {/* Wall hatching lines */}
          {Array.from({ length: 14 }).map((_, i) => {
            const t = i / 14
            const x1 = 80 + t * 340
            const y1 = 520 - t * 230
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x1 + 12}
                y2={y1 + 12}
                stroke="#8c735d"
                strokeWidth="0.8"
                opacity="0.6"
              />
            )
          })}
        </motion.g>

        {/* Castle Corridor B (upper right corridor) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: stage !== 'bleed' ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <path
            d="M 540,110 L 820,330"
            stroke="#5c4938"
            strokeWidth="1.5"
            strokeDasharray="4,2"
            fill="none"
          />
          <path
            d="M 510,150 L 790,370"
            stroke="#5c4938"
            strokeWidth="1.5"
            strokeDasharray="4,2"
            fill="none"
          />
        </motion.g>

        {/* Walking Marauder Footsteps along the corridors */}
        {stage !== 'bleed' && (
          <>
            <AnimatedFootstepTrail steps={TRAIL_A} nameTag="O Artífice" />
            <AnimatedFootstepTrail steps={TRAIL_B} nameTag="Visitante" />
          </>
        )}

        {/* Vintage Cartographic Compass Rose */}
        <motion.g
          transform="translate(130, 140)"
          initial={{ opacity: 0, rotate: -45 }}
          animate={{ opacity: stage !== 'bleed' ? 0.75 : 0, rotate: 0 }}
          transition={{ duration: 1.6 }}
        >
          <circle cx="0" cy="0" r="42" stroke="#8c735d" strokeWidth="0.8" fill="none" />
          <circle cx="0" cy="0" r="38" stroke="#8c735d" strokeWidth="0.5" strokeDasharray="2,2" fill="none" />
          {/* Compass Star Points */}
          <path d="M 0,-42 L 6,-10 L 0,0 L -6,-10 Z" fill="#3a2514" />
          <path d="M 0,42 L 6,10 L 0,0 L -6,10 Z" fill="#8c735d" />
          <path d="M -42,0 L -10,-6 L 0,0 L -10,6 Z" fill="#8c735d" />
          <path d="M 42,0 L 10,-6 L 0,0 L 10,6 Z" fill="#8c735d" />
          <text x="0" y="-48" textAnchor="middle" fontFamily='"Cinzel", serif' fontSize="10" fill="#3a2514">N</text>
        </motion.g>
      </svg>

      {/* ── THE MARAUDER OATH & MEDIEVAL BANNER ── */}
      <AnimatePresence>
        {(stage === 'oath' || stage === 'unfold') && (
          <motion.div
            className="relative z-30 max-w-2xl px-8 text-center"
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{
              opacity: stage === 'unfold' ? 0 : 1,
              scale: stage === 'unfold' ? 1.08 : 1,
              y: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top parchment ribbon line */}
            <div className="flex items-center justify-center gap-3 mb-4 opacity-75">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#5c4938] to-transparent" />
              <span className="text-xs tracking-widest text-[#5c4938] font-serif uppercase">
                ✦ ✦ ✦
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#5c4938] to-transparent" />
            </div>

            {/* Marauder-style formal header */}
            <motion.p
              className="text-xs uppercase tracking-[0.25em] text-[#5c4938] mb-4 font-semibold"
              style={{ fontFamily: '"Cinzel", serif' }}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Os Artífices do Código & Construtores de Software
            </motion.p>

            <motion.p
              className="text-sm italic text-[#8c735d] mb-6 font-serif"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              têm a distinta honra de apresentar o
            </motion.p>

            {/* The Solemn Oath — Calligraphy script with organic ink seepage shadow */}
            <motion.h1
              className="my-5 leading-tight select-none text-ink-bleed"
              style={{
                fontFamily: '"Marck Script", cursive',
                fontSize: 'clamp(2.1rem, 5.5vw, 3.6rem)',
                color: '#2b2118',
                textShadow:
                  '0 0 1px rgba(43,33,24,0.7), 0 0 16px rgba(197,154,63,0.3)',
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1.1 }}
            >
              "Juro solenemente
              <br />
              entregar um bom trabalho"
            </motion.h1>

            {/* Bottom ribbon line */}
            <div className="flex items-center justify-center gap-3 mt-6 opacity-75">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#5c4938] to-transparent" />
              <span className="text-xs tracking-widest text-[#8b2626]">
                ❧
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#5c4938] to-transparent" />
            </div>

            <motion.p
              className="mt-4 text-xs tracking-widest text-[#8c735d] uppercase"
              style={{ fontFamily: '"Cinzel", serif', letterSpacing: '0.2em' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              O Mapa está se desdobrando...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accordion 3D map unfolding transition */}
      {stage === 'unfold' && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-40 bg-[#f4ede0]"
          initial={{ scaleX: 1, opacity: 1 }}
          animate={{ scaleX: 1.8, opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      )}

      {/* Skip Button for quick preview */}
      <button
        onClick={onComplete}
        className="absolute bottom-6 right-6 z-50 text-xs px-4 py-1.5 rounded-full border border-[#8c735d]/40 text-[#5c4938] opacity-60 hover:opacity-100 hover:border-[#3a2514] transition-all cursor-pointer font-serif tracking-widest"
        style={{ fontFamily: '"Cinzel", serif', fontSize: '0.68rem' }}
      >
        Pular revelação ➔
      </button>
    </div>
  )
}
