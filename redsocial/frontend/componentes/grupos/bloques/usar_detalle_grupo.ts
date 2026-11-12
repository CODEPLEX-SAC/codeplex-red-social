import { usarSesionDemostracion } from '../../compartido/sesion/usar_sesion_demostracion'
import { agregarCompartida } from '../../inicio/bloques/logica_almacen_publicaciones'
import { usarPublicacionesInicio } from '../../inicio/bloques/usar_publicaciones_inicio'
import { publicacionesPropiasNuevas } from './logica_contenido_propio'
import { usarMultimediaGrupo } from './usar_multimedia_grupo'
import { usarPestanaDetalleGrupo } from './usar_pestana_detalle_grupo'
import { usarPortadaGrupo } from './usar_portada_grupo'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { DetalleGrupoVistaProps } from '@/tipos/grupos/contrato_gestion_grupos'

const detalle = catalogoGrupos.detalle

export function usarDetalleGrupo({ grupo, puerto, almacenInicio, contenidoInicial }: DetalleGrupoVistaProps) {
  const { usuario } = usarSesionDemostracion()
  const estado = usarPestanaDetalleGrupo(contenidoInicial)
  const medios = usarMultimediaGrupo(grupo)
  const publicaciones = usarPublicacionesInicio(puerto.publicaciones(grupo.id))
  const portada = usarPortadaGrupo((url) => puerto.cambiarPortada(grupo.id, url))
  const local = puerto.estado(grupo.id)
  const hechos = [local.invitados.length > 0 && 'invitar', local.portada !== null && 'portada', local.descripcionEditada && 'descripcion', publicacionesPropiasNuevas(publicaciones.feed) > 0 && 'publicacion'].filter((clave): clave is string => typeof clave === 'string')

  function verTodoMultimedia() {
    estado.cambiarMultimedia('fotos')
    estado.cambiarPestana('multimedia')
  }

  function compartirGrupo(comentario: string) {
    if (!usuario) return
    almacenInicio.modificar((actual) => agregarCompartida(actual, { autor: { id: usuario.id, usuario: usuario.usuario }, origen: { id: grupo.id, nombre: grupo.nombre, tiempo: catalogoInicio.publicacion.tiempo_ahora, texto: grupo.descripcion }, comentario, tiempo: catalogoInicio.publicacion.tiempo_ahora }))
  }

  function publicar(contenido: Parameters<typeof publicaciones.publicar>[0]) {
    publicaciones.publicar(contenido)
    estado.irAlGrupo()
    estado.mostrarAviso(detalle.publicado)
  }

  const accionesDePaso: Record<string, () => void> = {
    invitar: () => estado.abrirModal('invitar'),
    portada: portada.abrir,
    descripcion: () => estado.abrirModal('editar'),
    publicacion: () => estado.abrirPublicacion('publicacion'),
  }

  return { estado, medios, publicaciones, portada, hechos, verTodoMultimedia, compartirGrupo, publicar, atenderPaso: (clave: string) => accionesDePaso[clave]?.() }
}
