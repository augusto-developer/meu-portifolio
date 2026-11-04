import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Mail, MapPin } from 'lucide-react'
import { OWNER, PROJECTS, SKILL_GROUPS } from '../data'
import { ShoePrint } from './Footprints'
import InteractiveFootsteps from './InteractiveFootsteps'

export type RoomKey = 'sobre' | 'projetos' | 'habilidades' | 'contato'

interface MapPortfolioProps {
  onHideMap: () => void
}

interface RoomInfo {
  key: RoomKey
  name: string
  label: string
  icon: string
}

const ROOMS: RoomInfo[] = [
  { key: 'sobre', name: 'Sobre Mim', label: 'O Gabinete do Artífice', icon: '🏰' },
  { key: 'projetos', name: 'Projetos', label: 'Galeria dos Artefatos', icon: '📜' },
  { key: 'habilidades', name: 'Habilidades', label: 'Grimório de Feitiços', icon: '🪄' },
  { key: 'contato', name: 'Contato', label: 'Torre dos Mensageiros', icon: '✉️' },
]

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

export default function MapPortfolio({ onHideMap }: MapPortfolioProps) {
  const [activeRoom, setActiveRoom] = useState<RoomKey>('sobre')
  const [isWalking, setIsWalking] = useState(false)
  const [targetRoom, setTargetRoom] = useState<RoomKey | null>(null)

  // Quando o visitante clica para mudar de sala:
  const navigateToRoom = (newRoom: RoomKey) => {
    if (newRoom === activeRoom || isWalking) return
    setIsWalking(true)
    setTargetRoom(newRoom)

    // Os pezinhos caminham pelo corredor por 1.2s antes de revelar a nova câmara
    setTimeout(() => {
      setActiveRoom(newRoom)
      setIsWalking(false)
      setTargetRoom(null)
    }, 1200)
  }



  return (
    <div
      className="relative min-h-screen overflow-x-hidden flex flex-col justify-between py-6 px-4 md:px-8 select-none"
      style={{
        backgroundColor: '#ebd8b6',
        backgroundImage: `
          radial-gradient(#3a2514 0.6px, transparent 0.6px),
          radial-gradient(#8c735d 0.5px, #ebd8b6 0.5px)
        `,
        backgroundSize: '24px 24px',
        backgroundPosition: '0 0, 12px 12px',
      }}
    >
      {/* Pegadas interativas quando clica no pergaminho */}
      <InteractiveFootsteps />

      {/* Vinheta de borda envelhecida do mapa */}
      <div
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          boxShadow:
            'inset 0 0 160px rgba(50, 30, 15, 0.4), inset 0 0 50px rgba(35, 20, 10, 0.25)',
        }}
        aria-hidden="true"
      />

      {/* ════════════════════════════════════════════════════════════════
          CORREDOR DE NAVEGAÇÃO SUPERIOR DO MAPA (OS CÔMODOS DO CASTELO)
          ════════════════════════════════════════════════════════════════ */}
      <header className="relative z-30 max-w-5xl mx-auto w-full mb-6">
        <div className="text-center mb-4">
          <p
            className="text-xs uppercase tracking-[0.25em] text-[#5a3d24] font-semibold"
            style={{ fontFamily: '"Cinzel", serif', fontSize: '0.72rem' }}
          >
            Planta Arquitetônica do Castelo ✦ Mapa do Maroto
          </p>
        </div>

        {/* Linha do corredor conectando os 4 cômodos */}
        <nav
          className="relative rounded-lg p-2 md:p-3 border-2 border-[#7a5535] shadow-lg flex flex-wrap items-center justify-around gap-2"
          style={{
            backgroundColor: '#fbf4e4',
            boxShadow: '0 6px 20px rgba(45, 25, 12, 0.25)',
          }}
        >
          {ROOMS.map((room) => {
            const isActive = room.key === activeRoom
            const isTarget = room.key === targetRoom

            return (
              <button
                key={room.key}
                onClick={() => navigateToRoom(room.key)}
                className={`relative px-4 py-2.5 rounded-md transition-all cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? 'border-[#8b2626] bg-[#8b2626] text-[#fbf8f2] shadow-md'
                    : isTarget
                    ? 'border-[#c59a3f] bg-[#c59a3f]/20 text-[#2e1a0d]'
                    : 'border-[#cfbe9b] hover:border-[#5a3d24] text-[#4a2f1c] hover:bg-black/5'
                }`}
                style={{ fontFamily: '"Cinzel", serif', fontSize: '0.75rem', letterSpacing: '0.1em' }}
              >
                <span>{room.icon}</span>
                <span className="font-semibold">{room.name}</span>

                {/* Marcador ativo de selo */}
                {isActive && (
                  <motion.span
                    layoutId="active-room-marker"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#8b2626] border border-[#fbf8f2]"
                  />
                )}
              </button>
            )
          })}
        </nav>
      </header>

      {/* ════════════════════════════════════════════════════════════════
          ANIMAÇÃO DOS PEZINHOS CAMINHANDO PELO CORREDOR DURANTE A TROCA
          ════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isWalking && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Faixa do corredor revelando os passos */}
            <div className="relative py-8 px-16 rounded-xl border border-[#7a5535] bg-[#fbf4e4]/95 shadow-2xl flex flex-col items-center">
              <p
                className="text-xs uppercase tracking-[0.2em] text-[#5a3d24] mb-4 font-semibold"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                Caminhando pelo corredor para: {ROOMS.find((r) => r.key === targetRoom)?.name}...
              </p>

              {/* Passos andando na tela */}
              <div className="flex gap-4 items-center">
                {[0, 1, 2, 3, 4, 5].map((i) => {
                  const isLeft = i % 2 === 0
                  return (
                    <motion.div
                      key={`walk-step-${i}`}
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 0.9, scale: 1 }}
                      transition={{ delay: i * 0.18, duration: 0.25 }}
                    >
                      <svg width="24" height="24" viewBox="-12 -12 24 24">
                        <ShoePrint x={0} y={0} rotation={90} isLeft={isLeft} scale={0.75} color="#2e1a0d" />
                      </svg>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════
          A CÂMARA ATIVA DO MAPA (CONTEÚDO DO PORTFÓLIO DENTRO DA SALA)
          ════════════════════════════════════════════════════════════════ */}
      <main className="relative z-20 max-w-4xl mx-auto w-full my-auto">
        <AnimatePresence mode="wait">
          {/* ── CÂMARA 1: SOBRE MIM ── */}
          {activeRoom === 'sobre' && (
            <motion.div
              key="room-sobre"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg p-6 md:p-10 border-2 border-[#7a5535] shadow-xl relative"
              style={{
                backgroundColor: '#fbf4e4',
                boxShadow: '0 10px 35px rgba(45, 25, 12, 0.3)',
              }}
            >
              {/* Moldura de sala do castelo */}
              <div className="text-center mb-8">
                <span className="text-xs uppercase tracking-[0.25em] text-[#7a5535] font-semibold" style={{ fontFamily: '"Cinzel", serif' }}>
                  Câmara Central
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#241318] mt-1" style={{ fontFamily: '"Cinzel", serif' }}>
                  O Gabinete do Artífice
                </h2>
                <div className="flex items-center justify-center gap-3 mt-3 opacity-60">
                  <div className="h-px w-24 bg-[#5a3d24]" />
                  <span className="text-xs text-[#8b2626]">✦</span>
                  <div className="h-px w-24 bg-[#5a3d24]" />
                </div>
              </div>

              <div className="grid md:grid-cols-[1fr_1.8fr] gap-8 items-center">
                {/* Avatar e dados */}
                <div className="text-center p-6 rounded border border-[#cfbe9b] bg-[#f5ecda]">
                  <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-5xl mb-4 border border-[#cfbe9b] shadow-inner bg-[#fbf8f2]">
                    {OWNER.avatarPlaceholder}
                  </div>
                  <h3 className="font-bold text-lg text-[#2e1a0d]" style={{ fontFamily: '"Cinzel", serif' }}>
                    {OWNER.name}
                  </h3>
                  <p className="text-xs italic text-[#7a5535] mt-1" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.95rem' }}>
                    {OWNER.title}
                  </p>
                  <p className="flex items-center justify-center gap-1 text-xs text-[#7a5535] mt-2">
                    <MapPin size={12} /> {OWNER.location}
                  </p>
                </div>

                {/* Narrativa */}
                <div>
                  <p className="text-lg leading-relaxed text-[#2e1a0d]" style={{ fontFamily: '"EB Garamond", serif' }}>
                    {OWNER.bio}
                  </p>
                  <p className="mt-4 text-base italic text-[#5a3d24]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                    "{OWNER.tagline}"
                  </p>
                </div>
              </div>

              {/* Botão de corredor para a próxima câmara */}
              <div className="mt-10 pt-6 border-t border-[#cfbe9b] flex justify-between items-center flex-wrap gap-4">
                <span className="text-xs text-[#7a5535] italic" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem' }}>
                  Corredor aberto em direção à Galeria de Projetos...
                </span>
                <button
                  onClick={() => navigateToRoom('projetos')}
                  className="px-6 py-3 rounded-full text-xs font-semibold tracking-widest text-[#fbf8f2] shadow-md transition-all hover:brightness-110 active:scale-95 cursor-pointer flex items-center gap-2"
                  style={{
                    backgroundColor: '#8b2626',
                    fontFamily: '"Cinzel", serif',
                    letterSpacing: '0.15em',
                  }}
                >
                  <span>Caminhar para Projetos</span>
                  <span>➔</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* ── CÂMARA 2: PROJETOS ── */}
          {activeRoom === 'projetos' && (
            <motion.div
              key="room-projetos"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg p-6 md:p-10 border-2 border-[#7a5535] shadow-xl relative"
              style={{
                backgroundColor: '#fbf4e4',
                boxShadow: '0 10px 35px rgba(45, 25, 12, 0.3)',
              }}
            >
              <div className="text-center mb-8">
                <span className="text-xs uppercase tracking-[0.25em] text-[#7a5535] font-semibold" style={{ fontFamily: '"Cinzel", serif' }}>
                  Ala Leste
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#241318] mt-1" style={{ fontFamily: '"Cinzel", serif' }}>
                  Galeria dos Artefatos
                </h2>
                <div className="flex items-center justify-center gap-3 mt-3 opacity-60">
                  <div className="h-px w-24 bg-[#5a3d24]" />
                  <span className="text-xs text-[#8b2626]">✦</span>
                  <div className="h-px w-24 bg-[#5a3d24]" />
                </div>
              </div>

              {/* Grid de Projetos como pergaminhos do mapa */}
              <div className="grid md:grid-cols-2 gap-5">
                {PROJECTS.map((proj) => (
                  <article
                    key={proj.id}
                    className="p-5 rounded border border-[#cfbe9b] bg-[#f5ecda] hover:border-[#8b2626] transition-all group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-base text-[#2e1a0d]" style={{ fontFamily: '"Cinzel", serif' }}>
                        {proj.title}
                      </h3>
                      <div className="flex gap-2 text-[#7a5535]">
                        {proj.repoUrl && (
                          <a href={proj.repoUrl} target="_blank" rel="noopener noreferrer" aria-label="Código">
                            <GithubIcon size={15} />
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Demo">
                            <ExternalLink size={15} />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed text-[#4a2f1c] mb-4" style={{ fontFamily: '"EB Garamond", serif', fontSize: '1rem' }}>
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {proj.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[11px] border border-[#cfbe9b] bg-[#fbf8f2] text-[#5a3d24]"
                          style={{ fontFamily: '"Inter", sans-serif' }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              {/* Botão de corredor para habilidades */}
              <div className="mt-8 pt-6 border-t border-[#cfbe9b] flex justify-between items-center flex-wrap gap-4">
                <button
                  onClick={() => navigateToRoom('sobre')}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider text-[#4a2f1c] border border-[#cfbe9b] hover:bg-black/5 cursor-pointer"
                  style={{ fontFamily: '"Cinzel", serif' }}
                >
                  ← Voltar a Sobre Mim
                </button>
                <button
                  onClick={() => navigateToRoom('habilidades')}
                  className="px-6 py-3 rounded-full text-xs font-semibold tracking-widest text-[#fbf8f2] shadow-md transition-all hover:brightness-110 active:scale-95 cursor-pointer flex items-center gap-2"
                  style={{
                    backgroundColor: '#8b2626',
                    fontFamily: '"Cinzel", serif',
                    letterSpacing: '0.15em',
                  }}
                >
                  <span>Caminhar para Habilidades</span>
                  <span>➔</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* ── CÂMARA 3: HABILIDADES ── */}
          {activeRoom === 'habilidades' && (
            <motion.div
              key="room-skills"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg p-6 md:p-10 border-2 border-[#7a5535] shadow-xl relative"
              style={{
                backgroundColor: '#fbf4e4',
                boxShadow: '0 10px 35px rgba(45, 25, 12, 0.3)',
              }}
            >
              <div className="text-center mb-8">
                <span className="text-xs uppercase tracking-[0.25em] text-[#7a5535] font-semibold" style={{ fontFamily: '"Cinzel", serif' }}>
                  Torre Norte
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#241318] mt-1" style={{ fontFamily: '"Cinzel", serif' }}>
                  Grimório de Feitiços & Arsenal
                </h2>
                <div className="flex items-center justify-center gap-3 mt-3 opacity-60">
                  <div className="h-px w-24 bg-[#5a3d24]" />
                  <span className="text-xs text-[#8b2626]">✦</span>
                  <div className="h-px w-24 bg-[#5a3d24]" />
                </div>
              </div>

              {/* Categorias de habilidades */}
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {SKILL_GROUPS.map((grp) => (
                  <div key={grp.category} className="p-4 rounded border border-[#cfbe9b] bg-[#f5ecda]">
                    <div className="flex items-center gap-2 pb-2 mb-3 border-b border-[#cfbe9b]">
                      <span className="text-lg">{grp.icon}</span>
                      <h4 className="font-bold text-xs uppercase tracking-wider text-[#2e1a0d]" style={{ fontFamily: '"Cinzel", serif' }}>
                        {grp.category}
                      </h4>
                    </div>

                    <ul className="space-y-2">
                      {grp.skills.map((sk) => (
                        <li key={sk.name} className="flex justify-between items-center text-sm text-[#3a2514]" style={{ fontFamily: '"EB Garamond", serif', fontSize: '0.95rem' }}>
                          <span>{sk.name}</span>
                          <span className="text-[10px] text-[#8b2626] font-semibold" style={{ fontFamily: '"Cinzel", serif' }}>
                            {sk.level}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Botão de corredor para contato */}
              <div className="mt-8 pt-6 border-t border-[#cfbe9b] flex justify-between items-center flex-wrap gap-4">
                <button
                  onClick={() => navigateToRoom('projetos')}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider text-[#4a2f1c] border border-[#cfbe9b] hover:bg-black/5 cursor-pointer"
                  style={{ fontFamily: '"Cinzel", serif' }}
                >
                  ← Voltar a Projetos
                </button>
                <button
                  onClick={() => navigateToRoom('contato')}
                  className="px-6 py-3 rounded-full text-xs font-semibold tracking-widest text-[#fbf8f2] shadow-md transition-all hover:brightness-110 active:scale-95 cursor-pointer flex items-center gap-2"
                  style={{
                    backgroundColor: '#8b2626',
                    fontFamily: '"Cinzel", serif',
                    letterSpacing: '0.15em',
                  }}
                >
                  <span>Caminhar para Contato</span>
                  <span>➔</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* ── CÂMARA 4: CONTATO ── */}
          {activeRoom === 'contato' && (
            <motion.div
              key="room-contato"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg p-6 md:p-10 border-2 border-[#7a5535] shadow-xl relative text-center"
              style={{
                backgroundColor: '#fbf4e4',
                boxShadow: '0 10px 35px rgba(45, 25, 12, 0.3)',
              }}
            >
              <div className="text-center mb-8">
                <span className="text-xs uppercase tracking-[0.25em] text-[#7a5535] font-semibold" style={{ fontFamily: '"Cinzel", serif' }}>
                  Torre das Corujas
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#241318] mt-1" style={{ fontFamily: '"Cinzel", serif' }}>
                  Envio de Mensagens
                </h2>
                <div className="flex items-center justify-center gap-3 mt-3 opacity-60">
                  <div className="h-px w-24 bg-[#5a3d24]" />
                  <span className="text-xs text-[#8b2626]">✦</span>
                  <div className="h-px w-24 bg-[#5a3d24]" />
                </div>
              </div>

              <p className="max-w-md mx-auto text-base text-[#4a2f1c] leading-relaxed mb-8" style={{ fontFamily: '"EB Garamond", serif', fontSize: '1.15rem' }}>
                Tem uma missão a propor, uma dúvida ou quer trocar ideias sobre software? As corujas estão a postos.
              </p>

              {/* Botões de contato como selos de cera */}
              <div className="flex justify-center gap-4 flex-wrap max-w-lg mx-auto mb-8">
                <a
                  href={`mailto:${OWNER.email}`}
                  className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#8b2626] text-[#fbf8f2] text-xs font-semibold tracking-wider hover:brightness-110 transition-all shadow-md"
                  style={{ fontFamily: '"Cinzel", serif' }}
                >
                  <Mail size={15} />
                  <span>Enviar E-mail</span>
                </a>
                <a
                  href={OWNER.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-6 py-3 rounded-full border border-[#5a3d24] text-[#2e1a0d] text-xs font-semibold tracking-wider hover:bg-black/5 transition-all"
                  style={{ fontFamily: '"Cinzel", serif' }}
                >
                  <GithubIcon size={15} />
                  <span>GitHub</span>
                </a>
                <a
                  href={OWNER.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-6 py-3 rounded-full border border-[#5a3d24] text-[#2e1a0d] text-xs font-semibold tracking-wider hover:bg-black/5 transition-all"
                  style={{ fontFamily: '"Cinzel", serif' }}
                >
                  <LinkedinIcon size={15} />
                  <span>LinkedIn</span>
                </a>
              </div>

              <div className="pt-6 border-t border-[#cfbe9b] flex justify-center">
                <button
                  onClick={() => navigateToRoom('sobre')}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider text-[#4a2f1c] border border-[#cfbe9b] hover:bg-black/5 cursor-pointer"
                  style={{ fontFamily: '"Cinzel", serif' }}
                >
                  ← Retornar ao Gabinete Inicial
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ════════════════════════════════════════════════════════════════
          RODAPÉ DO MAPA (FECHAR O MAPA / TRAQUINAGEM TERMINADA)
          ════════════════════════════════════════════════════════════════ */}
      <footer className="relative z-30 max-w-md mx-auto text-center mt-8">
        <button
          onClick={onHideMap}
          className="px-6 py-2 rounded-full border border-[#8c735d]/60 text-[#5a3d24] text-xs tracking-widest hover:border-[#3a2514] hover:text-[#2e1a0d] transition-all cursor-pointer"
          style={{ fontFamily: '"Cinzel", serif', fontSize: '0.7rem' }}
        >
          — Traquinagem terminada —
        </button>
        <p className="mt-2 text-[11px] text-[#7a5535] opacity-75" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
          O mapa se apagará e retornará ao vazio
        </p>
      </footer>
    </div>
  )
}
