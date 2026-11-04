import { motion } from 'framer-motion'
import { ArrowRight, Layers } from 'lucide-react'
import { SKILL_GROUPS } from '../../data'
import { BrassCorner } from '../ui/BookOrnaments'

interface SkillsViewProps {
  onNavigate: (tab: 'sobre' | 'projetos' | 'contato') => void
}

export default function SkillsView({ onNavigate }: SkillsViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="max-w-5xl mx-auto w-full pt-28 pb-16 px-4"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#d4a738]/40 bg-[#3d0d16]/60 text-[#ffd778] text-xs font-bold tracking-widest uppercase mb-2 shadow-md">
          <Layers size={12} className="text-[#e5ba48]" />
          <span style={{ fontFamily: '"Cinzel", serif' }}>Estantes do Conhecimento Arcana</span>
        </div>
        <h2
          className="text-3xl md:text-4xl font-bold text-[#f6efe2] tracking-wide"
          style={{
            fontFamily: '"Cinzel", serif',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          }}
        >
          Compêndio de Especialidades
        </h2>
        <p className="text-sm text-[#c7b8a5] max-w-lg mx-auto mt-2">
          Volumes e disciplinas dominadas na arquitetura e desenvolvimento de software resiliente.
        </p>
      </div>

      {/* Library Shelves Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SKILL_GROUPS.map((group) => (
          <div
            key={group.category}
            className="group relative rounded-lg border-2 border-[#d4a738]/30 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#ffd778]/60 hover:-translate-y-1"
            style={{
              background:
                'linear-gradient(180deg, #221219 0%, #170d13 50%, #0e060a 100%)',
              boxShadow:
                '0 12px 30px rgba(0, 0, 0, 0.75), inset 0 0 25px rgba(80, 15, 25, 0.2)',
            }}
          >
            {/* Brass corner brackets */}
            <BrassCorner position="tl" size={24} />
            <BrassCorner position="tr" size={24} />

            <div className="p-5">
              {/* Brass Card-Catalogue Label Holder Plaque */}
              <div
                className="rounded p-2.5 mb-5 border border-[#d4a738]/60 text-center relative"
                style={{
                  background:
                    'linear-gradient(180deg, #381b24 0%, #1e0d13 100%)',
                  boxShadow:
                    '0 3px 8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,220,130,0.3)',
                }}
              >
                {/* 2 Brass Screws */}
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#ffd778] border border-[#7d5612]" />
                <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#ffd778] border border-[#7d5612]" />

                <div className="flex items-center justify-center gap-2">
                  <span className="text-base">{group.icon}</span>
                  <h3
                    className="font-bold text-xs text-[#ffe8a3] tracking-widest uppercase"
                    style={{ fontFamily: '"Cinzel", serif' }}
                  >
                    {group.category}
                  </h3>
                </div>
              </div>

              {/* Skills Spines / List */}
              <ul className="space-y-2.5">
                {group.skills.map((skill) => {
                  const levelLabel =
                    skill.level === 'Arcano'
                      ? 'Sênior'
                      : skill.level === 'Proficiente'
                      ? 'Avançado'
                      : 'Prático'

                  return (
                    <li
                      key={skill.name}
                      className="flex items-center justify-between text-xs py-1.5 px-2 rounded border border-[#d4a738]/15 bg-[#12070c]/80"
                    >
                      <span className="text-[#f6efe2] font-medium font-sans">
                        {skill.name}
                      </span>
                      <span
                        className="text-[9px] px-2 py-0.5 rounded border border-[#ffd778]/30 font-bold uppercase tracking-wider text-[#ffd778]"
                        style={{
                          background:
                            'linear-gradient(180deg, #5c1421 0%, #300810 100%)',
                          fontFamily: '"Cinzel", serif',
                        }}
                      >
                        {levelLabel}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Shelf Wooden Lintel Bottom Base */}
            <div
              className="py-2.5 px-4 border-t border-[#d4a738]/30 flex items-center justify-between text-[10px] text-[#c7b8a5]"
              style={{
                background:
                  'linear-gradient(180deg, #2b141e 0%, #14080e 100%)',
              }}
            >
              <span className="text-[#d4a738] font-serif">✦ Tomo I</span>
              <span style={{ fontFamily: '"Cinzel", serif' }}>Ateliê</span>
            </div>
          </div>
        ))}
      </div>

      {/* Advance Navigation CTA */}
      <div className="text-center mt-12">
        <button
          onClick={() => onNavigate('contato')}
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#e5ba48] hover:text-[#ffd778] transition-colors cursor-pointer"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          <span>Ir para a Mesa de Correspondência</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </motion.div>
  )
}
