import { motion, type MotionValue, useTransform } from 'framer-motion'

interface InkTrailProps {
  scrollYProgress: MotionValue<number>
}

/** A vertical dashed ink line that grows as the user scrolls */
export default function InkTrail({ scrollYProgress }: InkTrailProps) {
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div
      className="fixed left-1/2 top-0 bottom-0 -translate-x-1/2 w-px pointer-events-none z-30 hidden lg:block"
      aria-hidden="true"
    >
      {/* Static dashed guide */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, rgba(92,73,56,0.18) 0px, rgba(92,73,56,0.18) 6px, transparent 6px, transparent 14px)',
        }}
      />
      {/* Dynamic ink fill following scroll */}
      <motion.div
        className="absolute top-0 left-0 right-0 origin-top"
        style={{
          height,
          backgroundImage:
            'repeating-linear-gradient(to bottom, rgba(92,73,56,0.55) 0px, rgba(92,73,56,0.55) 6px, transparent 6px, transparent 14px)',
        }}
      />

      {/* Compass waypoints at section markers */}
      {[0, 25, 50, 75, 100].map((pct) => (
        <div
          key={pct}
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: `${pct}%` }}
        >
          <div
            className="w-2 h-2 rounded-full border border-ink-muted bg-parchment-light"
            style={{ marginLeft: -4 }}
          />
        </div>
      ))}
    </div>
  )
}

