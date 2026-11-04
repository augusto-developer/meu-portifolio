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
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto w-full pt-24 pb-16 px-4"
    >
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/20 bg-amber-400/5 text-amber-300 text-xs font-medium mb-3">
          <span>✦</span>
          <span>Stack & Ferramentas</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-wide" style={{ fontFamily: '"Cinzel", serif' }}>
          Habilidades Técnicas
        </h2>
        <p className="text-sm text-slate-400 max-w-lg mx-auto mt-2">
          Tecnologias dominadas para a criação de sistemas web modernos, escaláveis e resilientes.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SKILL_GROUPS.map((group) => (
          <div
            key={group.category}
            className="rounded-xl p-5 border border-white/10 bg-[#0f121b]/80 backdrop-blur-md hover:border-amber-400/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-white/10">
                <span className="text-lg">{group.icon}</span>
                <h3 className="font-semibold text-sm text-white tracking-wide" style={{ fontFamily: '"Cinzel", serif' }}>
                  {group.category}
                </h3>
              </div>

              <ul className="space-y-2.5">
                {group.skills.map((skill) => (
                  <li key={skill.name} className="flex items-center justify-between text-xs">
                    <span className="text-slate-200 font-medium">{skill.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full border border-amber-400/20 bg-amber-400/10 text-amber-300 font-semibold">
                      {skill.level === 'Arcano' ? 'Sênior' : skill.level === 'Proficiente' ? 'Avançado' : 'Prático'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Footbar */}
      <div className="mt-12 flex justify-between items-center flex-wrap gap-4 pt-6 border-t border-white/10">
        <button
          onClick={() => onNavigate('projetos')}
          className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          ← Voltar para Projetos
        </button>

        <button
          onClick={() => onNavigate('contato')}
          className="px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider text-black bg-gradient-to-r from-amber-300 to-amber-500 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
        >
          <span>Entrar em Contato</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  )
}

