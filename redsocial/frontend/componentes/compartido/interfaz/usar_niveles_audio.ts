import { useRef, useState } from 'react'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const medicion = catalogoCompartido.audio.grabacion.medicion

export function usarNivelesAudio() {
  const [niveles, setNiveles] = useState<readonly number[]>([])
  const acumulados = useRef<number[]>([])
  const contexto = useRef<AudioContext | null>(null)
  const reloj = useRef(0)

  function comenzar(flujo: MediaStream) {
    acumulados.current = []
    setNiveles([])
    if (typeof AudioContext === 'undefined') return
    const nuevo = new AudioContext()
    const analizador = nuevo.createAnalyser()
    nuevo.createMediaStreamSource(flujo).connect(analizador)
    const datos = new Uint8Array(analizador.fftSize)
    contexto.current = nuevo
    reloj.current = window.setInterval(() => {
      analizador.getByteTimeDomainData(datos)
      const nivel = datos.reduce((mayor, valor) => Math.max(mayor, Math.abs(valor - medicion.centro)), 0) / medicion.centro
      acumulados.current.push(Math.min(1, nivel * medicion.ganancia))
      setNiveles([...acumulados.current])
    }, medicion.intervalo_ms)
  }

  function parar(): number[] {
    window.clearInterval(reloj.current)
    void contexto.current?.close()
    contexto.current = null
    return acumulados.current
  }

  return { niveles, comenzar, parar }
}
