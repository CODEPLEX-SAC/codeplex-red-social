import { mediosDeImagenes } from '../perfil/imagenes_publicaciones'
import { PERFILES_USUARIO } from '../perfil/perfiles'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import { idDeGrupo, rutaDeGrupo } from '../grupos/detalle_grupos'
import datosInicio from './inicio.json'
import type { EstadoPublicaciones } from '@/tipos/inicio/contrato_almacen_publicaciones'
import type { ElementoFeed } from '@/tipos/inicio/modelo_inicio'

const SESION = catalogoCompartido.sesion_actual
const SIN_REACCIONES = { me_gusta: 0, me_encanta: 0, asombroso: 0 }

function ejemplosDePedro(): ElementoFeed[] {
  const { texto, imagen, compartida } = datosInicio.ejemplosPedro
  const base = { autorId: SESION.id, nombre: SESION.usuario, tipo: 'publicacion' as const, opciones: [], miVoto: null, reaccionesBase: SIN_REACCIONES, comentariosBase: [], enInicio: true, comentarioUtil: null }

  return [
    { clase: 'compartida', id: compartida.id, origenId: compartida.id, autorId: SESION.id, nombre: SESION.usuario, tiempoCompartio: compartida.tiempoCompartio, publica: true, origenNombre: compartida.origenNombre, origenTiempo: compartida.origenTiempo, texto: compartida.texto, comentario: compartida.comentario, conMedio: false, medios: mediosDeImagenes(compartida.id, compartida.imagenes), origenEsGrupo: compartida.origenEsGrupo, origenRuta: rutaDeGrupo(idDeGrupo(compartida.origenNombre)) },
    { clase: 'texto', ...base, id: imagen.id, tiempo: imagen.tiempo, texto: imagen.texto, medios: mediosDeImagenes(imagen.id, imagen.imagenes) },
    { clase: 'texto', ...base, id: texto.id, tiempo: texto.tiempo, texto: texto.texto, medios: [] },
  ]
}

function crearEstadoInicial(): EstadoPublicaciones {
  const feed: ElementoFeed[] = PERFILES_USUARIO.flatMap((perfil) =>
    perfil.publicaciones.map((publicacion) => ({
      clase: 'texto' as const,
      id: publicacion.id,
      autorId: perfil.id,
      nombre: perfil.nombre,
      tiempo: publicacion.tiempo,
      texto: publicacion.texto,
      tipo: 'publicacion' as const,
      medios: mediosDeImagenes(publicacion.id, publicacion.imagenes),
      opciones: [],
      miVoto: null,
      reaccionesBase: publicacion.reaccionesPorTipo,
      comentariosBase: publicacion.comentarios,
      enInicio: false,
      comentarioUtil: null,
    })),
  )
  return { feed: [...ejemplosDePedro(), ...feed], interacciones: {}, secuencia: 0, nombresVisibles: {} }
}

let estado: EstadoPublicaciones = crearEstadoInicial()
const escuchas = new Set<() => void>()

export function leerPublicaciones(): EstadoPublicaciones {
  return estado
}

export function suscribirPublicaciones(escucha: () => void) {
  escuchas.add(escucha)
  return () => {
    escuchas.delete(escucha)
  }
}

export function modificarPublicaciones(cambio: (actual: EstadoPublicaciones) => EstadoPublicaciones) {
  estado = cambio(estado)
  escuchas.forEach((escucha) => escucha())
}

export function reiniciarPublicacionesDemostracion() {
  estado = crearEstadoInicial()
  escuchas.forEach((escucha) => escucha())
}
