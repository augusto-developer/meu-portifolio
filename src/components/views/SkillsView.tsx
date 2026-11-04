import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SKILL_GROUPS } from '../../data'

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
      className="max-w-5xl mx-auto w-full pt-24 pb-16 px-4"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#d4a738]/30 bg-[#4a0e18]/40 text-[#e5ba48] text-xs font-semibold tracking-widest uppercase mb-3">
          <span>✦</span>
          <span style={{ fontFamily: '"Cinzel", serif' }}>Compêndio de Especialidades</span>
        </div>
        <h2
          className="text-3xl md:text-4xl font-bold text-[#f6efe2] tracking-wide"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          Habilidades & Conhecimento
        </h2>
        <p className="text-sm text-[#c7b8a5] max-w-lg mx-auto mt-2">
          Tecnologias e metodologias dominadas na construção de sistemas modernos e escaláveis.
        </p>
      </div>

      {/* Library Shelves / Bookplate Panels */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SKILL_GROUPS.map((group) => (
          <div
            key={group.category}
            className="rounded-lg p-5 border border-[#d4a738]/25 relative overflow-hidden transition-all hover:border-[#d4a738]/50 hover:shadow-xl hover:shadow-[#801b2b]/20 flex flex-col justify-between"
            style={{
              backgroundColor: 'rgba(23, 15, 19, 0.94)',
              boxShadow:
                '0 12px 30px rgba(0, 0, 0, 0.65), inset 0 0 20px rgba(128, 27, 43, 0.08)',
            }}
          >
            {/* Top corner accents */}
            <span className="absolute top-1.5 left-1.5 text-[9px] text-[#d4a738]/40 font-serif select-none pointer-events-none">⌜</span>
            <span className="absolute top-1.5 right-1.5 text-[9px] text-[#d4a738]/40 font-serif select-none pointer-events-none">⌝</span>

            <div>
              {/* Category Header */}
              <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-[#d4a738]/20">
                <span className="text-lg">{group.icon}</span>
                <h3
                  className="font-bold text-sm text-[#f6efe2] tracking-wide"
                  style={{ fontFamily: '"Cinzel", serif' }}
                >
                  {group.category}
                </h3>
              </div>

              {/* Skills list */}
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
                      className="flex items-center justify-between text-xs py-1 border-b border-white/[0.03]"
                    >
                      <span className="text-[#f6efe2] font-medium">{skill.name}</span>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded border border-[#d4a738]/30 bg-[#3a1822]/80 text-[#ffd778] font-semibold"
                        style={{ fontFamily: '"Cinzel", serif' }}
                      >
                        {levelLabel}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Subtle bottom filigree accent */}
            <div className="mt-6 pt-3 border-t border-[#d4a738]/15 text-center">
              <span className="text-[10px] text-[#d4a738]/50 font-serif">✦ ✦ ✦</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Navigation CTA */}
      <div className="text-center mt-12">
        <button
          onClick={() => onNavigate('contato')}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#e5ba48] hover:text-[#ffd778] transition-colors cursor-pointer"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          <span>Avançar para Correspondência & Contato</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </motion.div>
  )
}
