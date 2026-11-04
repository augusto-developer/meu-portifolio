import { motion } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'
import { OWNER } from '../../data'

interface AboutViewProps {
  onNavigate: (tab: 'projetos' | 'habilidades' | 'contato') => void
}

export default function AboutView({ onNavigate }: AboutViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto w-full pt-24 pb-16 px-4"
    >
      {/* Hero Presentation Card */}
      <div
        className="rounded-2xl p-8 md:p-12 border border-white/10 backdrop-blur-xl relative overflow-hidden"
        style={{
          backgroundColor: 'rgba(15, 18, 27, 0.82)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 175, 55, 0.05)',
        }}
      >
        {/* Subtle Lumos Ambient Glow in corner */}
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 grid md:grid-cols-[1fr_2fr] gap-8 items-center">
          {/* Avatar Profile */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl border border-white/5 bg-white/[0.02]">
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center text-5xl mb-4 border border-amber-400/25"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #1f2538 0%, #0d1017 100%)',
                boxShadow: '0 0 25px rgba(212, 175, 55, 0.15)',
              }}
            >
              {OWNER.avatarPlaceholder}
            </div>

            <h2 className="text-xl font-semibold text-white tracking-wide" style={{ fontFamily: '"Cinzel", serif' }}>
              {OWNER.name}
            </h2>

            <p className="text-xs text-amber-300/80 font-medium mt-1">
              {OWNER.title}
            </p>

            <p className="flex items-center gap-1.5 text-xs text-slate-400 mt-3">
              <MapPin size={12} className="text-amber-400/70" />
              <span>{OWNER.location}</span>
            </p>
          </div>

          {/* Bio & Professional Statement */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/20 bg-amber-400/5 text-amber-300 text-xs font-medium mb-4">
              <span>✦</span>
              <span>Engenharia de Software & Produto</span>
            </div>

            <h1
              className="text-2xl md:text-3xl font-semibold text-white leading-snug mb-4"
              style={{ fontFamily: '"Cinzel", serif' }}
            >
              Construindo aplicações robustas com precisão e elegância.
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-normal">
              {OWNER.bio}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div>
                <p className="text-xl md:text-2xl font-bold text-amber-300" style={{ fontFamily: '"Cinzel", serif' }}>
                  3+
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Anos de Experiência</p>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-amber-300" style={{ fontFamily: '"Cinzel", serif' }}>
                  20+
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Projetos Concluídos</p>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-amber-300" style={{ fontFamily: '"Cinzel", serif' }}>
                  100%
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Compromisso & Qualidade</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Footbar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            Pronto para ver a prática? Explore os artefatos técnicos desenvolvidos.
          </p>

          <button
            onClick={() => onNavigate('projetos')}
            className="px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider text-black bg-gradient-to-r from-amber-300 to-amber-500 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
          >
            <span>Ver Projetos</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

