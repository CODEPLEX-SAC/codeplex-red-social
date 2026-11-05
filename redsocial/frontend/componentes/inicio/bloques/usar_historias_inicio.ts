import { useSyncExternalStore } from 'react'
import { usarSesionDemostracion } from '../../compartido/sesion/usar_sesion_demostracion'
import { conHistoria, historiaDesdeBorrador, sinHistoria } from './logica_historia'
import { conReaccionHistoria, conRespuestaHistoria } from './logica_historias_inicio'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { AlmacenHistorias } from '@/tipos/inicio/contrato_almacen_historias'
import type { AccionesVisorHistoria } from '@/tipos/inicio/contrato_historia'
import type { BorradorHistoria, HistoriaPublicada } from '@/tipos/inicio/modelo_historia'

const TIEMPO_AHORA = catalogoInicio.publicacion.tiempo_ahora

export function usarHistoriasInicio(almacen: AlmacenHistorias, contactos: HistoriaPublicada[]) {
  const estado = useSyncExternalStore(almacen.suscribir, almacen.leer)
  const { usuario } = usarSesionDemostracion()

  function publicar(borrador: BorradorHistoria) {
    if (!usuario) return
    almacen.modificar((actual) => conHistoria(actual, historiaDesdeBorrador(actual, borrador, { id: usuario.id, nombre: usuario.usuario }, TIEMPO_AHORA)))
  }

  const acciones: AccionesVisorHistoria = {
    reaccionDe: (historiaId) => estado.reacciones[historiaId] ?? null,
    respuestasDe: (historiaId) => estado.respuestas.filter((respuesta) => respuesta.historiaId === historiaId),
    onReaccionar: (historiaId, clave) => almacen.modificar((actual) => conReaccionHistoria(actual, historiaId, clave)),
    onEliminar: (historiaId) => almacen.modificar((actual) => sinHistoria(actual, historiaId)),
    onResponder: (historiaId, destinatarioId, texto) => almacen.modificar((actual) => conRespuestaHistoria(actual, historiaId, destinatarioId, texto)),
  }

  return { publicadas: estado.historias, deContactos: contactos, publicar, acciones }
}
