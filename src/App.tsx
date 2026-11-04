import { useState } from 'react'
import VoidOverlay from './components/VoidOverlay'
import MapReveal from './components/MapReveal'
import MapPortfolio from './components/MapPortfolio'

type AppState = 'void' | 'revealing' | 'revealed'

export default function App() {
  const [state, setState] = useState<AppState>('void')

  const handleOrbClick = () => setState('revealing')
  const handleRevealComplete = () => setState('revealed')
  const handleHideMap = () => setState('void')

  return (
    <>
      {/* 1. O Vazio Noturno com o Orbe de Luz */}
      <VoidOverlay
        visible={state === 'void'}
        onOrbClick={handleOrbClick}
      />

      {/* 2. A Revelação do Mapa com a Tinta se Espalhando & Frase Solene */}
      {state === 'revealing' && (
        <MapReveal onComplete={handleRevealComplete} />
      )}

      {/* 3. O Portfólio DENTRO DO MAPA (Navegação Cômodo a Cômodo com Pezinhos) */}
      {state === 'revealed' && (
        <MapPortfolio onHideMap={handleHideMap} />
      )}
    </>
  )
}
