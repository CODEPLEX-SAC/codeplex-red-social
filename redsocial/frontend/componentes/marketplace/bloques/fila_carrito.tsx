import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Icono } from '../../compartido/icono'
import { Insignia } from '../../compartido/interfaz/insignia'
import { monto, precioNumerico } from './logica_pago_planes'
import type { ItemCarrito } from '@/tipos/marketplace/modelo_carrito'

const textos = catalogoMarketplace.carrito
const clases = textos.clases
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
    <article className={clases.fila}>
      <span className={`${clases.icono} ${claseModulo}`}>
        <Icono name={item.icono} className="h-5 w-5 text-white" />
      </span>
      <div className={clases.contenido}>
        <div className={clases.cabecera_fila}>
          <div className="min-w-0">
            <h3 className="m-0 text-nombre-entidad text-texto">{item.nombre}</h3>
            <span className="text-auxiliar text-texto-suave">{textos.plan_periodo.replace(':plan', item.planNombre).replace(':periodo', planes.periodo[item.periodo])}</span>
          </div>
          <div className={clases.cobro}>
            <span className="text-nombre-fila text-texto">{[monto(precioNumerico(item.precio), textos.separador_moneda), sufijo].join(textos.separador_moneda)}</span>
            <BotonIcono icono="eliminar" type="button" aria-label={textos.quitar.replace(':nombre', item.nombre)} variant="contorno" size="sm" onClick={alQuitar} />
          </div>
        </div>
        <p className="m-0 text-subtitulo leading-texto text-texto-suave">{item.descripcion}</p>
        <div className={clases.etiquetas}>
          {item.caracteristicas.map((c) => (
            <Insignia key={c} variant="status" className="bg-fondo text-texto-suave">{c}</Insignia>
          ))}
        </div>
        <div className={clases.pie_fila}>
          <Boton type="button" variant="enlace" size="enlace_accion" onClick={alCambiarPlan}>{textos.cambiar_plan}</Boton>
        </div>
      </div>
    </article>
  )
}
