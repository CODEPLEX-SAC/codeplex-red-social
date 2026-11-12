import { useSyncExternalStore } from 'react'
import { actividadDeEstado } from './logica_actividad_grupo'
import type { ActividadGrupo } from '@/tipos/grupos/contrato_administracion_grupo'
import type { AlmacenPublicaciones } from '@/tipos/inicio/contrato_almacen_publicaciones'

export function usarActividadGrupo(almacen: AlmacenPublicaciones): ActividadGrupo {
  const estado = useSyncExternalStore(almacen.suscribir, almacen.leer)
  return actividadDeEstado(estado)
}
