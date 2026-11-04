import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Play,
  Pause,
  Lock,
  Cpu,
  FileCheck,
  UploadCloud,
  Clock,
  TrendingDown,
  ExternalLink,
} from 'lucide-react'
import { BrassCorner } from './ui/BookOrnaments'

interface AutomationFlowDemoProps {
  isOpen: boolean
  onClose: () => void
  onContactClick: () => void
}

interface Step {
  id: number
  title: string
  subtitle: string
  description: string
  detail: string
  logMessage: string
  icon: typeof FileCheck
  badge: string
}

const FLOW_STEPS: Step[] = [
  {
    id: 1,
    title: 'Monitoramento & Ingestão',
    subtitle: 'Coleta contínua de arquivos',
    description:
      'O robô em Python monitora os canais de recebimento de documentações da empresa e de colaboradores terceirizados.',
    detail:
      'Identifica certidões negativas (CNDs), exames ASO, contratos e guias de recolhimento assim que disponibilizados, eliminando a espera passiva do DP.',
    logMessage: '[PYTHON] Ingestão ativada: 18 documentos de colaboradores e empresa indexados.',
    icon: FileCheck,
    badge: 'Varredura Contínua',
  },
  {
    id: 2,
    title: 'Triagem & Validação de Urgência',
    subtitle: 'Filtro de integridade e prazos',
    description:
      'Classificação algorítmica por criticidade e validação prévia de metadados para evitar reprovações.',
    detail:
      'Analisa validade dos arquivos, nomes e conformidade antes de qualquer tentativa de envio, impedindo que documentos incorretos fossem submetidos na pressa.',
    logMessage: '[VALIDATION] 18/18 arquivos validados com sucesso. 4 itens com urgência crítica priorizados no topo da fila.',
    icon: Clock,
    badge: 'Anti-Reprovação',
  },
  {
    id: 3,
    title: 'Navegação Autônoma com Patchright',
    subtitle: 'Acesso às plataformas de terceiros',
    description:
      'Automação furtiva que acessa as plataformas customizadas de cada cliente ou fornecedor.',
    detail:
      'O Patchright (versão reforçada do Playwright) contorna travas de detecção de bots, efetua login seguro e navega pelas árvores de menus específicas de cada portal.',
    logMessage: '[PATCHRIGHT] Sessão furtiva autenticada no portal de terceiros. Navegando até a tela de homologação...',
    icon: Cpu,
    badge: 'Bypass Antidetect',
  },
  {
    id: 4,
    title: 'Upload, Protocolo & Liquidação',
    subtitle: 'Redução de 80% comprovada',
    description:
      'Envio imediato dos documentos nas áreas correspondentes com captura de protocolo e baixa das pendências.',
    detail:
      'Conclui a homologação sem intervenção humana, salva o comprovante de envio e notifica a equipe de que a pendência foi cumprida no prazo.',
    logMessage: '[SUCCESS] Documentos homologados com sucesso. Protocolo #849202 registrado. Pendência liquidada!',
    icon: UploadCloud,
    badge: '-80% de Atrasos',
  },
]

