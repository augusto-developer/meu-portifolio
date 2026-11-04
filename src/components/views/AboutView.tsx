import { motion } from 'framer-motion'
import { MapPin, ArrowRight, BookOpen } from 'lucide-react'
import { OWNER } from '../../data'
import { BrassCorner, WaxSeal, VintageDivider } from '../ui/BookOrnaments'

interface AboutViewProps {
  onNavigate: (tab: 'projetos' | 'habilidades' | 'contato') => void
}

export default function AboutView({ onNavigate }: AboutViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="max-w-4xl mx-auto w-full pt-28 pb-16 px-4"
    >
      {/* Ancient Bound Ledger / Scholar's Lectern Folio */}
      <div
        className="relative rounded-lg border-2 border-[#d4a738]/40 p-8 md:p-12 overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #1f1117 0%, #170d12 50%, #12090e 100%)',
          boxShadow:
            '0 25px 60px rgba(0, 0, 0, 0.9), inset 0 0 50px rgba(80, 15, 25, 0.25), 0 0 30px rgba(212, 167, 56, 0.1)',
        }}
      >
        {/* 4 Authentic Victorian Brass Corner Mounts */}
        <BrassCorner position="tl" size={36} />
        <BrassCorner position="tr" size={36} />
        <BrassCorner position="bl" size={36} />
        <BrassCorner position="br" size={36} />

        {/* Embossed Leather Book Spine Ribs on Left Border */}
        <div className="absolute left-0 inset-y-0 w-3 bg-gradient-to-r from-[#0d0609] via-[#351620] to-[#140a0f] border-r border-[#d4a738]/30 hidden sm:block">
          <div className="h-full flex flex-col justify-around py-8">
            <div className="h-1 bg-[#d4a738]/40 shadow-sm" />
            <div className="h-1 bg-[#d4a738]/40 shadow-sm" />
            <div className="h-1 bg-[#d4a738]/40 shadow-sm" />
            <div className="h-1 bg-[#d4a738]/40 shadow-sm" />
          </div>
        </div>

        {/* Inner Gold-Leaf Tooling Inset Frame */}
        <div className="absolute inset-3 rounded-md border border-[#d4a738]/20 pointer-events-none" />
        <div className="absolute inset-4 rounded-md border border-dashed border-[#d4a738]/15 pointer-events-none" />

        <div className="relative z-10 grid md:grid-cols-[1fr_2fr] gap-8 items-center sm:pl-4">
          {/* Left: Medallion Dossier with Wax Seal */}
          <div className="flex flex-col items-center text-center p-6 rounded border border-[#d4a738]/30 relative bg-[#140a0e]/80 shadow-2xl">
            {/* Wax Seal Ribbon & Stamp */}
            <div className="absolute -top-5 -right-4 z-20">
              <WaxSeal size={48} initial="G" />
            </div>

            {/* Medallion avatar in brass astrolabe ring */}
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center text-5xl mb-4 relative"
              style={{
                background:
                  'radial-gradient(circle at 35% 35%, #5e111d 0%, #2b060c 60%, #100205 100%)',
                border: '3px solid #d4a738',
                boxShadow:
                  '0 0 25px rgba(128, 27, 43, 0.6), inset 0 0 15px rgba(0,0,0,0.9)',
              }}
            >
              {OWNER.avatarPlaceholder}
              {/* Outer decorative ring */}
              <div className="absolute -inset-1.5 rounded-full border border-dashed border-[#e5ba48]/40 pointer-events-none" />
            </div>

            <h2
              className="text-xl font-bold text-[#f6efe2] tracking-wider"
              style={{ fontFamily: '"Cinzel", serif' }}
            >
              {OWNER.name}
            </h2>

            <p
              className="text-xs text-[#e5ba48] font-bold tracking-widest uppercase mt-1"
              style={{ fontFamily: '"Cinzel", serif' }}
            >
              {OWNER.title}
            </p>

            <p className="flex items-center gap-1.5 text-xs text-[#c7b8a5] mt-3 bg-[#0d0609]/70 px-3 py-1 rounded border border-[#d4a738]/15">
              <MapPin size={11} className="text-[#d4a738]" />
              <span>{OWNER.location}</span>
            </p>
          </div>

          {/* Right: Bookish Calligraphic Text & Catalog Plaques */}
          <div className="space-y-5">
            <div className="border-b border-[#d4a738]/25 pb-3">
              <div className="flex items-center gap-2 text-[#e5ba48] text-xs font-bold tracking-widest uppercase mb-1">
                <BookOpen size={13} className="text-[#d4a738]" />
                <span style={{ fontFamily: '"Cinzel", serif' }}>Registro do Escriba & Engenheiro</span>
              </div>

              <h1
                className="text-2xl md:text-3xl font-bold text-[#f6efe2] tracking-wide"
                style={{
                  fontFamily: '"Cinzel", serif',
                  textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                }}
              >
                Forjando Sistemas & Códigos de Excelência
              </h1>
            </div>

            <p className="text-sm text-[#c7b8a5] leading-relaxed font-sans">
              {OWNER.bio}
            </p>

            <VintageDivider />

            {/* 3 Brass-Plated Archival Records */}
            <div className="grid grid-cols-3 gap-3">
              <div
                className="p-3 rounded border border-[#d4a738]/30 text-center relative shadow-md"
                style={{
                  background:
                    'linear-gradient(180deg, #221218 0%, #140a0e 100%)',
                }}
              >
                <span
                  className="block text-2xl font-bold text-[#ffd778]"
                  style={{ fontFamily: '"Cinzel", serif' }}
                >
                  3+
                </span>
                <span className="text-[10px] text-[#c7b8a5] uppercase tracking-wider font-semibold">
                  Anos de Prática
                </span>
              </div>

              <div
                className="p-3 rounded border border-[#d4a738]/30 text-center relative shadow-md"
                style={{
                  background:
                    'linear-gradient(180deg, #221218 0%, #140a0e 100%)',
                }}
              >
                <span
                  className="block text-2xl font-bold text-[#ffd778]"
                  style={{ fontFamily: '"Cinzel", serif' }}
                >
                  20+
                </span>
                <span className="text-[10px] text-[#c7b8a5] uppercase tracking-wider font-semibold">
                  Tomos Forjados
                </span>
              </div>

              <div
                className="p-3 rounded border border-[#d4a738]/30 text-center relative shadow-md"
                style={{
                  background:
                    'linear-gradient(180deg, #221218 0%, #140a0e 100%)',
                }}
              >
                <span
                  className="block text-2xl font-bold text-[#ffd778]"
                  style={{ fontFamily: '"Cinzel", serif' }}
                >
                  100%
                </span>
                <span className="text-[10px] text-[#c7b8a5] uppercase tracking-wider font-semibold">
                  Código Autoral
                </span>
              </div>
            </div>

            {/* Brass Clasp & Crimson Velvet Buttons */}
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('projetos')}
                className="px-6 py-2.5 rounded border border-[#d4a738] text-[#ffe8a3] text-xs font-bold tracking-widest uppercase flex items-center gap-2 transition-all cursor-pointer hover:border-[#ffd778] hover:shadow-xl hover:shadow-[#801b2b]/40"
                style={{
                  background:
                    'linear-gradient(180deg, #8a192b 0%, #5e0e1b 100%)',
                  boxShadow:
                    '0 4px 12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,220,130,0.4)',
                  fontFamily: '"Cinzel", serif',
                }}
              >
                <span>Abrir Tomos de Projetos</span>
                <ArrowRight size={13} className="text-[#ffd778]" />
              </button>

              <button
                onClick={() => onNavigate('contato')}
                className="px-5 py-2.5 rounded border border-[#d4a738]/40 text-[#c7b8a5] hover:text-[#f6efe2] hover:bg-[#801b2b]/20 text-xs font-bold tracking-widest uppercase transition-all cursor-pointer"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                Enviar Carta
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
