import { motion } from 'framer-motion'
import { useRef } from 'react'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import SkillsSection from './sections/SkillsSection'
import ProjectsSection from './sections/ProjectsSection'
import ContactSection from './sections/ContactSection'
import ScrollFootstepGuide from './ScrollFootstepGuide'
import InteractiveFootsteps from './InteractiveFootsteps'
import MapFooter from './MapFooter'
import MarauderMapBackground from './MarauderMapBackground'

interface PortfolioProps {
  onHideMap: () => void
}

export default function Portfolio({ onHideMap }: PortfolioProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen overflow-y-auto overflow-x-hidden cursor-crosshair"
      style={{
        backgroundColor: '#dfc8a0',
        backgroundImage: `
          radial-gradient(#3a2514 0.55px, transparent 0.55px),
          radial-gradient(#8c735d 0.45px, #dfc8a0 0.45px)
        `,
        backgroundSize: '24px 24px',
        backgroundPosition: '0 0, 12px 12px',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Interactive click-to-walk footsteps on parchment */}
      <InteractiveFootsteps />

      {/* Physical map fold lines down the page with ruler markings */}
      <div
        className="fixed inset-y-0 left-1/3 w-px pointer-events-none z-10 opacity-25 border-r border-[#5a3d24]"
        aria-hidden="true"
      />
      <div
        className="fixed inset-y-0 right-1/3 w-px pointer-events-none z-10 opacity-25 border-r border-[#5a3d24]"
        aria-hidden="true"
      />

      {/* Deep parchment vignette edges (antique aged paper) */}
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          boxShadow:
            'inset 0 0 160px rgba(50, 30, 15, 0.35), inset 0 0 50px rgba(40, 25, 12, 0.2)',
        }}
        aria-hidden="true"
      />

      {/* Architectural corridors blueprint background */}
      <MarauderMapBackground />

      {/* GSAP-driven ScrollFootstepGuide syncing footprints with scroll */}
      <ScrollFootstepGuide />

      {/* Main content sections */}
      <main className="relative z-20">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Footer with "Traquinagem terminada" hide-map toggle */}
      <MapFooter onHideMap={onHideMap} />
    </motion.div>
  )
}
