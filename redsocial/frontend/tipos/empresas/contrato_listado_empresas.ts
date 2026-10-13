import type { Dayjs } from 'dayjs'
import type { SolicitudDetalleEmpresa } from './contrato_detalle_empresa'
import type { Empresa } from './modelo_empresas'
import type { UsuarioEmpresa } from './modelo_usuarios_empresa'
import type { DatosDetalleEmpresa } from './contrato_detalle_empresa'

export interface CambioSelectorEmpresas {
  target: { value: unknown }
}

export type ManejadorCambioEmpresas = (evento: CambioSelectorEmpresas) => void

export interface FiltrosAvanzadosEmpresas {
  rubro: string
  plan: string
  desde: Dayjs | null
  hasta: Dayjs | null
}

export interface CriteriosEmpresas extends FiltrosAvanzadosEmpresas {
  busqueda: string
  estado: string
}

export interface ListadoEmpresas {
  busqueda: string
  estado: string
  rubro: string
  plan: string
  desde: Dayjs | null
  hasta: Dayjs | null
  filtrosAvanzadosActivos: number
  tamanoPagina: string
  pagina: number
  totalPaginas: number
  filas: Empresa[]
  resumen: string
  seleccionadas: string[]
  todasSeleccionadas: boolean
  algunasSeleccionadas: boolean
  cambiarBusqueda: ManejadorCambioEmpresas
  cambiarEstado: ManejadorCambioEmpresas
  aplicarAvanzados: (filtros: FiltrosAvanzadosEmpresas) => void
  limpiarAvanzados: () => void
  cambiarTamanoPagina: ManejadorCambioEmpresas
  irAPagina: (pagina: number) => void
  alternarFila: (codigo: string, marcado: boolean) => void
  alternarTodas: (marcado: boolean) => void
}

export interface SeccionListadoEmpresasProps {
  empresas: Empresa[]
  datosDetalle: DatosDetalleEmpresa
}

export interface ListadoEmpresasProps {
  listado: ListadoEmpresas
}

export interface TablaEmpresasProps extends ListadoEmpresasProps {
  alElegirAccion: (clave: string, empresa: Empresa) => void
}

export interface FilaEmpresaProps {
  empresa: Empresa
  seleccionada: boolean
  alAlternar: (codigo: string, marcado: boolean) => void
  alElegirAccion: (clave: string, empresa: Empresa) => void
}

export interface CabeceraEmpresasProps {
  alNuevaEmpresa: () => void
}

export interface OpcionMenuEmpresa {
  clave: string
  etiqueta: string
  peligro?: boolean
}

export interface ModalDesactivarEmpresaProps {
  empresa: Empresa
  alConfirmar: () => void
  alCerrar: () => void
}

export interface AccionesEmpresas {
  todas: Empresa[]
  modalAbierto: boolean
  detalle: SolicitudDetalleEmpresa | null
  empresaDetalle: Empresa | undefined
  empresaADesactivar: Empresa | null
  edicion: SolicitudDetalleEmpresa | null
  empresaEdicion: Empresa | undefined
  abrirModal: () => void
  cerrarModal: () => void
  registrar: (empresa: Empresa) => void
  elegirAccion: (clave: string, empresa: Empresa) => void
  cerrarDetalle: () => void
  cerrarDesactivacion: () => void
  confirmarDesactivacion: () => void
  cerrarEdicion: () => void
  usuariosEditados: Record<string, UsuarioEmpresa[]>
  guardarEdicion: (empresa: Empresa, usuarios: UsuarioEmpresa[]) => void
}

export interface PanelFiltrosAvanzadosEmpresasProps extends ListadoEmpresasProps {
  alCerrar: () => void
}
