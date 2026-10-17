import { createContext } from 'react'
import type { AccesoCarrito } from '@/tipos/compartido/contrato_acceso_carrito'

export const ContextoAccesoCarrito = createContext<AccesoCarrito | null>(null)
