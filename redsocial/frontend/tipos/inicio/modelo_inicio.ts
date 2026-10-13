export interface Historia {
  nombre: string
  crear?: boolean
}

export interface PublicacionInicio {
  autorId: string
  nombre: string
  tiempo: string
  texto: string
  iconosReacciones: string
  totalReacciones: number
  totalComentarios: number
}

export interface PublicacionCompartidaInicio {
  autorId: string
  nombre: string
  tiempoCompartio: string
  origenNombre: string
  origenTiempo: string
  texto: string
}

export interface PublicacionTextoInicio {
  id: string
  autorId: string
  nombre: string
  tiempo: string
  texto: string
  reacciones: number
  comentarios: number
}
