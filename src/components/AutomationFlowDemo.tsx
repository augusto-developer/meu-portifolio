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
  ChevronRight,
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
  tagline: string
  summary: string
  techBadge: string
  icon: typeof Cpu
  workerName?: string
  bulletPoints: string[]
  magicalAspect: string
}

const ARCHITECTURE_PILLARS: Pillar[] = [
  {
    id: 1,
    code: '01',
    title: 'Orquestração Assíncrona & Watchdog Sentinela',
    tagline: 'Multiprocessing com Auto-Recovery em tempo real',
    summary:
      'Arquitetura desenhada com workers independentes orquestrados por um processo Watchdog principal com tolerância a falhas de rede.',
    techBadge: 'Python Multiprocessing + Watchdog Daemon',
    icon: Cpu,
    workerName: 'AtlasWorker · UploadWorker · NotificationWorker',
    bulletPoints: [
      'Workers operam em processos isolados para evitar bloqueios de I/O em requisições de rede.',
      'Processo Sentinela (Watchdog) monitora health check e reinicia workers automaticamente se houver timeout severo.',
      'Execução contínua sem necessidade de intervenção manual da equipe.',
    ],
    magicalAspect: 'O Guardião da Orquestra (Vigilância Contínua & Auto-Cura)',
  },
  {
    id: 2,
    code: '02',
    title: 'Estado em PostgreSQL & Criptografia SHA-256',
    tagline: 'Prevenção de duplicidade e integridade documental',
    summary:
      'Banco de dados relacional robusto com hashing criptográfico e gestão transacional de estados.',
    techBadge: 'PostgreSQL + Hashes SHA-256 + Atomic Transactions',
    icon: Database,
    workerName: 'Core Data Engine',
    bulletPoints: [
      'Geração de assinatura SHA-256 para cada arquivo: apenas versões realmente modificadas são transmitidas.',
      'Mapeamento dinâmico de caminhos de arquivos cruzando pendências com bases internas.',
      'Gestão transacional rigorosa de status de ciclo de vida: Pendente, Atrasado e Reprovado.',
    ],
    magicalAspect: 'O Selo de Integridade e Memória Imutável',
  },
  {
    id: 3,
    code: '03',
    title: 'Hierarquia Dinâmica de Pastas no SharePoint',
    tagline: 'Construção autônoma de diretórios e roteamento exato',
    summary:
      'O robô interpreta as pendências do SaaS e constrói a árvore corporativa no repositório.',
    techBadge: 'Microsoft Graph API + SharePoint + FactorialHR',
    icon: FolderTree,
    workerName: 'TreeDirectoryBuilder',
    bulletPoints: [
      'Criação programática da estrutura: Ano ➜ Contrato ➜ Empresa / Colaborador ➜ Mês ➜ Documento.',
      'Cruzamento algorítmico com planilhas de mapeamento para definir o destino exato de cada cobrança.',
      'Preparado para múltiplas plataformas: migrado com sucesso de SharePoint para FactorialHR.',
    ],
    magicalAspect: 'A Árvore de Diretórios Encantada (Roteamento Autônomo)',
  },
  {
    id: 4,
    code: '04',
    title: 'Pré-Limpeza Inteligente & Bypass de Erros',
    tagline: 'Expurgo preventivo via API para evitar reprovações',
    summary:
      'Lógica autônoma de eliminação de arquivos rejeitados antes da submissão da nova versão.',
    techBadge: 'REST API DELETE + Error Interception + Patchright',
    icon: Trash2,
    workerName: 'UploadWorker (Pre-cleaner)',
    bulletPoints: [
      'Antes de reenviar um documento reprovado, o sistema executa autonomamente uma chamada de DELETE via API no SaaS.',
      'Expurga a versão corrompida/rejeitada, eliminando conflitos de duplicidade na plataforma de terceiros.',
      'Tratamento preventivo de exceções HTTP e códigos de erro de backend para manter o fluxo resiliente.',
    ],
    magicalAspect: 'O Encantamento de Purificação & Bypass Preventivo',
  },
  {
    id: 5,
    code: '05',
    title: 'Notificações Inteligentes com Trava Anti-Spam',
    tagline: 'Templates Jinja2 e roteamento seletivo de destinatários',
    summary:
      'Motor de comunicação que avisa os responsáveis certos com controle diário de envio.',
    techBadge: 'Jinja2 HTML Templates + Graph API / SMTP + Anti-Spam Lock',
    icon: Mail,
    workerName: 'NotificationWorker',
    bulletPoints: [
      'Templates HTML dinâmicos construídos com Jinja2, categorizados por criticidade: Lembretes, Críticos e Gestão.',
      'Consulta em tempo real ao SharePoint para identificar os e-mails exatos dos gestores e fiscais de contrato.',
      'Controle de estado local anti-spam que bloqueia alertas repetidos no mesmo dia para o mesmo colaborador.',
    ],
    magicalAspect: 'O Mensageiro Discreto & Correio Inteligente',
  },
]

