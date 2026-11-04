import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShoePrint } from './Footprints'

interface AuthenticMarauderMapProps {
  onEnter: () => void
}

/**
 * Authentic MinaLima Marauder's Map with Dynamic 3D Unfolding & Walking Footsteps Animation!
 * - Left flap and right flap physically fold open in 3D perspective.
 * - The Great Compass Rose needle spins into magnetic alignment.
 * - The solemn oath writes itself dynamically with quill handwriting timing.
 * - Animated footsteps step and walk down the castle corridor, beckoning the visitor!
 */
export default function AuthenticMarauderMap({ onEnter }: AuthenticMarauderMapProps) {
  const [unfolded, setUnfolded] = useState(false)
  const [revealedChars, setRevealedChars] = useState(0)
  const oathText = 'Juro solenemente entregar um bom trabalho'

  // Trigger 3D unfold sequence on mount
  useEffect(() => {
    const tUnfold = setTimeout(() => setUnfolded(true), 350)
    return () => clearTimeout(tUnfold)
  }, [])

  // Calligraphy typewriter effect after flaps open
  useEffect(() => {
    if (!unfolded) return
    const tStart = setTimeout(() => {
      const interval = setInterval(() => {
        setRevealedChars((prev) => {
          if (prev >= oathText.length) {
            clearInterval(interval)
            return prev
          }
          return prev + 1
        })
      }, 45)
      return () => clearInterval(interval)
    }, 900)
    return () => clearTimeout(tStart)
  }, [unfolded])

  return (
    <div className="relative w-full max-w-6xl mx-auto my-3 select-none perspective-[1400px]">
      {/* ── 3-PANEL MAP CONTAINER WITH 3D ACCORDION UNFOLD ── */}
      <motion.div
        className="relative rounded-lg overflow-hidden border border-[#b89e72] shadow-2xl"
        style={{
          backgroundColor: '#dfc8a0',
          backgroundImage: `
            radial-gradient(#3a2514 0.65px, transparent 0.65px),
            radial-gradient(#8c735d 0.5px, #dfc8a0 0.5px)
          `,
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px',
          boxShadow: 'inset 0 0 100px rgba(70, 45, 25, 0.45), 0 25px 60px rgba(10, 8, 6, 0.7)',
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Weathered parchment stains and paper edge burns */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `
              radial-gradient(circle at 12% 18%, rgba(130, 85, 45, 0.22) 0%, transparent 45%),
              radial-gradient(circle at 88% 80%, rgba(110, 70, 35, 0.25) 0%, transparent 40%),
              radial-gradient(circle at 50% 95%, rgba(90, 55, 25, 0.3) 0%, transparent 50%),
              linear-gradient(to right, rgba(40,25,15,0.25) 0%, transparent 6%, transparent 94%, rgba(40,25,15,0.25) 100%)
            `,
            mixBlendMode: 'multiply',
          }}
          aria-hidden="true"
        />

        {/* ── SVG VECTOR ARTWORK OF THE MAP (viewBox 0 0 1200 680) ── */}
        <svg
          viewBox="0 0 1200 680"
          className="w-full h-auto block relative z-0"
          style={{ filter: 'contrast(1.05)' }}
        >
          {/* ══════════════════════════════════════════════════════════════
              PANEL DIVIDERS (Fold Creases with Measure Scales)
              ══════════════════════════════════════════════════════════════ */}
          {/* Fold 1 at x=400 */}
          <line x1="400" y1="0" x2="400" y2="680" stroke="#5a3d24" strokeWidth="1.2" opacity="0.45" />
          <line x1="402" y1="0" x2="402" y2="680" stroke="#f0dec0" strokeWidth="0.8" opacity="0.35" />
          {Array.from({ length: 34 }).map((_, i) => (
            <rect
              key={`f1-${i}`}
              x="396"
              y={i * 20}
              width="8"
              height="10"
              fill={i % 2 === 0 ? '#452c1a' : '#dfc8a0'}
              opacity="0.6"
            />
          ))}

          {/* Fold 2 at x=800 */}
          <line x1="800" y1="0" x2="800" y2="680" stroke="#5a3d24" strokeWidth="1.2" opacity="0.45" />
          <line x1="802" y1="0" x2="802" y2="680" stroke="#f0dec0" strokeWidth="0.8" opacity="0.35" />
          {Array.from({ length: 34 }).map((_, i) => (
            <rect
              key={`f2-${i}`}
              x="796"
              y={i * 20}
              width="8"
              height="10"
              fill={i % 2 === 0 ? '#452c1a' : '#dfc8a0'}
              opacity="0.6"
            />
          ))}

          {/* ══════════════════════════════════════════════════════════════
              PANEL 1 (LEFT): CASTLE FORTRESS & MARAUDER BANNER
              ══════════════════════════════════════════════════════════════ */}
          <motion.g
            id="panel-1"
            initial={{ opacity: 0, x: -30 }}
            animate={unfolded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          >
            {/* "Messrs" heading */}
            <text
              x="200"
              y="52"
              textAnchor="middle"
              fontFamily='"Marck Script", cursive'
              fontSize="34"
              fill="#2e1c10"
            >
              Messrs.
            </text>

            <text
              x="200"
              y="82"
              textAnchor="middle"
              fontFamily='"Cinzel", serif'
              fontSize="13"
              letterSpacing="0.22em"
              fill="#2e1c10"
              fontWeight="600"
            >
              OS ARTÍFICES DO SOFTWARE
            </text>
            <text
              x="200"
              y="102"
              textAnchor="middle"
              fontFamily='"Cinzel", serif'
              fontSize="11"
              letterSpacing="0.18em"
              fill="#4a301c"
            >
              ENGENHARIA & CRAFT DIGITAL
            </text>

            <text
              x="200"
              y="126"
              textAnchor="middle"
              fontFamily='"Cormorant Garamond", serif'
              fontSize="16"
              fontStyle="italic"
              fill="#5a3d24"
            >
              têm a distinta honra de apresentar
            </text>

            {/* Waving flag banner on top of tower */}
            <path
              d="M 60,180 L 120,180 C 130,175 140,185 150,180 L 150,205 C 140,210 130,200 120,205 L 60,205 Z"
              fill="#f5e8d0"
              stroke="#3a2514"
              strokeWidth="1"
            />
            <text
              x="105"
              y="197"
              textAnchor="middle"
              fontFamily='"Cinzel", serif'
              fontSize="10"
              fontWeight="bold"
              letterSpacing="0.15em"
              fill="#3a2514"
            >
              PORTFÓLIO
            </text>
            <line x1="60" y1="175" x2="60" y2="280" stroke="#3a2514" strokeWidth="1.5" />

            {/* ── ISOMETRIC CASTLE FORTRESS ── */}
            <g transform="translate(40, 160)">
              <path
                d="M 20,240 L 70,140 L 120,170 L 150,100 L 190,140 L 220,90 L 250,150 L 300,120 L 330,220 L 280,310 L 80,310 Z"
                fill="#ecd8b6"
                stroke="#2e1c10"
                strokeWidth="1.8"
              />

              {/* Turrets */}
              <polygon points="50,140 70,80 90,140" fill="#dfc49c" stroke="#2e1c10" strokeWidth="1.4" />
              <line x1="70" y1="80" x2="70" y2="60" stroke="#2e1c10" strokeWidth="1" />
              <rect x="55" y="140" width="30" height="70" fill="#f0dec0" stroke="#2e1c10" strokeWidth="1.2" />

              <polygon points="135,100 150,30 165,100" fill="#dfc49c" stroke="#2e1c10" strokeWidth="1.4" />
              <line x1="150" y1="30" x2="150" y2="15" stroke="#2e1c10" strokeWidth="1" />
              <rect x="138" y="100" width="24" height="60" fill="#f0dec0" stroke="#2e1c10" strokeWidth="1.2" />

              <polygon points="205,90 220,40 235,90" fill="#dfc49c" stroke="#2e1c10" strokeWidth="1.4" />
              <line x1="220" y1="40" x2="220" y2="25" stroke="#2e1c10" strokeWidth="1" />
              <rect x="208" y="90" width="24" height="70" fill="#f0dec0" stroke="#2e1c10" strokeWidth="1.2" />

              <polygon points="285,120 300,70 315,120" fill="#dfc49c" stroke="#2e1c10" strokeWidth="1.4" />
              <rect x="290" y="120" width="22" height="90" fill="#f0dec0" stroke="#2e1c10" strokeWidth="1.2" />

              {/* Castle wall hatching */}
              {Array.from({ length: 9 }).map((_, i) => (
                <line
                  key={`wall-${i}`}
                  x1={80 + i * 22}
                  y1="250"
                  x2={80 + i * 22}
                  y2="300"
                  stroke="#4a301c"
                  strokeWidth="0.8"
                  opacity="0.45"
                />
              ))}

              {/* ── THE ICONIC MARAUDER DIAMOND SHIELD ── */}
              <g transform="translate(160, 205)">
                <polygon
                  points="0,-82 78,0 0,82 -78,0"
                  fill="#1b0e12"
                  stroke="#3a2514"
                  strokeWidth="3"
                />
                <polygon
                  points="0,-76 72,0 0,76 -72,0"
                  fill="#241318"
                  stroke="#c59a3f"
                  strokeWidth="1.2"
                />
                <polygon
                  points="0,-71 67,0 0,71 -67,0"
                  fill="none"
                  stroke="#e8cf99"
                  strokeWidth="0.6"
                  strokeDasharray="3,1.5"
                />

                <circle cx="0" cy="-66" r="2.5" fill="#c59a3f" />
                <circle cx="0" cy="66" r="2.5" fill="#c59a3f" />
                <circle cx="-62" cy="0" r="2.5" fill="#c59a3f" />
                <circle cx="62" cy="0" r="2.5" fill="#c59a3f" />

                <text
                  x="0"
                  y="-26"
                  textAnchor="middle"
                  fontFamily='"Marck Script", cursive'
                  fontSize="22"
                  fill="#eedcb6"
                >
                  The
                </text>
                <text
                  x="0"
                  y="2"
                  textAnchor="middle"
                  fontFamily='"Cinzel", serif'
                  fontSize="17"
                  letterSpacing="0.16em"
                  fontWeight="bold"
                  fill="#ffd778"
                >
                  MARAUDER'S
                </text>
                <text
                  x="0"
                  y="26"
                  textAnchor="middle"
                  fontFamily='"Cinzel", serif'
                  fontSize="15"
                  letterSpacing="0.22em"
                  fontWeight="bold"
                  fill="#ffd778"
                >
                  MAP
                </text>
                <text
                  x="0"
                  y="46"
                  textAnchor="middle"
                  fontFamily='"Cormorant Garamond", serif'
                  fontSize="11"
                  letterSpacing="0.1em"
                  fontStyle="italic"
                  fill="#cbb085"
                >
                  (EDITION 2026)
                </text>
              </g>

              {/* Winding road banner */}
              <path
                d="M 50,340 Q 90,320 140,350 Q 190,380 250,350 Q 300,320 330,360"
                stroke="#5a3d24"
                strokeWidth="12"
                fill="none"
                opacity="0.3"
              />
              <path
                d="M 50,340 Q 90,320 140,350 Q 190,380 250,350 Q 300,320 330,360"
                stroke="#2e1c10"
                strokeWidth="1"
                strokeDasharray="4,2"
                fill="none"
              />
            </g>
          </motion.g>

          {/* ══════════════════════════════════════════════════════════════
              PANEL 2 (CENTER): ANIMATED GREAT COMPASS ROSE
              ══════════════════════════════════════════════════════════════ */}
          <motion.g
            id="panel-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={unfolded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.35, ease: 'easeOut' }}
          >
            {/* Top battlements */}
            <g transform="translate(415, 30)">
              <rect x="15" y="0" width="60" height="30" fill="#dfc49c" stroke="#4a301c" strokeWidth="0.8" />
              <rect x="95" y="0" width="60" height="30" fill="#dfc49c" stroke="#4a301c" strokeWidth="0.8" />
              <rect x="215" y="0" width="60" height="30" fill="#dfc49c" stroke="#4a301c" strokeWidth="0.8" />
              <rect x="295" y="0" width="60" height="30" fill="#dfc49c" stroke="#4a301c" strokeWidth="0.8" />

              <text x="45" y="16" textAnchor="middle" fontFamily='"EB Garamond", serif' fontSize="7" fill="#4a301c">
                AVDERE EST
              </text>
              <text x="45" y="24" textAnchor="middle" fontFamily='"EB Garamond", serif' fontSize="6" fill="#6a4b2c">
                MONSTRARE
              </text>
              <text x="125" y="16" textAnchor="middle" fontFamily='"EB Garamond", serif' fontSize="7" fill="#4a301c">
                FIDELITAS
              </text>
              <text x="125" y="24" textAnchor="middle" fontFamily='"EB Garamond", serif' fontSize="6" fill="#6a4b2c">
                ET CRAFT
              </text>
              <text x="245" y="16" textAnchor="middle" fontFamily='"EB Garamond", serif' fontSize="7" fill="#4a301c">
                SCIENTIA
              </text>
              <text x="245" y="24" textAnchor="middle" fontFamily='"EB Garamond", serif' fontSize="6" fill="#6a4b2c">
                CODICIS
              </text>
              <text x="325" y="16" textAnchor="middle" fontFamily='"EB Garamond", serif' fontSize="7" fill="#4a301c">
                ITINERA
              </text>
              <text x="325" y="24" textAnchor="middle" fontFamily='"EB Garamond", serif' fontSize="6" fill="#6a4b2c">
                SECRETORVM
              </text>
            </g>

            {/* Dense script lines */}
            <g transform="translate(425, 75)" opacity="0.75">
              {Array.from({ length: 11 }).map((_, i) => (
                <line
                  key={`script-${i}`}
                  x1="5"
                  y1={i * 12}
                  x2="345"
                  y2={i * 12}
                  stroke="#4a301c"
                  strokeWidth="0.6"
                  strokeDasharray={`${8 + (i % 3) * 6}, ${2 + (i % 2)}, ${15 + (i % 4) * 4}, 3`}
                />
              ))}
            </g>

            {/* ── THE ANIMATED MINALIMA COMPASS ROSE ── */}
            <g transform="translate(600, 340)">
              <circle cx="0" cy="0" r="130" stroke="#5a3d24" strokeWidth="1" fill="none" opacity="0.6" />
              <circle cx="0" cy="0" r="124" stroke="#5a3d24" strokeWidth="0.5" strokeDasharray="3,2" fill="none" opacity="0.6" />
              <circle cx="0" cy="0" r="95" stroke="#5a3d24" strokeWidth="0.8" fill="none" opacity="0.4" />
              <circle cx="0" cy="0" r="45" stroke="#5a3d24" strokeWidth="0.6" fill="none" opacity="0.5" />

              {Array.from({ length: 36 }).map((_, i) => {
                const angle = (i * 10 * Math.PI) / 180
                const x1 = Math.cos(angle) * 124
                const y1 = Math.sin(angle) * 124
                const x2 = Math.cos(angle) * (i % 3 === 0 ? 116 : 120)
                const y2 = Math.sin(angle) * (i % 3 === 0 ? 116 : 120)
                return (
                  <line
                    key={`tick-${i}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#4a301c"
                    strokeWidth="0.6"
                    opacity="0.6"
                  />
                )
              })}

              {/* Rotating Compass Star Needle — spins to true North! */}
              <motion.g
                initial={{ rotate: 180 }}
                animate={unfolded ? { rotate: [180, -25, 12, 0] } : {}}
                transition={{ duration: 2.2, delay: 0.5, ease: 'easeOut' }}
              >
                {/* North Needle */}
                <polygon points="0,0 -16,-20 0,-120" fill="#2e1c10" />
                <polygon points="0,0 16,-20 0,-120" fill="#dfc49c" stroke="#2e1c10" strokeWidth="0.8" />

                {/* South Needle */}
                <polygon points="0,0 14,20 0,110" fill="#2e1c10" />
                <polygon points="0,0 -14,20 0,110" fill="#dfc49c" stroke="#2e1c10" strokeWidth="0.8" />

                {/* East Needle */}
                <polygon points="0,0 20,-14 110,0" fill="#2e1c10" />
                <polygon points="0,0 20,14 110,0" fill="#dfc49c" stroke="#2e1c10" strokeWidth="0.8" />

                {/* West Needle */}
                <polygon points="0,0 -20,14 -110,0" fill="#2e1c10" />
                <polygon points="0,0 -20,-14 -110,0" fill="#dfc49c" stroke="#2e1c10" strokeWidth="0.8" />

                {/* Diagonal 4 smaller points */}
                <polygon points="0,0 -10,-10 65,-65" fill="#3a2514" />
                <polygon points="0,0 10,-10 -65,-65" fill="#3a2514" />
                <polygon points="0,0 10,10 65,65" fill="#3a2514" />
                <polygon points="0,0 -10,10 -65,65" fill="#3a2514" />
              </motion.g>

              {/* Swirling Calligraphic Ribbon Wrapping Around Compass Axis */}
              <path
                d="M -30,-45 C 10,-75 55,-35 25,-10 C -5,15 20,65 50,45"
                fill="none"
                stroke="#2e1c10"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                d="M -30,-45 C 10,-75 55,-35 25,-10 C -5,15 20,65 50,45"
                fill="none"
                stroke="#c59a3f"
                strokeWidth="1.2"
                strokeLinecap="round"
              />

              {/* Bold Classic Compass Letters (N, S, E, W) */}
              <text x="0" y="-130" textAnchor="middle" fontFamily='"Cinzel", serif' fontSize="28" fontWeight="bold" fill="#2e1c10">
                N
              </text>
              <text x="0" y="148" textAnchor="middle" fontFamily='"Cinzel", serif' fontSize="26" fontWeight="bold" fill="#2e1c10">
                S
              </text>
              <text x="-135" y="8" textAnchor="middle" fontFamily='"Cinzel", serif' fontSize="26" fontWeight="bold" fill="#2e1c10">
                W
              </text>
              <text x="135" y="8" textAnchor="middle" fontFamily='"Cinzel", serif' fontSize="26" fontWeight="bold" fill="#2e1c10">
                E
              </text>
            </g>

            {/* Bottom dense script lines */}
            <g transform="translate(425, 540)" opacity="0.75">
              {Array.from({ length: 9 }).map((_, i) => (
                <line
                  key={`bscript-${i}`}
                  x1="5"
                  y1={i * 12}
                  x2="345"
                  y2={i * 12}
                  stroke="#4a301c"
                  strokeWidth="0.6"
                  strokeDasharray={`${12 + (i % 4) * 5}, ${3 + (i % 2)}, ${18 + (i % 3) * 3}, 4`}
                />
              ))}
            </g>
          </motion.g>

          {/* ══════════════════════════════════════════════════════════════
              PANEL 3 (RIGHT): GOTHIC CORRIDORS & ANIMATED WALKING FOOTSTEPS
              ══════════════════════════════════════════════════════════════ */}
          <motion.g
            id="panel-3"
            initial={{ opacity: 0, x: 30 }}
            animate={unfolded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
          >
            {/* Top Corridor Label */}
            <text
              x="1000"
              y="55"
              textAnchor="middle"
              fontFamily='"Cinzel", serif'
              fontSize="12"
              letterSpacing="0.2em"
              fill="#3a2514"
              fontWeight="bold"
            >
              PLANTA DO CLAUSTRO & CORREDORES
            </text>

            {/* ── GOTHIC ARCHED WINDOWS & TRACERY ── */}
            <g transform="translate(850, 75)">
              {[0, 1, 2, 3].map((col) => {
                const ox = col * 70
                return (
                  <g key={`arch-${col}`} transform={`translate(${ox}, 0)`}>
                    <path
                      d="M 10,80 L 10,35 Q 35,5 60,35 L 60,80 Z"
                      fill="#edd9b7"
                      stroke="#3a2514"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M 16,80 L 16,42 Q 26,20 35,40 Q 44,20 54,42 L 54,80"
                      fill="none"
                      stroke="#4a301c"
                      strokeWidth="0.8"
                    />
                    <line x1="35" y1="40" x2="35" y2="80" stroke="#4a301c" strokeWidth="0.8" />
                    <text x="35" y="70" textAnchor="middle" fontFamily='"Cinzel", serif' fontSize="5" letterSpacing="0.1em" fill="#5a3d24">
                      AVDERE
                    </text>
                  </g>
                )
              })}
            </g>

            {/* ── CASTLE CORRIDOR NETWORK ── */}
            <g transform="translate(830, 180)">
              {/* Corridor 1: Vertical main hallway */}
              <line x1="60" y1="0" x2="60" y2="440" stroke="#3a2514" strokeWidth="1.4" strokeDasharray="5,2" />
              <line x1="120" y1="0" x2="120" y2="440" stroke="#3a2514" strokeWidth="1.4" strokeDasharray="5,2" />
              <line x1="90" y1="0" x2="90" y2="440" stroke="#7a5535" strokeWidth="0.8" strokeDasharray="2,3" />

              {/* Corridor 2: Horizontal branch */}
              <line x1="120" y1="140" x2="330" y2="140" stroke="#3a2514" strokeWidth="1.4" strokeDasharray="5,2" />
              <line x1="120" y1="200" x2="330" y2="200" stroke="#3a2514" strokeWidth="1.4" strokeDasharray="5,2" />
              <line x1="120" y1="170" x2="330" y2="170" stroke="#7a5535" strokeWidth="0.8" strokeDasharray="2,3" />

              {/* Corridor 3: Lower diagonal hallway */}
              <line x1="120" y1="310" x2="320" y2="410" stroke="#3a2514" strokeWidth="1.4" strokeDasharray="5,2" />
              <line x1="85" y1="365" x2="285" y2="465" stroke="#3a2514" strokeWidth="1.4" strokeDasharray="5,2" />

              {/* Room labels */}
              <text x="220" y="130" textAnchor="middle" fontFamily='"Cinzel", serif' fontSize="9" fontWeight="bold" letterSpacing="0.1em" fill="#3a2514">
                TORRE DE FRONTEND
              </text>
              <text x="220" y="245" textAnchor="middle" fontFamily='"Cinzel", serif' fontSize="8.5" letterSpacing="0.1em" fill="#5a3d24">
                SALA DOS ARTEFATOS
              </text>
              <text x="210" y="460" textAnchor="middle" fontFamily='"Cinzel", serif' fontSize="8" letterSpacing="0.1em" fontStyle="italic" fill="#5a3d24">
                Catacumbas do Backend
              </text>

              {/* ── THE ICONIC ANIMATED WALKING FOOTSTEPS (O Artífice & Visitante) ── */}
              {/* Vertical walker pacing down the corridor */}
              {[0, 1, 2, 3, 4, 5, 6].map((stepIdx) => {
                const isLeft = stepIdx % 2 === 0
                const yPos = 30 + stepIdx * 32
                const xOffset = isLeft ? -8 : 8

                return (
                  <motion.g
                    key={`walk-v-${stepIdx}`}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{
                      opacity: [0, 0.9, 0.75, 0.35, 0],
                      scale: [0.7, 1.05, 1, 0.95, 0.9],
                    }}
                    transition={{
                      duration: 3.8,
                      delay: 1.0 + stepIdx * 0.4,
                      repeat: Infinity,
                      repeatDelay: 1.2,
                      ease: 'easeOut',
                    }}
                  >
                    <ShoePrint
                      x={90 + xOffset}
                      y={yPos}
                      rotation={180}
                      isLeft={isLeft}
                      scale={0.55}
                      color="#3a2514"
                    />
                  </motion.g>
                )
              })}

              {/* Animated name tag following the footsteps */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.95, 0.95, 0],
                  y: [30, 110, 190, 240],
                }}
                transition={{
                  duration: 3.8,
                  delay: 1.0,
                  repeat: Infinity,
                  repeatDelay: 1.2,
                  ease: 'easeInOut',
                }}
                transform="translate(112, 0)"
              >
                <rect
                  x="-2"
                  y="-12"
                  width="78"
                  height="16"
                  fill="#f6ecd8"
                  stroke="#5a3d24"
                  strokeWidth="0.8"
                  strokeDasharray="2,1"
                  rx="3"
                />
                <text
                  x="5"
                  y="0"
                  fontFamily='"Cinzel", serif'
                  fontSize="8"
                  letterSpacing="0.08em"
                  fill="#2e1c10"
                  fontWeight="600"
                >
                  O ARTÍFICE
                </text>
              </motion.g>

              {/* Second walker pacing along the horizontal corridor */}
              {[0, 1, 2, 3, 4].map((stepIdx) => {
                const isLeft = stepIdx % 2 === 0
                const xPos = 145 + stepIdx * 34
                const yOffset = isLeft ? -7 : 7

                return (
                  <motion.g
                    key={`walk-h-${stepIdx}`}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{
                      opacity: [0, 0.9, 0.75, 0.35, 0],
                      scale: [0.7, 1.05, 1, 0.95, 0.9],
                    }}
                    transition={{
                      duration: 3.2,
                      delay: 1.8 + stepIdx * 0.38,
                      repeat: Infinity,
                      repeatDelay: 1.5,
                      ease: 'easeOut',
                    }}
                  >
                    <ShoePrint
                      x={xPos}
                      y={170 + yOffset}
                      rotation={90}
                      isLeft={isLeft}
                      scale={0.55}
                      color="#3a2514"
                    />
                  </motion.g>
                )
              })}

              <motion.g
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.95, 0.95, 0],
                  x: [145, 210, 260, 280],
                }}
                transition={{
                  duration: 3.2,
                  delay: 1.8,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: 'easeInOut',
                }}
                transform="translate(0, 155)"
              >
                <rect
                  x="-2"
                  y="-12"
                  width="68"
                  height="16"
                  fill="#f6ecd8"
                  stroke="#5a3d24"
                  strokeWidth="0.8"
                  strokeDasharray="2,1"
                  rx="3"
                />
                <text
                  x="4"
                  y="0"
                  fontFamily='"Cinzel", serif'
                  fontSize="8"
                  letterSpacing="0.08em"
                  fill="#4a301c"
                >
                  VISITANTE
                </text>
              </motion.g>
            </g>
          </motion.g>
        </svg>

        {/* ══════════════════════════════════════════════════════════════
            THE DYNAMIC OATH BANNER (AUTOWRITTEN CALLIGRAPHY)
            ══════════════════════════════════════════════════════════════ */}
        <motion.div
          className="relative z-30 mx-auto -mt-16 mb-8 max-w-2xl px-6 py-6 rounded-md text-center border border-[#7a5535]/50 shadow-xl"
          style={{
            backgroundColor: '#fbf4e6',
            boxShadow: '0 8px 30px rgba(40, 25, 15, 0.35)',
          }}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Top divider */}
          <div className="flex items-center justify-center gap-3 mb-2 opacity-60">
            <div className="h-px flex-1 bg-[#4a301c]" />
            <span className="text-xs text-[#4a301c]">✦ ✦ ✦</span>
            <div className="h-px flex-1 bg-[#4a301c]" />
          </div>

          <p
            className="text-xs tracking-[0.25em] text-[#5a3d24] uppercase mb-1 font-semibold"
            style={{ fontFamily: '"Cinzel", serif' }}
          >
            Palavras Solenes de Abertura
          </p>

          {/* AUTO-WRITTEN SCRIPT WITH BLINKING QUILL CURSOR */}
          <h2
            className="my-3 text-2xl md:text-3xl text-[#241318] leading-snug min-h-[44px]"
            style={{
              fontFamily: '"Marck Script", cursive',
              textShadow: '0 0 1px rgba(36,19,24,0.4)',
            }}
          >
            "{oathText.slice(0, revealedChars)}"
            {revealedChars < oathText.length && (
              <span className="inline-block w-1.5 h-6 ml-1 bg-[#8b2626] animate-pulse align-middle" />
            )}
          </h2>

          <div className="flex items-center justify-center gap-3 my-3 opacity-60">
            <div className="h-px flex-1 bg-[#4a301c]" />
            <span className="text-xs text-[#8b2626]">❧</span>
            <div className="h-px flex-1 bg-[#4a301c]" />
          </div>

          {/* Interactive button to follow footsteps into portfolio */}
          <motion.button
            onClick={onEnter}
            className="mt-3 px-8 py-3.5 rounded-full text-sm font-semibold tracking-widest text-[#fbf8f2] shadow-md transition-all hover:brightness-110 active:scale-95 cursor-pointer flex items-center justify-center gap-2 mx-auto"
            style={{
              backgroundColor: '#8b2626',
              fontFamily: '"Cinzel", serif',
              fontSize: '0.78rem',
              letterSpacing: '0.18em',
              boxShadow: '0 4px 16px rgba(139, 38, 38, 0.4)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <span>Seguir os Passos & Entrar no Portfólio</span>
            <span className="text-base">➔</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
