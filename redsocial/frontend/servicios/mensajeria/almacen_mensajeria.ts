import { ESTADO_INICIAL_MENSAJERIA } from './mensajes'
import type { EstadoMensajeria } from '../../tipos/mensajeria/contrato_mensajes'

let estado: EstadoMensajeria = ESTADO_INICIAL_MENSAJERIA
const escuchas = new Set<() => void>()

export function leerMensajeria(): EstadoMensajeria {
  return estado
}

export function suscribirMensajeria(escucha: () => void) {
  escuchas.add(escucha)
  return () => {
    escuchas.delete(escucha)
  }
}

export function modificarMensajeria(cambio: (actual: EstadoMensajeria) => EstadoMensajeria) {
  estado = cambio(estado)
  escuchas.forEach((escucha) => escucha())
}

export function reiniciarMensajeriaDemostracion() {
  estado = ESTADO_INICIAL_MENSAJERIA
  escuchas.forEach((escucha) => escucha())
}
