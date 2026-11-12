import type { ReactNode } from 'react'
import type { DetalleGrupo } from './contrato_gestion_grupos'
import type { PuertoGrupos } from './contrato_puerto_grupos'

export type SeccionAdministracion = 'inicio' | 'resumen' | 'solicitudes' | 'sugerencias' | 'estado' | 'administradores' | 'miembros' | 'preguntas' | 'pendientes' | 'programadas' | 'registro' | 'incidencias' | 'roles' | 'configuracion' | 'crecimiento' | 'interaccion'

export type ModalAdministracion = 'solicitudes' | 'estado' | 'editar'

export interface ElementoDemostracion {
  id: string
  titulo: string
  detalle: string
}

export interface AdministracionGrupoProps {
  grupo: DetalleGrupo
  puerto: PuertoGrupos
  children: ReactNode
}

export interface NavegacionAdministracionGrupoProps {
  grupo: DetalleGrupo
  activa: SeccionAdministracion
  cerradas: readonly string[]
  alElegir: (seccion: SeccionAdministracion) => void
  alAlternarCategoria: (categoria: string) => void
}

export interface VistaAdministracionGrupoProps {
  seccion: SeccionAdministracion
  grupo: DetalleGrupo
  puerto: PuertoGrupos
}

export type VistaComunidadGrupoSeccion = 'preguntas' | 'roles' | 'miembros' | 'administradores'

export type VistaEstadisticaClave = 'crecimiento' | 'interaccion'

export type VistaListaClave = 'pendientes' | 'programadas' | 'registro' | 'incidencias' | 'sugerencias'

export interface VistaComunidadGrupoProps {
  seccion: VistaComunidadGrupoSeccion
  grupo: DetalleGrupo
}

export interface VistaMiembrosGrupoProps {
  grupo: DetalleGrupo
  soloAdministradores: boolean
}

export interface OpcionNavegacionAdministracionProps {
  opcion: { clave: string; etiqueta: string; icono: string }
  activa: boolean
  alElegir: (seccion: SeccionAdministracion) => void
}

export interface VistaListaGrupoProps {
  clave: 'pendientes' | 'programadas' | 'registro' | 'incidencias' | 'sugerencias'
  grupo: DetalleGrupo
}

export interface VistaEstadisticaGrupoProps {
  clave: 'crecimiento' | 'interaccion'
  actividad: ActividadGrupo
}

export interface VistaResumenGrupoProps {
  grupo: DetalleGrupo
  actividad: ActividadGrupo
}

export interface ActividadGrupo {
  publicaciones: number
  comentarios: number
  reacciones: number
}

export interface EncabezadoVistaProps {
  titulo: string
  descripcion: string
}
