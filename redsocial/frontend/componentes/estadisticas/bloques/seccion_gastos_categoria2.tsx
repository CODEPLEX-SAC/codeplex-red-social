import catalogoEstadisticas from '../../../catalogos/capacidades/redsocial/estadisticas.json'
import { DonaProgreso } from '../../compartido/interfaz/dona_progreso'
import { CLASES_TARJETA, CLASES_CUERPO_TARJETA } from '../../compartido/clases_tarjeta'

export function SeccionGastosCategoria2({
  GASTOS_CATEGORIA,
}: {
  GASTOS_CATEGORIA: { total: string; items: { color: string; etiqueta: string; pct: string; valor: string; }[]; }
}) {
  return (
    <article className={CLASES_TARJETA.panel}>
      <div className="mb-3.5 border-b border-borde-suave pb-3.5">
        <h2 className="m-0 text-titulo-banner text-texto">{catalogoEstadisticas.secciones.gastos_categoria}</h2>
      </div>
        <div className={CLASES_CUERPO_TARJETA.cuerpo_centrado}>
      <DonaProgreso
        segmentos={GASTOS_CATEGORIA.items.map((it) => ({ color: it.color, porcentaje: Number(it.pct.replace('%', '')) }))}
        tamano={140}
        grosor={16}
        valorCentral={GASTOS_CATEGORIA.total}
        etiquetaCentral={catalogoEstadisticas.leyendas.total}
        className="mx-auto mb-4"
      />
      <ul className="m-0 grid list-none gap-2 p-0">
        {GASTOS_CATEGORIA.items.map((it) => (
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
