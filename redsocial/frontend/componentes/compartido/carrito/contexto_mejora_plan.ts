import { createContext, useContext } from 'react'
import type { AccesoMejoraPlan } from '@/tipos/compartido/contrato_mejora_plan'

export const ContextoMejoraPlan = createContext<AccesoMejoraPlan | null>(null)

export function usarMejoraPlan() {
  return useContext(ContextoMejoraPlan)
}
