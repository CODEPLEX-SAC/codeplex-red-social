import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { OrdenContenido } from '@/tipos/grupos/contrato_gestion_grupos'
import type { ElementoFeed, PublicacionTextoInicio } from '@/tipos/inicio/modelo_inicio'

export const CLAVE_BIENVENIDA = catalogoGrupos.detalle.publicacion.clave_bienvenida

export function esPropia(elemento: ElementoFeed): elemento is { clase: 'texto' } & PublicacionTextoInicio {
  return elemento.clase === 'texto' && elemento.autorId === catalogoCompartido.sesion_actual.id
}

export function propiasDelUsuario(feed: readonly ElementoFeed[], orden: OrdenContenido): PublicacionTextoInicio[] {
  const propias = feed.filter(esPropia)
  if (orden === 'antiguos') return [...propias].reverse()
  return propias
}

export function publicacionesPropiasNuevas(feed: readonly ElementoFeed[]): number {
  return feed.filter((elemento) => esPropia(elemento) && !elemento.id.endsWith(CLAVE_BIENVENIDA)).length
}
