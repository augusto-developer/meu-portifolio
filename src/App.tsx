import { useState, useCallback } from 'react'
import VoidOverlay from './components/VoidOverlay'
import AmbientEmbers from './components/AmbientEmbers'
import MagicalSmoke from './components/MagicalSmoke'
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
  const [smokeActive, setSmokeActive] = useState(false)

  // Trigger entrance smoke apparition
  const handleOrbClick = () => {
    setPendingTab('sobre')
    setSmokeActive(true)
  }

  // Handle section navigation with magical smoke apparition transition
  const handleNavigate = useCallback(
    (tab: SectionTab) => {
      if (smokeActive || tab === activeTab) return
      setPendingTab(tab)
      setSmokeActive(true)
    },
    [smokeActive, activeTab]
  )

  // Midpoint of smoke veil: swap the view while screen is obscured
  const handleSmokeMidpoint = useCallback(() => {
    if (appMode === 'orb') {
      setAppMode('portfolio')
    }
    if (pendingTab) {
      setActiveTab(pendingTab)
      setPendingTab(null)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [appMode, pendingTab])

  // End of smoke animation: veil completely cleared
  const handleSmokeEnd = useCallback(() => {
    setSmokeActive(false)
  }, [])

  // Return to orb entrance screen
  const handleReturnToOrb = () => {
    setSmokeActive(true)
    setTimeout(() => {
      setAppMode('orb')
    }, 400)
  }

  return (
    <div className="min-h-screen bg-[#07080d] text-slate-100 relative selection:bg-amber-400/20 selection:text-amber-200">
      {/* 1. Lumos Entrance Orb Screen */}
      <VoidOverlay
        visible={appMode === 'orb'}
        onOrbClick={handleOrbClick}
      />

      {/* 2. Portfolio View with Magical Atmosphere */}
      {appMode === 'portfolio' && (
        <div className="relative min-h-screen flex flex-col justify-between">
          {/* Ambient Lumos golden floating embers */}
          <AmbientEmbers />

          {/* Floating Glassmorphic Navigation Bar */}
          <ProfessionalNavbar
            activeTab={activeTab}
            onSelectTab={handleNavigate}
            disabled={smokeActive}
          />

          {/* Active View Content */}
          <main className="relative z-10 flex-1 flex flex-col">
            {activeTab === 'sobre' && <AboutView onNavigate={handleNavigate} />}
            {activeTab === 'projetos' && <ProjectsView onNavigate={handleNavigate} />}
            {activeTab === 'habilidades' && <SkillsView onNavigate={handleNavigate} />}
            {activeTab === 'contato' && <ContactView onNavigate={handleNavigate} />}
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

      {/* 3. Magical Apparition Smoke Transition Canvas */}
      <MagicalSmoke
        active={smokeActive}
        onSmokeMidpoint={handleSmokeMidpoint}
        onSmokeEnd={handleSmokeEnd}
      />
    </div>
  )
}
