import { motion } from 'framer-motion'

interface MapFooterProps {
  onHideMap: () => void
}

export default function MapFooter({ onHideMap }: MapFooterProps) {
  return (
    <footer className="relative z-20 mt-24 pb-12 flex flex-col items-center gap-6 px-6">
      {/* Ornamental divider */}
      <div className="flex items-center gap-4 w-full max-w-sm opacity-50">
        <div className="h-px flex-1 bg-ink-faded" />
        <span style={{ fontFamily: '"Cinzel", serif', fontSize: '0.75rem', color: '#8c735d', letterSpacing: '0.15em' }}>
          ✦ ✦ ✦
        </span>
        <div className="h-px flex-1 bg-ink-faded" />
      </div>

      {/* Hide-the-map toggle */}
      <motion.button
        onClick={onHideMap}
        className="px-6 py-2.5 rounded-full border border-ink-faded text-ink-muted text-sm tracking-widest transition-colors hover:border-ink-secondary hover:text-ink-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/50"
        style={{ fontFamily: '"Cinzel", serif', fontSize: '0.72rem' }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        — Traquinagem terminada —
      </motion.button>

      <p
        className="text-center opacity-40"
        style={{ fontFamily: '"EB Garamond", serif', fontSize: '0.9rem', color: '#5c4938' }}
      >
        Feito com tinta, dedicação e uma pitada de magia.
      </p>
    </footer>
  )
}

