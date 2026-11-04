import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
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
      title: 'E-mail Direto',
      value: OWNER.email,
      href: `mailto:${OWNER.email}`,
      icon: <Mail size={18} className="text-amber-300" />,
      action: 'Enviar Mensagem',
    },
    {
      title: 'LinkedIn',
      value: 'Conectar profissionalmente',
      href: OWNER.linkedin,
      icon: <LinkedinIcon size={18} />,
      action: 'Acessar Perfil',
    },
    {
      title: 'GitHub',
      value: 'Explorar repositórios e código',
      href: OWNER.github,
      icon: <GithubIcon size={18} />,
      action: 'Acessar Repositórios',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto w-full pt-24 pb-16 px-4"
    >
      <div className="rounded-2xl p-8 md:p-12 border border-white/10 bg-[#0f121b]/85 backdrop-blur-xl relative overflow-hidden text-center">
        {/* Glow */}
        <div
          className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/20 bg-amber-400/5 text-amber-300 text-xs font-medium mb-4">
          <span>✦</span>
          <span>Vamos Conversar</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-wide mb-3" style={{ fontFamily: '"Cinzel", serif' }}>
          Entre em Contato
        </h2>

        <p className="text-sm md:text-base text-slate-300 max-w-lg mx-auto mb-10 leading-relaxed font-normal">
          Disponível para novos desafios, projetos de engenharia de software e colaborações de alto impacto.
        </p>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {contactLinks.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-amber-400/40 hover:bg-white/[0.04] transition-all flex flex-col items-center justify-between group"
            >
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-3 group-hover:border-amber-400/50 group-hover:bg-amber-400/5 transition-all text-amber-300">
                {item.icon}
              </div>

              <h3 className="text-sm font-semibold text-white mb-1" style={{ fontFamily: '"Cinzel", serif' }}>
                {item.title}
              </h3>

              <p className="text-xs text-slate-400 mb-4">{item.value}</p>

              <span className="text-xs font-medium text-amber-300 group-hover:underline">
                {item.action} ➔
              </span>
            </a>
          ))}
        </div>

        {/* Primary CTA */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap justify-between items-center gap-4">
          <button
            onClick={() => onNavigate('sobre')}
            className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            ← Voltar para Sobre Mim
          </button>

          <a
            href={`mailto:${OWNER.email}`}
            className="px-8 py-3 rounded-full text-xs font-semibold tracking-wider text-black bg-gradient-to-r from-amber-300 to-amber-500 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-amber-500/20"
          >
            Enviar E-mail Agora
          </a>
        </div>
      </div>
    </motion.div>
  )
}
