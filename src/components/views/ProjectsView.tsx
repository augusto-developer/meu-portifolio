import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Book, Play, Lock } from 'lucide-react'
import { PROJECTS } from '../../data'
import { BrassCorner } from '../ui/BookOrnaments'
import AutomationFlowDemo from '../AutomationFlowDemo'

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
  const [activeFlowProjectId, setActiveFlowProjectId] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-5xl mx-auto w-full my-auto px-4 pt-20 pb-12 sm:pt-24 sm:pb-16 font-sans"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-[#d4a738]/35 bg-[#3d0d16]/60 text-[#ffd778] text-xs font-semibold mb-2 shadow-sm">
          <Book size={12} className="text-[#e5ba48]" />
          <span>Projetos em Destaque</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#f6efe2] tracking-tight">
          Projetos & Aplicações
        </h2>
      </div>

      {/* Grid of Projects */}
      <div className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map((proj) => (
          <article
            key={proj.id}
            className="group relative rounded-lg border border-[#d4a738]/30 transition-all duration-200 hover:border-[#ffd778]/60 overflow-hidden flex flex-col justify-between"
            style={{
              background:
                'linear-gradient(135deg, #22121a 0%, #170d13 50%, #10070c 100%)',
              boxShadow:
                '0 12px 35px rgba(0, 0, 0, 0.75), inset 0 0 25px rgba(80, 15, 25, 0.2)',
            }}
          >
            {/* Brass Corners */}
            <BrassCorner position="tl" size={26} />
            <BrassCorner position="tr" size={26} />
            <BrassCorner position="bl" size={26} />
            <BrassCorner position="br" size={26} />

            {/* Left Embossed Spine Strip */}
            <div className="absolute left-0 inset-y-0 w-3 bg-gradient-to-r from-[#0c0508] via-[#421926] to-[#12070c] border-r border-[#d4a738]/30">
              <div className="h-full flex flex-col justify-around py-4">
                <div className="h-0.5 bg-[#ffd778]/40" />
                <div className="h-0.5 bg-[#ffd778]/40" />
                <div className="h-0.5 bg-[#ffd778]/40" />
              </div>
            </div>

            {/* Featured Bookmark Ribbon */}
            {proj.featured && (
              <div
                className="absolute top-0 right-5 px-3 pt-1 pb-2 border-x border-b border-[#ffd778]/60 text-[10px] font-bold tracking-wider text-[#ffe8a3] uppercase z-20"
                style={{
                  background: 'linear-gradient(180deg, #8a192b 0%, #520d18 100%)',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.5)',
                  clipPath:
                    'polygon(0 0, 100% 0, 100% calc(100% - 5px), 50% 100%, 0 calc(100% - 5px))',
                }}
              >
                ★ Destaque
              </div>
            )}

            {/* Card Content */}
            <div className="p-6 pl-7 relative z-10">
              {proj.metrics && (
                <div className="mb-2">
                  <span className="text-[11px] font-semibold text-[#ffd778] bg-[#6e1624]/70 px-2.5 py-0.5 rounded border border-[#ffd778]/30">
                    ⚡ {proj.metrics}
                  </span>
                </div>
              )}

              <h3 className="text-lg font-bold text-[#f6efe2] tracking-tight mb-2 group-hover:text-[#ffd778] transition-colors">
                {proj.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#c7b8a5] leading-relaxed mb-4">
                {proj.description}
              </p>

              {/* Confidentiality Pill */}
              {proj.confidentialityNotice && (
                <div className="mb-4 p-2 rounded border border-amber-600/30 bg-amber-950/30 flex items-center gap-2 text-[11px] text-[#ffd778]">
                  <Lock size={12} className="text-amber-400 shrink-0" />
                  <span>{proj.confidentialityNotice}</span>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="p-6 pl-7 pt-0 relative z-10">
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium px-2 py-0.5 rounded border border-[#d4a738]/25 bg-[#160a0f] text-[#ffd778]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-[#d4a738]/15">
                {proj.demoType === 'interactive-flow' ? (
                  <>
                    <button
                      onClick={() => setActiveFlowProjectId(proj.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded border border-[#d4a738] text-xs font-semibold text-[#ffe8a3] transition-all cursor-pointer hover:border-[#ffd778] hover:shadow-lg hover:shadow-[#801b2b]/40"
                      style={{
                        background: 'linear-gradient(180deg, #7a1626 0%, #4a0d17 100%)',
                      }}
                    >
                      <Play size={12} className="text-[#ffd778] fill-[#ffd778]" />
                      <span>Ver Demonstração do Fluxo</span>
                    </button>

                    <button
                      onClick={() => onNavigate('contato')}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded border border-[#d4a738]/30 text-xs font-medium text-[#c7b8a5] hover:text-[#ffd778] hover:bg-[#801b2b]/20 transition-all cursor-pointer"
                    >
                      <Lock size={12} className="text-amber-400" />
                      <span>
                        {proj.id === 'bot-ofertas'
                          ? 'Arquitetura Privada'
                          : 'Repositório sob NDA'}
                      </span>
                    </button>
                  </>
                ) : (
                  <>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded border border-[#d4a738] text-xs font-semibold text-[#ffe8a3] transition-all cursor-pointer hover:border-[#ffd778]"
                        style={{
                          background: 'linear-gradient(180deg, #7a1626 0%, #4a0d17 100%)',
                        }}
                      >
                        <span>Abrir Demo</span>
                        <ExternalLink size={12} className="text-[#ffd778]" />
                      </a>
                    )}

                    {proj.repoUrl && (
                      <a
                        href={proj.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded border border-[#d4a738]/30 text-xs font-medium text-[#c7b8a5] hover:text-[#f6efe2] hover:bg-[#801b2b]/20 transition-all cursor-pointer"
                      >
                        <GithubIcon size={12} />
                        <span>Código Fonte</span>
                      </a>
                    )}
                  </>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Interactive Modal */}
      <AutomationFlowDemo
        isOpen={Boolean(activeFlowProjectId)}
        projectId={activeFlowProjectId}
        onClose={() => setActiveFlowProjectId(null)}
        onContactClick={() => onNavigate('contato')}
      />
    </motion.div>
  )
}
