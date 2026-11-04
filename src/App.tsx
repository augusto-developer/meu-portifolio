import { useState } from 'react'
import VoidOverlay from './components/VoidOverlay'
import MapReveal from './components/MapReveal'
import Portfolio from './components/Portfolio'

type AppState = 'void' | 'revealing' | 'revealed'

export default function App() {
  const [state, setState] = useState<AppState>('void')

  const handleOrbClick = () => setState('revealing')
  const handleRevealComplete = () => setState('revealed')
  const handleHideMap = () => setState('void')

  return (
    <>
      {/* The dark mystical void — always mounted for smooth transitions */}
      <VoidOverlay
        visible={state === 'void'}
        onOrbClick={handleOrbClick}
      />

      {/* The ink-bleed reveal transition */}
      {state === 'revealing' && (
        <MapReveal onComplete={handleRevealComplete} />
      )}

      {/* The parchment portfolio — mounted after reveal */}
      {state === 'revealed' && (
        <Portfolio onHideMap={handleHideMap} />
      )}
    </>
  )
}

