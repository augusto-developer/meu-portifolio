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
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4">
      <nav
        className="relative rounded-lg p-1.5 border border-[#d4a738]/30 backdrop-blur-md flex items-center justify-between"
        style={{
          backgroundColor: 'rgba(23, 15, 19, 0.92)',
          boxShadow:
            '0 12px 35px rgba(0, 0, 0, 0.75), inset 0 0 15px rgba(128, 27, 43, 0.2), 0 0 20px rgba(212, 167, 56, 0.1)',
        }}
      >
        {/* Brass corner bracket accents */}
        <span className="absolute -top-1 -left-1 text-[9px] text-[#d4a738]/60 font-serif select-none pointer-events-none">⌜</span>
        <span className="absolute -top-1 -right-1 text-[9px] text-[#d4a738]/60 font-serif select-none pointer-events-none">⌝</span>
        <span className="absolute -bottom-1 -left-1 text-[9px] text-[#d4a738]/60 font-serif select-none pointer-events-none">⌞</span>
        <span className="absolute -bottom-1 -right-1 text-[9px] text-[#d4a738]/60 font-serif select-none pointer-events-none">⌟</span>

        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.key

          return (
            <button
              key={item.key}
              disabled={disabled}
              onClick={() => onSelectTab(item.key)}
              className={`relative px-4 py-2 rounded-md text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                isActive
                  ? 'text-[#f6efe2]'
                  : 'text-[#c7b8a5] hover:text-[#f6efe2] hover:bg-[#801b2b]/15'
              } ${disabled ? 'opacity-60 cursor-wait' : ''}`}
              style={{ fontFamily: '"Cinzel", serif' }}
            >
              {/* Active Gryffindor Velvet & Burnished Gold Plaque */}
              {isActive && (
                <motion.div
                  layoutId="active-tab-plaque"
                  className="absolute inset-0 rounded-md border border-[#d4a738]/60"
                  style={{
                    backgroundColor: 'rgba(110, 22, 36, 0.85)',
                    boxShadow:
                      '0 0 16px rgba(128, 27, 43, 0.6), inset 0 0 8px rgba(212, 167, 56, 0.25)',
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}

              <span className="relative z-10 flex items-center gap-1.5">
                {isActive && <span className="text-[#e5ba48] text-[9px]">✦</span>}
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>
    </header>
  )
}
