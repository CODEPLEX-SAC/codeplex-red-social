import catalogoInicio from '../../catalogos/capacidades/redsocial/inicio.json'

export const rutasInicio = catalogoInicio.rutas

import { leerPublicaciones, modificarPublicaciones, suscribirPublicaciones } from '../../servicios/inicio/almacen_publicaciones'
import type { AlmacenPublicaciones } from '@/tipos/inicio/contrato_almacen_publicaciones'

export const ALMACEN_PUBLICACIONES: AlmacenPublicaciones = {
  leer: leerPublicaciones,
  suscribir: suscribirPublicaciones,
  modificar: modificarPublicaciones,
}

export * from '../../servicios/inicio/inicio'
