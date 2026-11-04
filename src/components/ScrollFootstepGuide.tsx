import { motion, useTransform, MotionValue } from 'framer-motion'
import { ShoePrint } from './Footprints'

interface ScrollFootstepGuideProps {
  scrollYProgress: MotionValue<number>
}

interface CorridorWaypoint {
  name: string
  pct: number // percentage down the page (0 to 1)
  side: 'left' | 'right'
}

const WAYPOINTS: CorridorWaypoint[] = [
  { name: 'O Portão Principal', pct: 0.05, side: 'left' },
  { name: 'Gabinete do Artífice', pct: 0.25, side: 'right' },
  { name: 'Arsenal & Grimório', pct: 0.48, side: 'left' },
  { name: 'Câmara dos Artefatos', pct: 0.72, side: 'right' },
  { name: 'Torre dos Mensageiros', pct: 0.92, side: 'left' },
]

/**
 * Animated Footsteps Corridor that guides the user down the entire portfolio.
 * - Displays a snaking cartographic dashed corridor connecting each section.
 * - Footsteps stamp down dynamically as the user scrolls.
 * - An animated walker continuously paces along the corridor, showing the way!
 */
export default function ScrollFootstepGuide({ scrollYProgress }: ScrollFootstepGuideProps) {
  // Height of ink line fill following scroll
  const fillProgress = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div
      className="fixed inset-y-0 left-0 right-0 pointer-events-none z-10 hidden lg:block overflow-hidden"
      aria-hidden="true"
    >
      <div className="relative w-full h-full max-w-6xl mx-auto">
        {/* Central Winding Corridor Line */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-20">
          {/* Corridor outer double lines */}
          <div
            className="absolute top-0 bottom-0 left-2 w-px opacity-30"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, #5a3d24 0px, #5a3d24 6px, transparent 6px, transparent 12px)',
            }}
          />
          <div
            className="absolute top-0 bottom-0 right-2 w-px opacity-30"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, #5a3d24 0px, #5a3d24 6px, transparent 6px, transparent 12px)',
            }}
          />

          {/* Dynamic center ink trail showing scroll progress */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 origin-top bg-gradient-to-b from-[#8b2626] via-[#5a3d24] to-[#c59a3f]"
            style={{ height: fillProgress, opacity: 0.75 }}
          />

          {/* Animated walking footsteps loop along the corridor */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12">
            {Array.from({ length: 22 }).map((_, i) => {
              const isLeft = i % 2 === 0
              const topPct = (i / 22) * 100
              const lateralOffset = isLeft ? -10 : 10

              return (
                <motion.div
                  key={`guide-step-${i}`}
                  className="absolute"
                  style={{
                    top: `${topPct}%`,
                    left: `calc(50% + ${lateralOffset}px)`,
                  }}
                  animate={{
                    opacity: [0.1, 0.85, 0.6, 0.15],
                    scale: [0.8, 1.05, 1, 0.9],
                  }}
                  transition={{
                    duration: 3.6,
                    delay: (i * 0.22) % 3.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <svg width="24" height="24" viewBox="-12 -12 24 24">
                    <ShoePrint
                      x={0}
                      y={0}
                      rotation={180}
                      isLeft={isLeft}
                      scale={0.5}
                      color="#3a2514"
                      opacity={0.75}
                    />
                  </svg>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Section Waypoint Markers on the Corridor */}
        {WAYPOINTS.map((wp) => (
          <div
            key={wp.name}
            className="absolute left-1/2 -translate-x-1/2 flex items-center"
            style={{ top: `${wp.pct * 100}%` }}
          >
            {/* Compass badge on corridor axis */}
            <div className="w-5 h-5 rounded-full border border-[#5a3d24] bg-[#fbf4e6] flex items-center justify-center shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#8b2626]" />
            </div>

            {/* Hand-lettered corridor label tag */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 rounded bg-[#f6edd8]/90 border border-[#b89e72] shadow-sm ${
                wp.side === 'left' ? 'right-8 text-right' : 'left-8 text-left'
              }`}
            >
              <span
                style={{
                  fontFamily: '"Cinzel", serif',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  color: '#3a2514',
                  fontWeight: 600,
                }}
              >
                {wp.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
