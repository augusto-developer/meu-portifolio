import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ShoePrint } from './Footprints'

interface MapRevealProps {
  onComplete: () => void
}

/**
 * Cinematic Marauder's Map Reveal powered by GSAP.
 * Features:
 * - Real photographic MinaLima map artwork (marauder-map-original.jpg)
 * - 3D foldout entrance animation
 * - GSAP timeline for letter-by-letter ink calligraphy
 * - GSAP walking footstep cadence (left, right, left, right)
 */
export default function MapReveal({ onComplete }: MapRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapImageRef = useRef<HTMLDivElement>(null)
  const oathBannerRef = useRef<HTMLDivElement>(null)
  const [typedChars, setTypedChars] = useState(0)
  const oathText = 'Juro solenemente entregar um bom trabalho'

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // 1. Entrance of the physical parchment map (3D foldout perspective)
      tl.fromTo(
        mapImageRef.current,
        {
          scale: 0.88,
          rotateX: 15,
          opacity: 0,
          y: 40,
        },
        {
          scale: 1,
          rotateX: 0,
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'power3.out',
        }
      )

      // 2. Oath banner unrolls
      tl.fromTo(
        oathBannerRef.current,
        {
          scaleY: 0.4,
          opacity: 0,
          y: -20,
        },
        {
          scaleY: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'back.out(1.4)',
        },
        '-=0.4'
      )

      // 3. Typewriter ink calligraphy for the solemn oath
      tl.to(
        {},
        {
          duration: 1.8,
          onUpdate: function () {
            const progress = this.progress()
            setTypedChars(Math.floor(progress * oathText.length))
          },
          ease: 'none',
        }
      )

      // 4. Footsteps walking sequence (stamping down sequentially)
      tl.fromTo(
        '.reveal-step',
        {
          scale: 0.4,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 0.85,
          duration: 0.3,
          stagger: 0.28,
          ease: 'power2.out',
        },
        '-=1.0'
      )

      // 5. Floating name tag following the footsteps
      tl.fromTo(
        '.reveal-nametag',
        {
          opacity: 0,
          x: -15,
        },
        {
          opacity: 0.95,
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.2'
      )

      // 6. Pulse effect on the button
      tl.fromTo(
        '.reveal-button',
        {
          scale: 0.9,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.6)',
        },
        '-=0.2'
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex flex-col items-center justify-start min-h-screen py-8 px-4 select-none"
      style={{
        backgroundColor: '#d8c199',
        backgroundImage: `
          radial-gradient(#3a2514 0.65px, transparent 0.65px),
          radial-gradient(#8c735d 0.5px, #d8c199 0.5px)
        `,
        backgroundSize: '24px 24px',
        backgroundPosition: '0 0, 12px 12px',
      }}
    >
      {/* Heavy vignette shadow around browser viewport to mimic antique aged map borders */}
      <div
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          boxShadow:
            'inset 0 0 160px rgba(50, 30, 15, 0.5), inset 0 0 50px rgba(30, 18, 10, 0.35)',
        }}
        aria-hidden="true"
      />

      {/* Top Badge */}
      <div className="relative z-20 mb-3 text-center">
        <p
          className="text-xs uppercase tracking-[0.3em] text-[#4a2f1c] font-semibold"
          style={{ fontFamily: '"Cinzel", serif', fontSize: '0.68rem' }}
        >
          ✦ O Mapa do Maroto foi Revelado ✦
        </p>
      </div>

      {/* ── THE AUTHENTIC MINALIMA MARAUDER'S MAP (REAL PHOTOGRAPHIC ARTWORK) ── */}
      <div
        ref={mapImageRef}
        className="relative z-20 w-full max-w-5xl rounded-lg overflow-hidden border-2 border-[#8c6f4b] shadow-2xl bg-[#dfc8a0]"
        style={{
          boxShadow: '0 25px 60px rgba(25, 15, 8, 0.6), inset 0 0 80px rgba(50, 30, 15, 0.4)',
        }}
      >
        {/* Real Photographic Map Image Asset */}
        <div className="relative w-full overflow-hidden">
          <img
            src="./marauder-map-original.jpg"
            alt="Mapa do Maroto Original"
            className="w-full h-auto block select-none pointer-events-none"
            style={{
              filter: 'sepia(0.25) contrast(1.1) brightness(0.96)',
            }}
          />

          {/* Realistic 3-Panel Fold Lines & Shadow Overlays */}
          <div
            className="absolute inset-y-0 left-[33.3%] w-1 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, rgba(30,15,5,0.45), transparent, rgba(255,240,210,0.3))',
            }}
          />
          <div
            className="absolute inset-y-0 left-[66.6%] w-1 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, rgba(30,15,5,0.45), transparent, rgba(255,240,210,0.3))',
            }}
          />

          {/* ── GSAP ANIMATED WALKING FOOTSTEPS (Right-hand Gothic Corridor) ── */}
          <div className="absolute inset-0 pointer-events-none">
            <svg
              viewBox="0 0 1000 560"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              {/* Footsteps stepping down the right corridor of the map */}
              {[
                { x: 740, y: 180, rot: 175, isLeft: true },
                { x: 755, y: 220, rot: 175, isLeft: false },
                { x: 742, y: 260, rot: 175, isLeft: true },
                { x: 758, y: 300, rot: 175, isLeft: false },
                { x: 744, y: 340, rot: 175, isLeft: true },
                { x: 760, y: 380, rot: 175, isLeft: false },
                { x: 748, y: 420, rot: 175, isLeft: true },
              ].map((step, idx) => (
                <g key={idx} className="reveal-step">
                  <ShoePrint
                    x={step.x}
                    y={step.y}
                    rotation={step.rot}
                    isLeft={step.isLeft}
                    scale={0.65}
                    color="#2b1a0e"
                    opacity={0.9}
                  />
                </g>
              ))}

              {/* Floating Name Tag following the steps */}
              <g className="reveal-nametag" transform="translate(775, 275)">
                <rect
                  x="-2"
                  y="-14"
                  width="78"
                  height="18"
                  fill="#f6edd8"
                  stroke="#5a3d24"
                  strokeWidth="0.8"
                  strokeDasharray="2,1"
                  rx="3"
                />
                <text
                  x="5"
                  y="-1"
                  fontFamily='"Cinzel", serif'
                  fontSize="8.5"
                  letterSpacing="0.08em"
                  fill="#2e1c10"
                  fontWeight="600"
                >
                  O ARTÍFICE
                </text>
              </g>

              {/* Second pair of steps pacing near the bottom */}
              {[
                { x: 860, y: 420, rot: 85, isLeft: true },
                { x: 890, y: 432, rot: 85, isLeft: false },
                { x: 920, y: 422, rot: 85, isLeft: true },
              ].map((step, idx) => (
                <g key={`sub-${idx}`} className="reveal-step">
                  <ShoePrint
                    x={step.x}
                    y={step.y}
                    rotation={step.rot}
                    isLeft={step.isLeft}
                    scale={0.6}
                    color="#3a2514"
                    opacity={0.8}
                  />
                </g>
              ))}

              <g className="reveal-nametag" transform="translate(860, 400)">
                <rect
                  x="-2"
                  y="-12"
                  width="68"
                  height="16"
                  fill="#f6edd8"
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
              </g>
            </svg>
          </div>
        </div>

        {/* ── THE SOLEMN OATH CALLIGRAPHY BANNER ── */}
        <div
          ref={oathBannerRef}
          className="relative z-30 mx-auto -mt-10 mb-6 max-w-xl px-6 py-5 rounded-md text-center border-2 border-[#7a5535] shadow-2xl"
          style={{
            backgroundColor: '#faf3e3',
            boxShadow: '0 12px 35px rgba(35, 20, 10, 0.45)',
          }}
        >
          {/* Top Divider */}
          <div className="flex items-center justify-center gap-3 mb-1 opacity-70">
            <div className="h-px flex-1 bg-[#4a301c]" />
            <span className="text-xs text-[#4a301c]">✦ ✦ ✦</span>
            <div className="h-px flex-1 bg-[#4a301c]" />
          </div>

          <p
            className="text-xs tracking-[0.25em] text-[#5a3d24] uppercase mb-1 font-semibold"
            style={{ fontFamily: '"Cinzel", serif', fontSize: '0.7rem' }}
          >
            Palavras Solenes de Abertura
          </p>

          {/* AUTO-WRITTEN SCRIPT WITH CURSOR */}
          <h2
            className="my-2 text-2xl md:text-3xl text-[#241318] leading-snug min-h-[42px]"
            style={{
              fontFamily: '"Marck Script", cursive',
              textShadow: '0 0 1px rgba(36,19,24,0.4)',
            }}
          >
            "{oathText.slice(0, typedChars)}"
            {typedChars < oathText.length && (
              <span className="inline-block w-1.5 h-6 ml-1 bg-[#8b2626] animate-pulse align-middle" />
            )}
          </h2>

          <div className="flex items-center justify-center gap-3 my-2 opacity-70">
            <div className="h-px flex-1 bg-[#4a301c]" />
            <span className="text-xs text-[#8b2626]">❧</span>
            <div className="h-px flex-1 bg-[#4a301c]" />
          </div>

          {/* Interactive button to follow footsteps into portfolio */}
          <button
            onClick={onComplete}
            className="reveal-button mt-2 px-8 py-3.5 rounded-full text-sm font-semibold tracking-widest text-[#fbf8f2] shadow-md transition-all hover:brightness-110 active:scale-95 cursor-pointer flex items-center justify-center gap-2 mx-auto"
            style={{
              backgroundColor: '#8b2626',
              fontFamily: '"Cinzel", serif',
              fontSize: '0.78rem',
              letterSpacing: '0.18em',
              boxShadow: '0 4px 16px rgba(139, 38, 38, 0.4)',
            }}
          >
            <span>Seguir os Passos & Entrar no Portfólio</span>
            <span className="text-base">➔</span>
          </button>
        </div>
      </div>

      {/* Bottom discreet button to enter directly */}
      <div className="relative z-20 mt-4 mb-6">
        <button
          onClick={onComplete}
          className="text-xs tracking-widest text-[#4a2f1c] hover:text-[#241318] underline underline-offset-4 cursor-pointer font-serif opacity-75 hover:opacity-100 transition-opacity"
          style={{ fontFamily: '"Cinzel", serif', fontSize: '0.7rem' }}
        >
          Pular direto para os projetos ➔
        </button>
      </div>
    </div>
  )
}
