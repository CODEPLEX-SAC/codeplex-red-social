import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { Conversacion, EstadoMensajeria } from '@/tipos/mensajeria/contrato_mensajes'
import type { DatosNuevoGrupo } from '@/tipos/mensajeria/contrato_lista_conversaciones'

const PREFIJO_GRUPO = 'grupo-'

export function idDeGrupoNuevo(conversaciones: readonly Conversacion[]): string {
  let numero = conversaciones.length + 1
  while (conversaciones.some((conversacion) => conversacion.id === `${PREFIJO_GRUPO}${numero}`)) numero += 1
  return `${PREFIJO_GRUPO}${numero}`
}

export function crearGrupoConversacion(estado: EstadoMensajeria, id: string, datos: DatosNuevoGrupo): EstadoMensajeria {
  const grupo: Conversacion = {
    id,
    nombre: datos.nombre,
    extracto: datos.descripcion || catalogoMensajeria.grupos.extracto_inicial,
    noLeidos: 0,
    favorita: false,
    enLinea: false,
    participantes: [...datos.participantes],
    esGrupo: true,
    imagen: datos.imagen ?? undefined,
  }
  return { ...estado, conversaciones: [grupo, ...estado.conversaciones], hilos: { ...estado.hilos, [id]: [] } }
}

export function nombreDeGrupoRepetido(nombres: readonly string[], nombre: string): boolean {
  const normalizado = nombre.trim().toLowerCase()
  return nombres.some((existente) => existente.trim().toLowerCase() === normalizado)
}
