import type { ErrorBusqueda, EstadoBusqueda, FuenteBusqueda } from '@/tipos/compartido/contrato_busqueda'
import type { Dayjs } from 'dayjs'
import type { Empresa } from './modelo_empresas'
import type { RegistroHistorialBase } from './modelo_historial_empresa'

export interface CriteriosHistorialEmpresa {
  busqueda: string
  desde: Dayjs | null
  hasta: Dayjs | null
  tipo: string
}

export interface FiltrosBusquedaHistorialEmpresa {
  desde: Dayjs | null
  hasta: Dayjs | null
  tipo: string
}

export interface ListadoHistorialEmpresa {
  busqueda: string
  desde: Dayjs | null
  hasta: Dayjs | null
  tipo: string
  pagina: number
  totalPaginas: number
  filas: RegistroHistorialBase[]
  total: number
  hayRegistros: boolean
  estadoBusqueda: EstadoBusqueda
  errorBusqueda: ErrorBusqueda | null
  cambiarBusqueda: (evento: { target: { value: unknown } }) => void
  cambiarDesde: (valor: Dayjs | null) => void
  cambiarHasta: (valor: Dayjs | null) => void
  cambiarTipo: (evento: { target: { value: unknown } }) => void
  irAPagina: (pagina: number) => void
}

export interface PestanaHistorialEmpresaProps {
  empresa: Empresa
  historialBase: RegistroHistorialBase[]
  fuente?: FuenteBusqueda<RegistroHistorialBase, FiltrosBusquedaHistorialEmpresa>
}

export interface ListadoHistorialProps {
  listado: ListadoHistorialEmpresa
}
