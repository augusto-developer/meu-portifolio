import { motion } from 'framer-motion'
import { Mail, MapPin, ExternalLink } from 'lucide-react'
import { OWNER } from '../../data'

// SVG social icons (lucide-react v1.x removed github/linkedin)
function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.65, ease: 'easeOut' as const },
  }),
}

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center"
    >
      {/* Corner ornaments */}
      <CornerOrnament className="absolute top-6 left-6 opacity-30" />
      <CornerOrnament className="absolute top-6 right-6 opacity-30 scale-x-[-1]" />

      {/* Avatar orb */}
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" className="mb-8">
        <div
          className="w-28 h-28 rounded-full flex items-center justify-center text-5xl mx-auto"
          style={{
            background: 'radial-gradient(circle at 38% 38%, #fbf8f2, #e8dcbe)',
            border: '1px solid #cfbe9b',
            boxShadow: '0 4px 24px rgba(197,154,63,0.18)',
          }}
        >
          {OWNER.avatarPlaceholder}
        </div>
      </motion.div>

      {/* Location */}
      <motion.div
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="flex items-center justify-center gap-1.5 mb-5"
        style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.82rem', color: '#8c735d', letterSpacing: '0.08em', opacity: 0.7 }}
      >
        <MapPin size={13} />
        <span>{OWNER.location}</span>
      </motion.div>

      {/* Name */}
      <motion.h1
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        style={{
          fontFamily: '"Cinzel Decorative", serif',
          fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
          color: '#2b2118',
          lineHeight: 1.25,
          letterSpacing: '0.03em',
        }}
      >
        {OWNER.name}
      </motion.h1>

      {/* Gold rule */}
      <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="flex items-center gap-3 my-5 w-full max-w-xs mx-auto"
      >
        <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(197,154,63,0.6))' }} />
        <span style={{ color: '#c59a3f', fontSize: '1rem' }}>✦</span>
        <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(197,154,63,0.6))' }} />
      </motion.div>

      {/* Title */}
      <motion.p
        custom={4}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
          color: '#5c4938',
          letterSpacing: '0.08em',
          fontStyle: 'italic',
        }}
      >
        {OWNER.title}
      </motion.p>

      {/* Tagline */}
      <motion.p
        custom={5}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mt-6 max-w-xl mx-auto leading-relaxed"
        style={{ fontFamily: '"EB Garamond", serif', fontSize: '1.1rem', color: '#5c4938' }}
      >
        {OWNER.tagline}
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        custom={6}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="flex flex-wrap items-center justify-center gap-3 mt-10"
      >
        <a
          href="#projetos"
          className="px-7 py-3 rounded-full transition-all hover:brightness-110 active:scale-95 focus:outline-none"
          style={{
            backgroundColor: '#8b2626',
            color: '#fbf8f2',
            fontFamily: '"Cinzel", serif',
            fontSize: '0.72rem',
            letterSpacing: '0.15em',
          }}
        >
          Ver Artefatos
        </a>
        <a
          href={`mailto:${OWNER.email}`}
          className="px-7 py-3 rounded-full border transition-all hover:bg-black/5 active:scale-95 focus:outline-none"
          style={{
            borderColor: '#cfbe9b',
            color: '#5c4938',
            fontFamily: '"Cinzel", serif',
            fontSize: '0.72rem',
            letterSpacing: '0.15em',
          }}
        >
          Enviar Coruja
        </a>
      </motion.div>

      {/* Social icons */}
      <motion.div
        custom={7}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="flex items-center gap-5 mt-8"
        style={{ opacity: 0.6 }}
      >
        <a
          href={OWNER.github}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-100"
          style={{ color: '#8c735d' }}
          aria-label="GitHub"
        >
          <GithubIcon size={20} />
        </a>
        <a
          href={OWNER.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-100"
          style={{ color: '#8c735d' }}
          aria-label="LinkedIn"
        >
          <LinkedinIcon size={20} />
        </a>
        <a
          href={`mailto:${OWNER.email}`}
          className="transition-opacity hover:opacity-100"
          style={{ color: '#8c735d' }}
          aria-label="Email"
        >
          <Mail size={20} />
        </a>
        <a
          href={OWNER.github}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-100"
          style={{ color: '#8c735d' }}
          aria-label="Ver portfólio no GitHub"
        >
          <ExternalLink size={16} />
        </a>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0.3 }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span style={{ fontFamily: '"Cinzel", serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: '#8c735d' }}>
          EXPLORAR
        </span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, #8c735d, transparent)' }} />
      </motion.div>
    </section>
  )
}

function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" className={className} aria-hidden="true">
      <path d="M4 4 L4 56" stroke="#8c735d" strokeWidth="1" fill="none" />
      <path d="M4 4 L56 4" stroke="#8c735d" strokeWidth="1" fill="none" />
      <path d="M4 4 L14 14" stroke="#c59a3f" strokeWidth="1" fill="none" />
      <circle cx="4" cy="4" r="3" fill="none" stroke="#c59a3f" strokeWidth="1" />
      <circle cx="14" cy="14" r="2" fill="#c59a3f" opacity="0.7" />
    </svg>
  )
}
