import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { Dispatch, MutableRefObject, SetStateAction } from 'react'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { ParticipanteSala, PuertoSala } from '@/tipos/mensajeria/contrato_integracion_llamada'
import type { PanelSala } from '@/tipos/mensajeria/contrato_sala_llamada'

const configuracion = catalogoMensajeria.videollamada
const MILISEGUNDOS = 1000

export function microfonoDe(participante: ParticipanteSala, micLocal: boolean, silenciados: ReadonlySet<string>): boolean {
  if (participante.local) return micLocal
  return participante.micActivo && !silenciados.has(participante.id)
}

export function panelInicial(cantidad: number): PanelSala | null {
  if (cantidad > 1) return null
  if (window.matchMedia?.(configuracion.consulta_panel_lateral).matches === true) return 'participantes'
  return null
}

export function panelTrasPresentar(): PanelSala | null {
  return window.matchMedia?.(configuracion.consulta_panel_lateral).matches === false ? null : 'participantes'
}

export function alternarValor<T>(actual: T | null, nuevo: T): T | null {
  return actual === nuevo ? null : nuevo
}

export function alternarEn(lista: readonly string[], id: string): string[] {
  const sinElemento = lista.filter((elemento) => elemento !== id)
  return sinElemento.length === lista.length ? sinElemento.concat(id) : sinElemento
}

export function arrancarReloj(setSegundos: Dispatch<SetStateAction<number>>) {
  const reloj = setInterval(() => setSegundos((actual) => actual + 1), MILISEGUNDOS)
  const detener = () => clearInterval(reloj)
  return detener
}

export function programarFinReaccion(reaccion: IconName | null, limpiar: () => void) {
  if (reaccion === null) return undefined
  const temporizador = setTimeout(limpiar, configuracion.segundos_reaccion * MILISEGUNDOS)
  const cancelar = () => clearTimeout(temporizador)
  return cancelar
}

export function liberarAlDesmontar(liberar: MutableRefObject<() => void>, puerto: PuertoSala) {
  const limpiar = () => {
    liberar.current()
    puerto.detenerPantalla()
  }
  return limpiar
}
