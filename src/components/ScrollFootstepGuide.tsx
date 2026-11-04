import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShoePrint } from './Footprints'

gsap.registerPlugin(ScrollTrigger)

interface Waypoint {
  name: string
  pct: number
  side: 'left' | 'right'
}

const WAYPOINTS: Waypoint[] = [
  { name: 'O Portão Principal', pct: 0.05, side: 'left' },
  { name: 'Gabinete do Artífice', pct: 0.26, side: 'right' },
  { name: 'Arsenal & Grimório', pct: 0.48, side: 'left' },
  { name: 'Câmara dos Artefatos', pct: 0.72, side: 'right' },
  { name: 'Torre dos Mensageiros', pct: 0.92, side: 'left' },
]

/**
 * GSAP ScrollTrigger Footsteps Guide:
 * Sincroniza os passos dos pezinhos com o scroll real da página!
 * À medida que o visitante desce pelo portfólio, os pezinhos avançam
 * pelo corredor cartográfico carimbando o papel com a etiqueta do caminhante.
 */
export default function ScrollFootstepGuide() {
  const guideRef = useRef<HTMLDivElement>(null)
  const walkerRef = useRef<HTMLDivElement>(null)
  const inkFillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Sincroniza a linha de tinta com o scroll da janela
      gsap.to(inkFillRef.current, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      })

      // 2. O par de passos do caminhante avança pelo corredor com o scroll
      gsap.to(walkerRef.current, {
        top: '94%',
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.4,
        },
      })

      // 3. Os passos fixos ao longo do corredor carimbam e acendem quando a tela passa por eles
      gsap.utils.toArray<HTMLElement>('.corridor-step').forEach((stepEl) => {
        gsap.fromTo(
          stepEl,
          { opacity: 0.15, scale: 0.8 },
          {
            opacity: 0.85,
            scale: 1,
            duration: 0.4,
            scrollTrigger: {
              trigger: stepEl,
              start: 'top 75%',
              end: 'bottom 25%',
              toggleActions: 'play reverse play reverse',
            },
          }
        )
      })
    }, guideRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={guideRef}
      className="fixed inset-y-0 left-0 right-0 pointer-events-none z-10 hidden lg:block overflow-hidden select-none"
      aria-hidden="true"
    >
      <div className="relative w-full h-full max-w-6xl mx-auto">
        {/* Central Winding Corridor Line */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-24">
          {/* Corridor outer double boundaries */}
          <div
            className="absolute top-0 bottom-0 left-2 w-px opacity-35"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, #5a3d24 0px, #5a3d24 6px, transparent 6px, transparent 12px)',
            }}
          />
          <div
            className="absolute top-0 bottom-0 right-2 w-px opacity-35"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, #5a3d24 0px, #5a3d24 6px, transparent 6px, transparent 12px)',
            }}
          />

          {/* Dotted path in corridor center */}
          <div
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px opacity-40"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, #8c6f4b 0px, #8c6f4b 3px, transparent 3px, transparent 8px)',
            }}
          />

          {/* Dynamic center ink trail showing scroll progress */}
          <div
            ref={inkFillRef}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 origin-top bg-gradient-to-b from-[#8b2626] via-[#5a3d24] to-[#c59a3f]"
            style={{ height: '0%', opacity: 0.8 }}
          />

          {/* Static stamped footsteps distributed down the corridor */}
          {Array.from({ length: 26 }).map((_, i) => {
            const isLeft = i % 2 === 0
            const topPct = (i / 26) * 100
            const lateralOffset = isLeft ? -9 : 9

            return (
              <div
                key={`corridor-step-${i}`}
                className="corridor-step absolute"
                style={{
                  top: `${topPct}%`,
                  left: `calc(50% + ${lateralOffset}px)`,
                }}
              >
                <svg width="22" height="22" viewBox="-11 -11 22 22">
                  <ShoePrint
                    x={0}
                    y={0}
                    rotation={180}
                    isLeft={isLeft}
                    scale={0.52}
                    color="#3a2514"
                    opacity={0.8}
                  />
                </svg>
              </div>
            )
          })}

          {/* ── THE ACTIVE WALKER (FOOTSTEPS FOLLOWING USER SCROLL) ── */}
          <div
            ref={walkerRef}
            className="absolute left-1/2 -translate-x-1/2 z-20"
            style={{ top: '2%' }}
          >
            <div className="relative">
              {/* Left & Right active footsteps */}
              <div className="absolute -left-3 -top-2 animate-bounce">
                <svg width="24" height="24" viewBox="-12 -12 24 24">
                  <ShoePrint x={0} y={0} rotation={180} isLeft={true} scale={0.65} color="#8b2626" />
                </svg>
              </div>
              <div className="absolute left-1 top-2 animate-bounce" style={{ animationDelay: '0.15s' }}>
                <svg width="24" height="24" viewBox="-12 -12 24 24">
                  <ShoePrint x={0} y={0} rotation={180} isLeft={false} scale={0.65} color="#8b2626" />
                </svg>
              </div>

              {/* Walker floating name badge */}
              <div className="absolute left-7 -top-1 whitespace-nowrap px-2 py-0.5 rounded bg-[#faf3e3] border border-[#8b2626] shadow-md">
                <span
                  style={{
                    fontFamily: '"Cinzel", serif',
                    fontSize: '0.65rem',
                    letterSpacing: '0.08em',
                    color: '#8b2626',
                    fontWeight: 700,
                  }}
                >
                  VOCÊ
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Waypoint Markers on the Corridor */}
        {WAYPOINTS.map((wp) => (
          <div
            key={wp.name}
            className="absolute left-1/2 -translate-x-1/2 flex items-center"
            style={{ top: `${wp.pct * 100}%` }}
          >
            {/* Wax seal point on corridor axis */}
            <div className="w-5 h-5 rounded-full border-2 border-[#5a3d24] bg-[#faf3e3] flex items-center justify-center shadow-md">
              <div className="w-2 h-2 rounded-full bg-[#8b2626]" />
            </div>

            {/* Hand-lettered corridor label banner */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-md bg-[#faf3e3] border border-[#8c6f4b] shadow-md ${
                wp.side === 'left' ? 'right-9 text-right' : 'left-9 text-left'
              }`}
            >
              <span
                style={{
                  fontFamily: '"Cinzel", serif',
                  fontSize: '0.68rem',
                  letterSpacing: '0.12em',
                  color: '#2e1c10',
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

