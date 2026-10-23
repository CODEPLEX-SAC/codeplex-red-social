import { PERFILES_USUARIO } from '../perfil/perfiles'
import type { EstadoPublicaciones } from '@/tipos/inicio/contrato_almacen_publicaciones'
import type { ElementoFeed } from '@/tipos/inicio/modelo_inicio'

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
      medios: [],
      opciones: [],
      miVoto: null,
      reaccionesBase: publicacion.reaccionesPorTipo,
      comentariosBase: publicacion.comentarios,
      enInicio: false,
      comentarioUtil: null,
    })),
  )
  return { feed, interacciones: {}, secuencia: 0, nombresVisibles: {} }
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
