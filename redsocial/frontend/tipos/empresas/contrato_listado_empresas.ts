import type { Dayjs } from 'dayjs'
import type { SolicitudDetalleEmpresa } from './contrato_detalle_empresa'
import type { ClaveModuloEmpresa, Empresa } from './modelo_empresas'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { SuscripcionContratada } from '@/tipos/compartido/contrato_suscripciones'
import type { UsuarioEmpresa } from './modelo_usuarios_empresa'
import type { DatosDetalleEmpresa } from './contrato_detalle_empresa'

export interface CambioSelectorEmpresas {
  target: { value: unknown }
}

export type ManejadorCambioEmpresas = (evento: CambioSelectorEmpresas) => void

export type DireccionOrdenEmpresas = 'ascendente' | 'descendente' | null

export interface ModuloEmpresaCatalogo {
  clave: ClaveModuloEmpresa
  producto: string | null
  etiqueta: string
  descripcion: string
  icono: IconName
  tono: string
  tono_estado: string
}

export interface ResumenModuloEmpresa {
  clave: ClaveModuloEmpresa
  cantidad: number
  porcentaje: number
}

export interface ResumenEmpresas {
  total: number
  nuevasMes: number
  modulos: ResumenModuloEmpresa[]
}

export interface ResumenEmpresasProps {
  empresas: Empresa[]
}

export interface EstadoModuloEmpresa {
  activo: boolean
  contratado: boolean
  planNombre: string | null
}

export interface LimiteEmpresas {
  limite: number
  suscripcion: SuscripcionContratada
}

export interface CeldaModuloEmpresaProps {
  empresa: Empresa
  modulo: ModuloEmpresaCatalogo
  alAlternar: () => void
}

export interface FiltrosAvanzadosEmpresas {
  rubro: string
  plan: string
  modulo: string
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
  modulo: string
  desde: Dayjs | null
  hasta: Dayjs | null
  filtrosAvanzadosActivos: number
  hayFiltros: boolean
  orden: DireccionOrdenEmpresas
  pagina: number
  totalPaginas: number
  filas: Empresa[]
  resumen: string
  cambiarBusqueda: ManejadorCambioEmpresas
  cambiarEstado: ManejadorCambioEmpresas
  cambiarPlan: ManejadorCambioEmpresas
  cambiarModulo: ManejadorCambioEmpresas
  alternarOrden: () => void
  limpiarTodo: () => void
  aplicarAvanzados: (filtros: FiltrosAvanzadosEmpresas) => void
  limpiarAvanzados: () => void
  irAPagina: (pagina: number) => void
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
  alAlternarModulo: (empresa: Empresa, clave: ClaveModuloEmpresa) => void
}

export interface FilaEmpresaProps {
  empresa: Empresa
  alElegirAccion: (clave: string, empresa: Empresa) => void
  alAlternarModulo: (empresa: Empresa, clave: ClaveModuloEmpresa) => void
}

export interface EncabezadoListadoEmpresasProps extends ListadoEmpresasProps {
  empresas: Empresa[]
  alNuevaEmpresa: () => void
}

export interface CabeceraEmpresasProps {
  alNuevaEmpresa: () => void
}

export interface ModalLimiteEmpresasProps {
  limite: LimiteEmpresas
  totalEmpresas: number
  alCerrar: () => void
}

export interface ModalEstadoEmpresaProps {
  empresa: Empresa
  alConfirmar: () => void
  alCerrar: () => void
}

export interface AccionesEmpresas {
  todas: Empresa[]
  suscripciones: SuscripcionContratada[]
  modalAbierto: boolean
  detalle: SolicitudDetalleEmpresa | null
  empresaDetalle: Empresa | undefined
  empresaACambiar: Empresa | null
  edicion: SolicitudDetalleEmpresa | null
  empresaEdicion: Empresa | undefined
  avisoLimiteAbierto: boolean
  limiteEmpresas: LimiteEmpresas | null
  abrirModal: () => void
  cerrarModal: () => void
  cerrarAvisoLimite: () => void
  registrar: (empresa: Empresa) => void
  elegirAccion: (clave: string, empresa: Empresa) => void
  alternarModulo: (empresa: Empresa, clave: ClaveModuloEmpresa) => void
  cerrarDetalle: () => void
  cerrarCambioEstado: () => void
  confirmarCambioEstado: () => void
  cerrarEdicion: () => void
  usuariosEditados: Record<string, UsuarioEmpresa[]>
  guardarEdicion: (empresa: Empresa, usuarios: UsuarioEmpresa[]) => void
}

export interface PanelFiltrosAvanzadosEmpresasProps extends ListadoEmpresasProps {
  alCerrar: () => void
}
