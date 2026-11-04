import { motion, useScroll, useTransform } from 'framer-motion'
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
  const { scrollYProgress } = useScroll({ container: containerRef })
  const bgOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.98])

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen overflow-y-auto overflow-x-hidden cursor-crosshair"
      style={{
        backgroundColor: '#f1e2c6',
        backgroundImage: `
          radial-gradient(#3a2514 0.5px, transparent 0.5px),
          radial-gradient(#8c735d 0.4px, #f1e2c6 0.4px)
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

      {/* Physical map fold lines down the page */}
      <div
        className="fixed inset-y-0 left-1/3 w-px pointer-events-none z-10 opacity-20 border-r border-[#5a3d24]"
        aria-hidden="true"
      />
      <div
        className="fixed inset-y-0 right-1/3 w-px pointer-events-none z-10 opacity-20 border-r border-[#5a3d24]"
        aria-hidden="true"
      />

      {/* Parchment vignette edges */}
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          boxShadow:
            'inset 0 0 140px rgba(50, 30, 15, 0.22), inset 0 0 45px rgba(40, 25, 12, 0.15)',
        }}
        aria-hidden="true"
      />

      {/* Architectural corridors background */}
      <MarauderMapBackground />

      {/* Animated footsteps corridor guide syncing with scroll */}
      <ScrollFootstepGuide scrollYProgress={scrollYProgress} />

      {/* Main content */}
      <motion.main style={{ opacity: bgOpacity }} className="relative z-20">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </motion.main>

      {/* Footer with "Traquinagem terminada" hide-map toggle */}
      <MapFooter onHideMap={onHideMap} />
    </motion.div>
  )
}
