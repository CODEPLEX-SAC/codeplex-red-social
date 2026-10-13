import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Icono } from '../../compartido/icono'
import { Insignia } from '../../compartido/interfaz/insignia'
import { monto, precioNumerico } from './logica_pago_planes'
import type { ItemCarrito } from '@/tipos/marketplace/modelo_carrito'

const textos = catalogoMarketplace.carrito
const planes = catalogoMarketplace.planes

export function FilaCarrito({
  item,
  claseModulo,
  alQuitar,
  alCambiarPlan,
}: {
  item: ItemCarrito
  claseModulo: string
  alQuitar: () => void
  alCambiarPlan: () => void
}) {
  const sufijo = item.periodo === 'mensual' ? planes.sufijo_mensual : planes.sufijo_anual
  return (
    <article className="flex items-start gap-3 rounded-xl border border-borde bg-white p-4 max-600:p-3">
      <span className={`grid h-11 w-11 flex-none place-items-center rounded-xl ${claseModulo}`}>
        <Icono name={item.icono} className="h-5 w-5 text-white" />
      </span>
      <div className="grid min-w-0 flex-1 gap-1.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="m-0 text-nombre-entidad text-texto">{item.nombre}</h3>
            <span className="text-auxiliar text-texto-suave">{textos.plan.replace(':plan', item.planNombre)}</span>
          </div>
          <div className="flex flex-none items-center gap-1.5">
            <span className="text-nombre-fila text-texto">{[monto(precioNumerico(item.precio)), sufijo].join(' ')}</span>
            <BotonIcono icono="cerrar" type="button" aria-label={textos.quitar.replace(':nombre', item.nombre)} variant="discreto" size="sm" onClick={alQuitar} />
          </div>
        </div>
        <p className="m-0 text-cuerpo leading-texto text-texto-suave">{item.descripcion}</p>
        <div className="flex flex-wrap gap-1.5">
          {item.caracteristicas.map((c) => (
            <Insignia key={c} variant="status" className="bg-fondo text-texto-suave">{c}</Insignia>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Insignia variant="status" className="bg-fondo-categoria-verde text-verde-categoria-texto">{textos.mes_gratis}</Insignia>
          <Boton type="button" variant="enlace" size="enlace_accion" onClick={alCambiarPlan}>{textos.cambiar_plan}</Boton>
        </div>
      </div>
    </article>
  )
}
