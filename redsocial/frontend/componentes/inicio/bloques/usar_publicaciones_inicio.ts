import type { MedioLocalPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'
import { useSyncExternalStore } from 'react'
import { usarSesionDemostracion } from '../../compartido/sesion/usar_sesion_demostracion'
import {
  actualizarComentarios,
  agregarCompartida,
  agregarPublicacion,
  alternarReaccion,
  marcarComentarioUtil,
  renombrarAutor,
  conReaccionDeComentario,
  conRespuesta,
  conTextoEditado,
  editarTextoPublicacion, liberarMediosQuitados, mediosDe, comentarioVacio,
  nuevoComentario,
  quitarPublicacion,
  registrarVoto,
  siguienteIdComentario,
  sinComentario,
} from './logica_almacen_publicaciones'
import { calcularEstadisticas, sumarReaccionPropia } from './logica_feed_inicio'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { AlmacenPublicaciones } from '@/tipos/inicio/contrato_almacen_publicaciones'
import type { ContenidoPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'
import type { ComentarioPublicacion, InteraccionPublicacion, MencionComentario } from '@/tipos/inicio/contrato_interacciones_publicacion'
import type { AccionesFeedInicio, OpcionesUtilidad } from '@/tipos/inicio/contrato_feed_inicio'
import type { ClaveReaccion, ReaccionesPorTipo } from '@/tipos/inicio/contrato_reacciones'
import type { AutorSesion, OrigenCompartido } from '@/tipos/inicio/modelo_inicio'

const TIEMPO_AHORA = catalogoInicio.publicacion.tiempo_ahora
const SIN_UTILIDAD: OpcionesUtilidad = { habilitada: false, comentarioUtil: null }

export function usarPublicacionesInicio(almacen: AlmacenPublicaciones) {
  const { usuario } = usarSesionDemostracion()
  const estado = useSyncExternalStore(almacen.suscribir, almacen.leer, almacen.leer)
  const autor: AutorSesion | null = usuario ? { id: usuario.id, usuario: estado.nombresVisibles[usuario.id] ?? usuario.usuario } : null

  function publicar(contenido: ContenidoPublicacion) {
    if (autor) almacen.modificar((actual) => agregarPublicacion(actual, autor, contenido, TIEMPO_AHORA))
  }

  function editar(id: string, texto: string, medios: MedioLocalPublicacion[]) {
    liberarMediosQuitados(mediosDe(estado.feed, id), medios)
    almacen.modificar((actual) => editarTextoPublicacion(actual, id, texto, medios))
  }

  function eliminar(id: string) {
    const eliminada = estado.feed.find((elemento) => elemento.id === id)
    if (eliminada?.clase === 'texto') eliminada.medios.forEach((medio) => URL.revokeObjectURL(medio.url))
    almacen.modificar((actual) => quitarPublicacion(actual, id))
  }

  function compartir(origen: OrigenCompartido, comentario: string) {
    if (autor) almacen.modificar((actual) => agregarCompartida(actual, autor, origen, comentario, TIEMPO_AHORA))
  }

  function votar(id: string, opcionId: string) {
    almacen.modificar((actual) => registrarVoto(actual, id, opcionId))
  }

  function renombrar(autorId: string, nombre: string) {
    almacen.modificar((actual) => renombrarAutor(actual, autorId, nombre))
  }

  function compartidosDe(id: string) {
    return estado.feed.filter((elemento) => elemento.clase === 'compartida' && elemento.origenId === id).length
  }

  function esPropia(autorId: string) {
    return autorId === usuario?.id
  }

  function marcarUtil(id: string, comentario: ComentarioPublicacion | null) {
    almacen.modificar((actual) => marcarComentarioUtil(actual, id, comentario))
  }

  function interaccionesDe(id: string, reaccionesBase: ReaccionesPorTipo, comentariosBase: ComentarioPublicacion[], util: OpcionesUtilidad = SIN_UTILIDAD): InteraccionPublicacion {
    const guardada = estado.interacciones[id]
    const reaccion = guardada?.reaccion ?? null

    function cambiar(cambio: (lista: ComentarioPublicacion[]) => ComentarioPublicacion[]) {
      almacen.modificar((actual) => actualizarComentarios(actual, id, comentariosBase, cambio))
    }

    function agregar(texto: string, medios: MedioLocalPublicacion[], mencion: MencionComentario | undefined, alAgregar: (lista: ComentarioPublicacion[], nuevo: ComentarioPublicacion) => ComentarioPublicacion[]) {
      if (!autor || comentarioVacio(texto, medios)) return
      almacen.modificar((actual) => {
        const { secuencia, id: idComentario } = siguienteIdComentario(actual)
        const nuevo = nuevoComentario(idComentario, autor, texto, TIEMPO_AHORA, medios, mencion)
        return actualizarComentarios({ ...actual, secuencia }, id, comentariosBase, (lista) => alAgregar(lista, nuevo))
      })
    }

    return {
      reaccion,
      reaccionesPorTipo: sumarReaccionPropia(reaccionesBase, reaccion),
      comentarios: guardada?.comentarios ?? comentariosBase,
      utilidad: { habilitada: util.habilitada, utilId: util.comentarioUtil?.id ?? null, onMarcar: (comentario) => marcarUtil(id, comentario) },
      onReaccionarPublicacion: (clave: ClaveReaccion) => almacen.modificar((actual) => alternarReaccion(actual, id, clave)),
      onComentar: (texto, medios = []) => agregar(texto, medios, undefined, (lista, nuevo) => [...lista, nuevo]),
      onResponder: (idRaiz, texto, medios = [], mencion) => agregar(texto, medios, mencion, (lista, nuevo) => conRespuesta(lista, idRaiz, nuevo)),
      onEditar: (idComentario, texto) => {
        if (texto.length > 0) cambiar((lista) => conTextoEditado(lista, idComentario, texto))
      },
      onEliminar: (idComentario) => cambiar((lista) => sinComentario(lista, idComentario)),
      onReaccionar: (idComentario, clave) => cambiar((lista) => conReaccionDeComentario(lista, idComentario, clave)),
    }
  }

  const acciones: AccionesFeedInicio = { compartidosDe, interaccionesDe, onMarcarUtil: marcarUtil, esPropia, onEditar: editar, onEliminar: eliminar, onCompartir: compartir, onVotar: votar }

  return { feed: estado.feed, estadisticas: calcularEstadisticas(estado.feed, usuario?.id), publicar, renombrar, acciones }
}
