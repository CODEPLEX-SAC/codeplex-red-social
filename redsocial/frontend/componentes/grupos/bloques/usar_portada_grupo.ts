import { useRef } from 'react'
import type { ChangeEvent } from 'react'

export function usarPortadaGrupo(alElegir: (url: string) => void) {
  const selector = useRef<HTMLInputElement>(null)

  function elegir(evento: ChangeEvent<HTMLInputElement>) {
    const archivo = evento.target.files?.[0]
    if (archivo) alElegir(URL.createObjectURL(archivo))
    evento.target.value = String()
  }

  return { selector, abrir: () => selector.current?.click(), elegir }
}
