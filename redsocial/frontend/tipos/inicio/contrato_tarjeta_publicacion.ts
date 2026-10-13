import type { PublicacionTextoInicio } from './modelo_inicio'

export interface TarjetaPublicacionProps {
  publicacion: PublicacionTextoInicio
  onEditar: (id: string, texto: string) => void
  onEliminar: (id: string) => void
}
