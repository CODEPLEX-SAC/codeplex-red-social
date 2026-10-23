import type { MedioLocalPublicacion } from './contrato_crear_publicacion'
import type { InteraccionPublicacion } from './contrato_interacciones_publicacion'
import type { PublicacionTextoInicio } from './modelo_inicio'

export interface TarjetaPublicacionProps {
  publicacion: PublicacionTextoInicio
  compartidos: number
  interaccion: InteraccionPublicacion
  onEditar: (id: string, texto: string, medios: MedioLocalPublicacion[]) => void
  onEliminar: (id: string) => void
  onCompartir: (comentario: string) => void
  onVotar: (opcionId: string) => void
}
