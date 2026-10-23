import catalogoMarketplace from '../../catalogos/capacidades/redsocial/marketplace.json'
import { useMemo } from 'react'
import { ContextoAccesoCarrito, ContextoMejoraPlan, ContextoSuscripciones } from '../../componentes/compartido'
import { accesoDelCarrito, accionesDelCarrito, ContextoCarritoMarketplace, ModalCarritoPlanes, ModalPagoPlanes, ModalPlanesAplicacion, suscripcionesDeCompras, usarCarritoMarketplace } from '../../componentes/marketplace'
import { CLASES_MODULO, CLASES_PLAN_DESTACADO, CLASES_SELECTOR_PLANES, PAGO_PLANES, PLANES_APLICACIONES, REPOSITORIO_METODOS_PAGO } from '../../rutas/marketplace/rutas_marketplace'
import type { ProveedorCarritoMarketplaceProps } from '@/tipos/marketplace/contrato_proveedor_carrito'

export function ProveedorCarritoMarketplace({ children, suscripcionesIniciales }: ProveedorCarritoMarketplaceProps) {
  const carrito = usarCarritoMarketplace(PLANES_APLICACIONES, REPOSITORIO_METODOS_PAGO, suscripcionesIniciales)
  const acceso = accesoDelCarrito(carrito, catalogoMarketplace.carrito.boton)
  const mejora = useMemo(() => ({ configuracion: (aplicacion: string) => PLANES_APLICACIONES[aplicacion], contratar: carrito.contratarMejora }), [carrito.contratarMejora])
  const suscripciones = useMemo(() => suscripcionesDeCompras(carrito.compras, PLANES_APLICACIONES), [carrito.compras])

  return (
    <ContextoCarritoMarketplace.Provider value={carrito}>
      <ContextoAccesoCarrito.Provider value={acceso}>
        <ContextoSuscripciones.Provider value={suscripciones}>
          <ContextoMejoraPlan.Provider value={mejora}>
          {children}
          {carrito.carritoAbierto && (
            <ModalCarritoPlanes items={carrito.items} clasesModulo={CLASES_MODULO} acciones={accionesDelCarrito(carrito)} />
          )}
          {carrito.configuracionPlanes && (
            <ModalPlanesAplicacion configuracion={carrito.configuracionPlanes} claseModulo={CLASES_MODULO[carrito.configuracionPlanes.color]} estilo={CLASES_SELECTOR_PLANES[carrito.configuracionPlanes.color]} estiloDestacado={CLASES_PLAN_DESTACADO} alCerrar={carrito.cerrarPlanes} alConfirmar={carrito.agregar} />
          )}
          {carrito.pagoAbierto && (
            <ModalPagoPlanes items={carrito.mejora ? [carrito.mejora] : carrito.items} mejora={carrito.mejora !== null} pago={PAGO_PLANES} historial={carrito.historial} metodosPago={carrito.metodosPago} servicios={carrito.servicios} clasesModulo={CLASES_MODULO} alCerrar={carrito.mejora ? carrito.cancelarMejora : carrito.volverAlCarrito} alFinalizar={carrito.finalizar} />
          )}
          </ContextoMejoraPlan.Provider>
        </ContextoSuscripciones.Provider>
      </ContextoAccesoCarrito.Provider>
    </ContextoCarritoMarketplace.Provider>
  )
}
