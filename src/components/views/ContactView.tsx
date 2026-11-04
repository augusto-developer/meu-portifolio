import { motion } from 'framer-motion'
import { Mail, ArrowRight } from 'lucide-react'
import { OWNER } from '../../data'

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

export default function ContactView({ onNavigate }: ContactViewProps) {
  const contactLinks = [
    {
      title: 'Correspondência Direta',
      subtitle: 'Para propostas, projetos e oportunidades',
      value: OWNER.email,
      href: `mailto:${OWNER.email}`,
      icon: <Mail size={18} className="text-[#e5ba48]" />,
      action: 'Enviar Mensagem',
    },
    {
      title: 'Perfil no LinkedIn',
      subtitle: 'Conexão profissional e histórico de carreira',
      value: 'linkedin.com/in/...',
      href: OWNER.linkedin,
      icon: <LinkedinIcon size={18} />,
      action: 'Acessar LinkedIn',
    },
    {
      title: 'Repositório GitHub',
      subtitle: 'Códigos-fonte, arquitetura e contribuições',
      value: 'github.com/...',
      href: OWNER.github,
      icon: <GithubIcon size={18} />,
      action: 'Ver Repositórios',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="max-w-4xl mx-auto w-full pt-24 pb-16 px-4"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#d4a738]/30 bg-[#4a0e18]/40 text-[#e5ba48] text-xs font-semibold tracking-widest uppercase mb-3">
          <span>✦</span>
          <span style={{ fontFamily: '"Cinzel", serif' }}>Mesa de Correspondência</span>
        </div>
        <h2
          className="text-3xl md:text-4xl font-bold text-[#f6efe2] tracking-wide"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          Contato & Oportunidades
        </h2>
        <p className="text-sm text-[#c7b8a5] max-w-lg mx-auto mt-2">
          Disponível para novos desafios técnicos, consultoria de arquitetura e projetos de engenharia de software.
        </p>
      </div>

      {/* Contact Cards in Antique Wood & Brass Folio */}
      <div className="grid md:grid-cols-3 gap-5">
        {contactLinks.map((item) => (
          <div
            key={item.title}
            className="rounded-lg p-6 border border-[#d4a738]/25 relative overflow-hidden transition-all hover:border-[#d4a738]/50 hover:shadow-2xl hover:shadow-[#801b2b]/25 flex flex-col justify-between"
            style={{
              backgroundColor: 'rgba(23, 15, 19, 0.94)',
              boxShadow:
                '0 15px 35px rgba(0, 0, 0, 0.7), inset 0 0 20px rgba(128, 27, 43, 0.1)',
            }}
          >
            {/* Top corner brackets */}
            <span className="absolute top-1.5 left-1.5 text-[9px] text-[#d4a738]/40 font-serif select-none pointer-events-none">⌜</span>
            <span className="absolute top-1.5 right-1.5 text-[9px] text-[#d4a738]/40 font-serif select-none pointer-events-none">⌝</span>

            <div>
              <div
                className="w-10 h-10 rounded-md border border-[#d4a738]/35 flex items-center justify-center mb-4 text-[#e5ba48]"
                style={{
                  backgroundColor: 'rgba(74, 14, 24, 0.65)',
                  boxShadow: '0 0 15px rgba(128, 27, 43, 0.4)',
                }}
              >
                {item.icon}
              </div>

              <h3
                className="font-bold text-base text-[#f6efe2] mb-1"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                {item.title}
              </h3>

              <p className="text-xs text-[#c7b8a5] mb-4">
                {item.subtitle}
              </p>

              <p className="text-xs font-mono text-[#ffd778] mb-6 truncate bg-[#100a0d] p-2 rounded border border-white/5">
                {item.value}
              </p>
            </div>

            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 px-4 rounded border border-[#d4a738]/40 text-xs font-semibold tracking-wider text-[#f6efe2] transition-all hover:border-[#e5ba48] hover:shadow-lg hover:shadow-[#801b2b]/30"
              style={{
                backgroundColor: '#6e1624',
                fontFamily: '"Cinzel", serif',
              }}
            >
              {item.action}
            </a>
          </div>
        ))}
      </div>

      {/* Footer Return CTA */}
      <div className="text-center mt-12">
        <button
          onClick={() => onNavigate('sobre')}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#e5ba48] hover:text-[#ffd778] transition-colors cursor-pointer"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          <span>Retornar ao Início do Tomo</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </motion.div>
  )
}
