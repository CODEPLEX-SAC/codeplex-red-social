import catalogoIndicadores from '../../../catalogos/capacidades/redsocial/indicadores.json'
import { DonaProgreso } from '../../compartido/interfaz/dona_progreso'
import { CLASE_ENLACE_ACCION } from '../../compartido/clases_enlace'
import { CLASES_TARJETA, CLASES_CUERPO_TARJETA } from '../../compartido/clases_tarjeta'

export function SeccionEstructuraCostos({
  COSTOS,
}: {
  COSTOS: { total: string; items: { color: string; etiqueta: string; pct: string; valor: string; }[]; }
}) {
  return (
    <article className={[CLASES_TARJETA.panel, 'relative max-1400:col-span-2 max-1000:col-span-1'].join(' ')}>
      <div className="mb-3.5 flex items-center justify-between border-b border-borde-suave pb-3.5">
        <h2 className="m-0 text-titulo-banner text-texto">{catalogoIndicadores.secciones.estructura_costos}</h2>
        <a href="#" className={[CLASE_ENLACE_ACCION, 'whitespace-nowrap'].join(' ')}>{catalogoIndicadores.botones.ver_detalle}</a>
      </div>
        <div className={CLASES_CUERPO_TARJETA.cuerpo_centrado}>
      <DonaProgreso
        segmentos={COSTOS.items.map((it) => ({ color: it.color, porcentaje: Number(it.pct.replace('%', '')) }))}
        tamano={130}
        grosor={16}
        valorCentral={COSTOS.total}
        etiquetaCentral={catalogoIndicadores.leyendas.total_de_costos}
        className="mx-auto mb-4"
      />
      <ul className="m-0 grid list-none gap-2 p-0">
        {COSTOS.items.map((it) => (
          <li key={it.etiqueta} className="flex items-center gap-2 text-auxiliar text-texto">
            <svg width="10" height="10" viewBox="0 0 10 10" className="flex-none"><circle cx="5" cy="5" r="5" fill={it.color} /></svg>
            {it.etiqueta} <b className="ml-auto font-titulo">{it.pct}</b> <small className="min-w-17 text-right text-auxiliar text-texto-suave">{it.valor}</small>
          </li>
        ))}
      </ul>
        </div>
      </article>
  )
}
