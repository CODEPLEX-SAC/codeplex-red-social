import type { ChangeEvent, MouseEventHandler, ReactNode, RefObject } from 'react'
import type { ContactoInvitable } from '@/tipos/mensajeria/contrato_integracion_llamada'
import type { ContenidoPublicacion, TipoPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'
import type { usarPestanaDetalleGrupo } from '@/componentes/grupos/bloques/usar_pestana_detalle_grupo'
import type { AlmacenPublicaciones } from '@/tipos/inicio/contrato_almacen_publicaciones'
import type { ElementoFeed } from '@/tipos/inicio/modelo_inicio'
import type { PuertoGrupos } from './contrato_puerto_grupos'

export type RolGrupo = 'administrador' | 'miembro' | 'visitante'

export type RolGrupoExterno = Exclude<RolGrupo, 'administrador'>
export type ClaveAccionGrupo = 'ver_solicitudes' | 'estado' | 'tu_contenido' | 'compartir' | 'novedades' | 'fijar' | 'abandonar' | 'eliminar' | 'seguir' | 'dejar_seguir'
export type PestanaDetalleGrupo = 'informacion' | 'conversacion' | 'miembros' | 'eventos' | 'multimedia' | 'archivos'

export interface GrupoReferencia {
  id: string
  nombre: string
  rol: RolGrupo
}

export interface MiembroGrupo {
  id: string
  nombre: string
  rol: RolGrupo
}

export interface DetalleGrupo extends GrupoReferencia {
  descripcion: string
  miembros: string
  totalMiembros: number
  totalTexto: string
  miembrosLista: MiembroGrupo[]
  creado: string
  fechaCreacion: string
  administradores: string[]
  autorId: string
  imagen: string
  portada: string
  publicacion: string
  fijado: boolean
  siguiendo: boolean
  recientes: string[]
  galeria: string[]
}

export interface ParametrosMenuGrupo {
  grupo: GrupoMenu
  enlace: string
  puerto: PuertoGrupos
  alTuContenido?: () => void
}

export interface ParametrosCrearGrupo {
  puerto: PuertoGrupos
  grupo?: { id: string; nombre: string; descripcion: string }
  onCerrar: () => void
}

export type TipoModalGrupo = 'solicitudes' | 'estado' | 'novedades' | 'abandonar' | 'eliminar' | 'editar'

export interface GrupoMenu extends GrupoReferencia {
  fijado: boolean
  siguiendo?: boolean
  ruta: string
}

export interface ModalCrearGrupoComunidadProps {
  imagen: string
  puerto: PuertoGrupos
  grupo?: { id: string; nombre: string; descripcion: string }
  onCerrar: () => void
}

export interface BotonUnirseGrupoProps {
  nombre: string
  puerto: PuertoGrupos
}

export interface BotonCrearGrupoProps {
  imagen: string
  puerto: PuertoGrupos
  variante?: 'primario' | 'contorno'
  anchoCompleto?: boolean
}

export interface DisparadorMenuGrupoProps {
  etiqueta: string
  variante: 'discreto' | 'contorno' | 'relleno'
  alAbrir: MouseEventHandler<HTMLElement>
}

export interface MenuGrupoProps {
  grupo: GrupoMenu
  enlace: string
  puerto: PuertoGrupos
  variante?: 'discreto' | 'contorno' | 'relleno'
  enDetalle?: boolean
  alTuContenido?: () => void
}

export interface ModalGestionGrupoProps {
  tipo: TipoModalGrupo
  grupo: GrupoMenu
  puerto: PuertoGrupos
  onConfirmar: () => void
  onCerrar: () => void
}

export interface ModalInvitarGrupoProps {
  grupo: DetalleGrupo
  puerto: PuertoGrupos
  candidatos: readonly ContactoInvitable[]
  onCerrar: () => void
}

export interface DetalleGrupoVistaProps {
  grupo: DetalleGrupo
  enlace: string
  puerto: PuertoGrupos
  almacenInicio: AlmacenPublicaciones
  candidatos: readonly ContactoInvitable[]
  contenidoInicial: boolean
}

export type OrdenContenido = 'recientes' | 'antiguos'

export interface ContenidoPropioGrupoProps {
  grupo: DetalleGrupo
  feed: readonly ElementoFeed[]
  alVerEnGrupo: () => void
  alVolver: () => void
}

export interface InformacionGrupoProps {
  grupo: DetalleGrupo
}

export interface PestanasDetalleGrupoProps {
  rol: RolGrupo
  activa: PestanaDetalleGrupo
  alCambiar: (pestana: PestanaDetalleGrupo) => void
}

export type SubpestanaMultimedia = 'fotos' | 'videos' | 'albumes'

export interface AccionesPestanasGrupoProps {
  grupo: DetalleGrupo
  enlace: string
  puerto: PuertoGrupos
  alBuscar: () => void
  alTuContenido: () => void
}

export interface ContenidoMiembrosGrupoProps {
  grupo: DetalleGrupo
  alAccion: (accion: string) => void
}

export interface FilaMiembroGrupoProps {
  miembro: MiembroGrupo
  grupo: DetalleGrupo
  alAccion: (accion: string) => void
}

export interface AlbumGrupo {
  id: string
  nombre: string
  portada: string
}

export interface MedioGrupo {
  id: string
  url: string
}

export interface EstadoMultimediaGrupo {
  fotos: MedioGrupo[]
  videos: MedioGrupo[]
  albumes: AlbumGrupo[]
  creandoAlbum: boolean
  aviso: string
  selector: RefObject<HTMLInputElement | null>
  abrirSelector: () => void
  elegir: (evento: ChangeEvent<HTMLInputElement>) => void
  abrirCrearAlbum: () => void
  cerrarCrearAlbum: () => void
  crearAlbum: (nombre: string) => void
}

export interface MultimediaRecienteGrupoProps {
  grupo: DetalleGrupo
  alVerTodo: () => void
}

export interface ContenidoMultimediaGrupoProps {
  grupo: DetalleGrupo
  subpestana: SubpestanaMultimedia
  alCambiar: (subpestana: SubpestanaMultimedia) => void
  medios: EstadoMultimediaGrupo
}

export interface CuadriculaMediosGrupoProps {
  grupo: DetalleGrupo
  medios: readonly MedioGrupo[]
}

export interface ListaAlbumesGrupoProps {
  albumes: readonly AlbumGrupo[]
}

export interface ModalCrearAlbumGrupoProps {
  alCrear: (nombre: string) => void
  onCerrar: () => void
}

export interface ContenidoArchivosGrupoProps {
  grupo: DetalleGrupo
}

export interface PortadaGrupoProps {
  grupo: DetalleGrupo
  acciones: ReactNode
  accionesPestanas: ReactNode
  alEditarPortada: () => void
  children: ReactNode
}

export interface PanelConfiguracionGrupoProps {
  hechos: readonly string[]
  alAccion: (clave: string) => void
  alCerrar: () => void
}

export interface PublicadorGrupoProps {
  rol: RolGrupo
  alAccion: (accion: string) => void
  alAbrirPublicacion: (tipo: TipoPublicacion) => void
}

export interface ContenidoPestanaGrupoProps {
  pestana: PestanaDetalleGrupo
  grupo: DetalleGrupo
  multimedia: SubpestanaMultimedia
  alCambiarMultimedia: (subpestana: SubpestanaMultimedia) => void
  medios: EstadoMultimediaGrupo
  alAviso: (accion: string) => void
  alAbrirPublicacion: (tipo: TipoPublicacion) => void
}

export interface AccionesDetalleGrupoProps {
  grupo: DetalleGrupo
  enlace: string
  puerto: PuertoGrupos
  alInvitar: () => void
  alCompartir: () => void
}

export interface ColumnaLateralGrupoProps {
  grupo: DetalleGrupo
  hechos: string[]
  guiaVisible: boolean
  alAccion: (clave: string) => void
  alCerrarGuia: () => void
  alVerTodoMultimedia: () => void
}

export interface ModalesDetalleGrupoProps {
  grupo: DetalleGrupo
  puerto: PuertoGrupos
  candidatos: readonly ContactoInvitable[]
  estado: ReturnType<typeof usarPestanaDetalleGrupo>
  alPublicar: (contenido: ContenidoPublicacion) => void
  alCompartir: (comentario: string) => void
}
