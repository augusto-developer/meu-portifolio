import { motion } from 'framer-motion'

export type SectionTab = 'sobre' | 'projetos' | 'habilidades' | 'contato'

interface ProfessionalNavbarProps {
  activeTab: SectionTab
  onSelectTab: (tab: SectionTab) => void
  disabled?: boolean
}

interface NavItem {
  key: SectionTab
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { key: 'sobre', label: 'Sobre Mim' },
  { key: 'projetos', label: 'Projetos' },
  { key: 'habilidades', label: 'Habilidades' },
  { key: 'contato', label: 'Contato' },
]

export default function ProfessionalNavbar({
  activeTab,
  onSelectTab,
  disabled,
}: ProfessionalNavbarProps) {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4">
      <nav
        className="rounded-full p-1.5 border border-white/10 shadow-2xl backdrop-blur-md flex items-center justify-between"
        style={{
          backgroundColor: 'rgba(15, 18, 27, 0.75)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(212, 175, 55, 0.08)',
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.key

          return (
            <button
              key={item.key}
              disabled={disabled}
              onClick={() => onSelectTab(item.key)}
              className={`relative px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              } ${disabled ? 'opacity-60 cursor-wait' : ''}`}
              style={{ fontFamily: '"Inter", sans-serif', letterSpacing: '0.04em' }}
            >
              {/* Active Golden Glow Pill Background */}
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full border border-amber-400/30"
                  style={{
                    backgroundColor: 'rgba(212, 175, 55, 0.15)',
                    boxShadow: '0 0 15px rgba(212, 175, 55, 0.25)',
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}

              <span className="relative z-10">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </header>
  )
}

