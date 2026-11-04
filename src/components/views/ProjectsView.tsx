import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { PROJECTS } from '../../data'

interface ProjectsViewProps {
  onNavigate: (tab: 'sobre' | 'habilidades' | 'contato') => void
}

function GithubIcon({ size = 15 }: { size?: number }) {
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
      className="max-w-5xl mx-auto w-full pt-24 pb-16 px-4"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#d4a738]/30 bg-[#4a0e18]/40 text-[#e5ba48] text-xs font-semibold tracking-widest uppercase mb-3">
          <span>✦</span>
          <span style={{ fontFamily: '"Cinzel", serif' }}>Catálogo de Obras & Aplicações</span>
        </div>
        <h2
          className="text-3xl md:text-4xl font-bold text-[#f6efe2] tracking-wide"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          Projetos & Tomos Técnicos
        </h2>
        <p className="text-sm text-[#c7b8a5] max-w-lg mx-auto mt-2">
          Sistemas completos arquitetados com precisão, alto desempenho e interfaces autênticas.
        </p>
      </div>

      {/* Grid of Archival Folio Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map((proj) => (
          <article
            key={proj.id}
            className="rounded-lg p-6 border border-[#d4a738]/25 relative overflow-hidden transition-all hover:border-[#d4a738]/60 hover:shadow-2xl hover:shadow-[#801b2b]/25 group flex flex-col justify-between"
            style={{
              backgroundColor: 'rgba(23, 15, 19, 0.94)',
              boxShadow:
                '0 15px 40px rgba(0, 0, 0, 0.7), inset 0 0 25px rgba(128, 27, 43, 0.1)',
            }}
          >
            {/* Top burgundy bookmark ribbon for featured projects */}
            {proj.featured && (
              <div
                className="absolute top-0 right-6 px-3 py-1 rounded-b border-b border-x border-[#d4a738]/50 text-[10px] font-bold tracking-wider text-[#ffd778] uppercase"
                style={{
                  backgroundColor: '#801b2b',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
                  fontFamily: '"Cinzel", serif',
                }}
              >
                ★ Destaque
              </div>
            )}

            {/* Corner brackets */}
            <span className="absolute top-1.5 left-1.5 text-[10px] text-[#d4a738]/40 font-serif select-none pointer-events-none">⌜</span>
            <span className="absolute bottom-1.5 right-1.5 text-[10px] text-[#d4a738]/40 font-serif select-none pointer-events-none">⌟</span>

            <div>
              <div className="flex items-start justify-between mb-3 pt-1">
                <span
                  className="text-xs font-semibold text-[#e5ba48] tracking-wider uppercase"
                  style={{ fontFamily: '"Cinzel", serif' }}
                >
                  Aplicação de Produção
                </span>
              </div>

              <h3
                className="text-xl font-bold text-[#f6efe2] tracking-wide mb-2 group-hover:text-[#ffd778] transition-colors"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                {proj.title}
              </h3>

              <p className="text-sm text-[#c7b8a5] leading-relaxed mb-6">
                {proj.description}
              </p>
            </div>

            <div>
              {/* Stamped Leather Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium px-2.5 py-1 rounded border border-[#d4a738]/20 bg-[#2d1820]/80 text-[#f6efe2]"
                    style={{ fontFamily: '"Cinzel", serif' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#d4a738]/15">
                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded border border-[#d4a738]/50 text-xs font-semibold tracking-wider text-[#f6efe2] transition-all cursor-pointer hover:border-[#e5ba48] hover:shadow-md hover:shadow-[#801b2b]/30"
                    style={{
                      backgroundColor: '#6e1624',
                      fontFamily: '"Cinzel", serif',
                    }}
                  >
                    <span>Ver Demonstração</span>
                    <ExternalLink size={12} className="text-[#e5ba48]" />
                  </a>
                )}

                {proj.repoUrl && (
                  <a
                    href={proj.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded border border-[#d4a738]/25 text-xs font-semibold tracking-wider text-[#c7b8a5] hover:text-[#f6efe2] hover:bg-[#801b2b]/20 transition-all cursor-pointer"
                    style={{ fontFamily: '"Cinzel", serif' }}
                  >
                    <GithubIcon size={13} />
                    <span>Código Fonte</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Footer Navigation CTA */}
      <div className="text-center mt-12">
        <button
          onClick={() => onNavigate('habilidades')}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#e5ba48] hover:text-[#ffd778] transition-colors cursor-pointer"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          <span>Examinar Habilidades Técnicas & Ferramentas</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </motion.div>
  )
}
