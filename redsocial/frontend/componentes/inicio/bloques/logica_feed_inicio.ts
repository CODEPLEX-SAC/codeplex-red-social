import type { ComentarioPublicacion } from '@/tipos/inicio/contrato_interacciones_publicacion'
import type { ClaveReaccion, OpcionReaccion, ReaccionesPorTipo } from '@/tipos/inicio/contrato_reacciones'
import type { ElementoFeed, EstadisticasActividad, OpcionVotable, PestanaFeed } from '@/tipos/inicio/modelo_inicio'

export function sumarReaccionPropia(base: ReaccionesPorTipo, propia: ClaveReaccion | null): ReaccionesPorTipo {
  return propia ? { ...base, [propia]: base[propia] + 1 } : base
}

export function totalReacciones(reacciones: ReaccionesPorTipo) {
  return Object.values(reacciones).reduce((suma, cantidad) => suma + cantidad, 0)
}

export function opcionesDeResumen(reacciones: ReaccionesPorTipo, opciones: readonly OpcionReaccion[], maximo: number) {
  return opciones
    .filter((opcion) => reacciones[opcion.clave] > 0)
    .sort((a, b) => reacciones[b.clave] - reacciones[a.clave])
    .slice(0, maximo)
}

export function contarComentarios(comentarios: ComentarioPublicacion[]) {
  return comentarios.reduce((suma, comentario) => suma + 1 + comentario.respuestas.length, 0)
}

export function totalVotos(opciones: OpcionVotable[]) {
  return opciones.reduce((suma, opcion) => suma + opcion.votos, 0)
}

export function porcentajeDeVotos(votos: number, total: number, maximo: number) {
  return total === 0 ? 0 : Math.round((votos / total) * maximo)
}

export function visibleEnInicio(elemento: ElementoFeed, esPropia: (autorId: string) => boolean) {
  return elemento.clase === 'compartida' || elemento.enInicio || esPropia(elemento.autorId)
}

export function filtrarFeed(feed: ElementoFeed[], pestana: PestanaFeed) {
  const filtros: Record<PestanaFeed, (elemento: ElementoFeed) => boolean> = {
    inicio: () => true,
    videos: (elemento) => elemento.clase === 'texto' && elemento.medios.some((medio) => medio.esVideo),
    encuestas: (elemento) => elemento.clase === 'texto' && elemento.tipo === 'encuesta',
    preguntas: (elemento) => elemento.clase === 'texto' && elemento.tipo === 'pregunta',
  }
  return feed.filter(filtros[pestana])
}

export function calcularEstadisticas(feed: ElementoFeed[], autorId: string | undefined): EstadisticasActividad {
  const propios = feed.filter((elemento) => elemento.autorId === autorId)
  const conVideo = (elemento: ElementoFeed) => elemento.clase === 'texto' && elemento.medios.some((medio) => medio.esVideo)
  return {
    publicaciones: propios.filter((elemento) => elemento.clase === 'texto' && elemento.tipo === 'publicacion' && !conVideo(elemento)).length,
    videos: propios.filter(conVideo).length,
    compartidos: propios.filter((elemento) => elemento.clase === 'compartida').length,
  }
}
