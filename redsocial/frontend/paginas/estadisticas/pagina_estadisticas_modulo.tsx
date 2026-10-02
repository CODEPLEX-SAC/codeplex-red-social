import { Selector, EstructuraApp, EstructuraTresColumnas, ColumnaPublicidad, Boton, ContactosPanel, BloqueAnuncio } from '../../componentes/compartido'
import { CONTACTOS_SUGERIDOS } from '../../rutas/compartido/rutas_compartido'
import { METRICAS, BARRAS, RESUMEN, DETALLE } from '../../rutas/estadisticas/rutas_estadisticas'
import catalogoEstadisticas from '../../catalogos/capacidades/redsocial/estadisticas.json'

const TABLA_DETALLE_MODULO = catalogoEstadisticas.tabla_detalle_modulo

export function PaginaEstadisticasModulo({ modulo }: { modulo: string }) {
  const titulo = (catalogoEstadisticas.titulos as Record<string, string>)[modulo] ?? catalogoEstadisticas.titulos.todos_modulos
  return (
    <EstructuraApp paginaActiva="estadisticas">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5 flex items-start justify-between gap-5">
              <div>
                <p className="m-0 mb-1 text-subtitulo font-bold text-primario">{catalogoEstadisticas.capacidad_nombre}</p>
                <h1 className="m-0 text-titulo-pagina tracking-n02 text-texto">{titulo}</h1>
              </div>
              <div className="flex items-center gap-2.5 max-560:hidden">
                <Boton variant="primario">{catalogoEstadisticas.botones.crear}</Boton>
              </div>
            </div>

            <section className="mb-4.5 grid grid-cols-4 gap-3 max-1150:grid-cols-2 max-560:grid-cols-1">
              {METRICAS.map((m, i) => (
                <article key={m.etiqueta} className="rounded-9 border border-borde bg-white p-4 shadow-sombra">
                  <span className="block text-auxiliar text-t-858295">{i === 0 ? `${modulo} ${m.etiqueta}` : m.etiqueta}</span>
                  <strong className="my-2 block text-valor-destacado tracking-n03 text-texto">{m.valor}</strong>
                  <small className={'text-contador ' + (m.tipo === 'positiva' ? 'text-exito' : 'text-peligro')}>{m.variacion}</small>
                </article>
              ))}
            </section>

            <section className="mb-3 grid grid-cols-2fr-1fr gap-3 max-800:grid-cols-1">
              <article className="min-h-75 min-w-0 rounded-control border border-borde bg-white shadow-sombra">
                <div className="flex items-center justify-between py-4.5 px-5 pb-3.5">
                  <div>
                    <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoEstadisticas.secciones.evolucion_de_prefijo} {modulo.toLowerCase()}</h2>
                    <p className="m-0 mt-0.5 text-auxiliar text-texto-suave">{catalogoEstadisticas.secciones.modulo_comparativa}</p>
                  </div>
                  <Selector variant="mini" aria-label={catalogoEstadisticas.selectores.anio_grafico.etiqueta} defaultValue={catalogoEstadisticas.selectores.anio_grafico.opciones[0]}>
                    {catalogoEstadisticas.selectores.anio_grafico.opciones.map((o) => <option key={o}>{o}</option>)}
                  </Selector>
                </div>
                <div className="flex h-51.25 items-end gap-3.5 px-6 pb-4">
                  {BARRAS.map((b) => (
                    <div key={b.mes} className="flex h-p60 flex-1 flex-col items-center justify-end gap-1.5">
                      <span className="h-full min-h-3.75 w-full rounded-t degradado-violeta-claro" />
                      <small className="text-auxiliar text-texto-suave">{b.mes}</small>
                    </div>
                  ))}
                </div>
              </article>
              <article className="min-w-0 rounded-control border border-borde bg-white shadow-sombra">
                <div className="py-4.5 px-5 pb-3.5">
                  <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoEstadisticas.secciones.modulo_resumen}</h2>
                  <p className="m-0 mt-0.5 text-auxiliar text-texto-suave">{catalogoEstadisticas.secciones.modulo_resumen_sub}</p>
                </div>
                <ul className="m-0 list-none p-0 px-5 pb-4.5">
                  {RESUMEN.map((r) => (
                    <li key={r.etiqueta} className="flex justify-between border-b border-t-f0eef5 py-3.5 text-auxiliar">
                      <span className="text-texto-suave">{r.etiqueta}</span>
                      <strong className="text-valor-destacado text-texto">{r.valor}</strong>
                    </li>
                  ))}
                </ul>
              </article>
            </section>

            <section className="rounded-control border border-borde bg-white shadow-sombra">
              <div className="flex items-center justify-between py-4.5 px-5 pb-3.5">
                <div>
                  <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoEstadisticas.secciones.modulo_detalle}</h2>
                  <p className="m-0 mt-0.5 text-auxiliar text-texto-suave">{catalogoEstadisticas.secciones.modulo_detalle_sub}</p>
                </div>
                <Boton variant="secundario">{catalogoEstadisticas.botones.exportar}</Boton>
              </div>
              <div className="overflow-auto px-5 pb-5">
                <table className="w-full border-collapse text-cuerpo">
                  <thead>
                    <tr>
                      {TABLA_DETALLE_MODULO.map((h) => (
                        <th key={h} className="whitespace-nowrap border-b border-t-f0eef5 bg-t-fcfbfe px-3.5 py-3 text-left text-encabezado-tabla font-bold uppercase tracking-04 text-t-9693a5">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DETALLE.map((d) => (
                      <tr key={d.periodo}>
                        <td className="whitespace-nowrap border-b border-t-f0eef5 px-3.5 py-3">{d.periodo}</td>
                        <td className="whitespace-nowrap border-b border-t-f0eef5 px-3.5 py-3">{d.resultado}</td>
                        <td className="whitespace-nowrap border-b border-t-f0eef5 px-3.5 py-3">
                          <span className="inline-flex rounded-full bg-t-eaf8f1 px-1.75 py-1 text-contador text-t-16845a">{d.variacion}</span>
                        </td>
                        <td className="whitespace-nowrap border-b border-t-f0eef5 px-3.5 py-3">{d.meta}</td>
                        <td className="whitespace-nowrap border-b border-t-f0eef5 px-3.5 py-3">{d.cumplimiento}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <ContactosPanel contactos={CONTACTOS_SUGERIDOS} />
            <BloqueAnuncio />
          </aside>
        }
      />
    </EstructuraApp>
  )
}
