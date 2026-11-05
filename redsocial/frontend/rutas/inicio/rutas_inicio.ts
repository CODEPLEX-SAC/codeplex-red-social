import catalogoInicio from '../../catalogos/capacidades/redsocial/inicio.json'

export const rutasInicio = catalogoInicio.rutas

import { leerPublicaciones, modificarPublicaciones, suscribirPublicaciones } from '../../servicios/inicio/almacen_publicaciones'
import { leerHistorias, modificarHistorias, suscribirHistorias } from '../../servicios/inicio/almacen_historias'
import { leerHistoriasVistas, modificarHistoriasVistas, suscribirHistoriasVistas } from '../../servicios/inicio/almacen_historias_vistas'
import type { AlmacenHistorias, AlmacenHistoriasVistas } from '@/tipos/inicio/contrato_almacen_historias'
import type { AlmacenPublicaciones } from '@/tipos/inicio/contrato_almacen_publicaciones'

export const ALMACEN_PUBLICACIONES: AlmacenPublicaciones = {
  leer: leerPublicaciones,
  suscribir: suscribirPublicaciones,
  modificar: modificarPublicaciones,
}

export const ALMACEN_HISTORIAS: AlmacenHistorias = {
  leer: leerHistorias,
  suscribir: suscribirHistorias,
  modificar: modificarHistorias,
}

export const ALMACEN_HISTORIAS_VISTAS: AlmacenHistoriasVistas = {
  leer: leerHistoriasVistas,
  suscribir: suscribirHistoriasVistas,
  modificar: modificarHistoriasVistas,
}

export * from '../../servicios/inicio/inicio'
