import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ShoePrint } from './Footprints'

interface MapRevealProps {
  onComplete: () => void
}

/**
 * Revelação Cinematográfica do Mapa do Maroto (Fiel ao Filme).
 * 1. O ponto de luz toca o pergaminho vazio.
 * 2. Linhas de tinta desenham as paredes do castelo e os arcos a partir do centro.
 * 3. A frase sagrada escreve-se em caligrafia de pena: "Juro solenemente entregar um bom trabalho".
 * 4. Pezinhos caminham pelo corredor em direção à entrada do mapa.
 */
export default function MapReveal({ onComplete }: MapRevealProps) {
  const [step, setStep] = useState<'ink-draw' | 'oath' | 'footsteps' | 'done'>('ink-draw')
  const [typedChars, setTypedChars] = useState(0)
  const oathText = 'Juro solenemente entregar um bom trabalho'

  useEffect(() => {
    // 1. Linhas de tinta se desenham (0s - 2.2s)
    const tOath = setTimeout(() => setStep('oath'), 1800)

    // 2. Caligrafia do juramento (1.8s - 4.5s)
    const tSteps = setTimeout(() => setStep('footsteps'), 4600)

    // 3. Conclui e entra no mapa (7.5s)
    const tDone = setTimeout(() => onComplete(), 7600)

    return () => {
      clearTimeout(tOath)
      clearTimeout(tSteps)
      clearTimeout(tDone)
    }
  }, [onComplete])

  // Efeito máquina de caligrafia
  useEffect(() => {
    if (step !== 'oath' && step !== 'footsteps') return
    const interval = setInterval(() => {
      setTypedChars((prev) => {
        if (prev >= oathText.length) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 45)
    return () => clearInterval(interval)
  }, [step])

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden flex flex-col items-center justify-center select-none"
      style={{
        backgroundColor: '#ebd8b6',
        backgroundImage: `
          radial-gradient(#3a2514 0.6px, transparent 0.6px),
          radial-gradient(#8c735d 0.5px, #ebd8b6 0.5px)
        `,
        backgroundSize: '24px 24px',
        backgroundPosition: '0 0, 12px 12px',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
    >
      {/* Vinheta de borda envelhecida profunda */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          boxShadow:
            'inset 0 0 180px rgba(55, 32, 15, 0.45), inset 0 0 50px rgba(35, 20, 10, 0.3)',
        }}
        aria-hidden="true"
      />

      {/* ── DESENHO DA TINTA EM TEMPO REAL (SVG STROKES EXPANDINDO DO CENTRO) ── */}
      <svg
        viewBox="0 0 1000 650"
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      >
        {/* Bordas externas do mapa desenhando-se */}
        <motion.rect
          x="40"
          y="40"
          width="920"
          height="570"
          fill="none"
          stroke="#422b1b"
          strokeWidth="1.6"
          strokeDasharray="920 570"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
        />
        <motion.rect
          x="50"
          y="50"
          width="900"
          height="550"
          fill="none"
          stroke="#7a5535"
          strokeWidth="0.8"
          strokeDasharray="4,2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.0, delay: 0.2, ease: 'easeOut' }}
        />

        {/* Rosa dos Ventos central desenhando-se a partir do ponto central */}
        <g transform="translate(500, 325)">
          <motion.circle
            r="80"
            fill="none"
            stroke="#5a3d24"
            strokeWidth="0.8"
            strokeDasharray="3,2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
          <motion.circle
            r="120"
            fill="none"
            stroke="#5a3d24"
            strokeWidth="0.6"
            strokeDasharray="4,3"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
          />
          {/* Raios da bússola */}
          <motion.line
            x1="0"
            y1="-135"
            x2="0"
            y2="135"
            stroke="#3a2514"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          />
          <motion.line
            x1="-135"
            y1="0"
            x2="135"
            y2="0"
            stroke="#3a2514"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          />
        </g>

        {/* Corredores arquitetônicos irradiando do centro para os lados */}
        {/* Corredor Superior */}
        <motion.path
          d="M 500,200 L 500,70 M 460,200 L 460,70 M 540,200 L 540,70"
          stroke="#422b1b"
          strokeWidth="1.2"
          strokeDasharray="4,2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        />
        {/* Corredor Esquerdo */}
        <motion.path
          d="M 370,325 L 80,325 M 370,295 L 80,295 M 370,355 L 80,355"
          stroke="#422b1b"
          strokeWidth="1.2"
          strokeDasharray="4,2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.7 }}
        />
        {/* Corredor Direito */}
        <motion.path
          d="M 630,325 L 920,325 M 630,295 L 920,295 M 630,355 L 920,355"
          stroke="#422b1b"
          strokeWidth="1.2"
          strokeDasharray="4,2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.7 }}
        />

        {/* ── PEZINHOS CAMINHANDO PELO CORREDOR CENTRAL ── */}
        {(step === 'footsteps' || step === 'done') && (
          <g>
            {[
              { x: 500, y: 160, isLeft: true },
              { x: 520, y: 195, isLeft: false },
              { x: 502, y: 230, isLeft: true },
              { x: 522, y: 265, isLeft: false },
              { x: 504, y: 300, isLeft: true },
              { x: 524, y: 335, isLeft: false },
              { x: 506, y: 370, isLeft: true },
              { x: 526, y: 405, isLeft: false },
            ].map((st, i) => (
              <motion.g
                key={`reveal-foot-${i}`}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 0.9, scale: 1 }}
                transition={{ delay: i * 0.22, duration: 0.3 }}
              >
                <ShoePrint
                  x={st.x}
                  y={st.y}
                  rotation={180}
                  isLeft={st.isLeft}
                  scale={0.65}
                  color="#2e1a0d"
                />
              </motion.g>
            ))}

            {/* Etiqueta caminhante */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              transform="translate(545, 330)"
            >
              <rect
                x="-4"
                y="-13"
                width="78"
                height="18"
                fill="#f6ecd8"
                stroke="#4a2f1c"
                strokeWidth="0.8"
                strokeDasharray="2,1"
                rx="3"
              />
              <text
                x="4"
                y="0"
                fontFamily='"Cinzel", serif'
                fontSize="8.5"
                letterSpacing="0.08em"
                fill="#2e1a0d"
                fontWeight="600"
              >
                O ARTÍFICE
              </text>
            </motion.g>
          </g>
        )}
      </svg>

      {/* ── O JURAMENTO EM CALIGRAFIA DE PENA NO CENTRO ── */}
      <div className="relative z-30 max-w-xl mx-auto px-8 py-8 text-center">
        {/* Banner clássico do Mapa do Maroto */}
        <motion.div
          className="rounded-lg p-7 border-2 border-[#6f4e31] shadow-2xl"
          style={{
            backgroundColor: '#fbf4e4',
            boxShadow: '0 15px 40px rgba(45, 25, 12, 0.45)',
          }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Título formal */}
          <div className="flex items-center justify-center gap-3 mb-2 opacity-75">
            <div className="h-px flex-1 bg-[#5a3d24]" />
            <span
              className="text-xs uppercase tracking-[0.25em] text-[#5a3d24] font-semibold"
              style={{ fontFamily: '"Cinzel", serif', fontSize: '0.68rem' }}
            >
              Palavras Solenes de Abertura
            </span>
            <div className="h-px flex-1 bg-[#5a3d24]" />
          </div>

          <p
            className="text-xs italic text-[#7a5535] mb-4"
            style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem' }}
          >
            Os Artífices do Código têm a honra de apresentar
          </p>

          {/* Caligrafia da frase com cursor */}
          <h1
            className="my-3 text-2xl md:text-4xl text-[#241318] leading-tight min-h-[50px]"
            style={{
              fontFamily: '"Marck Script", cursive',
              textShadow: '0 0 1px rgba(36,19,24,0.4)',
            }}
          >
            "{oathText.slice(0, typedChars)}"
            {typedChars < oathText.length && (
              <span className="inline-block w-1.5 h-6 ml-1 bg-[#8b2626] animate-pulse align-middle" />
            )}
          </h1>

          <div className="flex items-center justify-center gap-3 mt-4 opacity-75">
            <div className="h-px flex-1 bg-[#5a3d24]" />
            <span className="text-xs text-[#8b2626]">❧</span>
            <div className="h-px flex-1 bg-[#5a3d24]" />
          </div>

          {/* Botão de ação direta */}
          <motion.button
            onClick={onComplete}
            className="mt-5 px-8 py-3 rounded-full text-xs font-semibold tracking-widest text-[#fbf8f2] shadow-md transition-all hover:brightness-110 active:scale-95 cursor-pointer inline-flex items-center gap-2"
            style={{
              backgroundColor: '#8b2626',
              fontFamily: '"Cinzel", serif',
              letterSpacing: '0.18em',
              boxShadow: '0 4px 16px rgba(139, 38, 38, 0.4)',
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <span>Entrar no Mapa ➔</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Botão pular no rodapé */}
      <button
        onClick={onComplete}
        className="absolute bottom-5 right-6 z-40 text-xs tracking-widest text-[#5a3d24] hover:text-[#241318] underline underline-offset-4 cursor-pointer font-serif opacity-75 hover:opacity-100 transition-opacity"
        style={{ fontFamily: '"Cinzel", serif', fontSize: '0.68rem' }}
      >
        Pular revelação ➔
      </button>
    </motion.div>
  )
}
