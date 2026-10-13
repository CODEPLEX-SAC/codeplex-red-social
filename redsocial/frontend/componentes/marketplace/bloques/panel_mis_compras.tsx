import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import type { CompraVista } from '@/tipos/marketplace/modelo_carrito'

export function PanelMisCompras({ compras, clasesColor, alIrACompras }: { compras: CompraVista[]; clasesColor: Record<string, string>; alIrACompras: () => void }) {
  return (
    <section className="rounded-xl border border-borde-suave bg-white">
      <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
        <h3 className="m-0 text-titulo-banner text-texto">{catalogoMarketplace.secciones.mis_compras_recientes}</h3>
        <a href="#" className="text-enlace-accion text-primario no-underline hover:underline">{textosRedSocial.VER_TODAS}</a>
      </div>
      <div className="px-4 pb-1">
        {compras.length === 0 && <MensajeVacio texto={catalogoMarketplace.mensajes.sin_compras} className="col-span-full py-8" />}
        {compras.map((c) => (
          <article key={[c.nombre, c.fecha].join()} className="flex items-center gap-2.5 border-b border-borde-suave py-2.5 last:border-b-0">
            <div className={`grid h-9 w-9 flex-none place-items-center rounded-control ${clasesColor[c.color]}`}>
              <Icono name={c.icono} className="h-4.5 w-4.5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-nombre-entidad text-texto">{c.nombre}</span>
              <span className="text-fecha-abreviada text-texto-suave">{c.fecha}</span>
            </div>
            <span className="flex-none whitespace-nowrap rounded bg-fondo-categoria-verde px-2 py-0.75 text-badge text-verde-categoria-texto">{catalogoMarketplace.leyendas.activo}</span>
          </article>
        ))}
      </div>
      <Boton type="button" variant="secundario" size="md" className="mx-4 mb-3.5 mt-1 w-lista" onClick={alIrACompras}>{catalogoMarketplace.botones.ir_a_mis_compras}</Boton>
    </section>
  )
}
