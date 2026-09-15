import { useRef } from 'react'

export function usarCarrusel() {
  const pistaRef = useRef<HTMLDivElement>(null)
  return { pistaRef }
}
