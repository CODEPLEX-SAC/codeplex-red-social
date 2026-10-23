import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { monto, precioNumerico } from './logica_pago_planes'
import type { ItemCarrito } from '@/tipos/marketplace/modelo_carrito'
import type { ResumenActivacion } from '@/tipos/marketplace/modelo_pago'

const textos = catalogoMarketplace.pago.exito
const mejora = catalogoMarketplace.pago.mejora.exito

function Fila({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5 text-auxiliar">
      <span className="text-texto-suave">{etiqueta}</span>
      <span className="text-nombre-fila text-texto">{valor}</span>
    </div>
  )
}

export function ExitoPagoPlanes({ items, resumen, alVolver }: { items: ItemCarrito[]; resumen: ResumenActivacion; alVolver: () => void }) {
  const mensual = items.every((i) => i.periodo === 'mensual')
  return (
    <div className="grid min-h-0 flex-1 content-start justify-items-center gap-4 overflow-y-auto p-6 max-600:p-4">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-fondo-exito-suave">
        <Icono name="verificado" className="h-8 w-8 text-exito-texto" />
      </span>
      <div className="text-center">
        <h3 className="m-0 text-titulo-banner text-texto">{resumen.mejora ? mejora.titulo : textos.titulo}</h3>
        <p className="m-0 text-cuerpo text-texto-suave">{resumen.mejora ? mejora.detalle : items.length === 1 ? textos.detalle : textos.detalle_varias}</p>
      </div>
      <div className="w-full max-w-100 rounded-xl border border-borde bg-fondo px-4 py-2">
        {items.map((item) => (
          <Fila key={item.aplicacion} etiqueta={[item.nombre, item.planNombre].join(catalogoMarketplace.pago.guardados.separador)} valor={monto(precioNumerico(item.precio))} />
        ))}
        {resumen.vip && <Fila etiqueta={textos.servicio_adicional} valor={catalogoMarketplace.pago.vip.titulo} />}
        {!resumen.mejora && (
          <>
            <Fila etiqueta={catalogoMarketplace.pago.resumen.cobro_hoy} valor={catalogoMarketplace.pago.resumen.cobro_hoy_valor} />
            <Fila etiqueta={textos.primer_cobro} valor={[monto(resumen.total), resumen.fechaCobro].join(catalogoMarketplace.pago.guardados.separador)} />
            <Fila etiqueta={textos.renovacion} valor={mensual ? textos.renovacion_mensual : textos.renovacion_anual} />
          </>
        )}
        {resumen.ultimos4 && <Fila etiqueta={textos.tarjeta} valor={[resumen.marca, resumen.ultimos4].join(catalogoMarketplace.pago.formato.separador_tarjeta)} />}
      </div>
      <Boton type="button" variant="primario" size="md" className="w-full max-w-100" onClick={alVolver}>{resumen.mejora ? mejora.volver : textos.volver}</Boton>
    </div>
  )
}
