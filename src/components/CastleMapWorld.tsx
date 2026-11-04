import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Mail, MapPin } from 'lucide-react'
import { OWNER, PROJECTS, SKILL_GROUPS } from '../data'
import { ShoePrint } from './Footprints'

export type RoomId = 'sobre' | 'projetos' | 'habilidades' | 'contato'

interface RoomNode {
  id: RoomId
  name: string
  chamberTitle: string
  wing: string
  x: number
  y: number
}

// ── COORDENADAS ARQUITETÔNICAS DOS 4 CÔMODOS NO MAPA GIGANTE DO CASTELO (2400 × 1600) ──
const ROOMS: Record<RoomId, RoomNode> = {
  sobre: {
    id: 'sobre',
    name: 'Sobre Mim',
    chamberTitle: 'O Gabinete do Artífice',
    wing: 'Ala Central • Portão de Entrada',
    x: 450,
    y: 420,
  },
  projetos: {
    id: 'projetos',
    name: 'Projetos',
    chamberTitle: 'Galeria dos Grandes Artefatos',
    wing: 'Ala Leste • Pavilhão Superior',
    x: 1850,
    y: 380,
  },
  habilidades: {
    id: 'habilidades',
    name: 'Habilidades',
    chamberTitle: 'Grimório & Arsenal Técnico',
    wing: 'Torre Norte • Claustro dos Feitiços',
    x: 1850,
    y: 1220,
  },
  contato: {
    id: 'contato',
    name: 'Contato',
    chamberTitle: 'Torre dos Mensageiros & Corujas',
    wing: 'Ala Oeste • Torre de Transmissão',
    x: 450,
    y: 1220,
  },
}

// ── CORREDORES CURVOS E SINUOSOS DO CASTELO (COM CURVAS, DEGRAUS E ARCOS) ──
function getCorridorPath(from: RoomId, to: RoomId): string {
  const p1 = ROOMS[from]
  const p2 = ROOMS[to]

  if (from === 'sobre' && to === 'projetos') {
    // Sinuoso: Sai à direita, sobe para galeria alta, desce contornando arcadas
    return `M ${p1.x},${p1.y} C ${p1.x + 280},${p1.y - 180} ${p2.x - 280},${p1.y - 220} ${p2.x - 140},${p1.y} C ${p2.x - 80},${p1.y + 120} ${p2.x - 60},${p2.y - 80} ${p2.x},${p2.y}`
  }
  if (from === 'projetos' && to === 'sobre') {
    return `M ${p1.x},${p1.y} C ${p1.x - 140},${p1.y} ${p1.x - 280},${p2.y - 220} ${p2.x + 280},${p2.y - 180} ${p2.x},${p2.y}`
  }
  if (from === 'projetos' && to === 'habilidades') {
    // Curva em "S" com escadaria espiral na ala leste
    return `M ${p1.x},${p1.y} C ${p1.x - 180},${p1.y + 220} ${p2.x - 220},${p1.y + 440} ${p1.x - 60},${p1.y + 540} C ${p2.x + 120},${p1.y + 640} ${p2.x + 100},${p2.y - 180} ${p2.x},${p2.y}`
  }
  if (from === 'habilidades' && to === 'projetos') {
    return `M ${p1.x},${p1.y} C ${p1.x + 100},${p1.y - 180} ${p2.x + 120},${p2.y + 640} ${p2.x - 60},${p2.y + 540} C ${p1.x - 220},${p2.y + 440} ${p2.x - 180},${p2.y + 220} ${p2.x},${p2.y}`
  }
  if (from === 'habilidades' && to === 'contato') {
    // Grande corredor inferior de claustro com arcadas góticas
    return `M ${p1.x},${p1.y} C ${p1.x - 350},${p1.y + 160} ${p2.x + 450},${p1.y + 200} ${1150},${p1.y + 120} C ${p2.x + 250},${p1.y + 60} ${p2.x + 160},${p2.y + 120} ${p2.x},${p2.y}`
  }
  if (from === 'contato' && to === 'habilidades') {
    return `M ${p1.x},${p1.y} C ${p1.x + 160},${p1.y + 120} ${p1.x + 250},${p2.y + 60} ${1150},${p2.y + 120} C ${p1.x + 450},${p2.y + 200} ${p2.x - 350},${p2.y + 160} ${p2.x},${p2.y}`
  }
  if (from === 'contato' && to === 'sobre') {
    // Passagem secreta vertical contornando as muralhas oeste
    return `M ${p1.x},${p1.y} C ${p1.x - 220},${p1.y - 200} ${p2.x - 240},${p1.y - 480} ${p1.x - 120},${p1.y - 560} C ${p2.x - 40},${p2.y + 180} ${p2.x - 80},${p2.y + 100} ${p2.x},${p2.y}`
  }
  // Padrão diagonal sinuoso passando pelo pátio central
  return `M ${p1.x},${p1.y} C ${p1.x + 180},${p1.y - 120} ${p2.x - 180},${p2.y + 120} ${p2.x},${p2.y}`
}

