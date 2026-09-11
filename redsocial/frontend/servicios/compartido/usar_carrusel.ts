import { useRef } from 'react'

export function useCarrusel() {
  const pistaRef = useRef<HTMLDivElement>(null)
  return { pistaRef }
}
