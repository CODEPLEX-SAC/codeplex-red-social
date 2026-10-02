import type { ReactNode } from 'react'

export type ClaveRutaMensajeria = 'todos' | 'no_leidos' | 'favoritos' | 'videollamadas'

export interface PestanaMensajeItem {
  etiqueta: ReactNode
  clave: ClaveRutaMensajeria
  insignia?: number
}
