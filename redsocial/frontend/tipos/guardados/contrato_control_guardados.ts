import type { BusquedaEnCurso } from '@/tipos/compartido/contrato_busqueda'
import type { ColeccionGuardada, GrupoGuardado, ModalGuardados, PestanaGuardado, PestanaPrincipalGuardados, VistaGruposGuardados } from '@/tipos/guardados/modelo_guardados'

export interface ControlNavegacionGuardados {
  pestana: PestanaPrincipalGuardados
  filtro: PestanaGuardado
  abiertaId: string | null
  expandido: boolean
  orden: string
  vista: VistaGruposGuardados
  cambiarPestana: (clave: string) => void
  cambiarFiltro: (clave: string) => void
  abrirColeccion: (id: string) => void
  irATodos: () => void
  cerrarColeccion: () => void
  alternarExpandido: () => void
  cambiarOrden: (orden: string) => void
  cambiarVista: (vista: VistaGruposGuardados) => void
}

export interface ControlColeccionesGuardados {
  colecciones: readonly ColeccionGuardada[]
  crear: (nombre: string) => void
  renombrar: (id: string, nombre: string) => void
  eliminar: (id: string) => void
  agregarGrupo: (id: string, grupoId: string) => void
  quitarGrupo: (id: string, grupoId: string) => void
  quitarGrupoDeTodas: (grupoId: string) => void
}

export interface ControlAccionesGuardados {
  modal: ModalGuardados | null
  aviso: string | null
  quitados: readonly string[]
  abrir: (modal: ModalGuardados) => void
  cerrar: () => void
  cerrarAviso: () => void
  confirmarQuitar: (grupoId: string) => void
  crear: (nombre: string) => void
  renombrar: (id: string, nombre: string) => void
  eliminar: (id: string) => void
  agregar: (grupoId: string, coleccionId: string) => void
  quitarDeColeccion: (coleccionId: string, grupoId: string) => void
}

export interface ControlGuardados {
  navegacion: ControlNavegacionGuardados
  colecciones: ControlColeccionesGuardados
  acciones: ControlAccionesGuardados
  busqueda: Pick<BusquedaEnCurso<GrupoGuardado>, 'texto' | 'cambiarTexto' | 'estado' | 'error'>
  coleccionAbierta: ColeccionGuardada | undefined
  grupos: GrupoGuardado[]
  total: number
  movil: boolean
}

export interface ParametrosUsarGuardados {
  coleccionesIniciales: readonly ColeccionGuardada[]
  todosLosGrupos: readonly GrupoGuardado[]
  busqueda: BusquedaEnCurso<GrupoGuardado>
}
