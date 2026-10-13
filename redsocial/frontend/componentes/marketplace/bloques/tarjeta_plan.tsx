import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Boton } from '../../compartido/interfaz/boton'
import { Insignia } from '../../compartido/interfaz/insignia'
import { ItemCaracteristica } from './item_caracteristica'
import type { DetalleCaracteristica, EstiloPlanDestacado, EstiloSelectorPlanes, PaquetesPlanes, PlanAplicacion, SeleccionPlan } from '@/tipos/marketplace/modelo_planes'

const textos = catalogoMarketplace.planes

export function TarjetaPlan({
  plan,
  periodo,
  seleccionado,
  estilo,
  estiloDestacado,
  detalles,
  paquetes,
  alVerPaquetes,
  className,
  alSeleccionar,
  alAbrirDetalle,
}: {
  plan: PlanAplicacion
  periodo: SeleccionPlan['periodo']
  seleccionado: boolean
  estilo: EstiloSelectorPlanes
  estiloDestacado: EstiloPlanDestacado
  detalles: Record<string, DetalleCaracteristica>
  paquetes?: PaquetesPlanes
  alVerPaquetes?: () => void
  className: string
  alSeleccionar: () => void
  alAbrirDetalle: (texto: string) => void
}) {
  const claseBase = plan.destacado ? estiloDestacado.fondo : 'border border-borde bg-white text-texto'
  const claseAtenuada = plan.destacado ? estiloDestacado.auxiliar : 'text-texto-suave'
  const claseNombre = plan.destacado ? '' : estilo.texto
  const claseEtiqueta = plan.destacado ? estiloDestacado.pildora : estilo.relleno
  const claseTop = plan.destacado || plan.cinta ? 'pt-8' : ''

  return (
    <article className={`relative flex min-w-0 flex-col gap-3 rounded-xl p-4 ${claseBase} ${claseTop} ${seleccionado ? `ring-2 ${estilo.seleccion}` : ''} ${className}`}>
      {plan.cinta && <span className={`absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap rounded-b-xl px-3 py-0.5 text-badge uppercase ${estilo.relleno}`}>{plan.cinta}</span>}
      <h3 className={`m-0 text-nombre-entidad ${claseNombre}`}>{plan.nombre}</h3>
      <div className="flex flex-wrap items-baseline gap-1">
        <span className={`text-auxiliar ${claseAtenuada}`}>{textos.moneda}</span>
        <span className="text-valor-destacado">{plan.precio[periodo]}</span>
        <span className={`text-auxiliar ${claseAtenuada}`}>{periodo === 'mensual' ? textos.sufijo_mensual : textos.sufijo_anual}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {plan.etiquetas.map((e) => (
          <Insignia key={e} variant="status" className={claseEtiqueta}>{e}</Insignia>
        ))}
      </div>
      <ul className="m-0 grid flex-1 list-none content-start gap-1.5 p-0">
        {plan.caracteristicas.map((c) => (
          <ItemCaracteristica key={c.texto} caracteristica={c} claseIconoIncluido={plan.destacado ? estiloDestacado.icono : estilo.texto} claseAtenuada={claseAtenuada} conDetalle={Boolean(detalles[c.texto])} alAbrirDetalle={alAbrirDetalle} />
        ))}
      </ul>
      {plan.paquetes && paquetes && (
        <div className="grid justify-items-start gap-0.5">
          <span className={`text-auxiliar ${claseAtenuada}`}>{paquetes.pregunta}</span>
          <Boton type="button" variant={plan.destacado ? 'secundario' : 'contorno'} size="mini" onClick={alVerPaquetes}>{paquetes.ver}</Boton>
        </div>
      )}
      <Boton type="button" variant={seleccionado ? 'primario' : plan.destacado ? 'secundario' : 'contorno'} size="md" className="w-full" aria-pressed={seleccionado} onClick={alSeleccionar}>
        {seleccionado ? textos.seleccionado : (plan.textoElegir ?? textos.elegir)}
      </Boton>
    </article>
  )
}
