import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface MapRevealProps {
  onComplete: () => void
}

/** Full-screen ink-bleed / Marauder's Map style reveal */
export default function MapReveal({ onComplete }: MapRevealProps) {
  const [phase, setPhase] = useState<'oath' | 'spreading'>('oath')

  // After showing the oath for 2.6s, start the spreading ink
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('spreading'), 2600)
    return () => clearTimeout(t1)
  }, [])

  // After spread animation (1.8s), call onComplete
  useEffect(() => {
    if (phase !== 'spreading') return
    const t2 = setTimeout(() => onComplete(), 1800)
    return () => clearTimeout(t2)
  }, [phase, onComplete])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c0d12] overflow-hidden">
      {/* Parchment flood fill — expands from center like ink on paper */}
      {phase === 'spreading' && (
        <motion.div
          className="absolute rounded-full"
          style={{
            background:
              'radial-gradient(circle at center, #fbf8f2 0%, #f4ede0 55%, #e8dcbe 100%)',
            top: '50%',
            left: '50%',
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ width: 0, height: 0 }}
          animate={{ width: '300vmax', height: '300vmax' }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
      )}

      {/* Ink-line traces spreading outward */}
      {phase === 'spreading' &&
        [0, 60, 120, 180, 240, 300].map((deg, i) => (
          <motion.div
            key={deg}
            className="absolute top-1/2 left-1/2 origin-left"
            style={{
              rotate: deg,
              height: 1,
              translateY: '-50%',
              background:
                'linear-gradient(90deg, rgba(92,73,56,0.6) 0%, rgba(92,73,56,0) 100%)',
            }}
            initial={{ width: 0 }}
            animate={{ width: '55vw' }}
            transition={{ duration: 1.2, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}

      {/* The Oath Text */}
      <motion.div
        className="relative z-10 text-center px-8 max-w-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: phase === 'oath' ? 1 : 0, scale: phase === 'oath' ? 1 : 0.95 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Decorative quill divider top */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent-gold/60" />
          <span style={{ color: '#c59a3f', fontSize: '1.4rem' }}>✦</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent-gold/60" />
        </div>

        <motion.p
          style={{
            fontFamily: '"Marck Script", cursive',
            fontSize: 'clamp(1.4rem, 4vw, 2.1rem)',
            color: '#c59a3f',
            lineHeight: 1.5,
            textShadow: '0 0 30px rgba(197,154,63,0.5)',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          "Juro solenemente
          <br />
          entregar um bom trabalho"
        </motion.p>

        {/* Decorative quill divider bottom */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent-gold/60" />
          <span style={{ color: '#c59a3f', fontSize: '1.4rem' }}>✦</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent-gold/60" />
        </div>
      </motion.div>
    </div>
  )
}

