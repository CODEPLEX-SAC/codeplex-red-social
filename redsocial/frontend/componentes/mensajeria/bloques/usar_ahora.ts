import { useEffect, useReducer } from 'react'
import type { RelojMensajeria } from '@/tipos/mensajeria/contrato_mensajes'

export function usarAhora(reloj: RelojMensajeria, proximoInstante: (ahora: Date) => number | null): Date {
  const [disparos, avanzar] = useReducer((cuenta: number) => cuenta + 1, 0)
  const ahora = reloj.ahora()
  const instante = proximoInstante(ahora)

  useEffect(() => {
    if (instante === null) return undefined
    const temporizador = setTimeout(avanzar, Math.max(0, instante - reloj.ahora().getTime()))
    return () => clearTimeout(temporizador)
  }, [reloj, instante, disparos])

  return ahora
}
