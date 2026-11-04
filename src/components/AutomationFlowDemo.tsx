import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Play,
  Pause,
  Lock,
  Globe,
  Search,
  Database,
  Bell,
  FolderTree,
  Sparkles,
  UploadCloud,
  ExternalLink,
  ChevronRight,
  TrendingDown,
} from 'lucide-react'
import { BrassCorner } from './ui/BookOrnaments'

interface AutomationFlowDemoProps {
  isOpen: boolean
  onClose: () => void
  onContactClick: () => void
}

interface FlowNode {
  id: number
  title: string
  category: string
  description: string
  subtext: string
  icon: typeof Globe
  badge: string
  platformHint?: string
}

const FLOW_NODES: FlowNode[] = [
  {
    id: 1,
    title: 'Acessa Plataforma do Cliente',
    category: 'Ingresso & Autenticação',
    description: 'O daemon em Python e Patchright acessa os portais de clientes externos com proteção antidetect.',
    subtext: 'Bypass de bloqueios de bots e autenticação segura automatizada.',
    icon: Globe,
    badge: 'Patchright + Python',
    platformHint: 'Portais de Terceiros',
  },
  {
    id: 2,
    title: 'Checa Pendentes & Reprovados',
    category: 'Varredura & Diagnóstico',
    description: 'Varre as páginas de compliance do cliente identificando documentos faltantes, vencidos ou com recusa.',
    subtext: 'Extração precisa de motivos de reprovação e prazos de corte.',
    icon: Search,
    badge: 'Varredura DOM',
    platformHint: 'Telas de Compliance',
  },
  {
    id: 3,
    title: 'Salva no Banco de Dados',
    category: 'Persistência & Histórico',
    description: 'Grava o status de cada pendência, prazos limites e histórico de reprovação no banco de dados local.',
    subtext: 'Estruturação de dados para rastreamento de SLA e criticidade.',
    icon: Database,
    badge: 'Persistência Relacional',
    platformHint: 'Banco de Dados',
  },
  {
    id: 4,
    title: 'Dispara Alertas (Email & Teams)',
    category: 'Comunicação Automática',
    description: 'Notifica o DP com relatórios ordenados por urgência e criticidade para que a equipe priorize o que vence antes.',
    subtext: 'Elimina a sobrecarga e foca a equipe apenas nas pendências reais.',
    icon: Bell,
    badge: 'Email / Teams Webhooks',
    platformHint: 'Outlook & MS Teams',
  },
  {
    id: 5,
    title: 'Aguarda no Repositório Interno',
    category: 'Monitoramento de Pastas',
    description: 'Monitora as pastas da empresa no repositório corporativo aguardando a chegada dos documentos assinados.',
    subtext: 'Suporta a transição tecnológica: inicialmente SharePoint e depois FactorialHR.',
    icon: FolderTree,
    badge: 'SharePoint & FactorialHR',
    platformHint: 'Repositório da Empresa',
  },
  {
    id: 6,
    title: 'Match Inteligente com o Banco',
    category: 'Algoritmo de Cruzamento',
    description: 'Identifica a estrutura da árvore de pastas e cruza automaticamente cada arquivo com a pendência certa do banco.',
    subtext: 'Garante que o colaborador e o documento correto sejam pareados sem erro humano.',
    icon: Sparkles,
    badge: 'Fuzzy Matching & Regex',
    platformHint: 'Motor de Mapeamento',
  },
  {
    id: 7,
    title: 'Envia para a Plataforma',
    category: 'Homologação Final',
    description: 'Realiza o upload autônomo na plataforma do cliente, valida o envio e registra o comprovante de homologação.',
    subtext: 'Redução comprovada de 80% nos atrasos e reprovações do setor.',
    icon: UploadCloud,
    badge: '-80% de Atrasos',
    platformHint: 'Upload Concluído',
  },
]

