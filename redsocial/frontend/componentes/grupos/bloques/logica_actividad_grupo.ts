import type { ActividadGrupo } from '@/tipos/grupos/contrato_administracion_grupo'
import type { EstadoPublicaciones } from '@/tipos/inicio/contrato_almacen_publicaciones'

export function actividadDeEstado(estado: EstadoPublicaciones): ActividadGrupo {
  const interacciones = Object.values(estado.interacciones)
  return {
    publicaciones: estado.feed.length,
    comentarios: interacciones.reduce((total, interaccion) => total + (interaccion.comentarios?.length ?? 0), 0),
    reacciones: interacciones.filter((interaccion) => interaccion.reaccion !== null).length,
  }
}

export function cubetaDeBarra(valor: number, maximo: number, cubetas: number): number {
  if (maximo <= 0) return 0
  return Math.min(cubetas - 1, Math.round((valor / maximo) * (cubetas - 1)))
}
