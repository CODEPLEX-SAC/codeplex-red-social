import { useLayoutEffect, useRef } from 'react'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'

void catalogoCompartido

export function useEstiloDinamico<T extends HTMLElement>(propiedades: Record<string, string | undefined>) {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const elemento = ref.current
    if (!elemento) return
    for (const [propiedad, valor] of Object.entries(propiedades)) {
      if (valor === undefined) continue
      elemento.style.setProperty(propiedad, valor)
    }
  })

  return ref
}
