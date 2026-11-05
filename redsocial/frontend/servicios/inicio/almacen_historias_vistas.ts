import type { HistoriasVistas } from '@/tipos/inicio/contrato_almacen_historias'

let vistas: HistoriasVistas = new Set()
const escuchas = new Set<() => void>()

export function leerHistoriasVistas(): HistoriasVistas {
  return vistas
}

export function suscribirHistoriasVistas(escucha: () => void) {
  escuchas.add(escucha)
  return () => {
    escuchas.delete(escucha)
  }
}

export function modificarHistoriasVistas(cambio: (estado: HistoriasVistas) => HistoriasVistas) {
  const siguiente = cambio(vistas)
  if (siguiente === vistas) return
  vistas = siguiente
  escuchas.forEach((escucha) => escucha())
}

export function reiniciarHistoriasVistasDemostracion() {
  vistas = new Set()
  escuchas.forEach((escucha) => escucha())
}
