import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Play,
  Pause,
  Lock,
  Cpu,
  Database,
  FolderTree,
  Trash2,
  Mail,
  TrendingDown,
  ExternalLink,
  Sparkles,
} from 'lucide-react'
import { BrassCorner } from './ui/BookOrnaments'

interface AutomationFlowDemoProps {
  isOpen: boolean
  onClose: () => void
  onContactClick: () => void
}

interface Pillar {
  id: number
  code: string
  title: string
  summary: string
  techBadge: string
  icon: typeof Cpu
  workerName: string
  bulletPoints: string[]
  magicalLabel: string
}

const ARCHITECTURE_PILLARS: Pillar[] = [
  {
    id: 1,
    code: '01',
    title: 'Multiprocessing & Watchdog',
    summary: 'Processos isolados (AtlasWorker, UploadWorker, NotificationWorker) geridos por um Watchdog com auto-recovery em caso de timeout de rede.',
    techBadge: 'Python Multiprocessing',
    icon: Cpu,
    workerName: 'Watchdog Daemon',
    bulletPoints: [
      'Execução paralela de rotinas pesadas sem travar a aplicação principal.',
      'Auto-recovery automático: reinicia workers em falhas de conexão.',
    ],
    magicalLabel: 'Vigilância Contínua',
  },
  {
    id: 2,
    code: '02',
    title: 'PostgreSQL & Hashes SHA-256',
    summary: 'Assinatura digital dos arquivos para envio estrito de versões novas, com controle transacional de status (Pendentes, Atrasados, Reprovados).',
    techBadge: 'PostgreSQL + SHA-256',
    icon: Database,
    workerName: 'Core Data Engine',
    bulletPoints: [
      'Hash SHA-256 impede reenvio desnecessário de arquivos idênticos.',
      'Mapeamento dinâmico de regras e prazos de validade.',
    ],
    magicalLabel: 'Integridade & Hashes',
  },
  {
    id: 3,
    code: '03',
    title: 'Pastas no SharePoint / Factorial',
    summary: 'Estruturação automática de diretórios (Ano > Contrato > Empresa/Colaborador > Mês > Documento) cruzando metadados com planilhas de mapeamento.',
    techBadge: 'SharePoint & FactorialHR',
    icon: FolderTree,
    workerName: 'TreeDirectoryBuilder',
    bulletPoints: [
      'Organização hierárquica autônoma sem intervenção do DP.',
      'Destino exato de cada cobrança definido em tempo real.',
    ],
    magicalLabel: 'Árvore Dinâmica',
  },
  {
    id: 4,
    code: '04',
    title: 'Pré-Limpeza Inteligente (API)',
    summary: 'Rotina de DELETE via API no SaaS para purgar versões antigas reprovadas antes do novo upload, evitando duplicidades e erros de submissão.',
    techBadge: 'REST API DELETE + Patchright',
    icon: Trash2,
    workerName: 'UploadWorker',
    bulletPoints: [
      'Expurgo preventivo da versão reprovada antes de novo envio.',
      'Tratamento de exceções HTTP para manter o fluxo contínuo.',
    ],
    magicalLabel: 'Expurgo Preventivo',
  },
  {
    id: 5,
    code: '05',
    title: 'Notificações & Trava Anti-Spam',
    summary: 'Templates Jinja2 via Graph API/SMTP categorizados por urgência, com controle de estado que impede múltiplos alertas ao mesmo responsável no mesmo dia.',
    techBadge: 'Jinja2 + Graph API / SMTP',
    icon: Mail,
    workerName: 'NotificationWorker',
    bulletPoints: [
      'E-mails com templates HTML claros e ranking de prioridades.',
      'Trava anti-spam local evita sobrecarga na caixa de entrada.',
    ],
    magicalLabel: 'Disparo Inteligente',
  },
]

/**
 * Animated Magic Wand Connector:
 * Replaces generic arrows with a crafted wand pointing forward with a pulsating starlight burst.
 */
function MagicWandConnector() {
  return (
    <div className="hidden md:flex items-center justify-center -mx-3 z-30 pointer-events-none select-none">
      <div className="relative flex items-center">
        {/* Wand SVG */}
        <svg
          width="42"
          height="22"
          viewBox="0 0 42 22"
          fill="none"
          className="drop-shadow-[0_0_8px_rgba(235,186,68,0.7)]"
        >
          <defs>
            <linearGradient id="wandWoodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2c140a" />
              <stop offset="35%" stopColor="#542813" />
              <stop offset="85%" stopColor="#7a3e1a" />
              <stop offset="100%" stopColor="#d4a738" />
            </linearGradient>
          </defs>

          {/* Tapered Wand Shaft pointing right */}
          <path
            d="M3 14 L12 12.5 L34 9.5 L35 8.5 L12 11.5 Z"
            fill="url(#wandWoodGrad)"
            stroke="#1a0a05"
            strokeWidth="0.5"
          />
          {/* Wand Handle Ring Accents in Burnished Brass */}
          <line x1="6" y1="12" x2="7" y2="15" stroke="#ffd778" strokeWidth="1" />
          <line x1="9" y1="11.5" x2="10" y2="14.5" stroke="#ffd778" strokeWidth="1" />
          {/* Glowing Wand Tip Core */}
          <circle cx="35" cy="8.5" r="1.5" fill="#ffffff" />
          <circle cx="35" cy="8.5" r="3" fill="#ffd778" fillOpacity="0.4" />
        </svg>

        {/* Pulsating Cast Star Spark */}
        <motion.span
          animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
          className="absolute -right-1 -top-1 text-[#ffd778] text-xs drop-shadow-[0_0_8px_#ffd778]"
        >
          ✦
        </motion.span>
      </div>
    </div>
  )
}

