import type { Sugerencia } from './modelo_amigos_sugerencias'

export interface TarjetaSugerenciaProps {
  sugerencia: Sugerencia
}

export interface SeccionSugerenciasProps {
  sugerencias: readonly Sugerencia[]
}
