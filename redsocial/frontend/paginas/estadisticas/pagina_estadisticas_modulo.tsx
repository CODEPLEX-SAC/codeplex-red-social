import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { Boton } from '../../componentes/compartido/interfaz/boton'
import { ContactosPanel } from '../../componentes/compartido/bloques/contactos_panel'
import { BloqueAnuncio } from '../../componentes/compartido/bloques/bloque_anuncio'

const METRICAS = [
  { etiqueta: 'total', valor: 'S/ 842,640', variacion: '↗ 12.4%', tipo: 'positiva' as const },
  { etiqueta: 'Crecimiento', valor: '18.6%', variacion: '↘ 6.2%', tipo: 'negativa' as const },
  { etiqueta: 'Promedio mensual', valor: 'S/ 70,220', variacion: '↗ 9.8%', tipo: 'positiva' as const },
  { etiqueta: 'Registros', valor: '12,480', variacion: '↗ 14.1%', tipo: 'positiva' as const },
]

const BARRAS = [
  { mes: 'Ene', valor: 20 }, { mes: 'Feb', valor: 29 }, { mes: 'Mar', valor: 38 }, { mes: 'Abr', valor: 47 },
  { mes: 'May', valor: 56 }, { mes: 'Jun', valor: 65 }, { mes: 'Jul', valor: 74 }, { mes: 'Ago', valor: 83 },
]

const RESUMEN = [
  { etiqueta: 'Resultado acumulado', valor: 'S/ 542,800' },
  { etiqueta: 'Variación interanual', valor: '+18.6%' },
  { etiqueta: 'Meta del periodo', valor: '82%' },
  { etiqueta: 'Proyección', valor: 'S/ 980,200' },
]

const DETALLE = [
  { periodo: 'Enero 2026', resultado: 'S/ 42,000', variacion: '+8%', meta: 'S/ 50,000', cumplimiento: '72%' },
  { periodo: 'Febrero 2026', resultado: 'S/ 47,300', variacion: '+9%', meta: 'S/ 54,000', cumplimiento: '75%' },
  { periodo: 'Marzo 2026', resultado: 'S/ 52,600', variacion: '+10%', meta: 'S/ 58,000', cumplimiento: '78%' },
  { periodo: 'Abril 2026', resultado: 'S/ 57,900', variacion: '+11%', meta: 'S/ 62,000', cumplimiento: '81%' },
  { periodo: 'Mayo 2026', resultado: 'S/ 63,200', variacion: '+12%', meta: 'S/ 66,000', cumplimiento: '84%' },
  { periodo: 'Junio 2026', resultado: 'S/ 68,500', variacion: '+13%', meta: 'S/ 70,000', cumplimiento: '87%' },
  { periodo: 'Julio 2026', resultado: 'S/ 73,800', variacion: '+14%', meta: 'S/ 74,000', cumplimiento: '90%' },
  { periodo: 'Agosto 2026', resultado: 'S/ 79,100', variacion: '+15%', meta: 'S/ 78,000', cumplimiento: '93%' },
]

const CONTACTOS = ['Ana Torres', 'Miguel Rojas', 'José Castillo', 'Laura Pérez', 'Sofía Gómez'].map((nombre) => ({
  nombre,
  subtitulo: 'Conexión profesional',
}))

