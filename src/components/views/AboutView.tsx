import { motion } from 'framer-motion'
import { MapPin, ArrowRight, BookOpen } from 'lucide-react'
import { OWNER } from '../../data'
import { BrassCorner, WaxSeal } from '../ui/BookOrnaments'

interface AboutViewProps {
  onNavigate: (tab: 'projetos' | 'habilidades' | 'contato') => void
}

export default function AboutView({ onNavigate }: AboutViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto w-full pt-28 pb-16 px-4 font-sans"
    >
      {/* Folio Card */}
      <div
        className="relative rounded-lg border border-[#d4a738]/35 p-6 sm:p-10 overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #1e1016 0%, #160c11 50%, #10070c 100%)',
          boxShadow:
            '0 20px 50px rgba(0, 0, 0, 0.85), inset 0 0 40px rgba(80, 15, 25, 0.2)',
        }}
      >
        {/* Brass Corners */}
        <BrassCorner position="tl" size={30} />
        <BrassCorner position="tr" size={30} />
        <BrassCorner position="bl" size={30} />
        <BrassCorner position="br" size={30} />

        <div className="relative z-10 grid md:grid-cols-[1fr_2fr] gap-8 items-center">
          {/* Avatar Profile */}
          <div className="flex flex-col items-center text-center p-6 rounded border border-[#d4a738]/25 relative bg-[#140a0e]/80">
            <div className="absolute -top-4 -right-3 z-20">
              <WaxSeal size={42} initial="✦" />
            </div>

            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-3.5 relative"
              style={{
                background:
                  'radial-gradient(circle at 35% 35%, #5e111d 0%, #2b060c 60%, #100205 100%)',
                border: '2px solid #d4a738',
                boxShadow: '0 0 20px rgba(128, 27, 43, 0.5)',
              }}
            >
              {OWNER.avatarPlaceholder}
            </div>

            <h2 className="text-lg font-bold text-[#f6efe2] tracking-tight">
              {OWNER.name}
            </h2>

            <p className="text-xs text-[#e5ba48] font-semibold mt-0.5">
              {OWNER.title}
            </p>

            <p className="flex items-center gap-1.5 text-xs text-[#c7b8a5] mt-2.5 bg-[#0d0609]/70 px-2.5 py-1 rounded border border-[#d4a738]/15">
              <MapPin size={11} className="text-[#d4a738]" />
              <span>{OWNER.location}</span>
            </p>
          </div>

          {/* Right Text & Metrics */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-[#e5ba48] text-xs font-semibold mb-1">
                <BookOpen size={12} className="text-[#d4a738]" />
                <span>Perfil Profissional</span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-[#f6efe2] tracking-tight">
                Engenharia de Software & Arquitetura de Sistemas
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-[#c7b8a5] leading-relaxed">
              {OWNER.bio}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              <div className="p-3 rounded border border-[#d4a738]/25 bg-[#140a0e] text-center">
                <span className="block text-xl font-bold text-[#ffd778]">3+</span>
                <span className="text-[11px] text-[#c7b8a5]">Anos de Experiência</span>
              </div>
              <div className="p-3 rounded border border-[#d4a738]/25 bg-[#140a0e] text-center">
                <span className="block text-xl font-bold text-[#ffd778]">20+</span>
                <span className="text-[11px] text-[#c7b8a5]">Projetos Entregues</span>
              </div>
              <div className="p-3 rounded border border-[#d4a738]/25 bg-[#140a0e] text-center">
                <span className="block text-xl font-bold text-[#ffd778]">100%</span>
                <span className="text-[11px] text-[#c7b8a5]">Código Autoral</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('projetos')}
                className="px-4 py-2 rounded border border-[#d4a738] text-[#ffe8a3] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer hover:border-[#ffd778] hover:shadow-lg hover:shadow-[#801b2b]/40"
                style={{
                  background: 'linear-gradient(180deg, #8a192b 0%, #5e0e1b 100%)',
                }}
              >
                <span>Ver Projetos</span>
                <ArrowRight size={13} className="text-[#ffd778]" />
              </button>

              <button
                onClick={() => onNavigate('contato')}
                className="px-4 py-2 rounded border border-[#d4a738]/30 text-[#c7b8a5] hover:text-[#f6efe2] hover:bg-[#801b2b]/20 text-xs font-medium transition-all cursor-pointer"
              >
                Contato Direto
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
