import { useEffect, useRef } from 'react'

interface Mote {
  x: number
  y: number
  r: number
  vy: number
  vx: number
  alpha: number
  maxAlpha: number
  pulseSpeed: number
  color: string
}

/**
 * Atmospheric Clean Wooden Library & Magical Book Background:
 * 1. Rich dark mahogany wood wall paneling with warm candlelight vignette.
 * 2. Left & Right flanking silhouettes of grand gothic bookshelves with magical tomes.
 * 3. 60fps Canvas particle system of floating starlight motes and candle hearth sparks.
 */
export default function LibraryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const count = 45
    const motes: Mote[] = []

    for (let i = 0; i < count; i++) {
      const rand = Math.random()
      let color = '229, 186, 72' // Warm Candlelight Gold
      if (rand < 0.2) {
        color = '165, 36, 54' // Gryffindor Hearth Ruby
      } else if (rand > 0.8) {
        color = '255, 238, 175' // Starlight Spark
      }

      motes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.5,
        vy: -(Math.random() * 0.3 + 0.1),
        vx: (Math.random() - 0.5) * 0.2,
        alpha: Math.random(),
        maxAlpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.015 + 0.006,
        color,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < motes.length; i++) {
        const m = motes[i]
        m.y += m.vy
        m.x += m.vx
        m.alpha += m.pulseSpeed

        if (m.y < -10) {
          m.y = h + 10
          m.x = Math.random() * w
        }
        if (m.x < -10) m.x = w + 10
        if (m.x > w + 10) m.x = -10

        const currentAlpha = (Math.sin(m.alpha) * 0.5 + 0.5) * m.maxAlpha

        ctx.beginPath()
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${m.color}, ${currentAlpha.toFixed(2)})`
        ctx.shadowColor = `rgba(${m.color}, 0.8)`
        ctx.shadowBlur = 6
        ctx.fill()
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* 1. Clean Wooden Wall Panels with Warm Hearth Lighting */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: '#0c0709',
          backgroundImage: `
            radial-gradient(ellipse at 50% 15%, rgba(140, 25, 42, 0.18) 0%, transparent 65%),
            radial-gradient(ellipse at 50% 85%, rgba(212, 167, 56, 0.10) 0%, transparent 70%),
            linear-gradient(180deg, #160c11 0%, #0d070a 40%, #080406 100%)
          `,
        }}
      />

      {/* Subtle Vertical Wood Plank Grooves (Clean & Minimal) */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent, transparent 140px, rgba(0, 0, 0, 0.6) 140px, rgba(0, 0, 0, 0.6) 141px, rgba(212, 167, 56, 0.04) 141px, rgba(212, 167, 56, 0.04) 142px)',
        }}
      />

      {/* 2. Left Gothic Bookshelf with Magical Tomes (Clean Vector Silhouette) */}
      <div className="absolute left-0 top-0 bottom-0 w-48 sm:w-64 opacity-20 hidden lg:block">
        <svg width="100%" height="100%" viewBox="0 0 240 1000" preserveAspectRatio="none" fill="none">
          <defs>
            <linearGradient id="woodShelfGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4a1c28" />
              <stop offset="70%" stopColor="#241017" />
              <stop offset="100%" stopColor="#0d0609" />
            </linearGradient>
            <linearGradient id="bookGold" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d4a738" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8c5e14" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Bookcase Side Column */}
          <rect x="0" y="0" width="220" height="1000" fill="url(#woodShelfGrad)" />
          <line x1="220" y1="0" x2="220" y2="1000" stroke="#d4a738" strokeWidth="1" strokeOpacity="0.3" />

          {/* Shelf 1 (Top) */}
          <rect x="10" y="180" width="200" height="12" fill="#30141d" stroke="#d4a738" strokeWidth="0.8" strokeOpacity="0.4" />
          {/* Books on Shelf 1 */}
          <rect x="25" y="80" width="22" height="100" fill="#691624" rx="2" />
          <line x1="28" y1="95" x2="44" y2="95" stroke="url(#bookGold)" strokeWidth="1.5" />
          <rect x="50" y="65" width="28" height="115" fill="#1b1219" rx="2" stroke="#d4a738" strokeWidth="0.5" strokeOpacity="0.3" />
          <rect x="81" y="90" width="20" height="90" fill="#4d111c" rx="2" />
          <rect x="104" y="70" width="32" height="110" fill="#261820" rx="2" />
          {/* Ribbon Bookmark Hanging Down */}
          <path d="M120 180 L120 215 L124 210 L128 215 L128 180 Z" fill="#b8253a" />
          <rect x="139" y="85" width="24" height="95" fill="#541723" rx="2" />
          <rect x="166" y="95" width="26" height="85" fill="#1a0f14" rx="2" />

          {/* Shelf 2 (Middle) */}
          <rect x="10" y="440" width="200" height="12" fill="#30141d" stroke="#d4a738" strokeWidth="0.8" strokeOpacity="0.4" />
          {/* Books on Shelf 2 (Grimoires) */}
          <rect x="25" y="325" width="34" height="115" fill="#24141d" rx="2" />
          <line x1="30" y1="345" x2="54" y2="345" stroke="url(#bookGold)" strokeWidth="2" />
          <line x1="30" y1="355" x2="54" y2="355" stroke="url(#bookGold)" strokeWidth="1" />
          <rect x="62" y="340" width="24" height="100" fill="#5e1523" rx="2" />
          <rect x="89" y="315" width="36" height="125" fill="#1b1016" rx="2" stroke="#d4a738" strokeWidth="0.5" strokeOpacity="0.4" />
          {/* Gold Star on Grimoire Spine */}
          <circle cx="107" cy="360" r="3" fill="#d4a738" />
          <rect x="128" y="335" width="22" height="105" fill="#42121a" rx="2" />
          {/* Tilted Book */}
          <g transform="translate(152, 335) rotate(14)">
            <rect x="0" y="0" width="24" height="105" fill="#2b1822" rx="2" />
          </g>

          {/* Shelf 3 (Lower) */}
          <rect x="10" y="720" width="200" height="12" fill="#30141d" stroke="#d4a738" strokeWidth="0.8" strokeOpacity="0.4" />
          {/* Books on Shelf 3 */}
          <rect x="25" y="605" width="30" height="115" fill="#4a121d" rx="2" />
          <rect x="58" y="590" width="38" height="130" fill="#1d1117" rx="2" />
          <rect x="99" y="620" width="24" height="100" fill="#6e1827" rx="2" />
          <rect x="126" y="610" width="28" height="110" fill="#261620" rx="2" />
          <rect x="157" y="625" width="32" height="95" fill="#381017" rx="2" />
        </svg>
      </div>

      {/* 3. Right Gothic Bookshelf with Magical Tomes (Clean Vector Silhouette) */}
      <div className="absolute right-0 top-0 bottom-0 w-48 sm:w-64 opacity-20 hidden lg:block">
        <svg width="100%" height="100%" viewBox="0 0 240 1000" preserveAspectRatio="none" fill="none">
          <g transform="scale(-1, 1) translate(-240, 0)">
            {/* Bookcase Side Column */}
            <rect x="0" y="0" width="220" height="1000" fill="url(#woodShelfGrad)" />
            <line x1="220" y1="0" x2="220" y2="1000" stroke="#d4a738" strokeWidth="1" strokeOpacity="0.3" />

            {/* Shelf 1 */}
            <rect x="10" y="200" width="200" height="12" fill="#30141d" stroke="#d4a738" strokeWidth="0.8" strokeOpacity="0.4" />
            <rect x="25" y="90" width="36" height="110" fill="#22131b" rx="2" />
            <rect x="64" y="105" width="22" height="95" fill="#5a1522" rx="2" />
            <rect x="89" y="80" width="28" height="120" fill="#170d13" rx="2" stroke="#d4a738" strokeWidth="0.5" strokeOpacity="0.4" />
            <rect x="120" y="100" width="30" height="100" fill="#42111b" rx="2" />
            {/* Ribbon Bookmark */}
            <path d="M135 200 L135 235 L139 230 L143 235 L143 200 Z" fill="#d4a738" />
            <rect x="153" y="110" width="24" height="90" fill="#691624" rx="2" />

            {/* Shelf 2 */}
            <rect x="10" y="470" width="200" height="12" fill="#30141d" stroke="#d4a738" strokeWidth="0.8" strokeOpacity="0.4" />
            <rect x="25" y="360" width="28" height="110" fill="#381018" rx="2" />
            <rect x="56" y="345" width="34" height="125" fill="#1b0f16" rx="2" />
            <circle cx="73" cy="385" r="3.5" fill="#d4a738" />
            <rect x="93" y="370" width="26" height="100" fill="#611724" rx="2" />
            <rect x="122" y="350" width="38" height="120" fill="#25161f" rx="2" stroke="#d4a738" strokeWidth="0.5" strokeOpacity="0.3" />
            <rect x="163" y="375" width="24" height="95" fill="#4d121c" rx="2" />

            {/* Shelf 3 */}
            <rect x="10" y="740" width="200" height="12" fill="#30141d" stroke="#d4a738" strokeWidth="0.8" strokeOpacity="0.4" />
            <rect x="25" y="630" width="32" height="110" fill="#521420" rx="2" />
            <rect x="60" y="615" width="26" height="125" fill="#1c1017" rx="2" />
            <rect x="89" y="640" width="34" height="100" fill="#281621" rx="2" />
            <rect x="126" y="625" width="28" height="115" fill="#421019" rx="2" />
            <rect x="157" y="635" width="30" height="105" fill="#661825" rx="2" />
          </g>
        </svg>
      </div>

      {/* 4. Canvas Floating Starlight Motes & Candle Fire Sparks */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.85 }}
      />
    </div>
  )
}