export default function AutomationFlowDemo({
  isOpen,
  onClose,
  onContactClick,
}: AutomationFlowDemoProps) {
  const [activeStep, setActiveStep] = useState(1)
  const [isPlaying, setIsPlaying] = useState(true)

  // Auto-advance step every 3.8s when playing
  useEffect(() => {
    if (!isOpen || !isPlaying) return

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev >= FLOW_STEPS.length ? 1 : prev + 1))
    }, 4200)

    return () => clearInterval(timer)
  }, [isOpen, isPlaying])

  if (!isOpen) return null

  const current = FLOW_STEPS[activeStep - 1]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window in Ancient Folio & Mahogany Aesthetic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-4xl rounded-lg border-2 border-[#d4a738]/50 p-6 sm:p-8 overflow-hidden z-10 my-auto text-[#f6efe2]"
          style={{
            background:
              'linear-gradient(135deg, #1f1117 0%, #170d13 50%, #0f070b 100%)',
            boxShadow:
              '0 30px 80px rgba(0, 0, 0, 0.95), inset 0 0 50px rgba(128, 27, 43, 0.25), 0 0 40px rgba(212, 167, 56, 0.15)',
          }}
        >
          {/* 4 Brass Corners */}
          <BrassCorner position="tl" size={34} />
          <BrassCorner position="tr" size={34} />
          <BrassCorner position="bl" size={34} />
          <BrassCorner position="br" size={34} />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded border border-[#d4a738]/40 text-[#c7b8a5] hover:text-[#ffd778] hover:border-[#ffd778] hover:bg-[#801b2b]/30 transition-all cursor-pointer"
            aria-label="Fechar Demonstração"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="border-b border-[#d4a738]/25 pb-4 mb-6 pr-8">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className="px-2.5 py-0.5 rounded border border-[#d4a738]/40 bg-[#3a1520] text-[#ffd778] text-[10px] font-bold tracking-widest uppercase"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                Demonstração de Fluxo Interativo
              </span>

              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded border border-amber-600/30 bg-amber-950/40 text-amber-300 text-[10px] font-semibold">
                <Lock size={11} className="text-amber-400" />
                <span>Projeto sob Sigilo Empresarial (NDA)</span>
              </span>
            </div>

            <h2
              className="text-2xl sm:text-3xl font-bold text-[#f6efe2] tracking-wide"
              style={{ fontFamily: '"Cinzel", serif' }}
            >
              Automação de Documentos do Departamento Pessoal
            </h2>

            <p className="text-xs sm:text-sm text-[#c7b8a5] mt-1.5 font-sans leading-relaxed">
              Orquestração autônoma desenvolvida com <strong>Python</strong> e <strong>Patchright</strong> para eliminar o gargalo operacional no envio de documentações a clientes externos.
            </p>
          </div>

          {/* Key Metric Highlights Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-3 p-3 rounded border border-[#d4a738]/30 bg-[#160a0f]/80">
              <div className="w-10 h-10 rounded flex items-center justify-center bg-[#6e1624] text-[#ffd778] border border-[#d4a738]/40">
                <TrendingDown size={20} />
              </div>
              <div>
                <span className="block text-base sm:text-lg font-bold text-[#ffd778]" style={{ fontFamily: '"Cinzel", serif' }}>
                  80% de Redução
                </span>
                <span className="text-[11px] text-[#c7b8a5]">Em atrasos e reprovações de documentos</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded border border-[#d4a738]/30 bg-[#160a0f]/80">
              <div className="w-10 h-10 rounded flex items-center justify-center bg-[#6e1624] text-[#ffd778] border border-[#d4a738]/40">
                <Clock size={20} />
              </div>
              <div>
                <span className="block text-base sm:text-lg font-bold text-[#ffd778]" style={{ fontFamily: '"Cinzel", serif' }}>
                  De 45 min para ~12s
                </span>
                <span className="text-[11px] text-[#c7b8a5]">Agilidade no fluxo de homologação</span>
              </div>
            </div>
          </div>

          {/* Interactive Stepper Navigation Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#ffd778] uppercase tracking-wider" style={{ fontFamily: '"Cinzel", serif' }}>
                Etapas do Ciclo Automatizado
              </span>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="inline-flex items-center gap-1.5 text-xs text-[#c7b8a5] hover:text-[#ffd778] cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause size={13} /> <span>Pausar Ciclo</span>
                  </>
                ) : (
                  <>
                    <Play size={13} /> <span>Continuar Ciclo</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {FLOW_STEPS.map((s) => {
                const isSelected = activeStep === s.id
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setActiveStep(s.id)
                      setIsPlaying(false)
                    }}
                    className={`p-2.5 rounded border text-left transition-all cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? 'border-[#ffd778] bg-[#6e1624]/70 shadow-lg shadow-[#801b2b]/30'
                        : 'border-[#d4a738]/20 bg-[#14090e]/70 hover:border-[#d4a738]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-[#d4a738] font-mono">
                        ETAPA 0{s.id}
                      </span>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ffd778] animate-pulse" />
                      )}
                    </div>
                    <span className="block text-xs font-bold text-[#f6efe2] truncate" style={{ fontFamily: '"Cinzel", serif' }}>
                      {s.title}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Active Step Showcase Card */}
          <div
            className="p-5 rounded border border-[#d4a738]/35 mb-6 relative overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #180c12 0%, #10060a 100%)',
            }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded border border-[#d4a738]/40 bg-[#54121d] text-[#ffd778]">
                <current.icon size={26} />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] px-2 py-0.5 rounded border border-[#d4a738]/40 bg-[#3a1520] text-[#ffd778] uppercase font-bold" style={{ fontFamily: '"Cinzel", serif' }}>
                    {current.badge}
                  </span>
                  <span className="text-xs text-[#c7b8a5] font-sans">
                    {current.subtitle}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#f6efe2] mb-1" style={{ fontFamily: '"Cinzel", serif' }}>
                  {current.title}
                </h3>

                <p className="text-xs text-[#f6efe2] font-sans leading-relaxed mb-2">
                  {current.description}
                </p>

                <p className="text-xs text-[#c7b8a5] font-sans leading-relaxed bg-[#0c0508] p-3 rounded border border-white/5">
                  ✦ {current.detail}
                </p>
              </div>
            </div>
          </div>

          {/* Simulated Terminal Execution Output */}
          <div className="rounded border border-[#d4a738]/25 bg-[#090406] p-3.5 mb-6 font-mono text-[11px] text-[#ffd778]">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-slate-400 text-[10px]">
              <span>Console da Automação (Python + Patchright)</span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Processo Ativo</span>
              </span>
            </div>
            <p className="text-slate-400 text-[10px]">
              $ python -m dp_automation.orchestrator --headless --stealth=patchright
            </p>
            <p className="mt-1 text-[#ffe8a3]">
              {current.logMessage}
            </p>
          </div>

          {/* Confidentiality Footer & Contact CTA */}
          <div className="pt-4 border-t border-[#d4a738]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-[#c7b8a5] max-w-lg text-center sm:text-left">
              🔒 <strong>Código Restrito:</strong> Devido a acordos de sigilo (NDA) da empresa, o repositório permanece privado. Para detalhes de implementação técnica, arquitetura e tratamento de exceções:
            </p>

            <button
              onClick={() => {
                onClose()
                onContactClick()
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-[#d4a738] text-xs font-bold tracking-wider uppercase text-[#ffe8a3] transition-all cursor-pointer hover:border-[#ffd778] hover:shadow-lg hover:shadow-[#801b2b]/40 shrink-0"
              style={{
                background: 'linear-gradient(180deg, #7a1626 0%, #4a0d17 100%)',
                fontFamily: '"Cinzel", serif',
              }}
            >
              <span>Conversar Comigo</span>
              <ExternalLink size={13} className="text-[#ffd778]" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
