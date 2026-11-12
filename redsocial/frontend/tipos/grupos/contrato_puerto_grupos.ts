import type { AlmacenPublicaciones } from '@/tipos/inicio/contrato_almacen_publicaciones'
import type { DetalleGrupo, RolGrupo } from './contrato_gestion_grupos'
import type { GrupoSugerido, TuGrupo } from './contrato_tus_grupos'

export type NivelNovedades = 'todas' | 'destacadas' | 'ninguna'

export interface RegistroGrupo {
  id: string
  nombre: string
  descripcion: string
  rol: RolGrupo
  imagen: string
  ultimaVisita: string
  diasVisita: number
  fechaCreacion: string
  totalMiembros: number
  creado: string
  administradores: string[]
  publicacion: string
}

export interface EstadoAlmacenGrupos {
  creados: RegistroGrupo[]
  unidos: RegistroGrupo[]
  abandonados: string[]
  eliminados: string[]
  ediciones: Record<string, DatosGrupoNuevo>
  locales: Record<string, EstadoGrupoLocal>
}

export interface DatosGrupoNuevo {
  nombre: string
  descripcion: string
}

export interface EstadoGrupoLocal {
  fijado: boolean
  siguiendo: boolean
  novedades: NivelNovedades
  portada: string | null
  descripcionEditada: boolean
  invitados: string[]
}

export interface SugeridosGrupos {
  paraTi: GrupoSugerido[]
  mas: GrupoSugerido[]
}

export interface PuertoGrupos {
  suscribir: (oyente: () => void) => () => void
  version: () => number
  tusGrupos: () => TuGrupo[]
  gruposQueAdministras: () => TuGrupo[]
  sugeridos: () => SugeridosGrupos
  detalle: (id: string | null) => DetalleGrupo | undefined
  estado: (id: string) => EstadoGrupoLocal
  crear: (datos: DatosGrupoNuevo) => TuGrupo
  editar: (id: string, datos: DatosGrupoNuevo) => void
  unirse: (nombre: string) => void
  abandonar: (id: string) => void
  eliminar: (id: string) => void
  alternarFijado: (id: string) => void
  alternarSeguimiento: (id: string) => void
  cambiarPortada: (id: string, url: string) => void
  invitar: (id: string, nombre: string) => void
  novedades: (id: string, nivel: NivelNovedades) => void
  publicaciones: (id: string) => AlmacenPublicaciones
}
