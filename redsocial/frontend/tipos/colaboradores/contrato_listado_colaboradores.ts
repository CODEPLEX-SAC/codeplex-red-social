import type { LegacyRow, LegacyTable } from '@tanstack/react-table/legacy'
import type { Colaborador } from './modelo_colaboradores'

export interface DatosListadoColaboradores {
  COLABORADORES: Colaborador[]
  FILTROS_ESTADO_COLABORADORES: readonly { etiqueta: string; total: number; activa?: boolean }[]
  ESTADO_CLASES: Record<'activo' | 'invitado' | 'inactivo' | 'baja', { texto: string; punto: string; etiqueta: string }>
  ROL_CLASES: Record<string, string>
  setMenuAbierto: (valor: number | null | ((actual: number | null) => number | null)) => void
  setAnclaMenu: (valor: HTMLElement | null | ((actual: HTMLElement | null) => HTMLElement | null)) => void
  menuAbierto: number | null
  anclaMenu: HTMLElement | null
  cerrarMenus: () => void
  alVerColaborador: (colaborador: Colaborador) => void
  alEditarColaborador: (colaborador: Colaborador) => void
  alConfirmarBaja: (colaborador: Colaborador) => void
  alReenviar: (colaborador: Colaborador) => void
  alInvitarColaborador: () => void
  alFalloExportar: () => void
}

export interface TablaColaboradoresProps {
  datos: DatosListadoColaboradores
  tabla: LegacyTable<Colaborador>
  filas: LegacyRow<Colaborador>[]
}
