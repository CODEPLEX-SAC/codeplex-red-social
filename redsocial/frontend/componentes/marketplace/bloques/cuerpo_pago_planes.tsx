import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Casilla } from '../../compartido/interfaz/casilla'
import { EncabezadoPasoPago } from './encabezado_paso_pago'
import { etiquetaTotal } from './logica_pago_planes'
import { ResumenPagoPlanes } from './resumen_pago_planes'
import { SeccionPagoCalendario } from './seccion_pago_calendario'
import { SeccionPagoFacturacion } from './seccion_pago_facturacion'
import { SeccionPagoMetodo } from './seccion_pago_metodo'
import { SeccionPagoVip } from './seccion_pago_vip'
import type { usarPagoPlanes } from './usar_pago_planes'
import type { HistorialPago, ItemCarrito } from '@/tipos/marketplace/modelo_carrito'
import type { ConfiguracionPago } from '@/tipos/marketplace/modelo_pago'

const textos = catalogoMarketplace.pago

export function CuerpoPagoPlanes({
  items,
  pago,
  historial,
  clasesModulo,
  estado,
}: {
  items: ItemCarrito[]
  pago: ConfiguracionPago
  historial: HistorialPago
  clasesModulo: Record<string, string>
  estado: ReturnType<typeof usarPagoPlanes>
}) {
  return (
    <div className={textos.clases.cuerpo}>
      <div className={textos.clases.columnas}>
        <div className="grid min-w-0 gap-4">
          <SeccionPagoMetodo estado={estado} />
          <SeccionPagoFacturacion estado={estado} paises={pago.paises} cantidadGuardados={historial.perfiles.length} />
          {estado.elegibles > 0 && <SeccionPagoVip vip={pago.vip} seleccionado={estado.vip} alCambiar={estado.alternarVip} />}
          {!estado.mejora && <SeccionPagoCalendario fechaCobro={estado.fechaCobro} total={estado.total} hoy={estado.hoy} />}
          <section className={textos.clases.tarjeta}>
            <EncabezadoPasoPago numero={4} titulo={textos.paso4.titulo} detalle={textos.paso4.detalle} />
            <Casilla seleccionado={estado.terminos} alCambiar={(_, marcado) => estado.alternarTerminos(marcado)} etiqueta={textos.paso4.acepto} />
          </section>
        </div>
        <ResumenPagoPlanes items={items} clasesModulo={clasesModulo} etiquetaTotal={etiquetaTotal(items)} estado={estado} />
      </div>
    </div>
  )
}
