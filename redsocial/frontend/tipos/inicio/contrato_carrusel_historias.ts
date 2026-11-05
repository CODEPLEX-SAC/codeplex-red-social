import type { ReactNode } from 'react'

export interface NavegacionCarrusel {
  hayAnterior: boolean
  haySiguiente: boolean
  onAnterior: () => void
  onSiguiente: () => void
}

export interface EtiquetasCarrusel {
  anterior: string
  siguiente: string
  vecina: (indice: number, distancia: number) => string
}

export interface CarruselHistoriasProps {
  historias: readonly { id: string }[]
  indice: number
  navegacion: NavegacionCarrusel
  etiquetas: EtiquetasCarrusel
  onCambiar: (indice: number) => void
  renderTarjeta: (indice: number, distancia: number) => ReactNode
}

export interface TarjetaCarrusel {
  indice: number
  distancia: number
}
