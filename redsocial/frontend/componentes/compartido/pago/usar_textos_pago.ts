import { useContext } from 'react'
import { ContextoTextosPago } from './contexto_textos_pago'

export function usarTextosPago() {
  return useContext(ContextoTextosPago)
}