export function PaginaEstadisticasModulo({ modulo }: { modulo: string }) {
  return (
    <EstructuraApp paginaActiva="estadisticas">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5 flex items-start justify-between gap-5">
              <div>
                <p className="m-0 mb-1 text-[11px] font-bold text-primario">Red Social</p>
                <h1 className="m-0 text-[23px] tracking-[-0.02em] text-texto">Estadísticas</h1>
              </div>
              <div className="flex items-center gap-2.5 max-[560px]:hidden">
                <Boton variant="primario">+ Crear</Boton>
              </div>
            </div>

            <section className="mb-4.5 grid grid-cols-4 gap-3 max-[1150px]:grid-cols-2 max-[560px]:grid-cols-1">
              {METRICAS.map((m, i) => (
                <article key={i} className="rounded-[9px] border border-borde bg-white p-4 shadow-sombra">
                  <span className="block text-[10px] text-[#858295]">{i === 0 ? `${modulo} ${m.etiqueta}` : m.etiqueta}</span>
                  <strong className="my-2 block text-[23px] tracking-[-0.03em] text-texto">{m.valor}</strong>
                  <small className={'text-[9px] ' + (m.tipo === 'positiva' ? 'text-exito' : 'text-peligro')}>{m.variacion}</small>
                </article>
              ))}
            </section>

            <section className="mb-3 grid grid-cols-[2fr_1fr] gap-3 max-[800px]:grid-cols-1">
              <article className="min-h-[300px] min-w-0 rounded-[10px] border border-borde bg-white shadow-sombra">
                <div className="flex items-center justify-between p-[18px_20px] pb-3.5">
                  <div>
                    <h2 className="m-0 text-[15px] font-bold text-texto">Evolución de {modulo.toLowerCase()}</h2>
                    <p className="m-0 mt-0.5 text-xs text-texto-suave">Comparativa mensual.</p>
                  </div>
                  <select defaultValue="2026">
                    <option>2026</option>
                    <option>2025</option>
                  </select>
                </div>
                <div className="flex h-[205px] items-end gap-3.5 px-6 pb-4">
                  {BARRAS.map((b) => (
                    <div key={b.mes} className="flex h-[60%] flex-1 flex-col items-center justify-end gap-1.5">
                      <span className="h-full min-h-[15px] w-full rounded-t" style={{ background: 'linear-gradient(#7662fa, #c0b8ff)' }} />
                      <small className="text-[10px] text-texto-suave">{b.mes}</small>
                    </div>
                  ))}
                </div>
              </article>
              <article className="min-w-0 rounded-[10px] border border-borde bg-white shadow-sombra">
                <div className="p-[18px_20px] pb-3.5">
                  <h2 className="m-0 text-[15px] font-bold text-texto">Resumen</h2>
                  <p className="m-0 mt-0.5 text-xs text-texto-suave">Indicadores destacados.</p>
                </div>
                <ul className="m-0 list-none p-0 px-5 pb-4.5">
                  {RESUMEN.map((r) => (
                    <li key={r.etiqueta} className="flex justify-between border-b border-[#f0eef5] py-3.5 text-[10px]">
                      <span className="text-texto-suave">{r.etiqueta}</span>
                      <strong className="text-[11px] text-texto">{r.valor}</strong>
                    </li>
                  ))}
                </ul>
              </article>
            </section>

            <section className="rounded-[10px] border border-borde bg-white shadow-sombra">
              <div className="flex items-center justify-between p-[18px_20px] pb-3.5">
                <div>
                  <h2 className="m-0 text-[15px] font-bold text-texto">Detalle</h2>
                  <p className="m-0 mt-0.5 text-xs text-texto-suave">Datos consolidados por periodo.</p>
                </div>
                <Boton variant="secundario">Exportar</Boton>
              </div>
              <div className="overflow-auto px-5 pb-5">
                <table className="w-full border-collapse text-[11px]">
                  <thead>
                    <tr>
                      {['Periodo', 'Resultado', 'Variación', 'Meta', 'Cumplimiento'].map((h) => (
                        <th key={h} className="whitespace-nowrap border-b border-[#f0eef5] bg-[#fcfbfe] px-3.5 py-3 text-left text-[9px] font-bold uppercase tracking-[0.04em] text-[#9693a5]">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DETALLE.map((d) => (
                      <tr key={d.periodo}>
                        <td className="whitespace-nowrap border-b border-[#f0eef5] px-3.5 py-3">{d.periodo}</td>
                        <td className="whitespace-nowrap border-b border-[#f0eef5] px-3.5 py-3">{d.resultado}</td>
                        <td className="whitespace-nowrap border-b border-[#f0eef5] px-3.5 py-3">
                          <span className="inline-flex rounded-full bg-[#eaf8f1] px-[7px] py-1 text-[9px] text-[#16845a]">{d.variacion}</span>
                        </td>
                        <td className="whitespace-nowrap border-b border-[#f0eef5] px-3.5 py-3">{d.meta}</td>
                        <td className="whitespace-nowrap border-b border-[#f0eef5] px-3.5 py-3">{d.cumplimiento}</td>
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
            <ContactosPanel contactos={CONTACTOS} />
            <BloqueAnuncio />
          </aside>
        }
      />
    </EstructuraApp>
  )
}

export function PaginaEstadisticasVentas() {
  return <PaginaEstadisticasModulo modulo="Ventas" />
}
export function PaginaEstadisticasContabilidad() {
  return <PaginaEstadisticasModulo modulo="Contabilidad" />
}
export function PaginaEstadisticasPlanillas() {
  return <PaginaEstadisticasModulo modulo="Planillas" />
}
