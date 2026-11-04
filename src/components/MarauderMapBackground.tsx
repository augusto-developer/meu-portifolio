import { AnimatedFootstepTrail, StepPoint } from './Footprints'

function generateCorridor(
  x0: number,
  y0: number,
  count: number,
  dx: number,
  dy: number,
  delay: number
): StepPoint[] {
  const points: StepPoint[] = []
  let x = x0
  let y = y0
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90

  for (let i = 0; i < count; i++) {
    const isLeft = i % 2 === 0
    const rad = ((angle + 90) * Math.PI) / 180
    const offset = isLeft ? -6 : 6

    points.push({
      x: x + Math.cos(rad) * offset,
      y: y + Math.sin(rad) * offset,
      angle: angle + (isLeft ? -4 : 4),
      isLeft,
      delay: delay + i * 0.45,
    })

    x += dx
    y += dy
  }
  return points
}

// Background roving wanderers across the page height
const ROVER_1 = generateCorridor(80, 260, 9, 28, 48, 1.0)
const ROVER_2 = generateCorridor(760, 900, 8, -42, 32, 2.5)
const ROVER_3 = generateCorridor(140, 1650, 10, 48, -24, 3.8)
const ROVER_4 = generateCorridor(680, 2350, 8, -32, 45, 1.8)

export default function MarauderMapBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none opacity-45"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full min-h-[3000px]"
        viewBox="0 0 900 3200"
        preserveAspectRatio="xMidYMin slice"
      >
        <defs>
          <pattern id="brickHatch" width="16" height="8" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="16" y2="0" stroke="#8c735d" strokeWidth="0.4" opacity="0.3" />
            <line x1="8" y1="0" x2="8" y2="8" stroke="#8c735d" strokeWidth="0.4" opacity="0.3" />
          </pattern>
        </defs>

        {/* ── CORRIDOR 1: Torre de Frontend ── */}
        <g>
          {/* Parallel walls */}
          <path d="M 40,180 L 320,680" stroke="#5c4938" strokeWidth="1.2" strokeDasharray="3,2" fill="none" />
          <path d="M 80,160 L 360,660" stroke="#5c4938" strokeWidth="1.2" strokeDasharray="3,2" fill="none" />
          {/* Staircase hatching */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1={120 + i * 16}
              y1={320 + i * 28}
              x2={150 + i * 16}
              y2={305 + i * 28}
              stroke="#5c4938"
              strokeWidth="0.7"
              opacity="0.4"
            />
          ))}
          <text
            x="130"
            y="230"
            transform="rotate(60 130 230)"
            fontFamily='"EB Garamond", serif'
            fontSize="9"
            fontStyle="italic"
            fill="#5c4938"
            letterSpacing="0.1em"
          >
            Passagem da Torre Frontend
          </text>
        </g>

        {/* ── CORRIDOR 2: Galeria de Projetos ── */}
        <g>
          <path d="M 840,820 L 520,1180" stroke="#5c4938" strokeWidth="1.2" strokeDasharray="3,2" fill="none" />
          <path d="M 800,780 L 480,1140" stroke="#5c4938" strokeWidth="1.2" strokeDasharray="3,2" fill="none" />
          <text
            x="680"
            y="940"
            transform="rotate(-45 680 940)"
            fontFamily='"EB Garamond", serif'
            fontSize="9"
            fontStyle="italic"
            fill="#5c4938"
            letterSpacing="0.1em"
          >
            Galeria dos Artefatos
          </text>
        </g>

        {/* ── CORRIDOR 3: As Masmorras do Backend ── */}
        <g>
          <path d="M 60,1720 L 560,1480" stroke="#5c4938" strokeWidth="1.2" strokeDasharray="4,2" fill="none" />
          <path d="M 75,1760 L 575,1520" stroke="#5c4938" strokeWidth="1.2" strokeDasharray="4,2" fill="none" />
          <text
            x="240"
            y="1670"
            transform="rotate(-25 240 1670)"
            fontFamily='"EB Garamond", serif'
            fontSize="9"
            fontStyle="italic"
            fill="#5c4938"
            letterSpacing="0.1em"
          >
            Catacumbas dos Servidores & APIs
          </text>
        </g>

        {/* ── CORRIDOR 4: Torre de Transmissão (Contato) ── */}
        <g>
          <path d="M 750,2240 L 480,2680" stroke="#5c4938" strokeWidth="1.2" strokeDasharray="3,2" fill="none" />
          <path d="M 710,2210 L 440,2650" stroke="#5c4938" strokeWidth="1.2" strokeDasharray="3,2" fill="none" />
          <text
            x="610"
            y="2420"
            transform="rotate(58 610 2420)"
            fontFamily='"EB Garamond", serif'
            fontSize="9"
            fontStyle="italic"
            fill="#5c4938"
            letterSpacing="0.1em"
          >
            Torre dos Mensageiros & Corujas
          </text>
        </g>

        {/* Wandering Marauder Footsteps across the background */}
        <AnimatedFootstepTrail steps={ROVER_1} nameTag="O Artífice" />
        <AnimatedFootstepTrail steps={ROVER_2} nameTag="Visitante" />
        <AnimatedFootstepTrail steps={ROVER_3} nameTag="Inspetor de Código" />
        <AnimatedFootstepTrail steps={ROVER_4} nameTag="Coruja Mensageira" />
      </svg>
    </div>
  )
}
