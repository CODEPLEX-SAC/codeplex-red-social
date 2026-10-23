import { render } from '@testing-library/react'
import { ProveedorCarritoMarketplace } from '@/paginas/marketplace/proveedor_carrito_marketplace'
import { PaginaEmpresas } from '@/paginas/empresas/pagina_empresas'
import { suscripcionesDeCompras } from '../../componentes/marketplace'
import { crearComprasIniciales } from '../../componentes/marketplace/bloques/logica_carrito_planes'
import { PLANES_APLICACIONES, SUSCRIPCIONES_DEMOSTRACION } from '../../rutas/marketplace/rutas_marketplace'

export const SUSCRIPCIONES = suscripcionesDeCompras(crearComprasIniciales(PLANES_APLICACIONES, SUSCRIPCIONES_DEMOSTRACION, '', '', 0), PLANES_APLICACIONES)

export function renderEmpresas() {
  return render(
    <ProveedorCarritoMarketplace suscripcionesIniciales={SUSCRIPCIONES_DEMOSTRACION}>
      <PaginaEmpresas />
    </ProveedorCarritoMarketplace>,
  )
}
