import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight, Book } from 'lucide-react'
import { PROJECTS } from '../../data'
import { BrassCorner } from '../ui/BookOrnaments'

interface ProjectsViewProps {
  onNavigate: (tab: 'sobre' | 'habilidades' | 'contato') => void
}

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

export default function ProjectsView({ onNavigate }: ProjectsViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="max-w-5xl mx-auto w-full pt-28 pb-16 px-4"
    >
      {/* Wooden Section Header Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#d4a738]/40 bg-[#3d0d16]/60 text-[#ffd778] text-xs font-bold tracking-widest uppercase mb-2 shadow-md">
          <Book size={12} className="text-[#e5ba48]" />
          <span style={{ fontFamily: '"Cinzel", serif' }}>Biblioteca de Obras & Aplicações</span>
        </div>
        <h2
          className="text-3xl md:text-4xl font-bold text-[#f6efe2] tracking-wide"
          style={{
            fontFamily: '"Cinzel", serif',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          }}
        >
          Tomos Encadernados & Projetos
        </h2>
        <p className="text-sm text-[#c7b8a5] max-w-lg mx-auto mt-2">
          Cada projeto é um tomo de código artesanal com arquitetura resiliente e propósito real.
        </p>
      </div>

      {/* Grid of Grimoire / Tome Covers */}
      <div className="grid md:grid-cols-2 gap-8">
        {PROJECTS.map((proj) => (
          <article
            key={proj.id}
            className="group relative rounded-lg border-2 border-[#d4a738]/35 transition-all duration-300 hover:border-[#ffd778]/70 hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
            style={{
              background:
                'linear-gradient(135deg, #24131b 0%, #170d13 50%, #10070c 100%)',
              boxShadow:
                '0 16px 40px rgba(0, 0, 0, 0.8), inset 0 0 30px rgba(80, 15, 25, 0.25)',
            }}
          >
            {/* 4 Brass Corners on Book Cover */}
            <BrassCorner position="tl" size={30} />
            <BrassCorner position="tr" size={30} />
            <BrassCorner position="bl" size={30} />
            <BrassCorner position="br" size={30} />

            {/* Left Embossed Leather Spine Strip */}
            <div className="absolute left-0 inset-y-0 w-4 bg-gradient-to-r from-[#0c0508] via-[#421926] to-[#12070c] border-r border-[#d4a738]/40">
              <div className="h-full flex flex-col justify-around py-4">
                <div className="h-0.5 bg-[#ffd778]/50 shadow-sm" />
                <div className="h-0.5 bg-[#ffd778]/50 shadow-sm" />
                <div className="h-0.5 bg-[#ffd778]/50 shadow-sm" />
              </div>
            </div>

            {/* Inset Gold-Tooling Filigree Border */}
            <div className="absolute inset-2.5 rounded border border-[#d4a738]/25 pointer-events-none" />

            {/* Featured Velvet Bookmark Ribbon */}
            {proj.featured && (
              <div
                className="absolute top-0 right-6 px-3 pt-1 pb-2 border-x border-b border-[#ffd778]/60 text-[10px] font-bold tracking-widest text-[#ffe8a3] uppercase z-20"
                style={{
                  background:
                    'linear-gradient(180deg, #8a192b 0%, #520d18 100%)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.6)',
                  fontFamily: '"Cinzel", serif',
                  clipPath:
                    'polygon(0 0, 100% 0, 100% calc(100% - 6px), 50% 100%, 0 calc(100% - 6px))',
                }}
              >
                ★ Em Destaque
              </div>
            )}

            {/* Book Body */}
            <div className="p-6 pl-8 relative z-10">
              <div className="mb-2 pt-1 flex items-center justify-between">
                <span
                  className="text-[10px] font-bold text-[#e5ba48] tracking-widest uppercase bg-[#3a1520]/60 px-2 py-0.5 rounded border border-[#d4a738]/20"
                  style={{ fontFamily: '"Cinzel", serif' }}
                >
                  Tomo de Produção
                </span>
              </div>

              {/* Stamped Book Title */}
              <h3
                className="text-xl font-bold text-[#f6efe2] tracking-wide mb-2 group-hover:text-[#ffd778] transition-colors"
                style={{
                  fontFamily: '"Cinzel", serif',
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                }}
              >
                {proj.title}
              </h3>

              <p className="text-sm text-[#c7b8a5] leading-relaxed mb-6 font-sans">
                {proj.description}
              </p>
            </div>

            {/* Bottom Book Section: Tags & Clasps */}
            <div className="p-6 pl-8 pt-0 relative z-10">
              {/* Stamped Leather Spine Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold px-2 py-1 rounded border border-[#d4a738]/30 bg-[#160a0f] text-[#ffd778] tracking-wider uppercase"
                    style={{ fontFamily: '"Cinzel", serif' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Brass Book Clasp Action Buttons */}
              <div className="flex items-center gap-3 pt-3 border-t border-[#d4a738]/20">
                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded border border-[#d4a738] text-xs font-bold tracking-wider text-[#ffe8a3] transition-all cursor-pointer hover:border-[#ffd778] hover:shadow-lg hover:shadow-[#801b2b]/40"
                    style={{
                      background:
                        'linear-gradient(180deg, #7a1626 0%, #4a0d17 100%)',
                      boxShadow:
                        '0 3px 8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,225,140,0.3)',
                      fontFamily: '"Cinzel", serif',
                    }}
                  >
                    <span>Abrir Tomo (Demo)</span>
                    <ExternalLink size={12} className="text-[#ffd778]" />
                  </a>
                )}

                {proj.repoUrl && (
                  <a
                    href={proj.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded border border-[#d4a738]/35 text-xs font-bold tracking-wider text-[#c7b8a5] hover:text-[#f6efe2] hover:bg-[#801b2b]/25 transition-all cursor-pointer"
                    style={{ fontFamily: '"Cinzel", serif' }}
                  >
                    <GithubIcon size={13} />
                    <span>Pergaminho de Código</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Return or Advance Nav CTA */}
      <div className="text-center mt-12">
        <button
          onClick={() => onNavigate('habilidades')}
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#e5ba48] hover:text-[#ffd778] transition-colors cursor-pointer"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          <span>Examinar o Compêndio de Habilidades</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </motion.div>
  )
}
