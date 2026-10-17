import { createContext, useContext } from 'react'
import catalogoMarketplace from '../../catalogos/capacidades/redsocial/marketplace.json'
import type { CarritoMarketplace } from '@/tipos/marketplace/contrato_proveedor_carrito'

export const ContextoCarritoMarketplace = createContext<CarritoMarketplace | null>(null)

export function usarCarritoCompartido() {
  const carrito = useContext(ContextoCarritoMarketplace)
  if (!carrito) throw new Error(catalogoMarketplace.errores.carrito_sin_proveedor)
  return carrito
}
