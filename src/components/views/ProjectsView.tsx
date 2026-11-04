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
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto w-full pt-24 pb-16 px-4"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/20 bg-amber-400/5 text-amber-300 text-xs font-medium mb-3">
          <span>✦</span>
          <span>Portfólio em Destaque</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-wide" style={{ fontFamily: '"Cinzel", serif' }}>
          Projetos & Aplicações
        </h2>
        <p className="text-sm text-slate-400 max-w-lg mx-auto mt-2">
          Soluções completas desenvolvidas com foco em arquitetura limpa, performance e usabilidade.
        </p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map((proj) => (
          <article
            key={proj.id}
            className="rounded-xl p-6 border border-white/10 bg-[#0f121b]/80 backdrop-blur-md hover:border-amber-400/40 transition-all hover:shadow-xl hover:shadow-amber-500/5 group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-amber-400/90 tracking-wider">
                  {proj.featured ? '✦ Destaque' : 'Aplicação'}
                </span>

                <div className="flex items-center gap-3 text-slate-400">
                  {proj.repoUrl && (
                    <a
                      href={proj.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amber-300 transition-colors"
                      aria-label="Código no GitHub"
                    >
                      <GithubIcon size={16} />
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amber-300 transition-colors"
                      aria-label="Ver Demonstração"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-200 transition-colors" style={{ fontFamily: '"Cinzel", serif' }}>
                {proj.title}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                {proj.description}
              </p>
            </div>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
              {proj.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/[0.04] text-slate-300 border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* Navigation Footbar */}
      <div className="mt-12 flex justify-between items-center flex-wrap gap-4 pt-6 border-t border-white/10">
        <button
          onClick={() => onNavigate('sobre')}
          className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          ← Voltar para Sobre Mim
        </button>

        <button
          onClick={() => onNavigate('habilidades')}
          className="px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider text-black bg-gradient-to-r from-amber-300 to-amber-500 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
        >
          <span>Conhecer Habilidades Técnicas</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  )
}

