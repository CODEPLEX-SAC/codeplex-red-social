import type { MotivoFallo } from '@/tipos/mensajeria/contrato_integracion_llamada'

const MOTIVO_POR_NOMBRE: Record<string, MotivoFallo | undefined> = {
  notallowederror: 'sin_permiso',
  securityerror: 'sin_permiso',
  notfounderror: 'no_disponible',
  overconstrainederror: 'no_disponible',
}

export function motivoDe(error: unknown): MotivoFallo {
  const nombre = error instanceof DOMException ? error.name.toLowerCase() : String()
  return MOTIVO_POR_NOMBRE[nombre] ?? 'error'
}
