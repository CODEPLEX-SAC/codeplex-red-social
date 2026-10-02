import catalogoEstadisticas from '../../../catalogos/capacidades/redsocial/estadisticas.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { MedidaDinamica } from '../../compartido/interfaz/medida_dinamica'

export function SeccionTopClientes({
  TOP_CLIENTES,
  ESCALA_TOP_CLIENTES,
}: {
  TOP_CLIENTES: { nombre: string; ancho: string; valor: string; }[]
  ESCALA_TOP_CLIENTES: string[]
}) {
  return (
    <article className="min-w-0 rounded-xl border border-borde bg-white py-4.5 px-5">
      <div className="mb-3.5 flex items-center justify-between border-b border-t-f0eef5 pb-3.5">
        <div>
          <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoEstadisticas.secciones.top_clientes}</h2>
          <p className="m-0 text-auxiliar text-texto-suave">{catalogoEstadisticas.secciones.top_clientes_sub}</p>
        </div>
        <a href="#" className="text-enlace-accion font-semibold text-primario no-underline">{textosRedSocial.VER_TODOS}</a>
      </div>
      <ul className="m-0 grid list-none gap-3 p-0">
        {TOP_CLIENTES.map((c) => (
          <li key={c.nombre} className="grid grid-cols-120-1fr-62 items-center gap-2.5">
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-nombre-entidad text-texto">{c.nombre}</span>
            <div className="h-2 overflow-hidden rounded-full bg-t-f0eef5">
              <MedidaDinamica as="span" ancho={c.ancho} className="block h-full rounded-full bg-primario" />
            </div>
            <span className="whitespace-nowrap text-right text-valor-destacado font-bold text-texto">{c.valor}</span>
          </li>
        ))}
      </ul>
      <div className="mt-1.5 grid grid-cols-120-1fr-62">
        <span />
        <div className="flex justify-between text-auxiliar text-texto-suave">
          {ESCALA_TOP_CLIENTES.map((v) => <span key={v}>{v}</span>)}
        </div>
        <span />
      </div>
    </article>
  )
}