export default function AutomationFlowDemo({
  isOpen,
  onClose,
  onContactClick,
}: AutomationFlowDemoProps) {
  const [activePillarId, setActivePillarId] = useState(1)
  const [isPlaying, setIsPlaying] = useState(true)

  // Cycle through steps
  useEffect(() => {
    if (!isOpen || !isPlaying) return

    const timer = setInterval(() => {
      setActivePillarId((prev) =>
        prev >= ARCHITECTURE_PILLARS.length ? 1 : prev + 1
      )
    }, 4000)

    return () => clearInterval(timer)
  }, [isOpen, isPlaying])

  if (!isOpen) return null

  const currentPillar =
    ARCHITECTURE_PILLARS.find((p) => p.id === activePillarId) ||
    ARCHITECTURE_PILLARS[0]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm"
        />

        {/* Spacious Clean Folio Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-5xl rounded-lg border border-[#d4a738]/40 p-6 sm:p-8 overflow-hidden z-10 my-auto text-[#f6efe2] font-sans"
          style={{
            background:
              'linear-gradient(135deg, #1c0e15 0%, #14090f 50%, #0d060a 100%)',
            boxShadow:
              '0 25px 80px rgba(0, 0, 0, 0.95), inset 0 0 50px rgba(128, 27, 43, 0.2)',
          }}
        >
          {/* Victorian Brass Corner Accents */}
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

          {/* Clean Header: Simple & Direct */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-[#d4a738]/20 pr-10">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded border border-[#ffd778]/30 bg-[#6e1624]/60 text-[#ffd778] text-[11px] font-semibold">
                  <TrendingDown size={12} />
                  <span>Redução de 80% nos atrasos</span>
                </span>
                <span className="flex items-center gap-1 text-[11px] text-[#c7b8a5]">
                  <Lock size={11} className="text-amber-400" />
                  <span>Projeto sob NDA</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#f6efe2] tracking-tight">
                Automação de Documentos do DP
              </h2>
            </div>

            {/* Play / Pause Cycle Control */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#d4a738]/30 bg-[#160a0f] text-xs font-medium text-[#ffd778] hover:border-[#ffd778] transition-colors cursor-pointer self-start sm:self-auto"
            >
              {isPlaying ? (
                <>
                  <Pause size={12} /> <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play size={12} className="fill-[#ffd778]" /> <span>Reproduzir</span>
                </>
              )}
            </button>
          </div>

          {/* FLOW PIPELINE WITH MAGIC WAND CONNECTORS */}
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
              {ARCHITECTURE_PILLARS.map((pillar, idx) => {
                const isSelected = activePillarId === pillar.id

                return (
                  <div key={pillar.id} className="relative flex items-center">
                    <button
                      onClick={() => {
                        setActivePillarId(pillar.id)
                        setIsPlaying(false)
                      }}
                      className={`w-full p-3.5 rounded border text-left transition-all duration-200 cursor-pointer relative h-full flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#ffd778] bg-[#6e1624]/85 shadow-lg shadow-[#801b2b]/40 z-20'
                          : 'border-[#d4a738]/20 bg-[#150a0f]/80 hover:border-[#d4a738]/50 hover:bg-[#1d0e15]'
                      }`}
                    >
                      <div>
                        {/* Step number & Status */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-mono font-bold text-[#ffd778]">
                            0{pillar.id}
                          </span>
                          <span className="text-[10px] text-[#e5ba48] font-medium">
                            {pillar.magicalLabel}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-xs sm:text-sm font-semibold text-[#f6efe2] leading-snug mb-1">
                          {pillar.title}
                        </h4>
                      </div>

                      {/* Tech Badge */}
                      <span className="text-[10px] text-[#c7b8a5] block truncate mt-2 pt-1.5 border-t border-white/5 font-mono">
                        {pillar.techBadge}
                      </span>
                    </button>

                    {/* Magic Wand Connector between columns */}
                    {idx < 4 && <MagicWandConnector />}
                  </div>
                )
              })}
            </div>
          </div>

          {/* FOCUSED DETAILS CARD: DIRECT & IMPACTFUL */}
          <div
            className="p-5 sm:p-6 rounded border border-[#d4a738]/30 mb-6 relative overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #180c12 0%, #10060a 100%)',
            }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded border border-[#d4a738]/40 bg-[#54121d] text-[#ffd778] shrink-0">
                <currentPillar.icon size={22} />
              </div>

              <div className="flex-1 space-y-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-[#ffd778] font-mono">
                    Etapa 0{currentPillar.id} · {currentPillar.workerName}
                  </span>
                  <span className="text-xs text-[#c7b8a5] font-sans">
                    ({currentPillar.techBadge})
                  </span>
                </div>

                <p className="text-sm text-[#f6efe2] leading-relaxed">
                  {currentPillar.summary}
                </p>

                {/* Direct technical bullets */}
                <div className="grid sm:grid-cols-2 gap-2 pt-1">
                  {currentPillar.bulletPoints.map((pt, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-[#c7b8a5] bg-[#0c0508]/80 p-2.5 rounded border border-white/5"
                    >
                      <Sparkles size={12} className="text-[#ffd778] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* MINIMAL FOOTER: ONLY WHAT MATTERS */}
          <div className="pt-4 border-t border-[#d4a738]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-[#c7b8a5]">
              Repositório privado por sigilo contratual (NDA).
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
