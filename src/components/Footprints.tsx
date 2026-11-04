import { motion } from 'framer-motion'

interface FootprintProps {
  x: number
  y: number
  rotation: number
  isLeft: boolean
  scale?: number
  opacity?: number
  color?: string
}

/**
 * Authentic Marauder's Map shoe footprint silhouette.
 * Features the vintage split heel and sole with organic ink bleeding edges.
 */
export function ShoePrint({
  x,
  y,
  rotation,
  isLeft,
  scale = 1,
  opacity = 0.85,
  color = '#2b2118',
}: FootprintProps) {
  // Mirrored slightly for left vs right foot
  const flip = isLeft ? 1 : -1

  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${scale * flip}, ${scale})`}
      opacity={opacity}
      className="pointer-events-none"
    >
      {/* Front Sole */}
      <path
        d="M -4,-18 C -7,-15 -8,-8 -7,-2 C -6,2 -3,5 0,5 C 3,5 6,2 7,-2 C 8,-8 7,-15 4,-18 C 2,-20 -2,-20 -4,-18 Z"
        fill={color}
      />
      {/* Separator gap / shank */}
      {/* Heel */}
      <path
        d="M -5,8 C -5,14 -4,18 0,18 C 4,18 5,14 5,8 C 3,7 -3,7 -5,8 Z"
        fill={color}
      />
    </g>
  )
}

export interface StepPoint {
  x: number
  y: number
  angle: number
  isLeft: boolean
  delay: number
}

/**
 * Animated trail of footsteps walking one by one along a corridor
 */
export function AnimatedFootstepTrail({
  steps,
  nameTag,
}: {
  steps: StepPoint[]
  nameTag?: string
}) {
  return (
    <g className="marauder-footsteps">
      {steps.map((step, idx) => (
        <motion.g
          key={idx}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 0.85, 0.75, 0.4, 0],
            scale: [0.8, 1, 1, 0.95, 0.9],
          }}
          transition={{
            delay: step.delay,
            duration: 4.5,
            repeat: Infinity,
            repeatDelay: Math.max(1, steps.length * 0.45),
            ease: 'easeOut',
          }}
        >
          <ShoePrint
            x={step.x}
            y={step.y}
            rotation={step.angle}
            isLeft={step.isLeft}
            scale={0.7}
            color="#3a2514"
          />
        </motion.g>
      ))}

      {/* Floating handwritten name banner trailing the footsteps */}
      {nameTag && steps.length > 0 && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.85, 0.85, 0],
            x: steps.map((s) => s.x),
            y: steps.map((s) => s.y - 18),
          }}
          transition={{
            duration: steps.length * 0.45 + 1.5,
            repeat: Infinity,
            repeatDelay: 1,
            ease: 'linear',
          }}
        >
          <rect
            x="-4"
            y="-14"
            width={nameTag.length * 7.5 + 8}
            height="18"
            fill="#f4ede0"
            stroke="#5c4938"
            strokeWidth="0.6"
            strokeDasharray="2,1"
            rx="2"
            opacity="0.9"
          />
          <text
            x="0"
            y="0"
            fontFamily='"EB Garamond", serif'
            fontSize="10"
            fontStyle="italic"
            fill="#2b2118"
            letterSpacing="0.04em"
          >
            {nameTag}
          </text>
        </motion.g>
      )}
    </g>
  )
}
