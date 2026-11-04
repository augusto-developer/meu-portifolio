import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useInView } from '../hooks/useInView'
import { PROJECTS } from '../../data'
import SectionHeader from '../ui/SectionHeader'
import type { Project } from '../../types'

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function ProjectCard({ project, index, inView, variant }: {
  project: Project
  index: number
  inView: boolean
  variant: 'featured' | 'normal'
}) {
  const isFeatured = variant === 'featured'

  return (
    <motion.article
      className="rounded-lg group"
      style={{
        padding: isFeatured ? 24 : 20,
        background: isFeatured ? 'rgba(251,248,242,0.85)' : 'rgba(251,248,242,0.7)',
        border: '1px solid #cfbe9b',
        boxShadow: isFeatured ? '0 2px 10px rgba(43,33,24,0.06)' : 'none',
      }}
      initial={{ opacity: 0, y: isFeatured ? 28 : 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: isFeatured ? 0.65 : 0.55, delay: index * 0.12, ease: 'easeOut' }}
      whileHover={{ boxShadow: '0 6px 24px rgba(43,33,24,0.1)' }}
    >
      <div className="flex items-start justify-between mb-3 gap-2">
        {isFeatured && (
          <span
            className="px-2 py-0.5 rounded"
            style={{
              fontFamily: '"Cinzel", serif',
              fontSize: '0.6rem',
              letterSpacing: '0.12em',
              backgroundColor: 'rgba(197,154,63,0.15)',
              color: '#8b6914',
              border: '1px solid rgba(197,154,63,0.3)',
            }}
          >
            ✦ Destaque
          </span>
        )}
        <div className="flex gap-3 ml-auto" style={{ opacity: 0.45 }}>
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label="Repositório">
              <GithubIcon size={isFeatured ? 16 : 14} />
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Demo">
              <ExternalLink size={isFeatured ? 16 : 14} />
            </a>
          )}
        </div>
      </div>

      <h3
        className="mb-2"
        style={{
          fontFamily: '"Cinzel", serif',
          fontSize: isFeatured ? '1rem' : '0.85rem',
          color: '#2b2118',
          letterSpacing: '0.04em',
        }}
      >
        {project.title}
      </h3>

      <p
        className="leading-relaxed mb-4"
        style={{ fontFamily: '"EB Garamond", serif', fontSize: isFeatured ? '1rem' : '0.95rem', color: '#5c4938' }}
      >
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-0.5 rounded-full"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.68rem',
              backgroundColor: 'rgba(92,73,56,0.07)',
              color: '#5c4938',
              border: '1px solid rgba(207,190,155,0.55)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  )
}

export default function ProjectsSection() {
  const { ref, inView } = useInView(0.1)
  const featured = PROJECTS.filter((p) => p.featured)
  const others = PROJECTS.filter((p) => !p.featured)

  return (
    <section id="projetos" ref={ref as React.RefObject<HTMLElement>} className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader label="Artefatos Criados" title="Projetos" inView={inView} />

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} variant="featured" />
          ))}
        </div>

        {others.length > 0 && (
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {others.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} inView={inView} variant="normal" />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
