import { motion } from 'framer-motion'

interface SectionHeaderProps {
  label: string
  title: string
  inView: boolean
}

/** Reusable vintage cartographic section header */
export default function SectionHeader({ label, title, inView }: SectionHeaderProps) {
  return (
    <div className="text-center">
      {/* Eyebrow label */}
      <motion.p
        style={{
          fontFamily: '"Cinzel", serif',
          fontSize: '0.65rem',
          letterSpacing: '0.3em',
          color: '#8c735d',
          textTransform: 'uppercase',
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {label}
      </motion.p>

      {/* Ornamental rule */}
      <motion.div
        className="flex items-center gap-3 mt-3 mb-4 max-w-xs mx-auto"
        initial={{ opacity: 0, scaleX: 0.6 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent-gold/60" />
        <span style={{ color: '#c59a3f', fontSize: '0.9rem' }}>✦</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent-gold/60" />
      </motion.div>

      {/* Main heading */}
      <motion.h2
        style={{
          fontFamily: '"Cinzel", serif',
          fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
          color: '#2b2118',
          letterSpacing: '0.05em',
        }}
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        {title}
      </motion.h2>
    </div>
  )
}

