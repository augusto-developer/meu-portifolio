import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import SkillsSection from './sections/SkillsSection'
import ProjectsSection from './sections/ProjectsSection'
import ContactSection from './sections/ContactSection'
import InkTrail from './InkTrail'
import MapFooter from './MapFooter'
import MarauderMapBackground from './MarauderMapBackground'
import { magicAudio } from '../utils/audio'

interface PortfolioProps {
  onHideMap: () => void
}

export default function Portfolio({ onHideMap }: PortfolioProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })
  const bgOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.98])
  const [muted, setMuted] = useState(magicAudio.isMuted())

  const toggleSound = () => {
    const isM = magicAudio.toggleMute()
    setMuted(isM)
  }

  const handleHideMap = () => {
    magicAudio.playMapUnfold()
    onHideMap()
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen overflow-y-auto overflow-x-hidden"
      style={{
        backgroundColor: '#f4ede0',
        backgroundImage: `
          radial-gradient(#3a2514 0.6px, transparent 0.6px),
          radial-gradient(#8c735d 0.5px, #f4ede0 0.5px)
        `,
        backgroundSize: '24px 24px',
        backgroundPosition: '0 0, 12px 12px',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    >
      {/* Sound toggle button fixed in top-right */}
      <div className="fixed top-5 right-6 z-40">
        <button
          onClick={toggleSound}
          className="text-xs px-3.5 py-1.5 rounded-full border border-[#8c735d]/40 bg-[#fbf8f2]/85 text-[#5c4938] hover:border-[#3a2514] hover:text-[#2b2118] transition-all font-serif flex items-center gap-1.5 shadow-sm cursor-pointer"
          aria-label={muted ? 'Ativar som' : 'Desativar som'}
        >
          <span>{muted ? '🔇' : '🔊'}</span>
          <span style={{ fontFamily: '"Cinzel", serif', fontSize: '0.62rem', letterSpacing: '0.05em' }}>
            {muted ? 'Mudo' : 'Som'}
          </span>
        </button>
      </div>

      {/* Parchment physical fold line crease down the screen */}
      <div
        className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-px pointer-events-none z-10 opacity-25"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(58,37,20,0.5) 15%, rgba(58,37,20,0.5) 85%, transparent)',
        }}
        aria-hidden="true"
      />

      {/* Parchment vignette overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          boxShadow:
            'inset 0 0 160px rgba(58, 37, 20, 0.22), inset 0 0 50px rgba(43, 33, 24, 0.15)',
        }}
        aria-hidden="true"
      />

      {/* Authentic Marauder's Map Castle Blueprint & Roaming Footsteps */}
      <MarauderMapBackground />

      {/* Scroll-synced ink trail down the page center */}
      <InkTrail scrollYProgress={scrollYProgress} />

      {/* Main content */}
      <motion.main style={{ opacity: bgOpacity }} className="relative z-20">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </motion.main>

      {/* Footer with "Traquinagem terminada" hide-map toggle */}
      <MapFooter onHideMap={handleHideMap} />
    </motion.div>
  )
}
