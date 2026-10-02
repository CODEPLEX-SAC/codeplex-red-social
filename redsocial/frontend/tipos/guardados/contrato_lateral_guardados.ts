import type { ColeccionGuardada, GrupoRecomendadoGuardado } from '@/tipos/guardados/modelo_guardados'

export interface PanelLateralGuardadosProps {
  colecciones: ColeccionGuardada[]
  recomendados: GrupoRecomendadoGuardado[]
}
