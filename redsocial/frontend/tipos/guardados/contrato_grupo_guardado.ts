import type { ElementoMenu } from '@/tipos/compartido/contrato_menu'
import type { GrupoGuardado } from '@/tipos/guardados/modelo_guardados'

export interface TarjetaGrupoGuardadoProps {
  grupo: GrupoGuardado
  acciones: readonly ElementoMenu[]
  alQuitar: () => void
}
