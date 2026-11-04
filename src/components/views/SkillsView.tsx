import { motion } from 'framer-motion'
import { Layers } from 'lucide-react'
import { SKILL_GROUPS } from '../../data'
import { BrassCorner } from '../ui/BookOrnaments'

interface SkillsViewProps {
  onNavigate: (tab: 'sobre' | 'projetos' | 'contato') => void
}

export default function SkillsView({}: SkillsViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-5xl mx-auto w-full pt-28 pb-16 px-4 font-sans"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-[#d4a738]/35 bg-[#3d0d16]/60 text-[#ffd778] text-xs font-semibold mb-2 shadow-sm">
          <Layers size={12} className="text-[#e5ba48]" />
          <span>Competências Técnicas</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#f6efe2] tracking-tight">
          Habilidades & Tecnologias
        </h2>
      </div>

      {/* Grid of Skill Shelves */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SKILL_GROUPS.map((group) => (
          <div
            key={group.category}
            className="group relative rounded-lg border border-[#d4a738]/25 overflow-hidden flex flex-col justify-between transition-all duration-200 hover:border-[#ffd778]/50"
            style={{
              background:
                'linear-gradient(180deg, #201118 0%, #150a10 50%, #0d060a 100%)',
              boxShadow:
                '0 10px 25px rgba(0, 0, 0, 0.7), inset 0 0 20px rgba(80, 15, 25, 0.15)',
            }}
          >
            <BrassCorner position="tl" size={20} />
            <BrassCorner position="tr" size={20} />

            <div className="p-4 sm:p-5">
              {/* Category Header */}
              <div
                className="rounded p-2 mb-4 border border-[#d4a738]/40 text-center relative"
                style={{
                  background:
                    'linear-gradient(180deg, #321820 0%, #1a0b10 100%)',
                }}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm">{group.icon}</span>
                  <h3 className="font-bold text-xs text-[#ffe8a3] uppercase tracking-wider">
                    {group.category}
                  </h3>
                </div>
              </div>

              {/* Skills List */}
              <ul className="space-y-2">
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
                      <span className="text-[#f6efe2] font-medium">
                        {skill.name}
                      </span>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded border border-[#ffd778]/30 font-semibold text-[#ffd778]"
                        style={{
                          background:
                            'linear-gradient(180deg, #5c1421 0%, #300810 100%)',
                        }}
                      >
                        {levelLabel}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
