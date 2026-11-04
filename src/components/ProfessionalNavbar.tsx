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
  { key: 'projetos', label: 'Tomos & Projetos' },
  { key: 'habilidades', label: 'Compêndio' },
  { key: 'contato', label: 'Escritório' },
]

export default function ProfessionalNavbar({
  activeTab,
  onSelectTab,
  disabled,
}: ProfessionalNavbarProps) {
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4 pointer-events-auto">
      {/* 1. Carved Dark Oak/Mahogany Lintel Shelf */}
      <div
        className="w-full h-3 rounded-b-sm border-b border-x border-[#d4a738]/50 relative"
        style={{
          background:
            'linear-gradient(180deg, #381a24 0%, #1f0f15 70%, #100609 100%)',
          boxShadow:
            '0 4px 15px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,225,140,0.3)',
        }}
      >
        {/* Left & Right Brass Mount Brackets */}
        <div className="absolute -left-2 -top-1 w-3 h-5 bg-gradient-to-b from-[#e5ba48] to-[#8c5e14] rounded-sm shadow-md border border-[#fff2b3]/40" />
        <div className="absolute -right-2 -top-1 w-3 h-5 bg-gradient-to-b from-[#e5ba48] to-[#8c5e14] rounded-sm shadow-md border border-[#fff2b3]/40" />
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-[#d4a738]/40" />
      </div>

      {/* 2. Hanging Velvet Bookmark Ribbons */}
      <nav className="flex items-start justify-center gap-2 sm:gap-4 -mt-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.key

          return (
            <button
              key={item.key}
              disabled={disabled}
              onClick={() => onSelectTab(item.key)}
              className={`group relative pt-2.5 pb-4 px-3 sm:px-4 cursor-pointer select-none transition-all duration-200 focus:outline-none ${
                disabled ? 'opacity-60 cursor-wait' : ''
              }`}
              style={{
                clipPath:
                  'polygon(0 0, 100% 0, 100% calc(100% - 8px), 50% 100%, 0 calc(100% - 8px))',
              }}
            >
              {/* Ribbon Body */}
              <motion.div
                className="absolute inset-0 border-x border-b border-[#d4a738]/40 transition-colors"
                style={{
                  clipPath:
                    'polygon(0 0, 100% 0, 100% calc(100% - 8px), 50% 100%, 0 calc(100% - 8px))',
                  background: isActive
                    ? 'linear-gradient(180deg, #7a1626 0%, #520d18 80%, #3a0810 100%)'
                    : 'linear-gradient(180deg, #24141b 0%, #170c11 80%, #0e060a 100%)',
                  boxShadow: isActive
                    ? '0 8px 20px rgba(128, 27, 43, 0.6), inset 0 0 10px rgba(212, 167, 56, 0.3)'
                    : '0 4px 10px rgba(0,0,0,0.6)',
                }}
                animate={{
                  y: isActive ? 2 : 0,
                }}
                transition={{ duration: 0.2 }}
              />

              {/* Embroidered gold thread border line */}
              <div
                className="absolute inset-x-1.5 top-0 bottom-3 border-x border-[#d4a738]/20 pointer-events-none"
              />

              {/* Brass top rivet pin */}
              <div
                className={`absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full border ${
                  isActive
                    ? 'bg-[#ffe48a] border-[#d4a738]'
                    : 'bg-[#8a6828] border-[#4a3512]'
                }`}
              />

              {/* Label */}
              <span
                className={`relative z-10 text-[11px] sm:text-xs font-semibold block text-center mt-1 font-sans ${
                  isActive
                    ? 'text-[#ffe8a3] drop-shadow-[0_1px_3px_rgba(235,186,68,0.5)]'
                    : 'text-[#c2b099] group-hover:text-[#f6efe2]'
                }`}
              >
                {isActive && <span className="text-[#ffd778] mr-1">✦</span>}
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>
    </header>
  )
}
