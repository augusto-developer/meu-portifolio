import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Lock,
  Cpu,
  Database,
  FolderTree,
  Trash2,
  Mail,
  TrendingDown,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'
import { BrassCorner } from './ui/BookOrnaments'

interface AutomationFlowDemoProps {
  isOpen: boolean
  onClose: () => void
  onContactClick: () => void
}

interface FlowStep {
  id: number
  code: string
  tag: string
  title: string
  tech: string
  description: string
  icon: typeof Cpu
}

const FLOW_STEPS: FlowStep[] = [
  {
    id: 1,
    code: '01',
    tag: 'Vigilância Contínua',
    title: 'Multiprocessing & Watchdog',
    tech: 'Python Multiprocessing',
    description:
      'Orquestração de workers independentes a operar em paralelo. O sistema watchdog monitoriza a saúde dos processos e reinicia-os automaticamente em caso de falhas críticas ou timeouts de rede, garantindo alta disponibilidade.',
    icon: Cpu,
  },
  {
    id: 2,
    code: '02',
    tag: 'Integridade & Hashes',
    title: 'PostgreSQL & Hashes SHA-256',
    tech: 'PostgreSQL + SHA-256',
    description:
      'Registo do estado transacional dos documentos numa base de dados relacional (PostgreSQL). O robô calcula o hash criptográfico (SHA-256) de cada ficheiro processado, garantindo que apenas versões novas ou corrigidas avançam no fluxo, evitando envios duplicados.',
    icon: Database,
  },
  {
    id: 3,
    code: '03',
    tag: 'Árvore Dinâmica',
    title: 'Pastas no SharePoint / Factorial',
    tech: 'SharePoint & FactorialHR',
    description:
      'Sincronização bidirecional e criação de hierarquias de armazenamento. O robô lê as pendências no painel, cruza os dados organizacionais do FactorialHR e constrói dinamicamente os diretórios no SharePoint (Ano > Contrato > Empresa/Colaborador > Documento).',
    icon: FolderTree,
  },
  {
    id: 4,
    code: '04',
    tag: 'Expurgo Preventivo',
    title: 'Pré-Limpeza Inteligente (API)',
    tech: 'REST API DELETE + Patchright',
    description:
      'Rotina de DELETE via API no SaaS para purgar versões antigas reprovadas antes do novo upload, evitando duplicidades e erros de submissão. Inclui tratamento avançado de exceções HTTP (ex: rate limits, 503) para manter o fluxo contínuo.',
    icon: Trash2,
  },
  {
    id: 5,
    code: '05',
    tag: 'Disparo Inteligente',
    title: 'Notificações & Trava Anti-Spam',
    tech: 'Jinja2 + Graph API / SMTP',
    description:
      'Motor de comunicação que renderiza alertas em HTML dinâmico (Jinja2) categorizando a urgência das cobranças. Possui uma trava local na base de dados que impede o envio de e-mails duplicados para o mesmo gestor ou colaborador no mesmo dia.',
    icon: Mail,
  },
]

