import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { OWNER } from '../../data'
import SectionHeader from '../ui/SectionHeader'

export default function AboutSection() {
  const { ref, inView } = useInView(0.2)

  return (
    <section id="sobre" ref={ref as React.RefObject<HTMLElement>} className="relative py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader label="O Artífice" title="Sobre Mim" inView={inView} />

        <div className="mt-14 grid md:grid-cols-[1fr_1.6fr] gap-12 items-start">
          {/* Left: decorative parchment card */}
          <motion.div
            className="rounded-lg p-6 text-center"
            style={{
              background: 'rgba(251,248,242,0.75)',
              border: '1px solid #cfbe9b',
            }}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div
              className="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-5xl mb-4"
              style={{
                background: 'radial-gradient(circle at 38% 38%, #fbf8f2, #e8dcbe)',
                boxShadow: '0 2px 12px rgba(197,154,63,0.15)',
              }}
            >
              {OWNER.avatarPlaceholder}
            </div>

            <p style={{ fontFamily: '"Cinzel", serif', fontSize: '0.95rem', color: '#2b2118', letterSpacing: '0.05em' }}>
              {OWNER.name}
            </p>
            <p
              className="mt-1"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '0.9rem', color: '#8c735d' }}
            >
              {OWNER.location}
            </p>

            <div className="mt-4 flex items-center justify-center gap-2" style={{ opacity: 0.4 }}>
              <div className="h-px flex-1" style={{ background: '#b8a48e' }} />
              <span style={{ color: '#c59a3f', fontSize: '0.7rem' }}>✦</span>
              <div className="h-px flex-1" style={{ background: '#b8a48e' }} />
            </div>

            <div className="mt-4 flex justify-around text-center">
              {[{ value: '3+', label: 'Anos de Prática' }, { value: '20+', label: 'Projetos' }].map(({ value, label }) => (
                <div key={label}>
                  <p style={{ fontFamily: '"Cinzel Decorative", serif', fontSize: '1.4rem', color: '#c59a3f' }}>{value}</p>
                  <p style={{ fontFamily: '"EB Garamond", serif', fontSize: '0.8rem', color: '#8c735d' }}>{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: narrative text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          >
            <p
              className="leading-relaxed"
              style={{ fontFamily: '"EB Garamond", serif', fontSize: '1.15rem', color: '#3d2e22' }}
            >
              {OWNER.bio}
            </p>

            <div className="mt-8 space-y-3">
              {[
                { label: 'Formação', value: 'Ciência da Computação' },
                { label: 'Especialidade', value: 'Desenvolvimento Web Full-Stack' },
                { label: 'Interesse atual', value: 'AI-Assisted Development & Design Systems' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex gap-3 pb-2"
                  style={{ borderBottom: '1px solid rgba(207,190,155,0.4)' }}
                >
                  <span
                    className="shrink-0 font-medium w-36"
                    style={{ fontFamily: '"Cinzel", serif', fontSize: '0.72rem', letterSpacing: '0.08em', color: '#8c735d' }}
                  >
                    {label}
                  </span>
                  <span style={{ fontFamily: '"EB Garamond", serif', fontSize: '1rem', color: '#3d2e22' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
