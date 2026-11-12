import { useEffect, useRef } from 'react'

export function usarFlujoVideo(flujo: MediaStream | null) {
  const referencia = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const elemento = referencia.current
    if (elemento === null) return
    elemento.srcObject = flujo
  }, [flujo])

  return referencia
}
