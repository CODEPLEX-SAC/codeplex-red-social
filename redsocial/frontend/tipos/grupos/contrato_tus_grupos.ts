import type { RolGrupo } from './contrato_gestion_grupos'
import type { PuertoGrupos } from './contrato_puerto_grupos'

export type OrdenTusGrupos = 'recientes' | 'antiguos' | 'nombre'

export interface TuGrupo {
  id: string
  nombre: string
  descripcion: string
  rol: RolGrupo
  ruta: string
  imagen: string
  ultimaVisita: string
  diasVisita: number
  fijado: boolean
}

export interface GrupoSugeridoBase {
  nombre: string
  categoria: string
  miembros: string
  miembrosTotal: number
  publicaciones: string
  masAvatares: string
}

export interface GrupoSugerido extends GrupoSugeridoBase {
  imagen: string
}

export interface ConsultaTusGrupos {
  texto: string
  orden: OrdenTusGrupos
  pagina: number
}

export interface TarjetaTuGrupoProps {
  grupo: TuGrupo
  puerto: PuertoGrupos
}

export interface TarjetaGrupoSugeridoProps {
  grupo: GrupoSugerido
  alUnirse: (nombre: string) => void
}

export interface SeccionSugerenciasGruposProps {
  titulo: string
  grupos: readonly GrupoSugerido[]
  alUnirse: (nombre: string) => void
}
