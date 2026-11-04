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
      transition={{ duration: 0.35 }}
      className="max-w-4xl mx-auto w-full pt-24 pb-16 px-4"
    >
      {/* Archival Folio Plate */}
      <div
        className="rounded-lg p-8 md:p-12 border border-[#d4a738]/30 relative overflow-hidden"
        style={{
          backgroundColor: 'rgba(23, 15, 19, 0.94)',
          boxShadow:
            '0 25px 60px rgba(0, 0, 0, 0.8), inset 0 0 40px rgba(128, 27, 43, 0.15), 0 0 25px rgba(212, 167, 56, 0.08)',
        }}
      >
        {/* Antique corner brass filigree accents */}
        <span className="absolute top-2 left-2 text-sm text-[#d4a738]/70 font-serif select-none pointer-events-none">⌜</span>
        <span className="absolute top-2 right-2 text-sm text-[#d4a738]/70 font-serif select-none pointer-events-none">⌝</span>
        <span className="absolute bottom-2 left-2 text-sm text-[#d4a738]/70 font-serif select-none pointer-events-none">⌞</span>
        <span className="absolute bottom-2 right-2 text-sm text-[#d4a738]/70 font-serif select-none pointer-events-none">⌟</span>

        {/* Subtle Gryffindor Scarlet Glow in Header Corner */}
        <div
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(128, 27, 43, 0.28) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 grid md:grid-cols-[1fr_2fr] gap-8 items-center">
          {/* Scholar Medallion / Profile */}
          <div
            className="flex flex-col items-center text-center p-6 rounded-md border border-[#d4a738]/25 relative"
            style={{
              backgroundColor: 'rgba(32, 19, 24, 0.8)',
              boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.6)',
            }}
          >
            {/* Medallion avatar */}
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center text-5xl mb-4 border-2 border-[#d4a738]/50 relative"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #4a0e18 0%, #170f13 100%)',
                boxShadow: '0 0 25px rgba(128, 27, 43, 0.5), inset 0 0 15px rgba(0,0,0,0.8)',
              }}
            >
              {OWNER.avatarPlaceholder}
              <div className="absolute inset-0 rounded-full border border-[#e5ba48]/30 pointer-events-none" />
            </div>

            <h2
              className="text-xl font-bold text-[#f6efe2] tracking-wider"
              style={{ fontFamily: '"Cinzel", serif' }}
            >
              {OWNER.name}
            </h2>

            <p
              className="text-xs text-[#e5ba48] font-semibold tracking-wide mt-1"
              style={{ fontFamily: '"Cinzel", serif' }}
            >
              {OWNER.title}
            </p>

            <p className="flex items-center gap-1.5 text-xs text-[#c7b8a5] mt-3">
              <MapPin size={12} className="text-[#d4a738]" />
              <span>{OWNER.location}</span>
            </p>
          </div>

          {/* Archival Folio Bio & Records */}
          <div className="space-y-5">
            <div className="border-b border-[#d4a738]/20 pb-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-[#d4a738]/30 bg-[#4a0e18]/40 text-[#e5ba48] text-[10px] font-semibold tracking-widest uppercase mb-2">
                <span>✦</span>
                <span style={{ fontFamily: '"Cinzel", serif' }}>Ateliê do Desenvolvedor</span>
              </div>

              <h1
                className="text-2xl md:text-3xl font-bold text-[#f6efe2] tracking-wide"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                Engenharia de Software com Precisão e Arte
              </h1>
            </div>

            <p className="text-sm text-[#c7b8a5] leading-relaxed">
              {OWNER.bio}
            </p>

            {/* Archival Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded border border-[#d4a738]/20 bg-[#170f13]/60 text-center">
                <span
                  className="block text-xl font-bold text-[#e5ba48]"
                  style={{ fontFamily: '"Cinzel", serif' }}
                >
                  3+
                </span>
                <span className="text-[11px] text-[#c7b8a5] font-medium">Anos de Código</span>
              </div>

              <div className="p-3 rounded border border-[#d4a738]/20 bg-[#170f13]/60 text-center">
                <span
                  className="block text-xl font-bold text-[#e5ba48]"
                  style={{ fontFamily: '"Cinzel", serif' }}
                >
                  20+
                </span>
                <span className="text-[11px] text-[#c7b8a5] font-medium">Projetos Forjados</span>
              </div>

              <div className="p-3 rounded border border-[#d4a738]/20 bg-[#170f13]/60 text-center">
                <span
                  className="block text-xl font-bold text-[#e5ba48]"
                  style={{ fontFamily: '"Cinzel", serif' }}
                >
                  100%
                </span>
                <span className="text-[11px] text-[#c7b8a5] font-medium">Código Autoral</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-3">
              <button
                onClick={() => onNavigate('projetos')}
                className="px-5 py-2.5 rounded-md border border-[#d4a738]/60 text-[#f6efe2] text-xs font-semibold tracking-wider flex items-center gap-2 transition-all cursor-pointer hover:border-[#e5ba48] hover:shadow-lg hover:shadow-[#801b2b]/30"
                style={{
                  backgroundColor: '#6e1624',
                  fontFamily: '"Cinzel", serif',
                }}
              >
                <span>Explorar Projetos</span>
                <ArrowRight size={13} className="text-[#e5ba48]" />
              </button>

              <button
                onClick={() => onNavigate('contato')}
                className="px-5 py-2.5 rounded-md border border-[#d4a738]/30 text-[#c7b8a5] hover:text-[#f6efe2] hover:bg-[#801b2b]/20 text-xs font-semibold tracking-wider transition-all cursor-pointer"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                Entrar em Contato
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
