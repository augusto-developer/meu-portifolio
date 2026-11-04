import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import VoidOverlay from './components/VoidOverlay'
import AmbientEmbers from './components/AmbientEmbers'
import LumosTransition from './components/LumosTransition'
import ProfessionalNavbar, { type SectionTab } from './components/ProfessionalNavbar'
import AboutView from './components/views/AboutView'
import ProjectsView from './components/views/ProjectsView'
import SkillsView from './components/views/SkillsView'
import ContactView from './components/views/ContactView'
import { OWNER } from './data'

export default function App() {
  const [appMode, setAppMode] = useState<'orb' | 'portfolio'>('orb')
  const [activeTab, setActiveTab] = useState<SectionTab>('sobre')
  const [pendingTab, setPendingTab] = useState<SectionTab | null>(null)
  const [lumosActive, setLumosActive] = useState(false)

  // Trigger entrance Lumos burst
  const handleOrbClick = () => {
    setPendingTab('sobre')
    setLumosActive(true)
  }

  // Handle section navigation with golden Lumos shockwave & starlight sparks
  const handleNavigate = useCallback(
    (tab: SectionTab) => {
      if (lumosActive || tab === activeTab) return
      setPendingTab(tab)
      setLumosActive(true)
    },
    [lumosActive, activeTab]
  )

  // Peak of the golden Lumos wave (~180ms): swap content smoothly
  const handleLumosMidpoint = useCallback(() => {
    if (appMode === 'orb') {
      setAppMode('portfolio')
    }
    if (pendingTab) {
      setActiveTab(pendingTab)
      setPendingTab(null)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [appMode, pendingTab])

  // End of Lumos transition (~420ms): clear active flag
  const handleLumosEnd = useCallback(() => {
    setLumosActive(false)
  }, [])

  // Return to orb entrance screen
  const handleReturnToOrb = () => {
    setLumosActive(true)
    setTimeout(() => {
      setAppMode('orb')
    }, 220)
  }

  return (
    <div className="min-h-screen bg-[#07080d] text-slate-100 relative selection:bg-amber-400/20 selection:text-amber-200">
      {/* 1. Lumos Entrance Orb Screen */}
      <VoidOverlay
        visible={appMode === 'orb'}
        onOrbClick={handleOrbClick}
      />

      {/* 2. Portfolio View with Magical Lumos Atmosphere */}
      {appMode === 'portfolio' && (
        <div className="relative min-h-screen flex flex-col justify-between">
          {/* Ambient Lumos golden floating embers */}
          <AmbientEmbers />

          {/* Floating Glassmorphic Navigation Bar */}
          <ProfessionalNavbar
            activeTab={activeTab}
            onSelectTab={handleNavigate}
            disabled={lumosActive}
          />

          {/* Active View Content with Framer Motion transitions */}
          <main className="relative z-10 flex-1 flex flex-col">
            <AnimatePresence mode="wait">
              {activeTab === 'sobre' && <AboutView key="sobre" onNavigate={handleNavigate} />}
              {activeTab === 'projetos' && <ProjectsView key="projetos" onNavigate={handleNavigate} />}
              {activeTab === 'habilidades' && <SkillsView key="habilidades" onNavigate={handleNavigate} />}
              {activeTab === 'contato' && <ContactView key="contato" onNavigate={handleNavigate} />}
            </AnimatePresence>
          </main>

          {/* Professional Minimalist Footer */}
          <footer className="relative z-10 py-8 border-t border-white/5 text-center text-xs text-slate-500 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p>
                © {new Date().getFullYear()} {OWNER.name} · Desenvolvedor Full Stack
              </p>

              <div className="flex items-center gap-6">
                <span className="text-amber-400/60 font-serif">✦ Lumos Portfolio</span>
                <button
                  onClick={handleReturnToOrb}
                  className="text-slate-400 hover:text-amber-300 transition-colors cursor-pointer text-[11px]"
                >
                  Entrada do Orbe
                </button>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* 3. Lumos Wave & Starlight Sparks Transition */}
      <LumosTransition
        active={lumosActive}
        onMidpoint={handleLumosMidpoint}
        onEnd={handleLumosEnd}
      />
    </div>
  )
}
