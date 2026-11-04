interface BrassCornerProps {
  position: 'tl' | 'tr' | 'bl' | 'br'
  size?: number
  className?: string
}

/**
 * Authentic Victorian / Gothic Brass Book Corner Ornament (SVG)
 * Provides metallic gold/brass filigree bracket for tomes, folios, and shelves.
 */
export function BrassCorner({ position, size = 32, className = '' }: BrassCornerProps) {
  const rotation =
    position === 'tl'
      ? 'rotate(0)'
      : position === 'tr'
      ? 'rotate(90deg)'
      : position === 'br'
      ? 'rotate(180deg)'
      : 'rotate(270deg)'

  const posClasses =
    position === 'tl'
      ? '-top-1 -left-1'
      : position === 'tr'
      ? '-top-1 -right-1'
      : position === 'br'
      ? '-bottom-1 -right-1'
      : '-bottom-1 -left-1'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={`absolute ${posClasses} pointer-events-none select-none z-20 ${className}`}
      style={{ transform: rotation }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff0b8" />
          <stop offset="35%" stopColor="#d4a738" />
          <stop offset="70%" stopColor="#8f6418" />
          <stop offset="100%" stopColor="#4a3008" />
        </linearGradient>
        <filter id="brassShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.8" />
        </filter>
      </defs>

      <g filter="url(#brassShadow)">
        {/* Outer bracket arm */}
        <path
          d="M2 38 L2 6 C2 3.8 3.8 2 6 2 L38 2 L38 7 L12 7 C9.2 7 7 9.2 7 12 L7 38 Z"
          fill="url(#brassGrad)"
        />
        {/* Inner filigree scroll */}
        <path
          d="M10 24 C10 16 16 10 24 10 L30 10 L28 14 L24 14 C18.5 14 14 18.5 14 24 Z"
          fill="url(#brassGrad)"
          opacity="0.85"
        />
        {/* Corner Rivet */}
        <circle cx="10" cy="10" r="2.8" fill="#fff5cc" />
        <circle cx="10" cy="10" r="2.2" fill="#9c6d1a" />
        <circle cx="9.3" cy="9.3" r="0.8" fill="#ffffff" />
      </g>
    </svg>
  )
}

interface WaxSealProps {
  size?: number
  initial?: string
  className?: string
}

/**
 * Gryffindor Crimson Wax Seal
 * Stamped lacquer wax with raised rim, organic melted droplets, and embossed gold monogram.
 */
export function WaxSeal({ size = 52, initial = '✦', className = '' }: WaxSealProps) {
  return (
    <div
      className={`relative rounded-full flex items-center justify-center select-none shadow-2xl ${className}`}
      style={{
        width: size,
        height: size,
        background: 'radial-gradient(circle at 35% 35%, #9e1c2d 0%, #610d19 60%, #30050c 100%)',
        boxShadow:
          '0 6px 16px rgba(0, 0, 0, 0.75), inset 0 2px 4px rgba(255, 200, 200, 0.35), inset 0 -3px 6px rgba(0, 0, 0, 0.65)',
        border: '2px solid #7d1323',
      }}
    >
      {/* Irregular outer wax drips */}
      <div
        className="absolute inset-1 rounded-full border border-[#b82a3d]/50 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 6px rgba(40, 0, 8, 0.7)',
        }}
      />

      {/* Stamped core symbol */}
      <span
        className="relative z-10 text-amber-200 font-bold"
        style={{
          fontFamily: '"Cinzel", serif',
          fontSize: size * 0.38,
          textShadow: '0 1px 2px rgba(0,0,0,0.9), 0 0 8px rgba(235, 186, 68, 0.6)',
        }}
      >
        {initial}
      </span>
    </div>
  )
}

/**
 * Classical Gold-Leaf Tooling Divider (Flourish)
 */
export function VintageDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 my-4 ${className}`}>
      <div className="h-[1px] flex-1 max-w-[120px] bg-gradient-to-r from-transparent via-[#d4a738]/50 to-transparent" />
      <span className="text-[#d4a738] text-xs font-serif tracking-widest select-none">✦ ❖ ✦</span>
      <div className="h-[1px] flex-1 max-w-[120px] bg-gradient-to-r from-transparent via-[#d4a738]/50 to-transparent" />
    </div>
  )
}
