import { useLayoutEffect, useRef } from 'react'
import type { RefObject } from 'react'

export function usarMemoriaScrollPestanas(
  pistaRef: RefObject<HTMLDivElement | null>,
  activaRef: RefObject<HTMLAnchorElement | null>,
  activa: string,
) {
  const posicionRef = useRef(0)

  useLayoutEffect(() => {
    const pista = pistaRef.current
    if (!pista) return
    pista.scrollLeft = posicionRef.current

    const pestana = activaRef.current
    if (pestana) {
      const pistaRect = pista.getBoundingClientRect()
      const pestanaRect = pestana.getBoundingClientRect()
      if (pestanaRect.left < pistaRect.left) {
        pista.scrollLeft += pestanaRect.left - pistaRect.left
      } else if (pestanaRect.right > pistaRect.right) {
        pista.scrollLeft += pestanaRect.right - pistaRect.right
      }
    }
    posicionRef.current = pista.scrollLeft
  }, [activa])

  function alDesplazarManualmente() {
    if (pistaRef.current) posicionRef.current = pistaRef.current.scrollLeft
  }

  return { alDesplazarManualmente }
}
