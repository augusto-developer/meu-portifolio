import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { SKILL_GROUPS } from '../../data'
import SectionHeader from '../ui/SectionHeader'
import type { Skill } from '../../types'

const levelColor: Record<Skill['level'], string> = {
  Arcano: '#c59a3f',
  Proficiente: '#5c7a5c',
  Aprendiz: '#7a5c8c',
}

const levelDots: Record<Skill['level'], number> = {
  Arcano: 5,
  Proficiente: 3,
  Aprendiz: 1,
}

export default function SkillsSection() {
  const { ref, inView } = useInView(0.15)

  return (
    <section id="habilidades" ref={ref as React.RefObject<HTMLElement>} className="relative py-28 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.015,
          backgroundImage: 'repeating-linear-gradient(45deg, #2b2118 0, #2b2118 1px, transparent 0, transparent 50%)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader label="Grimório Técnico" title="Habilidades" inView={inView} />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.category}
              className="rounded-lg p-5"
              style={{ background: 'rgba(251,248,242,0.8)', border: '1px solid #cfbe9b' }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: gi * 0.1, ease: 'easeOut' }}
            >
              <div
                className="flex items-center gap-2 mb-4 pb-3"
                style={{ borderBottom: '1px solid rgba(207,190,155,0.5)' }}
              >
                <span className="text-xl">{group.icon}</span>
                <h3
                  style={{ fontFamily: '"Cinzel", serif', fontSize: '0.72rem', letterSpacing: '0.12em', color: '#5c4938' }}
                >
                  {group.category}
                </h3>
              </div>

              <ul className="space-y-3">
                {group.skills.map((skill) => (
                  <li key={skill.name} className="flex items-center justify-between gap-2">
                    <span style={{ fontFamily: '"EB Garamond", serif', fontSize: '0.98rem', color: '#3d2e22' }}>
                      {skill.name}
                    </span>
                    <div className="flex gap-0.5 shrink-0">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <div
                          key={dot}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor:
                              dot <= levelDots[skill.level]
                                ? levelColor[skill.level]
                                : 'rgba(207,190,155,0.4)',
                          }}
                        />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-6"
          style={{ opacity: 0.6 }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.6 } : {}}
          transition={{ delay: 0.5 }}
        >
          {(Object.entries(levelColor) as [Skill['level'], string][]).map(([level, color]) => (
            <div key={level} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span style={{ fontFamily: '"Cinzel", serif', fontSize: '0.65rem', letterSpacing: '0.1em', color: '#8c735d' }}>
                {level}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
