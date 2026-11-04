import { motion } from 'framer-motion'
import AuthenticMarauderMap from './AuthenticMarauderMap'

interface MapRevealProps {
  onComplete: () => void
}

/**
 * The Marauder's Map Reveal Experience.
 * Replaces the cluttered bird's nest with the authentic MinaLima 3-panel map cover.
 */
export default function MapReveal({ onComplete }: MapRevealProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex flex-col items-center justify-start min-h-screen py-8 px-4"
      style={{
        backgroundColor: '#ecd8b6',
        backgroundImage: `
          radial-gradient(#3a2514 0.6px, transparent 0.6px),
          radial-gradient(#8c735d 0.5px, #ecd8b6 0.5px)
        `,
        backgroundSize: '24px 24px',
        backgroundPosition: '0 0, 12px 12px',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Heavy vignette shadow around browser viewport to mimic antique aged map borders */}
      <div
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          boxShadow:
            'inset 0 0 160px rgba(50, 30, 15, 0.45), inset 0 0 50px rgba(30, 18, 10, 0.3)',
        }}
        aria-hidden="true"
      />

      {/* Top subtle badge */}
      <motion.div
        className="relative z-20 mb-3 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <p
          className="text-xs uppercase tracking-[0.3em] text-[#5a3d24] font-semibold"
          style={{ fontFamily: '"Cinzel", serif', fontSize: '0.68rem' }}
        >
          ✦ O Mapa do Maroto foi Revelado ✦
        </p>
      </motion.div>

      {/* The 3-panel Authentic Map */}
      <div className="relative z-20 w-full">
        <AuthenticMarauderMap onEnter={onComplete} />
      </div>

      {/* Bottom discreet button to enter directly */}
      <div className="relative z-20 mt-4 mb-8">
        <button
          onClick={onComplete}
          className="text-xs tracking-widest text-[#5a3d24] hover:text-[#2e1c10] underline underline-offset-4 cursor-pointer font-serif opacity-75 hover:opacity-100 transition-opacity"
          style={{ fontFamily: '"Cinzel", serif', fontSize: '0.7rem' }}
        >
          Pular direto para os projetos ➔
        </button>
      </div>
    </motion.div>
  )
}
