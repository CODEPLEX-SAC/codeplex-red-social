import type { ColeccionGuardada, GrupoGuardado } from '@/tipos/guardados/modelo_guardados'

export interface ParametrosFiltroGruposGuardados {
  grupos: readonly GrupoGuardado[]
  quitados: readonly string[]
  coleccion?: ColeccionGuardada
}
