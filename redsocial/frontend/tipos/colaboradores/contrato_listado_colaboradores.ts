import type { LegacyRow } from '@tanstack/react-table/legacy'
import type { Colaborador } from './modelo_colaboradores'
import type { AccionesExportar, FiltroActivo, FiltrosAvanzadosColaboradores } from './contrato_gestion_colaboradores'

export interface AccionesColaborador {
  alVerColaborador: (colaborador: Colaborador) => void
  alEditarColaborador: (colaborador: Colaborador) => void
  alConfirmarBaja: (colaborador: Colaborador) => void
  alReenviar: (colaborador: Colaborador) => void
}

export interface DatosListadoColaboradores extends AccionesColaborador {
  COLABORADORES: Colaborador[]
  FILTROS_ESTADO_COLABORADORES: readonly { etiqueta: string; total: number; activa?: boolean }[]
  alInvitarColaborador: () => void
  alFalloExportar: () => void
}

export interface TablaColaboradoresProps {
  datos: DatosListadoColaboradores
  filas: LegacyRow<Colaborador>[]
}

export interface BarraHerramientasColaboradoresProps {
  busqueda: string
  cambiarBusqueda: (evento: { target: { value: unknown } }) => void
  rol: string
  aplicacion: string
  aplicarBasicos: (rol: string, aplicacion: string) => void
  filtrosAvanzados: FiltrosAvanzadosColaboradores
  aplicarFiltrosAvanzados: (valores: FiltrosAvanzadosColaboradores) => void
  filtrosActivos: FiltroActivo[]
  quitarFiltro: (clave: string) => void
  accionesExportar: AccionesExportar
}
