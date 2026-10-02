import catalogoEstadisticas from '../../../catalogos/capacidades/redsocial/estadisticas.json'
import { DonaProgreso } from '../../compartido/interfaz/dona_progreso'

export function SeccionGastosCategoria2({
  GASTOS_CATEGORIA,
}: {
  GASTOS_CATEGORIA: { total: string; items: { color: string; etiqueta: string; pct: string; valor: string; }[]; }
}) {
  return (
    <article className="min-w-0 rounded-xl border border-borde bg-white py-4.5 px-5">
      <div className="mb-3.5 border-b border-t-f0eef5 pb-3.5">
        <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoEstadisticas.secciones.gastos_categoria}</h2>
      </div>
      <div className="relative mx-auto mb-4 grid h-35 w-35 place-items-center rounded-full">
        <DonaProgreso
          segmentos={GASTOS_CATEGORIA.items.map((it) => ({ color: it.color, porcentaje: Number(it.pct.replace('%', '')) }))}
          tamano={140}
          grosor={16}
          className="absolute inset-0"
        />
        <div className="absolute inset-5.5 rounded-full bg-white" />
        <span className="relative z-10 flex flex-col items-center text-center">
          <strong className="text-valor-destacado font-extrabold text-texto">{GASTOS_CATEGORIA.total}</strong>
          <span className="text-auxiliar text-texto-suave">{catalogoEstadisticas.leyendas.total}</span>
        </span>
      </div>
      <ul className="m-0 grid list-none gap-2 p-0">
        {GASTOS_CATEGORIA.items.map((it) => (
          <li key={it.etiqueta} className="flex items-center gap-2 text-auxiliar text-texto">
            <svg width="10" height="10" viewBox="0 0 10 10" className="flex-none"><circle cx="5" cy="5" r="5" fill={it.color} /></svg>
            {it.etiqueta} <b className="ml-auto font-bold">{it.pct}</b> <small className="min-w-17 text-right text-texto-suave">{it.valor}</small>
          </li>
        ))}
      </ul>
    </article>
  )
}
