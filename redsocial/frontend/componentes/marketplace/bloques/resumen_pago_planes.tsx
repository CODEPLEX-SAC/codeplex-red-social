import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { monto, precioNumerico } from './logica_pago_planes'
import type { usarPagoPlanes } from './usar_pago_planes'
import type { ItemCarrito } from '@/tipos/marketplace/modelo_carrito'

const textos = catalogoMarketplace.pago.resumen
const planes = catalogoMarketplace.planes

function Linea({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-auxiliar">
      <span className="text-texto-suave">{etiqueta}</span>
      <span className="text-nombre-fila text-texto">{valor}</span>
    </div>
  )
}

export function ResumenPagoPlanes({
  items,
  clasesModulo,
  etiquetaTotal,
  estado,
}: {
  items: ItemCarrito[]
  clasesModulo: Record<string, string>
  etiquetaTotal: string
  estado: ReturnType<typeof usarPagoPlanes>
}) {
  return (
    <aside className={`${catalogoMarketplace.pago.clases.tarjeta} grid content-start gap-3`}>
      <h3 className="m-0 text-nombre-entidad text-texto">{textos.titulo}</h3>
      {items.map((item) => (
        <div key={item.aplicacion} className="flex items-center gap-3">
          <span className={`grid h-9 w-9 flex-none place-items-center rounded-lg ${clasesModulo[item.tema]}`}>
            <Icono name={item.icono} className="h-5 w-5 text-white" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-nombre-fila text-texto">{item.nombre}</div>
            <div className="text-auxiliar text-texto-suave">{[textos.plan, item.planNombre].join(' ')}</div>
          </div>
          <span className="flex-none text-nombre-fila text-texto">{[monto(precioNumerico(item.precio)), item.periodo === 'mensual' ? planes.sufijo_mensual : planes.sufijo_anual].join(' ')}</span>
        </div>
      ))}
      {estado.vip && <Linea etiqueta={estado.elegibles > 1 ? textos.addon_varios.replace(':n', String(estado.elegibles)) : textos.addon} valor={[textos.addon_signo, monto(estado.vipTotal)].join(textos.addon_union)} />}
      <div className="grid gap-1.5 border-t border-borde-suave pt-3">
        <Linea etiqueta={textos.prueba} valor={textos.prueba_valor} />
        <Linea etiqueta={textos.cobro_hoy} valor={estado.hoy > 0 ? monto(estado.hoy) : textos.cobro_hoy_valor} />
      </div>
      <div className="flex items-end justify-between gap-3 border-t border-borde-suave pt-3">
        <div>
          <div className="text-nombre-fila text-texto">{etiquetaTotal}</div>
          <div className="text-auxiliar text-texto-suave">{textos.desde.replace(':fecha', estado.fechaCobro)}</div>
        </div>
        <span className="text-valor-destacado text-texto">{monto(estado.total)}</span>
      </div>
      <Boton type="button" variant="primario" size="md" className="w-full" disabled={!estado.terminos} onClick={estado.activar}>
        {textos.activar}
      </Boton>
      <p className="m-0 flex items-center justify-center gap-1.5 text-auxiliar text-texto-suave">
        <Icono name="escudo" className="h-3.5 w-3.5" /> {estado.hoy > 0 ? textos.seguro_vip : textos.seguro}
      </p>
    </aside>
  )
}