export default function AutomationFlowDemo({
  isOpen,
  onClose,
  onContactClick,
}: AutomationFlowDemoProps) {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const [activeStep, setActiveStep] = useState<number>(1)

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-6xl rounded-lg border border-[#d4a738]/40 p-6 sm:p-8 md:p-9 overflow-hidden z-10 my-auto text-[#f6efe2] font-sans"
          style={{
            background:
              'linear-gradient(135deg, #1a0d14 0%, #13080e 50%, #0d050a 100%)',
            boxShadow:
              '0 25px 80px rgba(0, 0, 0, 0.95), inset 0 0 50px rgba(128, 27, 43, 0.25)',
          }}
        >
          {/* Victorian Brass Corners */}
          <BrassCorner position="tl" size={32} />
          <BrassCorner position="tr" size={32} />
          <BrassCorner position="bl" size={32} />
          <BrassCorner position="br" size={32} />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 p-2 rounded border border-[#d4a738]/30 text-[#c7b8a5] hover:text-[#ffd778] hover:border-[#ffd778] hover:bg-[#801b2b]/30 transition-all cursor-pointer"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-7 border-b border-[#d4a738]/20 pr-10">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded border border-[#ffd778]/30 bg-[#6e1624]/60 text-[#ffd778] text-[11px] font-semibold">
                  <TrendingDown size={12} />
                  <span>Redução de 80% nos atrasos e reprovações</span>
                </span>
                <span className="flex items-center gap-1 text-[11px] text-[#c7b8a5]">
                  <Lock size={11} className="text-amber-400" />
                  <span>Projeto sob NDA</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#f6efe2] tracking-tight">
                Automação de Documentos do DP · Fluxo Sequencial
              </h2>
            </div>

            <span className="text-xs text-[#ffd778]/80 font-mono hidden lg:block">
              Passe o mouse nos cartões para ler os detalhes
            </span>
          </div>

          {/* 5 SEQUENTIAL HORIZONTAL CARDS WITH HOVER REVEAL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 relative mb-6">
            {FLOW_STEPS.map((step, idx) => {
              const isRevealed = hoveredStep === step.id || activeStep === step.id

              return (
                <div key={step.id} className="relative flex items-center">
                  <div
                    onMouseEnter={() => {
                      setHoveredStep(step.id)
                      setActiveStep(step.id)
                    }}
                    onMouseLeave={() => setHoveredStep(null)}
                    onClick={() => setActiveStep(step.id)}
                    tabIndex={0}
                    className={`w-full rounded-lg border p-4 transition-all duration-300 relative overflow-hidden flex flex-col justify-between cursor-pointer min-h-[260px] ${
                      isRevealed
                        ? 'border-[#ffd778] bg-[#1e0f18] shadow-xl shadow-[#801b2b]/40 scale-[1.02] z-20'
                        : 'border-[#d4a738]/25 bg-[#14080e]/90 hover:border-[#d4a738]/60'
                    }`}
                  >
                    {/* Top: Step Code & Tag Label */}
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2.5">
                        <span className="text-[11px] font-mono font-bold text-[#ffd778] tracking-widest">
                          ETAPA {step.code}
                        </span>

                        <span
                          className={`text-[9px] px-2 py-0.5 rounded border font-semibold truncate ${
                            isRevealed
                              ? 'border-[#ffd778]/50 bg-[#6e1624] text-[#ffd778]'
                              : 'border-[#d4a738]/20 bg-[#220d15] text-[#e5ba48]'
                          }`}
                        >
                          {step.tag}
                        </span>
                      </div>

                      {/* Icon & Title */}
                      <div className="flex items-start gap-2.5 mb-2">
                        <div
                          className={`p-2 rounded border shrink-0 transition-colors ${
                            isRevealed
                              ? 'bg-[#8a192b] border-[#ffd778] text-[#ffd778]'
                              : 'bg-[#200d15] border-[#d4a738]/30 text-[#e5ba48]'
                          }`}
                        >
                          <step.icon size={16} />
                        </div>

                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-[#f6efe2] leading-tight">
                            {step.title}
                          </h3>
                          <span className="text-[10px] text-[#ffd778] font-mono block mt-0.5">
                            {step.tech}
                          </span>
                        </div>
                      </div>

                      {/* HOVER REVEAL: Detailed Description */}
                      <div className="mt-3 pt-3 border-t border-[#d4a738]/15">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={isRevealed ? 'revealed' : 'summary'}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                          >
                            {isRevealed ? (
                              <p className="text-[11px] text-[#f6efe2] leading-relaxed bg-[#0c0508]/80 p-2.5 rounded border border-[#ffd778]/20">
                                {step.description}
                              </p>
                            ) : (
                              <p className="text-[11px] text-[#c7b8a5] line-clamp-3 leading-relaxed">
                                {step.description}
                              </p>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Bottom Indicator */}
                    <div className="pt-2 text-right">
                      <span
                        className={`text-[9px] font-mono transition-colors ${
                          isRevealed ? 'text-[#ffd778]' : 'text-[#c7b8a5]/60'
                        }`}
                      >
                        {isRevealed ? '✦ Detalhe Ativo' : 'Passe o mouse'}
                      </span>
                    </div>
                  </div>

                  {/* Clean Normal Directional Arrow between cards (Desktop) */}
                  {idx < 4 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-30 pointer-events-none items-center justify-center text-[#ffd778] drop-shadow-[0_0_4px_rgba(212,167,56,0.6)]">
                      <ChevronRight size={18} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Minimal Clean Footer */}
          <div className="pt-4 border-t border-[#d4a738]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-[#c7b8a5]">
              🔒 Repositório privado por sigilo contratual (NDA).
            </span>

            <button
              onClick={() => {
                onClose()
                onContactClick()
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[#d4a738] font-semibold text-[#ffe8a3] transition-all cursor-pointer hover:border-[#ffd778] hover:shadow-lg hover:shadow-[#801b2b]/40 shrink-0"
              style={{
                background: 'linear-gradient(180deg, #7a1626 0%, #4a0d17 100%)',
              }}
            >
              <span>Conversar sobre a Arquitetura</span>
              <ExternalLink size={13} className="text-[#ffd778]" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
