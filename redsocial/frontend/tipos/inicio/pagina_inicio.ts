export interface Historia {
  nombre: string
  crear?: boolean
}

export interface PublicacionInicio {
  nombre: string
  tiempo: string
  texto: string
  reacciones: string
  comentarios: string
}

export interface PublicacionCompartidaInicio {
  nombre: string
  tiempoCompartio: string
  origenNombre: string
  origenTiempo: string
  texto: string
}