export default function AutomationFlowDemo({
  isOpen,
  onClose,
  onContactClick,
}: AutomationFlowDemoProps) {
  const [activeNode, setActiveNode] = useState(1)
  const [isPlaying, setIsPlaying] = useState(true)

  // Auto-advance step every 3.2s when playing
  useEffect(() => {
    if (!isOpen || !isPlaying) return

    const timer = setInterval(() => {
      setActiveNode((prev) => (prev >= FLOW_NODES.length ? 1 : prev + 1))
    }, 3400)

    return () => clearInterval(timer)
  }, [isOpen, isPlaying])

  if (!isOpen) return null

  const currentNode = FLOW_NODES[activeNode - 1]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="relative w-full max-w-5xl rounded-lg border-2 border-[#d4a738]/50 p-5 sm:p-7 md:p-8 overflow-hidden z-10 my-auto text-[#f6efe2]"
          style={{
            background:
              'linear-gradient(135deg, #1d0f15 0%, #150a0f 60%, #0d060a 100%)',
            boxShadow:
              '0 30px 80px rgba(0, 0, 0, 0.95), inset 0 0 50px rgba(128, 27, 43, 0.25), 0 0 40px rgba(212, 167, 56, 0.15)',
          }}
        >
          {/* 4 Brass Corners */}
          <BrassCorner position="tl" size={32} />
          <BrassCorner position="tr" size={32} />
          <BrassCorner position="bl" size={32} />
          <BrassCorner position="br" size={32} />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded border border-[#d4a738]/40 text-[#c7b8a5] hover:text-[#ffd778] hover:border-[#ffd778] hover:bg-[#801b2b]/30 transition-all cursor-pointer"
            aria-label="Fechar Fluxograma"
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
                Fluxograma Animado do Sistema
              </span>

              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded border border-amber-600/30 bg-amber-950/40 text-amber-300 text-[10px] font-semibold">
                <Lock size={11} className="text-amber-400" />
                <span>Projeto sob Sigilo Empresarial (NDA)</span>
              </span>

              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded border border-[#ffd778]/30 bg-[#6e1624]/60 text-[#ffd778] text-[10px] font-bold">
                <TrendingDown size={11} />
                <span>-80% de Atrasos & Reprovações</span>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#f6efe2] tracking-wide"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                Automação de Documentos do DP
              </h2>

              {/* Play / Pause toggle */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#d4a738]/40 bg-[#160a0f] text-xs font-semibold text-[#ffd778] hover:border-[#ffd778] transition-colors cursor-pointer self-start sm:self-auto"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                {isPlaying ? (
                  <>
                    <Pause size={12} /> <span>Pausar Fluxo</span>
                  </>
                ) : (
                  <>
                    <Play size={12} className="fill-[#ffd778]" /> <span>Reproduzir Fluxo</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ANIMATED FLOWCHART (DIAGRAMA INTERATIVO COM SETINHAS) */}
          <div className="mb-6 p-4 rounded border border-[#d4a738]/30 bg-[#12070c]/80 relative overflow-hidden">
            {/* Background subtle grid lines */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(212, 167, 56, 0.4) 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            />

            {/* Top row: Steps 1 to 4 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 relative z-10">
              {FLOW_NODES.slice(0, 4).map((node, index) => {
                const isActive = activeNode === node.id
                return (
                  <div key={node.id} className="relative flex flex-col">
                    <button
                      onClick={() => {
                        setActiveNode(node.id)
                        setIsPlaying(false)
                      }}
                      className={`w-full p-3 rounded border text-left transition-all duration-200 cursor-pointer relative overflow-hidden h-full flex flex-col justify-between ${
                        isActive
                          ? 'border-[#ffd778] bg-[#6e1624]/80 shadow-lg shadow-[#801b2b]/40 scale-[1.02]'
                          : 'border-[#d4a738]/25 bg-[#170a10]/80 hover:border-[#d4a738]/60 hover:bg-[#200f16]'
                      }`}
                    >
                      {/* Top bar with Step Number & Status Orb */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-[#ffd778] font-mono tracking-wider">
                          0{node.id}
                        </span>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            isActive
                              ? 'bg-[#ffd778] shadow-[0_0_8px_#ffd778] animate-ping'
                              : 'bg-[#8c5e14]/50'
                          }`}
                        />
                      </div>

                      {/* Icon & Title */}
                      <div className="flex items-start gap-2 mb-2">
                        <div
                          className={`p-1.5 rounded border shrink-0 ${
                            isActive
                              ? 'bg-[#8a192b] border-[#ffd778] text-[#ffd778]'
                              : 'bg-[#220d15] border-[#d4a738]/30 text-[#e5ba48]'
                          }`}
                        >
                          <node.icon size={15} />
                        </div>
                        <h4
                          className="text-xs font-bold text-[#f6efe2] leading-tight line-clamp-2"
                          style={{ fontFamily: '"Cinzel", serif' }}
                        >
                          {node.title}
                        </h4>
                      </div>

                      {/* Bottom Hint */}
                      <span className="text-[9px] text-[#c7b8a5] block truncate font-mono">
                        {node.platformHint}
                      </span>
                    </button>

                    {/* Horizontal Animated Connector Arrow (Desktop, steps 1, 2, 3) */}
                    {index < 3 && (
                      <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none items-center justify-center">
                        <motion.div
                          animate={{ x: [0, 3, 0] }}
                          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                          className="text-[#ffd778] drop-shadow-[0_0_4px_rgba(212,167,56,0.8)]"
                        >
                          <ChevronRight size={14} />
                        </motion.div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Transition Conduit from Row 1 to Row 2 */}
            <div className="flex items-center justify-end my-3 px-6 relative z-10">
              <div className="flex items-center gap-2 text-xs font-bold text-[#ffd778] tracking-widest uppercase">
                <span className="text-[10px] text-[#c7b8a5] font-mono">Fluxo Contínuo</span>
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                >
                  <span className="text-[#ffd778] text-sm">↴</span>
                </motion.div>
              </div>
            </div>

            {/* Bottom row: Steps 5 to 7 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 relative z-10">
              {FLOW_NODES.slice(4, 7).map((node, index) => {
                const isActive = activeNode === node.id
                return (
                  <div key={node.id} className="relative flex flex-col">
                    <button
                      onClick={() => {
                        setActiveNode(node.id)
                        setIsPlaying(false)
                      }}
                      className={`w-full p-3 rounded border text-left transition-all duration-200 cursor-pointer relative overflow-hidden h-full flex flex-col justify-between ${
                        isActive
                          ? 'border-[#ffd778] bg-[#6e1624]/80 shadow-lg shadow-[#801b2b]/40 scale-[1.02]'
                          : 'border-[#d4a738]/25 bg-[#170a10]/80 hover:border-[#d4a738]/60 hover:bg-[#200f16]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-[#ffd778] font-mono tracking-wider">
                          0{node.id}
                        </span>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            isActive
                              ? 'bg-[#ffd778] shadow-[0_0_8px_#ffd778] animate-ping'
                              : 'bg-[#8c5e14]/50'
                          }`}
                        />
                      </div>

                      <div className="flex items-start gap-2 mb-2">
                        <div
                          className={`p-1.5 rounded border shrink-0 ${
                            isActive
                              ? 'bg-[#8a192b] border-[#ffd778] text-[#ffd778]'
                              : 'bg-[#220d15] border-[#d4a738]/30 text-[#e5ba48]'
                          }`}
                        >
                          <node.icon size={15} />
                        </div>
                        <h4
                          className="text-xs font-bold text-[#f6efe2] leading-tight"
                          style={{ fontFamily: '"Cinzel", serif' }}
                        >
                          {node.title}
                        </h4>
                      </div>

                      <span className="text-[9px] text-[#c7b8a5] block truncate font-mono">
                        {node.platformHint}
                      </span>
                    </button>

                    {/* Horizontal Animated Connector Arrow */}
                    {index < 2 && (
                      <div className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none items-center justify-center">
                        <motion.div
                          animate={{ x: [0, 3, 0] }}
                          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                          className="text-[#ffd778] drop-shadow-[0_0_4px_rgba(212,167,56,0.8)]"
                        >
                          <ChevronRight size={14} />
                        </motion.div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* ACTIVE STEP DETAILS CARD (ESTILO LIVRO MÁGICO / GRIMÓRIO) */}
          <div
            className="p-4 sm:p-5 rounded border border-[#d4a738]/40 mb-6 relative overflow-hidden"
            style={{
              background:
                'linear-gradient(180deg, #1f0f16 0%, #12070c 100%)',
              boxShadow: 'inset 0 0 25px rgba(128, 27, 43, 0.25)',
            }}
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-3 rounded border border-[#d4a738]/40 bg-[#54121d] text-[#ffd778] shrink-0 shadow-md">
                <currentNode.icon size={24} />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded border border-[#d4a738]/40 bg-[#3a1520] text-[#ffd778] uppercase font-bold tracking-wider"
                    style={{ fontFamily: '"Cinzel", serif' }}
                  >
                    Etapa 0{currentNode.id} · {currentNode.category}
                  </span>

                  <span className="text-[10px] px-2 py-0.5 rounded border border-white/10 bg-white/5 text-[#c7b8a5] font-mono">
                    {currentNode.badge}
                  </span>
                </div>

                <h3
                  className="text-base sm:text-lg font-bold text-[#f6efe2] mb-1"
                  style={{ fontFamily: '"Cinzel", serif' }}
                >
                  {currentNode.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#f6efe2] font-sans leading-relaxed mb-2">
                  {currentNode.description}
                </p>

                <p className="text-xs text-[#c7b8a5] font-sans leading-relaxed bg-[#0c0508]/80 p-2.5 rounded border border-white/5">
                  ✦ <strong>Funcionamento:</strong> {currentNode.subtext}
                </p>
              </div>
            </div>
          </div>

          {/* Confidentiality Footer & Contact CTA */}
          <div className="pt-4 border-t border-[#d4a738]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-[#c7b8a5] max-w-lg text-center sm:text-left font-sans">
              🔒 <strong>Código Restrito sob NDA:</strong> Por compliance corporativo, o repositório é privado. Se quiser entender a fundo o código, tratamento de exceções ou a lógica do Patchright:
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
