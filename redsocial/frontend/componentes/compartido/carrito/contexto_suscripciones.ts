import { createContext, useContext } from 'react'
import type { SuscripcionContratada } from '@/tipos/compartido/contrato_suscripciones'

export const ContextoSuscripciones = createContext<SuscripcionContratada[]>([])

export function usarSuscripciones() {
  return useContext(ContextoSuscripciones)
}
