import { createContext } from 'react'
import { TEXTOS_FLUJO_PAGO } from './logica_textos_pago'
import type { TextosFlujoPago } from '@/tipos/compartido/contrato_flujo_pago'

export const ContextoTextosPago = createContext<TextosFlujoPago>(TEXTOS_FLUJO_PAGO)
