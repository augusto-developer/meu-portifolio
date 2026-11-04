import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import VoidOverlay from './components/VoidOverlay'
import LibraryBackground from './components/LibraryBackground'
import LumosTransition from './components/LumosTransition'
import WandCursor from './components/WandCursor'
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
    <div className="min-h-screen bg-[#0d090b] text-[#f6efe2] library-vignette relative selection:bg-[#801b2b]/50 selection:text-[#ffd778]">
      {/* 1. Lumos Entrance Orb Screen */}
      <VoidOverlay
        visible={appMode === 'orb'}
        onOrbClick={handleOrbClick}
      />

      {/* 2. Portfolio View with Magical Lumos Atmosphere */}
      {appMode === 'portfolio' && (
        <div className="relative min-h-screen flex flex-col justify-between">
          {/* Clean Wooden Library & Magical Book Background */}
          <LibraryBackground />

          {/* Antique Leather & Brass Navigation Bar */}
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

          {/* Clean Footer */}
          <footer className="relative z-10 py-6 border-t border-[#d4a738]/15 text-xs text-[#c7b8a5] font-sans">
            <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
              <p>
                © {new Date().getFullYear()} {OWNER.name}
              </p>

              <button
                onClick={handleReturnToOrb}
                className="text-[#c7b8a5] hover:text-[#ffd778] transition-colors cursor-pointer text-xs"
              >
                ✦ Entrada do Orbe
              </button>
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

      {/* 4. Magical Wand Cursor Trail */}
      <WandCursor />
    </div>
  )
}
