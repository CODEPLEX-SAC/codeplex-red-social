import catalogoPerfil from '../../catalogos/capacidades/redsocial/perfil.json'

export const rutasPerfil = catalogoPerfil.rutas

import { guardarEdicionPerfil, leerEdicionesPerfil, suscribirEdicionesPerfil } from '../../servicios/perfil/almacen_perfil'
import type { AlmacenPerfil } from '@/tipos/perfil/contrato_almacen_perfil'

export const ALMACEN_PERFIL: AlmacenPerfil = {
  leer: leerEdicionesPerfil,
  suscribir: suscribirEdicionesPerfil,
  guardar: guardarEdicionPerfil,
}

export * from '../../servicios/perfil/perfiles'
export * from '../../servicios/perfil/metricas'
