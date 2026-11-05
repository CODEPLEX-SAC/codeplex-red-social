import catalogoEstadisticas from '../../../catalogos/capacidades/redsocial/estadisticas.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { MedidaDinamica } from '../../compartido/interfaz/medida_dinamica'
import { TextoTruncable } from '../../compartido/interfaz/texto_truncable'
import { CLASE_ENLACE_ACCION } from '../../compartido/clases_enlace'
import { CLASES_TARJETA, CLASES_CUERPO_TARJETA } from '../../compartido/clases_tarjeta'

export function SeccionTopClientes({
  TOP_CLIENTES,
  ESCALA_TOP_CLIENTES,
}: {
  TOP_CLIENTES: { nombre: string; ancho: string; valor: string; }[]
  ESCALA_TOP_CLIENTES: string[]
}) {
  return (
    <article className={CLASES_TARJETA.panel}>
      <div className="mb-3.5 flex items-center justify-between border-b border-borde-suave pb-3.5">
        <div>
          <h2 className="m-0 text-titulo-banner text-texto">{catalogoEstadisticas.secciones.top_clientes}</h2>
          <p className="m-0 text-auxiliar text-texto-suave">{catalogoEstadisticas.secciones.top_clientes_sub}</p>
        </div>
        <a href="#" className={CLASE_ENLACE_ACCION}>{textosRedSocial.VER_TODOS}</a>
      </div>
        <div className={CLASES_CUERPO_TARJETA.cuerpo_centrado}>
      <div className="@container">
        <div className="grid grid-cols-minmax0-100-minmax0-1fr-auto items-center gap-x-2.5 @max-sm:grid-cols-minmax0-1fr-auto">
          <ul className="col-span-full m-0 grid list-none grid-cols-subgrid gap-y-3 p-0">
            {TOP_CLIENTES.map((c) => (
              <li key={c.nombre} className="col-span-full grid grid-cols-subgrid items-center gap-y-1.5">
                <TextoTruncable texto={c.nombre} className="text-nombre-fila text-texto" />
                <div className="h-2 overflow-hidden rounded-full bg-borde-suave @max-sm:order-last @max-sm:col-span-full">
                  <MedidaDinamica as="span" ancho={c.ancho} className="block h-full rounded-full bg-primario" />
                </div>
                <span className="whitespace-nowrap text-right text-nombre-fila text-texto">{c.valor}</span>
              </li>
            ))}
          </ul>
          <div className="col-span-full mt-1.5 grid grid-cols-subgrid">
            <span className="@max-sm:hidden" />
            <div className="flex min-w-0 justify-between overflow-hidden text-auxiliar text-texto-suave @max-sm:col-span-full">
              {ESCALA_TOP_CLIENTES.map((v) => <span key={v}>{v}</span>)}
            </div>
            <span className="@max-sm:hidden" />
          </div>
        </div>
      </div>
        </div>
      </article>
  )
}
