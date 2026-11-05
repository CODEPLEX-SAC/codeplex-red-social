import { useLayoutEffect, useRef, useState } from 'react'
import { contarOcultos } from './logica_aplicaciones_visibles'

export function usarAplicacionesVisibles(total: number) {
  const fila = useRef<HTMLDivElement>(null)
  const insignia = useRef<HTMLSpanElement>(null)
  const [ocultas, setOcultas] = useState(0)

  useLayoutEffect(() => {
    const elemento = fila.current
    if (!elemento) return undefined
    const medir = () => setOcultas(contarOcultos(elemento, insignia.current?.offsetWidth ?? 0))
    medir()
    const observador = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(medir)
    observador?.observe(elemento)
    return () => observador?.disconnect()
  }, [total])

  return { fila, insignia, ocultas }
}
