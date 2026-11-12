import { useSyncExternalStore } from 'react'
import type { PuertoGrupos } from '@/tipos/grupos/contrato_puerto_grupos'

export function usarVersionGrupos(puerto: PuertoGrupos): number {
  return useSyncExternalStore(puerto.suscribir, puerto.version)
}
