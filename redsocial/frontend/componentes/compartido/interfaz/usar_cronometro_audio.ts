import { useRef, useState } from 'react'
import { limiteAlcanzado } from './logica_audio'

const MILISEGUNDOS = 1000

export function usarCronometroAudio() {
  const [segundos, setSegundos] = useState(0)
  const transcurridos = useRef(0)
  const reloj = useRef(0)

  function comenzar(limite: number | null, alLimite: () => void) {
    transcurridos.current = 0
    setSegundos(0)
    reloj.current = window.setInterval(() => {
      transcurridos.current += 1
      setSegundos(transcurridos.current)
      if (limiteAlcanzado(transcurridos.current, limite)) alLimite()
    }, MILISEGUNDOS)
  }

  function parar(): number {
    window.clearInterval(reloj.current)
    return transcurridos.current
  }

  return { segundos, comenzar, parar }
}
