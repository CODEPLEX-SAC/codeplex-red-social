import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { Icono } from '../../compartido/icono'

export function SeccionPopularEstaSemana({
  POPULARES,
  CLASES_CATEGORIA_COLOR,
}: {
  POPULARES: { icono: string; color: 'verde' | 'azul' | 'morado' | 'naranja' | 'rosa'; nombre: string; puntaje: string; conteo: string; precio: string; }[]
  CLASES_CATEGORIA_COLOR: Record<'verde' | 'azul' | 'morado' | 'naranja' | 'rosa', string>
}) {
  return (
    <section className="rounded-xl border border-t-eeeeee bg-white">
      <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
        <h3 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoMarketplace.secciones.popular_esta_semana}</h3>
        <a href="#" className="text-enlace-accion font-semibold text-primario no-underline hover:underline">{textosRedSocial.VER_TODOS}</a>
      </div>
      <div className="px-4 pb-3">
        {POPULARES.map((p, i) => (
          <article key={p.nombre} className="flex items-center gap-2.5 border-b border-t-f5f5f5 py-2.5 last:border-b-0">
            <span className="w-5 flex-none text-center text-contador font-extrabold text-texto-suave">{i + 1}</span>
            <div className={`grid h-8 w-8 flex-none place-items-center rounded-lg ${CLASES_CATEGORIA_COLOR[p.color]}`}>
              <Icono name={p.icono} className="h-4 w-4 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-nombre-entidad font-semibold text-texto">{p.nombre}</span>
              <div className="mt-px flex items-center gap-0.75">
                <Icono name="estrella" className="h-2.5 w-2.5 text-t-ffcc00" />
                <span className="text-contador font-bold text-texto">{p.puntaje}</span>
                <span className="text-contador text-texto-suave">{p.conteo}</span>
              </div>
            </div>
            <span className="flex-none whitespace-nowrap text-contador font-bold text-texto">
              {p.precio} <span className="text-auxiliar font-normal text-texto-suave">{catalogoMarketplace.leyendas.por_mes}</span>
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}
