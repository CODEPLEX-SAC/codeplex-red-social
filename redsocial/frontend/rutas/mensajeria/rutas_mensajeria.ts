import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { leerMensajeria, modificarMensajeria, suscribirMensajeria } from '../../servicios/mensajeria/almacen_mensajeria'
import { ahoraMensajeria } from '../../servicios/mensajeria/reloj'
import type { AlmacenMensajeria, RelojMensajeria } from '@/tipos/mensajeria/contrato_mensajes'

export const rutasMensajeria = catalogoMensajeria.rutas

export const ALMACEN_MENSAJERIA: AlmacenMensajeria = {
  leer: leerMensajeria,
  suscribir: suscribirMensajeria,
  modificar: modificarMensajeria,
}

export const RELOJ_MENSAJERIA: RelojMensajeria = { ahora: ahoraMensajeria }

export * from '../../servicios/mensajeria/panel_lateral'
export * from '../../servicios/mensajeria/videollamada_iniciar'
export * from '../../servicios/mensajeria/videollamadas'
