import { motion } from 'framer-motion'
import { Mail, Feather } from 'lucide-react'
import { OWNER } from '../../data'
import { BrassCorner, WaxSeal } from '../ui/BookOrnaments'

interface ContactViewProps {
  onNavigate: (tab: 'sobre' | 'projetos' | 'habilidades') => void
}

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export default function ContactView({}: ContactViewProps) {
  const contactLinks = [
    {
      title: 'E-mail Direto',
      subtitle: 'Propostas de engenharia e novos projetos',
      value: OWNER.email,
      href: `mailto:${OWNER.email}`,
      icon: <Mail size={18} className="text-[#ffd778]" />,
      action: 'Enviar E-mail',
      sealInitial: 'M',
    },
    {
      title: 'LinkedIn',
      subtitle: 'Conexão profissional e histórico',
      value: 'linkedin.com/in/...',
      href: OWNER.linkedin,
      icon: <LinkedinIcon size={18} />,
      action: 'Acessar LinkedIn',
      sealInitial: 'in',
    },
    {
      title: 'GitHub',
      subtitle: 'Repositórios e contribuições técnicas',
      value: 'github.com/...',
      href: OWNER.github,
      icon: <GithubIcon size={18} />,
      action: 'Ver Repositórios',
      sealInitial: 'git',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto w-full pt-28 pb-16 px-4 font-sans"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-[#d4a738]/35 bg-[#3d0d16]/60 text-[#ffd778] text-xs font-semibold mb-2 shadow-sm">
          <Feather size={12} className="text-[#e5ba48]" />
          <span>Canais de Contato</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#f6efe2] tracking-tight">
          Vamos Conversar?
        </h2>
      </div>

      {/* Contact Cards */}
      <div className="grid md:grid-cols-3 gap-5">
        {contactLinks.map((item) => (
          <div
            key={item.title}
            className="group relative rounded-lg border border-[#d4a738]/30 overflow-hidden flex flex-col justify-between transition-all duration-200 hover:border-[#ffd778]/60 p-5"
            style={{
              background:
                'linear-gradient(135deg, #22121b 0%, #160c12 60%, #0f070c 100%)',
              boxShadow:
                '0 12px 30px rgba(0, 0, 0, 0.75), inset 0 0 20px rgba(80, 15, 25, 0.15)',
            }}
          >
            <BrassCorner position="tl" size={20} />
            <BrassCorner position="tr" size={20} />

            <div className="absolute top-3 right-3 z-10">
              <WaxSeal size={34} initial={item.sealInitial} />
            </div>

            <div>
              <div
                className="w-9 h-9 rounded border border-[#d4a738]/30 flex items-center justify-center mb-3.5 text-[#ffd778]"
                style={{
                  background: 'linear-gradient(180deg, #5c1421 0%, #300810 100%)',
                }}
              >
                {item.icon}
              </div>

              <h3 className="font-bold text-base text-[#f6efe2] mb-1 pr-6">
                {item.title}
              </h3>

              <p className="text-xs text-[#c7b8a5] mb-3">
                {item.subtitle}
              </p>

              <p className="text-xs font-mono text-[#ffd778] mb-5 truncate bg-[#0d0609] p-2 rounded border border-[#d4a738]/15">
                {item.value}
              </p>
            </div>

            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2 px-3 rounded border border-[#d4a738] text-xs font-semibold text-[#ffe8a3] transition-all hover:border-[#ffd778] hover:shadow-md hover:shadow-[#801b2b]/30"
              style={{
                background: 'linear-gradient(180deg, #7a1626 0%, #4a0d17 100%)',
              }}
            >
              {item.action}
            </a>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
