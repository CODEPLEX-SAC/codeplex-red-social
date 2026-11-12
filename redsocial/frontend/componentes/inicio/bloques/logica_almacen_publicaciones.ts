import type { MedioLocalPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'
import type { ComentarioPublicacion } from '@/tipos/inicio/contrato_interacciones_publicacion'
import type { ContenidoPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'
import type { DatosComentarioNuevo, DatosPublicacionCompartida, EstadoPublicaciones } from '@/tipos/inicio/contrato_almacen_publicaciones'
import type { ClaveReaccion } from '@/tipos/inicio/contrato_reacciones'
import type { AutorSesion, ElementoFeed, OpcionVotable } from '@/tipos/inicio/modelo_inicio'

const SIN_REACCIONES = { me_gusta: 0, me_encanta: 0, asombroso: 0 }

function conSecuencia(estado: EstadoPublicaciones) {
  const secuencia = estado.secuencia + 1
  return { secuencia, id: String(secuencia) }
}

export function agregarPublicacion(estado: EstadoPublicaciones, autor: AutorSesion, contenido: ContenidoPublicacion, tiempo: string): EstadoPublicaciones {
  const medios = contenido.medios ?? []
  if (!contenido.texto && medios.length === 0) return estado
  const { secuencia, id } = conSecuencia(estado)
  const opciones: OpcionVotable[] = (contenido.opciones ?? []).map((texto, indice) => ({ id: `${id}-${indice}`, texto, votos: 0 }))
  const nueva: ElementoFeed = {
    clase: 'texto',
    id,
    autorId: autor.id,
    nombre: autor.usuario,
    tiempo,
    texto: contenido.texto,
    tipo: contenido.tipo,
    prioridad: contenido.tipo === 'pregunta' ? contenido.prioridad : undefined,
    medios,
    opciones,
    miVoto: null,
    reaccionesBase: SIN_REACCIONES,
    comentariosBase: [],
    enInicio: true,
    comentarioUtil: null,
  }
  return { ...estado, secuencia, feed: [nueva, ...estado.feed] }
}

export function editarTextoPublicacion(estado: EstadoPublicaciones, id: string, texto: string, medios?: MedioLocalPublicacion[]): EstadoPublicaciones {
  return { ...estado, feed: estado.feed.map((elemento) => (elemento.clase === 'texto' && elemento.id === id ? { ...elemento, texto, medios: medios ?? elemento.medios } : elemento)) }
}

export function quitarPublicacion(estado: EstadoPublicaciones, id: string): EstadoPublicaciones {
  const { [id]: _descartada, ...interacciones } = estado.interacciones
  return { ...estado, feed: estado.feed.filter((elemento) => elemento.id !== id), interacciones }
}

export function agregarCompartida(estado: EstadoPublicaciones, { autor, origen, comentario, tiempo }: DatosPublicacionCompartida): EstadoPublicaciones {
  const { secuencia, id } = conSecuencia(estado)
  const compartida: ElementoFeed = {
    clase: 'compartida',
    id,
    origenId: origen.id,
    autorId: autor.id,
    nombre: autor.usuario,
    tiempoCompartio: tiempo,
    publica: false,
    origenNombre: origen.nombre,
    origenTiempo: origen.tiempo,
    texto: origen.texto,
    comentario: comentario || undefined,
    conMedio: false,
    medios: origen.medios,
    origenEsGrupo: origen.esGrupo,
  }
  return { ...estado, secuencia, feed: [compartida, ...estado.feed] }
}

export function marcarComentarioUtil(estado: EstadoPublicaciones, id: string, comentario: ComentarioPublicacion | null): EstadoPublicaciones {
  const util = comentario ? { id: comentario.id, autor: comentario.autor, texto: comentario.texto } : null
  return { ...estado, feed: estado.feed.map((elemento) => (elemento.clase === 'texto' && elemento.id === id ? { ...elemento, comentarioUtil: util } : elemento)) }
}

export function registrarVoto(estado: EstadoPublicaciones, id: string, opcionId: string): EstadoPublicaciones {
  return {
    ...estado,
    feed: estado.feed.map((elemento) => {
      if (elemento.clase !== 'texto' || elemento.id !== id || elemento.miVoto === opcionId) return elemento
      const opciones = elemento.opciones.map((opcion) => ({ ...opcion, votos: opcion.votos + Number(opcion.id === opcionId) - Number(opcion.id === elemento.miVoto) }))
      return { ...elemento, opciones, miVoto: opcionId }
    }),
  }
}

export function alternarReaccion(estado: EstadoPublicaciones, id: string, clave: ClaveReaccion): EstadoPublicaciones {
  const actual = estado.interacciones[id] ?? { reaccion: null, comentarios: null }
  return { ...estado, interacciones: { ...estado.interacciones, [id]: { ...actual, reaccion: actual.reaccion === clave ? null : clave } } }
}

export function actualizarComentarios(estado: EstadoPublicaciones, id: string, base: ComentarioPublicacion[], cambio: (lista: ComentarioPublicacion[]) => ComentarioPublicacion[]): EstadoPublicaciones {
  const actual = estado.interacciones[id] ?? { reaccion: null, comentarios: null }
  return { ...estado, interacciones: { ...estado.interacciones, [id]: { ...actual, comentarios: cambio(actual.comentarios ?? base) } } }
}

export function nuevoComentario({ id, autor, texto, tiempo, medios = [], mencion }: DatosComentarioNuevo): ComentarioPublicacion {
  return { id, autorId: autor.id, autor: autor.usuario, texto, tiempo, reaccion: null, editado: false, medios, mencion, respuestas: [] }
}

function cambiarComentario(lista: ComentarioPublicacion[], id: string, cambio: (comentario: ComentarioPublicacion) => ComentarioPublicacion): ComentarioPublicacion[] {
  return lista.map((comentario) => (comentario.id === id ? cambio(comentario) : { ...comentario, respuestas: comentario.respuestas.map((respuesta) => (respuesta.id === id ? cambio(respuesta) : respuesta)) }))
}

export function conRespuesta(lista: ComentarioPublicacion[], idRaiz: string, respuesta: ComentarioPublicacion) {
  return lista.map((comentario) => (comentario.id === idRaiz ? { ...comentario, respuestas: [...comentario.respuestas, respuesta] } : comentario))
}

export function conTextoEditado(lista: ComentarioPublicacion[], id: string, texto: string, medios?: MedioLocalPublicacion[]) {
  return cambiarComentario(lista, id, (comentario) => ({ ...comentario, texto, medios: medios ?? comentario.medios, editado: true }))
}

function sinRespuesta(comentario: ComentarioPublicacion, id: string): ComentarioPublicacion {
  return { ...comentario, respuestas: comentario.respuestas.filter((respuesta) => respuesta.id !== id) }
}

export function sinComentario(lista: ComentarioPublicacion[], id: string) {
  return lista.filter((comentario) => comentario.id !== id).map((comentario) => sinRespuesta(comentario, id))
}

export function conReaccionDeComentario(lista: ComentarioPublicacion[], id: string, clave: ClaveReaccion) {
  return cambiarComentario(lista, id, (comentario) => ({ ...comentario, reaccion: comentario.reaccion === clave ? null : clave }))
}

export function siguienteIdComentario(estado: EstadoPublicaciones) {
  return { secuencia: estado.secuencia + 1, id: `c${estado.secuencia + 1}` }
}

function renombrarComentarios(lista: ComentarioPublicacion[], autorId: string, nombre: string): ComentarioPublicacion[] {
  return lista.map((comentario) => ({ ...comentario, autor: comentario.autorId === autorId ? nombre : comentario.autor, respuestas: renombrarComentarios(comentario.respuestas, autorId, nombre) }))
}

export function renombrarAutor(estado: EstadoPublicaciones, autorId: string, nombre: string): EstadoPublicaciones {
  const feed = estado.feed.map((elemento) => {
    if (elemento.clase === 'compartida') return elemento.autorId === autorId ? { ...elemento, nombre } : elemento
    return { ...elemento, nombre: elemento.autorId === autorId ? nombre : elemento.nombre, comentariosBase: renombrarComentarios(elemento.comentariosBase, autorId, nombre) }
  })
  const interacciones = Object.fromEntries(Object.entries(estado.interacciones).map(([id, interaccion]) => [id, { ...interaccion, comentarios: interaccion.comentarios && renombrarComentarios(interaccion.comentarios, autorId, nombre) }]))
  return { ...estado, feed, interacciones, nombresVisibles: { ...estado.nombresVisibles, [autorId]: nombre } }
}

export function liberarMediosQuitados(previos: MedioLocalPublicacion[], vigentes: MedioLocalPublicacion[]) {
  const idsVigentes = new Set(vigentes.map((medio) => medio.id))
  previos.filter((medio) => !idsVigentes.has(medio.id)).forEach((medio) => URL.revokeObjectURL(medio.url))
}

export function mediosDe(feed: ElementoFeed[], id: string): MedioLocalPublicacion[] {
  const elemento = feed.find((candidato) => candidato.id === id)
  return elemento?.clase === 'texto' ? elemento.medios : []
}

export function comentarioVacio(texto: string, medios: MedioLocalPublicacion[]) {
  return texto.length === 0 && medios.length === 0
}
