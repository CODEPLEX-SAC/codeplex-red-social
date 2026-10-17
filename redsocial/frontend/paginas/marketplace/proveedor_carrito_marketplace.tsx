import catalogoMarketplace from '../../catalogos/capacidades/redsocial/marketplace.json'
import { ContextoAccesoCarrito } from '../../componentes/compartido'
import { accesoDelCarrito, accionesDelCarrito, ContextoCarritoMarketplace, ModalCarritoPlanes, ModalPagoPlanes, ModalPlanesAplicacion, usarCarritoMarketplace } from '../../componentes/marketplace'
import { CLASES_MODULO, CLASES_PLAN_DESTACADO, CLASES_SELECTOR_PLANES, PAGO_PLANES, PLANES_APLICACIONES } from '../../rutas/marketplace/rutas_marketplace'
import type { ProveedorCarritoMarketplaceProps } from '@/tipos/marketplace/contrato_proveedor_carrito'

export function ProveedorCarritoMarketplace({ children }: ProveedorCarritoMarketplaceProps) {
  const carrito = usarCarritoMarketplace(PLANES_APLICACIONES)
  const acceso = accesoDelCarrito(carrito, catalogoMarketplace.carrito.boton)

  return (
    <ContextoCarritoMarketplace.Provider value={carrito}>
      <ContextoAccesoCarrito.Provider value={acceso}>
        {children}
        {carrito.carritoAbierto && (
          <ModalCarritoPlanes items={carrito.items} clasesModulo={CLASES_MODULO} acciones={accionesDelCarrito(carrito)} />
        )}
        {carrito.configuracionPlanes && (
          <ModalPlanesAplicacion configuracion={carrito.configuracionPlanes} claseModulo={CLASES_MODULO[carrito.configuracionPlanes.color]} estilo={CLASES_SELECTOR_PLANES[carrito.configuracionPlanes.color]} estiloDestacado={CLASES_PLAN_DESTACADO} alCerrar={carrito.cerrarPlanes} alConfirmar={carrito.agregar} />
        )}
        {carrito.pagoAbierto && (
          <ModalPagoPlanes items={carrito.items} pago={PAGO_PLANES} historial={carrito.historial} servicios={carrito.servicios} clasesModulo={CLASES_MODULO} alCerrar={carrito.volverAlCarrito} alFinalizar={carrito.finalizar} />
        )}
      </ContextoAccesoCarrito.Provider>
    </ContextoCarritoMarketplace.Provider>
  )
}
