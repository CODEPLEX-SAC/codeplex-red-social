import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { etiquetaTotal, monto, precioNumerico, textoTotal } from './logica_pago_planes'
import type { ItemCarrito } from '@/tipos/marketplace/modelo_carrito'

const textos = catalogoMarketplace.carrito
const clases = textos.clases
const planes = catalogoMarketplace.planes

export function ResumenCarrito({ items, clasesModulo, alProceder }: { items: ItemCarrito[]; clasesModulo: Record<string, string>; alProceder: () => void }) {
  const separador = textos.separador_moneda
  return (
    <aside className={`${catalogoMarketplace.pago.clases.tarjeta} ${clases.resumen}`}>
      <div className={clases.encabezado_resumen}>
        <h3 className="m-0 text-nombre-entidad text-texto">{textos.resumen}</h3>
        <span className="text-auxiliar text-texto-suave">{(items.length === 1 ? textos.una : textos.varias).replace(':n', String(items.length))}</span>
      </div>
      <div className={clases.lineas}>
        {items.map((item) => (
          <div key={item.aplicacion} className={clases.linea}>
            <span className={`${clases.icono_linea} ${clasesModulo[item.tema]}`}>
              <Icono name={item.icono} className="h-4 w-4 text-white" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-nombre-fila text-texto">{item.nombre}</div>
              <div className="text-auxiliar text-texto-suave">{textos.plan_periodo.replace(':plan', item.planNombre).replace(':periodo', planes.periodo[item.periodo])}</div>
            </div>
            <span className="flex-none text-nombre-fila text-texto">{monto(precioNumerico(item.precio), separador)}</span>
          </div>
        ))}
      </div>
      <div className={clases.total}>
        <span className="text-nombre-fila text-texto">{etiquetaTotal(items)}</span>
        <span className="text-valor-destacado text-texto">{textoTotal(items)}</span>
      </div>
      <div className={clases.promocion}>
        <span className={clases.icono_promocion}>
          <Icono name="regalo" className="h-5 w-5" />
        </span>
        <div className="grid gap-0.5">
          <strong className="text-nombre-fila text-verde-categoria-texto">{textos.primer_mes_titulo}</strong>
          <span className="text-auxiliar text-verde-categoria-texto">{textos.primer_mes_detalle}</span>
        </div>
      </div>
      <Boton type="button" variant="primario" size="md" className="w-full" onClick={alProceder}>
        {textos.proceder} <Icono name="flecha-derecha" className="h-3.5 w-3.5" />
      </Boton>
      <p className={clases.seguro}>
        <Icono name="candado" className="h-3.5 w-3.5" /> {textos.seguro}
      </p>
    </aside>
  )
}