interface StepMarker {
  x: number
  y: number
  angle: number
  isLeft: boolean
}

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

interface CastleMapWorldProps {
  onHideMap: () => void
}

export default function CastleMapWorld({ onHideMap }: CastleMapWorldProps) {
  const [currentRoom, setCurrentRoom] = useState<RoomId>('sobre')
  const [isTraveling, setIsTraveling] = useState(false)
  const [activeCurveD, setActiveCurveD] = useState<string>('')
  const [stepsDrawn, setStepsDrawn] = useState<StepMarker[]>([])
  const [camera, setCamera] = useState<{ x: number; y: number }>({
    x: ROOMS.sobre.x,
    y: ROOMS.sobre.y,
  })

  const hiddenSvgPathRef = useRef<SVGPathElement>(null)

  // ── TRANSIÇÃO CINEMÁTICA: PEZINHOS CAMINHAM PELA CURVA E A CÂMERA SEGUE ──
  const travelToRoom = (targetId: RoomId) => {
    if (targetId === currentRoom || isTraveling) return

    const curve = getCorridorPath(currentRoom, targetId)
    setActiveCurveD(curve)
    setIsTraveling(true)
    setStepsDrawn([])

    // Precisamos de um pequeno tick para o elemento path atualizar seu d e permitir getPointAtLength
    setTimeout(() => {
      const pathEl = hiddenSvgPathRef.current
      if (!pathEl) {
        setCamera({ x: ROOMS[targetId].x, y: ROOMS[targetId].y })
        setCurrentRoom(targetId)
        setIsTraveling(false)
        return
      }

      const totalLen = pathEl.getTotalLength()
      const totalSteps = 22 // 22 passos detalhados ao longo da rota sinuosa
      const stepIntervalMs = 85 // ritmo humano natural de caminhada (cerca de 1.8 segundos total)

      let currentStepIndex = 0

      const timer = setInterval(() => {
        if (currentStepIndex >= totalSteps) {
          clearInterval(timer)
          // Finaliza e chega ao novo cômodo
          setCamera({ x: ROOMS[targetId].x, y: ROOMS[targetId].y })
          setCurrentRoom(targetId)
          setTimeout(() => {
            setIsTraveling(false)
            setStepsDrawn([])
            setActiveCurveD('')
          }, 350)
          return
        }

        const progress = currentStepIndex / totalSteps
        const dist = progress * totalLen
        const pt = pathEl.getPointAtLength(dist)
        const ptNext = pathEl.getPointAtLength(Math.min(totalLen, dist + 4))

        const angle = (Math.atan2(ptNext.y - pt.y, ptNext.x - pt.x) * 180) / Math.PI + 90
        const isLeft = currentStepIndex % 2 === 0
        const perpRad = ((angle + 90) * Math.PI) / 180
        const lateralOffset = isLeft ? -7 : 7

        const stepX = pt.x + Math.cos(perpRad) * lateralOffset
        const stepY = pt.y + Math.sin(perpRad) * lateralOffset

        // Adiciona a pegada carimbada no mapa
        setStepsDrawn((prev) => [
          ...prev,
          {
            x: stepX,
            y: stepY,
            angle: angle + (isLeft ? -4 : 4),
            isLeft,
          },
        ])

        // A CÂMERA DO MAPA SEGUE OS PASSOS EM TEMPO REAL!
        setCamera({ x: pt.x, y: pt.y })

        currentStepIndex++
      }, stepIntervalMs)
    }, 40)
  }

  // Ajusta a câmera se redimensionar a tela
  const [viewportSize, setViewportSize] = useState({ w: 1000, h: 700 })
  useEffect(() => {
    const handleResize = () => {
      setViewportSize({ w: window.innerWidth, h: window.innerHeight })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // A transformação do mapa posiciona a câmera exatamente no centro do viewport
  const mapOffsetX = viewportSize.w / 2 - camera.x
  const mapOffsetY = viewportSize.h / 2 - camera.y

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none bg-[#ebd8b6]"
      style={{
        backgroundImage: `
          radial-gradient(#3a2514 0.65px, transparent 0.65px),
          radial-gradient(#8c735d 0.5px, #ebd8b6 0.5px)
        `,
        backgroundSize: '24px 24px',
        backgroundPosition: '0 0, 12px 12px',
      }}
    >
      {/* Vinheta profunda do pergaminho antigo */}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          boxShadow:
            'inset 0 0 160px rgba(50, 30, 15, 0.45), inset 0 0 50px rgba(35, 20, 10, 0.3)',
        }}
        aria-hidden="true"
      />

      {/* SVG invisível para cálculo matemático da curva ativa */}
      <svg className="hidden" aria-hidden="true">
        <path ref={hiddenSvgPathRef} d={activeCurveD} />
      </svg>

      {/* ════════════════════════════════════════════════════════════════
          BARRA DE NAVEGAÇÃO SUPERIOR DO MAPA (OS CÔMODOS)
          ════════════════════════════════════════════════════════════════ */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 max-w-4xl w-full px-4">
        <nav
          className="rounded-full px-4 py-2 border-2 border-[#7a5535] shadow-2xl flex items-center justify-between gap-1 md:gap-3 flex-wrap"
          style={{
            backgroundColor: '#faf3e3',
            boxShadow: '0 8px 25px rgba(45, 25, 12, 0.35)',
          }}
        >
          {(Object.keys(ROOMS) as RoomId[]).map((rId) => {
            const room = ROOMS[rId]
            const isActive = currentRoom === rId

            return (
              <button
                key={rId}
                disabled={isTraveling}
                onClick={() => travelToRoom(rId)}
                className={`px-3 md:px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#8b2626] text-[#fbf8f2] shadow-md scale-105'
                    : 'text-[#4a2f1c] hover:bg-black/5 hover:text-[#2e1a0d]'
                } ${isTraveling ? 'opacity-70 cursor-wait' : ''}`}
                style={{ fontFamily: '"Cinzel", serif', letterSpacing: '0.1em' }}
              >
                <span>{room.id === 'sobre' ? '🏰' : room.id === 'projetos' ? '📜' : room.id === 'habilidades' ? '🪄' : '✉️'}</span>
                <span>{room.name}</span>
              </button>
            )
          })}
        </nav>
      </header>

      {/* Alerta de Deslocamento em tempo real */}
      <AnimatePresence>
        {isTraveling && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-40 px-5 py-2 rounded-full border border-[#8b2626] bg-[#faf3e3] shadow-lg flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#8b2626] animate-ping" />
            <span
              style={{ fontFamily: '"Cinzel", serif', fontSize: '0.68rem', letterSpacing: '0.12em', color: '#8b2626', fontWeight: 600 }}
            >
              Seguindo os passos pelo corredor...
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════
          O PLANO GIGANTE DO CASTELO (O MUNDO DO MAPA EM MOVIMENTO!)
          ════════════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute top-0 left-0"
        style={{
          width: 2400,
          height: 1600,
        }}
        animate={{
          x: mapOffsetX,
          y: mapOffsetY,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 140,
          mass: 0.8,
        }}
      >
        {/* SVG DOS CORREDORES ARQUITETÔNICOS SINUOSOS DO CASTELO */}
        <svg
          viewBox="0 0 2400 1600"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* Linhas de divisão em quadrantes e réguas de coordenadas */}
          <line x1="1150" y1="0" x2="1150" y2="1600" stroke="#7a5535" strokeWidth="1" strokeDasharray="6,4" opacity="0.35" />
          <line x1="0" y1="800" x2="2400" y2="800" stroke="#7a5535" strokeWidth="1" strokeDasharray="6,4" opacity="0.35" />

          {/* A GRANDE ROSA DOS VENTOS NO PÁTIO CENTRAL */}
          <g transform="translate(1150, 800)" opacity="0.55">
            <circle r="160" stroke="#5a3d24" strokeWidth="1" fill="none" />
            <circle r="150" stroke="#5a3d24" strokeWidth="0.8" strokeDasharray="4,2" fill="none" />
            <polygon points="0,-150 16,-20 0,0 -16,-20" fill="#3a2514" />
            <polygon points="0,150 16,20 0,0 -16,20" fill="#7a5535" />
            <polygon points="-150,0 -20,16 0,0 -20,-16" fill="#3a2514" />
            <polygon points="150,0 20,16 0,0 20,-16" fill="#7a5535" />
            <text x="0" y="-165" textAnchor="middle" fontFamily='"Cinzel", serif' fontSize="26" fontWeight="bold" fill="#3a2514">N</text>
            <text x="0" y="190" textAnchor="middle" fontFamily='"Cinzel", serif' fontSize="26" fontWeight="bold" fill="#3a2514">S</text>
            <text x="-190" y="8" textAnchor="middle" fontFamily='"Cinzel", serif' fontSize="26" fontWeight="bold" fill="#3a2514">W</text>
            <text x="190" y="8" textAnchor="middle" fontFamily='"Cinzel", serif' fontSize="26" fontWeight="bold" fill="#3a2514">E</text>
          </g>

          {/* ── TODOS OS CORREDORES PERMANENTES DO CASTELO (COM PAREDES DUPLAS E HACHURAS) ── */}
          {/* Corredor Superior: Sobre Mim ➔ Projetos */}
          <g opacity="0.65">
            <path d={getCorridorPath('sobre', 'projetos')} stroke="#422b1b" strokeWidth="2.5" fill="none" />
            <path d={getCorridorPath('sobre', 'projetos')} stroke="#ebd8b6" strokeWidth="1.2" strokeDasharray="6,3" fill="none" />
            <text x="1100" y="240" fontFamily='"Cormorant Garamond", serif' fontStyle="italic" fontSize="14" fill="#5a3d24" letterSpacing="0.1em">
              Corredor da Galeria Superior
            </text>
          </g>

          {/* Corredor Leste: Projetos ➔ Habilidades */}
          <g opacity="0.65">
            <path d={getCorridorPath('projetos', 'habilidades')} stroke="#422b1b" strokeWidth="2.5" fill="none" />
            <path d={getCorridorPath('projetos', 'habilidades')} stroke="#ebd8b6" strokeWidth="1.2" strokeDasharray="6,3" fill="none" />
            <text x="1650" y="820" transform="rotate(75 1650 820)" fontFamily='"Cormorant Garamond", serif' fontStyle="italic" fontSize="14" fill="#5a3d24" letterSpacing="0.1em">
              Escadaria Espiral dos Feitiços
            </text>
          </g>

          {/* Corredor Inferior: Habilidades ➔ Contato */}
          <g opacity="0.65">
            <path d={getCorridorPath('habilidades', 'contato')} stroke="#422b1b" strokeWidth="2.5" fill="none" />
            <path d={getCorridorPath('habilidades', 'contato')} stroke="#ebd8b6" strokeWidth="1.2" strokeDasharray="6,3" fill="none" />
            <text x="1150" y="1460" textAnchor="middle" fontFamily='"Cormorant Garamond", serif' fontStyle="italic" fontSize="14" fill="#5a3d24" letterSpacing="0.1em">
              Claustro das Arcadas Baixas
            </text>
          </g>

          {/* Corredor Oeste: Contato ➔ Sobre Mim */}
          <g opacity="0.65">
            <path d={getCorridorPath('contato', 'sobre')} stroke="#422b1b" strokeWidth="2.5" fill="none" />
            <path d={getCorridorPath('contato', 'sobre')} stroke="#ebd8b6" strokeWidth="1.2" strokeDasharray="6,3" fill="none" />
            <text x="240" y="800" transform="rotate(-80 240 800)" fontFamily='"Cormorant Garamond", serif' fontStyle="italic" fontSize="14" fill="#5a3d24" letterSpacing="0.1em">
              Passagem Secreta da Coruja
            </text>
          </g>

          {/* ── PEZINHOS EM MOVIMENTO CARIMBANDO O MAPA DURANTE A VIAGEM! ── */}
          {stepsDrawn.map((step, idx) => (
            <g key={`active-footstep-${idx}`}>
              <ShoePrint
                x={step.x}
                y={step.y}
                rotation={step.angle}
                isLeft={step.isLeft}
                scale={0.65}
                color="#2e1a0d"
                opacity={0.85}
              />
            </g>
          ))}

          {/* Etiqueta caminhante em cima do último passo */}
          {stepsDrawn.length > 0 && (
            <g transform={`translate(${stepsDrawn[stepsDrawn.length - 1].x + 14}, ${stepsDrawn[stepsDrawn.length - 1].y - 14})`}>
              <rect x="-2" y="-12" width="76" height="16" fill="#faf3e3" stroke="#8b2626" strokeWidth="0.8" rx="3" />
              <text x="4" y="0" fontFamily='"Cinzel", serif' fontSize="8" fill="#8b2626" fontWeight="bold">
                O ARTÍFICE
              </text>
            </g>
          )}
        </svg>

        {/* ════════════════════════════════════════════════════════════════
            AS 4 CÂMARAS REAIS DO PORTFÓLIO POSICIONADAS NO MAPA DO CASTELO
            ════════════════════════════════════════════════════════════════ */}

        {/* ── CÂMARA 1: O GABINETE DO ARTÍFICE (SOBRE MIM) ── */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 w-[720px] max-w-[92vw]"
          style={{ left: ROOMS.sobre.x, top: ROOMS.sobre.y }}
        >
          <div
            className="rounded-xl p-8 border-2 border-[#7a5535] shadow-2xl relative"
            style={{
              backgroundColor: '#faf3e3',
              boxShadow: '0 15px 45px rgba(45, 25, 12, 0.4)',
            }}
          >
            {/* Cabeçalho da câmara */}
            <div className="text-center mb-6">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#7a5535] font-semibold" style={{ fontFamily: '"Cinzel", serif' }}>
                {ROOMS.sobre.wing}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#241318] mt-1" style={{ fontFamily: '"Cinzel", serif' }}>
                {ROOMS.sobre.chamberTitle}
              </h2>
              <div className="flex items-center justify-center gap-3 mt-2 opacity-60">
                <div className="h-px w-20 bg-[#5a3d24]" />
                <span className="text-xs text-[#8b2626]">✦</span>
                <div className="h-px w-20 bg-[#5a3d24]" />
              </div>
            </div>

            {/* Conteúdo */}
            <div className="grid md:grid-cols-[1fr_1.8fr] gap-6 items-center">
              <div className="text-center p-5 rounded-lg border border-[#cfbe9b] bg-[#f5ecda]">
                <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl mb-3 border border-[#cfbe9b] shadow-inner bg-[#fbf8f2]">
                  {OWNER.avatarPlaceholder}
                </div>
                <h3 className="font-bold text-base text-[#2e1a0d]" style={{ fontFamily: '"Cinzel", serif' }}>
                  {OWNER.name}
                </h3>
                <p className="text-xs italic text-[#7a5535] mt-0.5" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.95rem' }}>
                  {OWNER.title}
                </p>
                <p className="flex items-center justify-center gap-1 text-[11px] text-[#7a5535] mt-2">
                  <MapPin size={11} /> {OWNER.location}
                </p>
              </div>

              <div>
                <p className="text-base leading-relaxed text-[#2e1a0d]" style={{ fontFamily: '"EB Garamond", serif', fontSize: '1.05rem' }}>
                  {OWNER.bio}
                </p>
                <p className="mt-3 text-sm italic text-[#5a3d24]" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem' }}>
                  "{OWNER.tagline}"
                </p>
              </div>
            </div>

            {/* Portal do corredor sinuoso para Projetos */}
            <div className="mt-8 pt-5 border-t border-[#cfbe9b] flex justify-between items-center flex-wrap gap-3">
              <span className="text-xs text-[#7a5535] italic" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.95rem' }}>
                Corredor em curva aberto para a Galeria de Projetos ➔
              </span>
              <button
                disabled={isTraveling}
                onClick={() => travelToRoom('projetos')}
                className="px-6 py-2.5 rounded-full text-xs font-semibold tracking-widest text-[#fbf8f2] shadow-md transition-all hover:brightness-110 active:scale-95 cursor-pointer flex items-center gap-2"
                style={{
                  backgroundColor: '#8b2626',
                  fontFamily: '"Cinzel", serif',
                  letterSpacing: '0.14em',
                }}
              >
                <span>Caminhar para Projetos</span>
                <span>🐾</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── CÂMARA 2: GALERIA DOS GRANDES ARTEFATOS (PROJETOS) ── */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 w-[760px] max-w-[92vw]"
          style={{ left: ROOMS.projetos.x, top: ROOMS.projetos.y }}
        >
          <div
            className="rounded-xl p-8 border-2 border-[#7a5535] shadow-2xl relative"
            style={{
              backgroundColor: '#faf3e3',
              boxShadow: '0 15px 45px rgba(45, 25, 12, 0.4)',
            }}
          >
            <div className="text-center mb-6">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#7a5535] font-semibold" style={{ fontFamily: '"Cinzel", serif' }}>
                {ROOMS.projetos.wing}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#241318] mt-1" style={{ fontFamily: '"Cinzel", serif' }}>
                {ROOMS.projetos.chamberTitle}
              </h2>
              <div className="flex items-center justify-center gap-3 mt-2 opacity-60">
                <div className="h-px w-20 bg-[#5a3d24]" />
                <span className="text-xs text-[#8b2626]">✦</span>
                <div className="h-px w-20 bg-[#5a3d24]" />
              </div>
            </div>

            {/* Grid de Projetos */}
            <div className="grid md:grid-cols-2 gap-4 max-h-[380px] overflow-y-auto pr-1">
              {PROJECTS.map((proj) => (
                <article
                  key={proj.id}
                  className="p-4 rounded-lg border border-[#cfbe9b] bg-[#f5ecda] hover:border-[#8b2626] transition-all"
                >
                  <div className="flex items-start justify-between mb-1.5">
                    <h3 className="font-bold text-sm text-[#2e1a0d]" style={{ fontFamily: '"Cinzel", serif' }}>
                      {proj.title}
                    </h3>
                    <div className="flex gap-2 text-[#7a5535]">
                      {proj.repoUrl && (
                        <a href={proj.repoUrl} target="_blank" rel="noopener noreferrer" aria-label="Código">
                          <GithubIcon size={14} />
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Demo">
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed text-[#4a2f1c] mb-3" style={{ fontFamily: '"EB Garamond", serif', fontSize: '0.92rem' }}>
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {proj.tags.map((t) => (
                      <span
                        key={t}
                        className="px-1.5 py-0.5 rounded text-[10px] border border-[#cfbe9b] bg-[#fbf8f2] text-[#5a3d24]"
                        style={{ fontFamily: '"Inter", sans-serif' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            {/* Corredores de saída */}
            <div className="mt-6 pt-5 border-t border-[#cfbe9b] flex justify-between items-center flex-wrap gap-3">
              <button
                disabled={isTraveling}
                onClick={() => travelToRoom('sobre')}
                className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider text-[#4a2f1c] border border-[#cfbe9b] hover:bg-black/5 cursor-pointer"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                ← Voltar a Sobre Mim
              </button>
              <button
                disabled={isTraveling}
                onClick={() => travelToRoom('habilidades')}
                className="px-6 py-2.5 rounded-full text-xs font-semibold tracking-widest text-[#fbf8f2] shadow-md transition-all hover:brightness-110 active:scale-95 cursor-pointer flex items-center gap-2"
                style={{
                  backgroundColor: '#8b2626',
                  fontFamily: '"Cinzel", serif',
                  letterSpacing: '0.14em',
                }}
              >
                <span>Descer a Escadaria para Habilidades</span>
                <span>🐾</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── CÂMARA 3: GRIMÓRIO & ARSENAL TÉCNICO (HABILIDADES) ── */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 w-[760px] max-w-[92vw]"
          style={{ left: ROOMS.habilidades.x, top: ROOMS.habilidades.y }}
        >
          <div
            className="rounded-xl p-8 border-2 border-[#7a5535] shadow-2xl relative"
            style={{
              backgroundColor: '#faf3e3',
              boxShadow: '0 15px 45px rgba(45, 25, 12, 0.4)',
            }}
          >
            <div className="text-center mb-6">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#7a5535] font-semibold" style={{ fontFamily: '"Cinzel", serif' }}>
                {ROOMS.habilidades.wing}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#241318] mt-1" style={{ fontFamily: '"Cinzel", serif' }}>
                {ROOMS.habilidades.chamberTitle}
              </h2>
              <div className="flex items-center justify-center gap-3 mt-2 opacity-60">
                <div className="h-px w-20 bg-[#5a3d24]" />
                <span className="text-xs text-[#8b2626]">✦</span>
                <div className="h-px w-20 bg-[#5a3d24]" />
              </div>
            </div>

            {/* Categorias de Skills */}
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
              {SKILL_GROUPS.map((grp) => (
                <div key={grp.category} className="p-3.5 rounded border border-[#cfbe9b] bg-[#f5ecda]">
                  <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-[#cfbe9b]">
                    <span className="text-base">{grp.icon}</span>
                    <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#2e1a0d]" style={{ fontFamily: '"Cinzel", serif' }}>
                      {grp.category}
                    </h4>
                  </div>

                  <ul className="space-y-1.5">
                    {grp.skills.map((sk) => (
                      <li key={sk.name} className="flex justify-between items-center text-xs text-[#3a2514]" style={{ fontFamily: '"EB Garamond", serif', fontSize: '0.92rem' }}>
                        <span>{sk.name}</span>
                        <span className="text-[9px] text-[#8b2626] font-semibold" style={{ fontFamily: '"Cinzel", serif' }}>
                          {sk.level}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-[#cfbe9b] flex justify-between items-center flex-wrap gap-3">
              <button
                disabled={isTraveling}
                onClick={() => travelToRoom('projetos')}
                className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider text-[#4a2f1c] border border-[#cfbe9b] hover:bg-black/5 cursor-pointer"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                ← Subir para Projetos
              </button>
              <button
                disabled={isTraveling}
                onClick={() => travelToRoom('contato')}
                className="px-6 py-2.5 rounded-full text-xs font-semibold tracking-widest text-[#fbf8f2] shadow-md transition-all hover:brightness-110 active:scale-95 cursor-pointer flex items-center gap-2"
                style={{
                  backgroundColor: '#8b2626',
                  fontFamily: '"Cinzel", serif',
                  letterSpacing: '0.14em',
                }}
              >
                <span>Caminhar pelo Claustro para Contato</span>
                <span>🐾</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── CÂMARA 4: TORRE DOS MENSAGEIROS (CONTATO) ── */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 w-[720px] max-w-[92vw]"
          style={{ left: ROOMS.contato.x, top: ROOMS.contato.y }}
        >
          <div
            className="rounded-xl p-8 border-2 border-[#7a5535] shadow-2xl relative text-center"
            style={{
              backgroundColor: '#faf3e3',
              boxShadow: '0 15px 45px rgba(45, 25, 12, 0.4)',
            }}
          >
            <div className="text-center mb-6">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#7a5535] font-semibold" style={{ fontFamily: '"Cinzel", serif' }}>
                {ROOMS.contato.wing}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#241318] mt-1" style={{ fontFamily: '"Cinzel", serif' }}>
                {ROOMS.contato.chamberTitle}
              </h2>
              <div className="flex items-center justify-center gap-3 mt-2 opacity-60">
                <div className="h-px w-20 bg-[#5a3d24]" />
                <span className="text-xs text-[#8b2626]">✦</span>
                <div className="h-px w-20 bg-[#5a3d24]" />
              </div>
            </div>

            <p className="max-w-md mx-auto text-base text-[#4a2f1c] leading-relaxed mb-6" style={{ fontFamily: '"EB Garamond", serif', fontSize: '1.05rem' }}>
              Tem uma missão a propor, uma dúvida técnica ou quer trocar ideias? As corujas estão a postos na torre.
            </p>

            <div className="flex justify-center gap-3 flex-wrap max-w-lg mx-auto mb-6">
              <a
                href={`mailto:${OWNER.email}`}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#8b2626] text-[#fbf8f2] text-xs font-semibold tracking-wider hover:brightness-110 transition-all shadow-md"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                <Mail size={14} />
                <span>Enviar E-mail</span>
              </a>
              <a
                href={OWNER.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#5a3d24] text-[#2e1a0d] text-xs font-semibold tracking-wider hover:bg-black/5 transition-all"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                <GithubIcon size={14} />
                <span>GitHub</span>
              </a>
              <a
                href={OWNER.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#5a3d24] text-[#2e1a0d] text-xs font-semibold tracking-wider hover:bg-black/5 transition-all"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                <LinkedinIcon size={14} />
                <span>LinkedIn</span>
              </a>
            </div>

            <div className="pt-5 border-t border-[#cfbe9b] flex justify-between items-center flex-wrap gap-3">
              <button
                disabled={isTraveling}
                onClick={() => travelToRoom('habilidades')}
                className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider text-[#4a2f1c] border border-[#cfbe9b] hover:bg-black/5 cursor-pointer"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                ← Voltar a Habilidades
              </button>
              <button
                disabled={isTraveling}
                onClick={() => travelToRoom('sobre')}
                className="px-6 py-2.5 rounded-full text-xs font-semibold tracking-widest text-[#fbf8f2] shadow-md transition-all hover:brightness-110 active:scale-95 cursor-pointer flex items-center gap-2"
                style={{
                  backgroundColor: '#8b2626',
                  fontFamily: '"Cinzel", serif',
                  letterSpacing: '0.14em',
                }}
              >
                <span>Subir Passagem Secreta para o Gabinete</span>
                <span>🐾</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ════════════════════════════════════════════════════════════════
          RODAPÉ DO MAPA (FECHAR O MAPA / TRAQUINAGEM TERMINADA)
          ════════════════════════════════════════════════════════════════ */}
      <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 text-center">
        <button
          onClick={onHideMap}
          className="px-6 py-2 rounded-full border border-[#8c735d]/60 bg-[#faf3e3]/90 text-[#5a3d24] text-xs tracking-widest hover:border-[#3a2514] hover:text-[#2e1a0d] transition-all cursor-pointer shadow-md"
          style={{ fontFamily: '"Cinzel", serif', fontSize: '0.68rem' }}
        >
          — Traquinagem terminada —
        </button>
      </footer>
    </div>
  )
}
