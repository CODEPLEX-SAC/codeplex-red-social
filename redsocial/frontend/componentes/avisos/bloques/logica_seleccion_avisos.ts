import type { SeleccionAvisos } from '@/tipos/avisos/contrato_seleccion_avisos'

export function seleccionDeTodas(ids: readonly string[], marcada: boolean): SeleccionAvisos {
  return new Set(marcada ? ids : [])
}

export function seleccionAlternada(actual: SeleccionAvisos, id: string, marcada: boolean): SeleccionAvisos {
  const siguiente = new Set(actual)
  if (marcada) siguiente.add(id)
  else siguiente.delete(id)
  return siguiente
}
