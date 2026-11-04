import { useState } from 'react'
import VoidOverlay from './components/VoidOverlay'
import MapReveal from './components/MapReveal'
import CastleMapWorld from './components/CastleMapWorld'

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

      {/* 2. A Revelação do Filme com Linhas de Tinta Se Desenhando & Frase Solene */}
      {state === 'revealing' && (
        <MapReveal onComplete={handleRevealComplete} />
      )}

      {/* 3. O Mundo do Mapa do Castelo: A Câmera se desloca seguindo os pezinhos pelas curvas! */}
      {state === 'revealed' && (
        <CastleMapWorld onHideMap={handleHideMap} />
      )}
    </>
  )
}
