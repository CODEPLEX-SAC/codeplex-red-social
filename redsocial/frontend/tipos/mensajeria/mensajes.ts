export interface Conversacion {
  nombre: string
  extracto: string
  hora: string
  noLeidos?: number
  esGrupo?: boolean
  silenciado?: boolean
}

export interface Mensaje {
  fecha?: string
  contenido?: string
  adjunto?: { nombre: string; peso: string }
  reaccion?: { emoji: string; cantidad: number }
  hora?: string
  propio: boolean
  confirmado?: boolean
}

export interface ConversacionActiva {
  nombre: string
  enLinea: boolean
  mensajeFijado: string
  hilo: readonly Mensaje[]
}
