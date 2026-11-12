import { useSyncExternalStore } from 'react'
import type { OrigenVersionReuniones } from '@/tipos/mensajeria/contrato_programar_reunion'

export function usarVersionReuniones({ suscribir, leer }: OrigenVersionReuniones): number {
  return useSyncExternalStore(suscribir, leer)
}
