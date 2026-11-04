import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import SkillsSection from './sections/SkillsSection'
import ProjectsSection from './sections/ProjectsSection'
import ContactSection from './sections/ContactSection'
import InkTrail from './InkTrail'
import MapFooter from './MapFooter'

interface PortfolioProps {
  onHideMap: () => void
}

export default function Portfolio({ onHideMap }: PortfolioProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })
  const bgOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.97])

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen overflow-y-auto overflow-x-hidden"
      style={{
        backgroundColor: '#f4ede0',
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")
        `,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Parchment vignette overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          boxShadow: 'inset 0 0 120px rgba(92,73,56,0.18), inset 0 0 40px rgba(43,33,24,0.12)',
        }}
        aria-hidden="true"
      />

      {/* Scroll-synced ink trail down the page center */}
      <InkTrail scrollYProgress={scrollYProgress} />

      {/* Main content — padded to clear ink trail on wide screens */}
      <motion.main style={{ opacity: bgOpacity }} className="relative z-20">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </motion.main>

      {/* Footer with "hide map" toggle */}
      <MapFooter onHideMap={onHideMap} />
    </motion.div>
  )
}