export default function AutomationFlowDemo({
  isOpen,
  onClose,
  onContactClick,
}: AutomationFlowDemoProps) {
  const [activePillarId, setActivePillarId] = useState(1)
  const [isPlaying, setIsPlaying] = useState(true)
  const [viewMode, setViewMode] = useState<'flow' | 'dossier'>('flow')

  // Auto-advance pillar every 4s when playing in flow mode
  useEffect(() => {
    if (!isOpen || !isPlaying || viewMode !== 'flow') return

    const timer = setInterval(() => {
      setActivePillarId((prev) =>
        prev >= ARCHITECTURE_PILLARS.length ? 1 : prev + 1
      )
    }, 4200)

    return () => clearInterval(timer)
  }, [isOpen, isPlaying, viewMode])

  if (!isOpen) return null

  const currentPillar =
    ARCHITECTURE_PILLARS.find((p) => p.id === activePillarId) ||
    ARCHITECTURE_PILLARS[0]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Spacious Grand Library Folio Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="relative w-full max-w-6xl rounded-lg border-2 border-[#d4a738]/50 p-6 sm:p-8 md:p-10 overflow-hidden z-10 my-auto text-[#f6efe2]"
          style={{
            background:
              'linear-gradient(135deg, #1d0f16 0%, #150a10 50%, #0d060a 100%)',
            boxShadow:
              '0 30px 100px rgba(0, 0, 0, 0.95), inset 0 0 60px rgba(128, 27, 43, 0.25), 0 0 50px rgba(212, 167, 56, 0.2)',
          }}
        >
          {/* 4 Victorian Brass Corner Mounts */}
          <BrassCorner position="tl" size={38} />
          <BrassCorner position="tr" size={38} />
          <BrassCorner position="bl" size={38} />
          <BrassCorner position="br" size={38} />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-30 p-2.5 rounded border border-[#d4a738]/40 text-[#c7b8a5] hover:text-[#ffd778] hover:border-[#ffd778] hover:bg-[#801b2b]/30 transition-all cursor-pointer"
            aria-label="Fechar Demonstração"
          >
            <X size={20} />
          </button>

          {/* Header Banner */}
          <div className="border-b border-[#d4a738]/25 pb-5 mb-8 pr-12">
            <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
              <span
                className="px-3 py-1 rounded border border-[#d4a738]/50 bg-[#3a1520] text-[#ffd778] text-xs font-bold tracking-widest uppercase flex items-center gap-1.5"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                <Sparkles size={13} className="text-[#ffd778]" />
                <span>Arquitetura de Alta Disponibilidade</span>
              </span>

              <span className="flex items-center gap-1.5 px-3 py-1 rounded border border-amber-600/35 bg-amber-950/40 text-amber-300 text-xs font-semibold">
                <Lock size={12} className="text-amber-400" />
                <span>Projeto sob Sigilo Empresarial (NDA)</span>
              </span>

              <span className="flex items-center gap-1.5 px-3 py-1 rounded border border-[#ffd778]/40 bg-[#6e1624]/70 text-[#ffd778] text-xs font-bold">
                <TrendingDown size={13} />
                <span>-80% de Atrasos e Reprovações</span>
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mt-2">
              <div>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f6efe2] tracking-wide"
                  style={{
                    fontFamily: '"Cinzel", serif',
                    textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                  }}
                >
                  Automação de Documentos do DP · Pipeline Resiliente
                </h2>
                <p className="text-sm text-[#c7b8a5] mt-1.5 font-sans leading-relaxed max-w-3xl">
                  Orquestração assíncrona com <strong>Multiprocessing</strong>, tolerância a falhas com <strong>Watchdog Sentinela</strong>, persistência transacional em <strong>PostgreSQL</strong> e higienização autônoma via API.
                </p>
              </div>

              {/* View Mode & Play Controls */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="rounded p-1 border border-[#d4a738]/30 bg-[#12070c] flex items-center gap-1">
                  <button
                    onClick={() => setViewMode('flow')}
                    className={`px-3 py-1.5 rounded text-xs font-bold tracking-wider transition-all cursor-pointer ${
                      viewMode === 'flow'
                        ? 'bg-[#7a1626] text-[#ffd778] border border-[#d4a738]/50 shadow-sm'
                        : 'text-[#c7b8a5] hover:text-[#f6efe2]'
                    }`}
                    style={{ fontFamily: '"Cinzel", serif' }}
                  >
                    Fluxograma Mágico
                  </button>
                  <button
                    onClick={() => setViewMode('dossier')}
                    className={`px-3 py-1.5 rounded text-xs font-bold tracking-wider transition-all cursor-pointer ${
                      viewMode === 'dossier'
                        ? 'bg-[#7a1626] text-[#ffd778] border border-[#d4a738]/50 shadow-sm'
                        : 'text-[#c7b8a5] hover:text-[#f6efe2]'
                    }`}
                    style={{ fontFamily: '"Cinzel", serif' }}
                  >
                    Dossiê dos 5 Pilares
                  </button>
                </div>

                {viewMode === 'flow' && (
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded border border-[#d4a738]/40 bg-[#160a0f] text-xs font-semibold text-[#ffd778] hover:border-[#ffd778] transition-colors cursor-pointer"
                    style={{ fontFamily: '"Cinzel", serif' }}
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
                )}
              </div>
            </div>
          </div>

          {/* MODE A: MAGICAL SPACIOUS FLOWCHART */}
          {viewMode === 'flow' && (
            <div className="space-y-6">
              {/* 5-Column Spacious Diagram Pipeline */}
              <div className="relative p-5 sm:p-6 rounded-lg border border-[#d4a738]/30 bg-[#12070c]/85 overflow-hidden">
                {/* Subtle magical constellation background texture */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage:
                      'radial-gradient(rgba(212, 167, 56, 0.4) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* The 5 Pillars in a Spacious Pipeline */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-5 relative z-10">
                  {ARCHITECTURE_PILLARS.map((pillar, idx) => {
                    const isSelected = activePillarId === pillar.id

                    return (
                      <div key={pillar.id} className="relative flex flex-col">
                        <button
                          onClick={() => {
                            setActivePillarId(pillar.id)
                            setIsPlaying(false)
                          }}
                          className={`w-full p-4 rounded-md border text-left transition-all duration-300 cursor-pointer relative overflow-hidden h-full flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#ffd778] bg-[#6e1624]/85 shadow-xl shadow-[#801b2b]/50 scale-[1.03] z-20'
                              : 'border-[#d4a738]/25 bg-[#170a10]/80 hover:border-[#d4a738]/60 hover:bg-[#200f16]'
                          }`}
                        >
                          <div>
                            {/* Pillar Code & Glowing Orb */}
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs font-mono font-bold text-[#ffd778] tracking-widest">
                                {pillar.code}
                              </span>

                              <div
                                className={`w-2.5 h-2.5 rounded-full ${
                                  isSelected
                                    ? 'bg-[#ffd778] shadow-[0_0_12px_#ffd778] animate-pulse'
                                    : 'bg-[#8c5e14]/40'
                                }`}
                              />
                            </div>

                            {/* Icon & Title */}
                            <div
                              className={`w-9 h-9 rounded border flex items-center justify-center mb-3 ${
                                isSelected
                                  ? 'bg-[#8a192b] border-[#ffd778] text-[#ffd778]'
                                  : 'bg-[#220d15] border-[#d4a738]/30 text-[#e5ba48]'
                              }`}
                            >
                              <pillar.icon size={18} />
                            </div>

                            <h4
                              className="text-xs sm:text-sm font-bold text-[#f6efe2] leading-snug mb-1"
                              style={{ fontFamily: '"Cinzel", serif' }}
                            >
                              {pillar.title}
                            </h4>

                            <p className="text-[11px] text-[#c7b8a5] line-clamp-2 font-sans mb-3">
                              {pillar.tagline}
                            </p>
                          </div>

                          {/* Tech Tag */}
                          <div className="pt-2 border-t border-[#d4a738]/15">
                            <span className="text-[10px] font-mono text-[#ffd778] block truncate">
                              {pillar.workerName || pillar.techBadge}
                            </span>
                          </div>
                        </button>

                        {/* Animated Glowing Conduit Arrow between Columns (Desktop) */}
                        {idx < 4 && (
                          <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-30 pointer-events-none items-center justify-center">
                            <motion.div
                              animate={{ x: [0, 4, 0] }}
                              transition={{
                                repeat: Infinity,
                                duration: 1.2,
                                ease: 'easeInOut',
                              }}
                              className="text-[#ffd778] drop-shadow-[0_0_6px_rgba(235,186,68,0.9)]"
                            >
                              <ChevronRight size={18} />
                            </motion.div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Active Pillar Deep-Dive Card */}
              <div
                className="p-6 sm:p-7 rounded-lg border-2 border-[#d4a738]/40 relative overflow-hidden"
                style={{
                  background:
                    'linear-gradient(135deg, #22121b 0%, #170d13 50%, #0e060a 100%)',
                  boxShadow:
                    '0 15px 40px rgba(0,0,0,0.8), inset 0 0 35px rgba(128, 27, 43, 0.25)',
                }}
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  {/* Left: Icon & Magical Aspect */}
                  <div className="flex flex-col items-center text-center p-4 rounded border border-[#d4a738]/30 bg-[#12070c] shrink-0 w-full md:w-56 shadow-md">
                    <div className="w-14 h-14 rounded-full border-2 border-[#ffd778]/60 bg-[#6e1624] text-[#ffd778] flex items-center justify-center mb-3 shadow-lg shadow-[#801b2b]/40">
                      <currentPillar.icon size={28} />
                    </div>

                    <span
                      className="text-xs font-bold text-[#ffd778] tracking-widest uppercase mb-1"
                      style={{ fontFamily: '"Cinzel", serif' }}
                    >
                      Pilar 0{currentPillar.id}
                    </span>

                    <span className="text-[11px] font-mono text-[#c7b8a5] bg-[#220d15] px-2 py-0.5 rounded border border-[#d4a738]/20">
                      {currentPillar.workerName || 'Worker Ativo'}
                    </span>

                    <p className="text-[10px] text-[#e5ba48] font-serif italic mt-3 pt-2 border-t border-[#d4a738]/15">
                      ✦ {currentPillar.magicalAspect}
                    </p>
                  </div>

                  {/* Right: Technical Explanation & Architecture Bullets */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded border border-[#ffd778]/30 bg-[#3a1520] text-[#ffd778] text-[10px] font-bold tracking-widest uppercase mb-2">
                        <span>{currentPillar.techBadge}</span>
                      </div>

                      <h3
                        className="text-xl sm:text-2xl font-bold text-[#f6efe2]"
                        style={{ fontFamily: '"Cinzel", serif' }}
                      >
                        {currentPillar.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#ffd778] font-sans mt-0.5 font-medium">
                        {currentPillar.tagline}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#c7b8a5] font-sans leading-relaxed">
                      {currentPillar.summary}
                    </p>

                    {/* Bullet Points */}
                    <div className="space-y-2 pt-1">
                      {currentPillar.bulletPoints.map((bullet, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 text-xs text-[#f6efe2] bg-[#12070c]/70 p-3 rounded border border-white/5"
                        >
                          <span className="text-[#ffd778] font-bold mt-0.5">✦</span>
                          <span className="font-sans leading-relaxed">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODE B: COMPLETE 5 PILLARS DOSSIER */}
          {viewMode === 'dossier' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {ARCHITECTURE_PILLARS.map((pillar) => (
                <div
                  key={pillar.id}
                  className="rounded-lg p-5 border-2 border-[#d4a738]/30 bg-[#160a10]/85 relative flex flex-col justify-between"
                  style={{
                    boxShadow:
                      '0 10px 25px rgba(0,0,0,0.7), inset 0 0 20px rgba(128, 27, 43, 0.15)',
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#d4a738]/20">
                      <span className="text-xs font-mono font-bold text-[#ffd778]">
                        PILAR {pillar.code}
                      </span>
                      <span className="text-[10px] text-[#e5ba48] font-serif italic">
                        {pillar.magicalAspect}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="p-2 rounded bg-[#54121d] border border-[#d4a738]/40 text-[#ffd778]">
                        <pillar.icon size={18} />
                      </div>
                      <h4
                        className="text-sm font-bold text-[#f6efe2] leading-tight"
                        style={{ fontFamily: '"Cinzel", serif' }}
                      >
                        {pillar.title}
                      </h4>
                    </div>

                    <p className="text-xs text-[#c7b8a5] leading-relaxed mb-4 font-sans">
                      {pillar.summary}
                    </p>

                    <div className="space-y-1.5 mb-4">
                      {pillar.bulletPoints.map((pt, idx) => (
                        <div
                          key={idx}
                          className="text-[11px] text-[#f6efe2] flex items-start gap-1.5 font-sans"
                        >
                          <span className="text-[#ffd778] mt-0.5">›</span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#d4a738]/15">
                    <span className="text-[10px] font-mono text-[#ffd778] block truncate">
                      {pillar.techBadge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Confidentiality Footer & Contact CTA */}
          <div className="mt-8 pt-5 border-t border-[#d4a738]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#c7b8a5] max-w-xl text-center sm:text-left font-sans">
              🔒 <strong>Código Restrito sob NDA:</strong> Por compliance e segurança corporativa, o código permanece sob custódia da empresa anterior. Se quiser aprofundar na engenharia de concorrência, recuperação de erros e arquitetura com Patchright:
            </p>

            <button
              onClick={() => {
                onClose()
                onContactClick()
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded border border-[#d4a738] text-xs font-bold tracking-widest uppercase text-[#ffe8a3] transition-all cursor-pointer hover:border-[#ffd778] hover:shadow-xl hover:shadow-[#801b2b]/50 shrink-0"
              style={{
                background:
                  'linear-gradient(180deg, #7a1626 0%, #4a0d17 100%)',
                fontFamily: '"Cinzel", serif',
              }}
            >
              <span>Conversar Comigo</span>
              <ExternalLink size={14} className="text-[#ffd778]" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
