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
      className="max-w-5xl mx-auto w-full my-auto px-4 pt-20 pb-12 sm:pt-24 sm:pb-16 font-sans"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-[#d4a738]/35 bg-[#3d0d16]/60 text-[#ffd778] text-xs font-semibold mb-2.5 shadow-sm">
          <Layers size={12} className="text-[#e5ba48]" />
          <span>Competências Técnicas</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#f6efe2] tracking-tight">
          Habilidades & Tecnologias
        </h2>
      </div>

      {/* Grid of Skill Shelves */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
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

            <div className="p-5">
              {/* Category Header */}
              <div
                className="rounded p-2.5 mb-4 border border-[#d4a738]/40 text-center relative"
                style={{
                  background:
                    'linear-gradient(180deg, #321820 0%, #1a0b10 100%)',
                }}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-base">{group.icon}</span>
                  <h3 className="font-bold text-xs text-[#ffe8a3] uppercase tracking-wider">
                    {group.category}
                  </h3>
                </div>
              </div>

              {/* Skills List */}
              <ul className="space-y-2.5">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="group/item flex items-center gap-2.5 text-xs py-2 px-3 rounded border border-[#d4a738]/15 bg-[#12070c]/75 hover:border-[#ffd778]/40 hover:bg-[#1f0d16]/80 transition-all duration-150"
                  >
                    <span className="text-[#e5ba48] text-[9px] group-hover/item:text-[#ffd778] transition-colors">
                      ✦
                    </span>
                    <span className="text-[#f6efe2] font-medium tracking-wide">
                      {skill.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
