import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { monto, precioNumerico, sumarPrecios } from './logica_pago_planes'
import type { ItemCarrito } from '@/tipos/marketplace/modelo_carrito'

const textos = catalogoMarketplace.carrito
const planes = catalogoMarketplace.planes

export function ResumenCarrito({ items, clasesModulo, alProceder }: { items: ItemCarrito[]; clasesModulo: Record<string, string>; alProceder: () => void }) {
  return (
    <aside className={`${catalogoMarketplace.pago.clases.tarjeta} grid content-start gap-3`}>
      <h3 className="m-0 text-nombre-entidad text-texto">{textos.resumen}</h3>
      <div className="grid gap-2.5">
        {items.map((item) => (
          <div key={item.aplicacion} className="flex items-center gap-2.5">
            <span className={`grid h-8 w-8 flex-none place-items-center rounded-lg ${clasesModulo[item.tema]}`}>
              <Icono name={item.icono} className="h-4 w-4 text-white" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-nombre-fila text-texto">{item.nombre}</div>
              <div className="text-auxiliar text-texto-suave">{textos.plan.replace(':plan', item.planNombre)}</div>
            </div>
            <span className="flex-none text-nombre-fila text-texto">{[monto(precioNumerico(item.precio)), item.periodo === 'mensual' ? planes.sufijo_mensual : planes.sufijo_anual].join(' ')}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-borde-suave pt-3">
        <span className="text-nombre-fila text-texto">{textos.total}</span>
        <span className="text-valor-destacado text-texto">{monto(sumarPrecios(items.map((i) => i.precio)))}</span>
      </div>
      <p className="m-0 rounded-lg bg-fondo-categoria-verde px-3 py-2 text-auxiliar text-verde-categoria-texto">{textos.prueba}</p>
      <Boton type="button" variant="primario" size="md" className="w-full" onClick={alProceder}>
        {textos.proceder} <Icono name="flecha-derecha" className="h-3.5 w-3.5" />
      </Boton>
      <p className="m-0 flex items-center justify-center gap-1.5 text-auxiliar text-texto-suave">
        <Icono name="escudo" className="h-3.5 w-3.5" /> {textos.seguro}
      </p>
    </aside>
  )
}
