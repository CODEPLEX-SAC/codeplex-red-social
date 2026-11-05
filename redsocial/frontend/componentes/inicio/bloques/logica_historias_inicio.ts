import type { EstadoHistorias } from '@/tipos/inicio/contrato_almacen_historias'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { ClaveReaccion } from '@/tipos/inicio/contrato_reacciones'
import type { HistoriaPublicada } from '@/tipos/inicio/modelo_historia'

export function conRespuestaHistoria(estado: EstadoHistorias, historiaId: string, destinatarioId: string, texto: string): EstadoHistorias {
  const id = `respuesta-${estado.respuestas.length + 1}`
  return { ...estado, respuestas: [...estado.respuestas, { id, historiaId, destinatarioId, texto }] }
}

export function conReaccionHistoria(estado: EstadoHistorias, historiaId: string, clave: ClaveReaccion): EstadoHistorias {
  const { [historiaId]: actual, ...resto } = estado.reacciones
  return { ...estado, reacciones: actual === clave ? resto : { ...resto, [historiaId]: clave } }
}

export function enlaceHistoria(id: string): string {
  return `${window.location.origin}${catalogoInicio.rutas.principal}?historia=${id}`
}

export function etiquetaEliminarHistoria(historia: HistoriaPublicada, general: string): string {
  const visor = catalogoInicio.historias.flujo.visor
  if (!historia.borrador.medio) return general
  return historia.borrador.medio.esVideo ? visor.eliminar_video : visor.eliminar_foto
}
