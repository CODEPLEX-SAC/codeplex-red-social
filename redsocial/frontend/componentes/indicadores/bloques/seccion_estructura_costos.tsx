import catalogoIndicadores from '../../../catalogos/capacidades/redsocial/indicadores.json'
import { DonaProgreso } from '../../compartido/interfaz/dona_progreso'

export function SeccionEstructuraCostos({
  COSTOS,
}: {
  COSTOS: { total: string; items: { color: string; etiqueta: string; pct: string; valor: string; }[]; }
}) {
  return (
    <article className="relative min-w-0 rounded-xl border border-borde bg-white py-4.5 px-5 max-1250:col-span-2 max-900:col-span-1">
      <div className="mb-3.5 flex items-center justify-between border-b border-t-f0eef5 pb-3.5">
        <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoIndicadores.secciones.estructura_costos}</h2>
        <a href="#" className="whitespace-nowrap text-enlace-accion font-semibold text-primario no-underline">{catalogoIndicadores.botones.ver_detalle}</a>
      </div>
      <div className="relative mx-auto mb-4 grid h-32.5 w-32.5 place-items-center rounded-full">
        <DonaProgreso
          segmentos={COSTOS.items.map((it) => ({ color: it.color, porcentaje: Number(it.pct.replace('%', '')) }))}
          tamano={130}
          grosor={16}
          className="absolute inset-0"
        />
        <div className="absolute inset-5 rounded-full bg-white" />
        <span className="relative z-10 flex flex-col items-center text-center">
          <strong className="text-valor-destacado font-extrabold text-texto">{COSTOS.total}</strong>
          <span className="text-auxiliar text-texto-suave">{catalogoIndicadores.leyendas.total_de_costos}</span>
        </span>
      </div>
      <ul className="m-0 grid list-none gap-2 p-0">
        {COSTOS.items.map((it) => (
          <li key={it.etiqueta} className="flex items-center gap-2 text-auxiliar text-texto">
            <svg width="10" height="10" viewBox="0 0 10 10" className="flex-none"><circle cx="5" cy="5" r="5" fill={it.color} /></svg>
            {it.etiqueta} <b className="ml-auto font-bold">{it.pct}</b> <small className="min-w-17 text-right text-texto-suave">{it.valor}</small>
          </li>
        ))}
      </ul>
    </article>
  )
}
