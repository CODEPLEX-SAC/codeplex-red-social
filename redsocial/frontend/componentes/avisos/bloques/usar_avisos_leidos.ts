import { useSyncExternalStore } from 'react'
import type { PuertoLeidasAvisos } from '@/tipos/avisos/contrato_leidas_avisos'

export function usarAvisosLeidos(puerto: PuertoLeidasAvisos): number {
  return useSyncExternalStore(puerto.suscribir, puerto.version)
}
