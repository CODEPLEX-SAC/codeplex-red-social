import type { ElementoFeed } from '@/tipos/inicio/modelo_inicio'
import type { FiltroPreguntas, PerfilUsuario } from '@/tipos/perfil/modelo_perfil'

export function fotosDe(publicaciones: ElementoFeed[], perfil: PerfilUsuario) {
  const propia = perfil.avatar ? [{ id: `${perfil.id}-avatar`, url: perfil.avatar }] : []
  return [...propia, ...publicaciones.flatMap((elemento) => (elemento.clase === 'texto' ? elemento.medios.filter((medio) => !medio.esVideo).map((medio) => ({ id: medio.id, url: medio.url })) : []))]
}

export function preguntasDe(publicaciones: ElementoFeed[]) {
  return publicaciones.filter((elemento) => elemento.clase === 'texto' && elemento.tipo === 'pregunta')
}

export function primerNombre(nombre: string) {
  return nombre.split(' ')[0]
}

export function contarPreguntas(preguntas: ElementoFeed[]) {
  const resueltas = preguntas.filter((pregunta) => pregunta.clase === 'texto' && pregunta.comentarioUtil !== null).length
  return { total: preguntas.length, resueltas, pendientes: preguntas.length - resueltas }
}

export function filtrarPreguntas(preguntas: ElementoFeed[], filtro: FiltroPreguntas) {
  const resuelta = (pregunta: ElementoFeed) => pregunta.clase === 'texto' && pregunta.comentarioUtil !== null
  if (filtro === 'resuelta') return preguntas.filter(resuelta)
  if (filtro === 'sin_resolver') return preguntas.filter((pregunta) => !resuelta(pregunta))
  return preguntas
}
