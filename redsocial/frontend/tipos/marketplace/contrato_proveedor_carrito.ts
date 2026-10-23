import type { ReactNode } from 'react'
import type { usarCarritoMarketplace } from '@/componentes/marketplace/bloques/usar_carrito_marketplace'
import type { SeleccionPlan } from './modelo_planes'

export type CarritoMarketplace = ReturnType<typeof usarCarritoMarketplace>

export interface ProveedorCarritoMarketplaceProps {
  children: ReactNode
  suscripcionesIniciales?: SeleccionPlan[]
}
