import { HISTORIAS_PROPIAS } from './historias_demostracion'
import type { EstadoHistorias } from '@/tipos/inicio/contrato_almacen_historias'
import type { HistoriaPublicada } from '@/tipos/inicio/modelo_historia'

function crearEstadoInicial(historias: HistoriaPublicada[] = HISTORIAS_PROPIAS): EstadoHistorias {
  return { historias, respuestas: [], reacciones: {}, secuencia: 0 }
}

let estado: EstadoHistorias = crearEstadoInicial()
const escuchas = new Set<() => void>()

export function leerHistorias(): EstadoHistorias {
  return estado
}

export function suscribirHistorias(escucha: () => void) {
  escuchas.add(escucha)
  return () => {
    escuchas.delete(escucha)
  }
}

export function modificarHistorias(cambio: (actual: EstadoHistorias) => EstadoHistorias) {
  estado = cambio(estado)
  escuchas.forEach((escucha) => escucha())
}

export function reiniciarHistoriasDemostracion(historias?: HistoriaPublicada[]) {
  estado = crearEstadoInicial(historias)
  escuchas.forEach((escucha) => escucha())
}
