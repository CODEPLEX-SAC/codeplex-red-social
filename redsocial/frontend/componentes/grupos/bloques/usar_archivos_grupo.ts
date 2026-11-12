import { useRef, useState } from 'react'
import type { ChangeEvent } from 'react'

export function usarArchivosGrupo() {
  const selector = useRef<HTMLInputElement>(null)
  const [archivos, setArchivos] = useState<File[]>([])

  function elegir(evento: ChangeEvent<HTMLInputElement>) {
    const elegidos = Array.from(evento.target.files ?? [])
    setArchivos((actuales) => [...actuales, ...elegidos])
    evento.target.value = String()
  }

  return { selector, archivos, abrirSelector: () => selector.current?.click(), elegir, quitar: (indice: number) => setArchivos((actuales) => actuales.filter((_, posicion) => posicion !== indice)) }
}
