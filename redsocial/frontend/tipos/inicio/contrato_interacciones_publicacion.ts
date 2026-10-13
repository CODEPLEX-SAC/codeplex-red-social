export interface ComentarioPublicacion {
  id: string
  autor: string
  texto: string
  tiempo: string
}

export interface InteraccionesPublicacionProps {
  nombre: string
  texto: string
  reaccionesIniciales: number
  comentariosIniciales: number
  iconosReacciones?: string
}

export interface SeccionComentariosPublicacionProps {
  id: string
  comentarios: ComentarioPublicacion[]
  total: number
  onComentar: (texto: string) => void
}

export interface DialogoCompartirPublicacionProps {
  nombre: string
  texto: string
  onCompartir: () => void
  onCerrar: () => void
}

export interface DialogoEliminarPublicacionProps {
  onConfirmar: () => void
  onCerrar: () => void
}
