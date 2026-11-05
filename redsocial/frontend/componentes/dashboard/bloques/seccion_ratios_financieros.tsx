import { CLASES_TABLA } from '../../compartido/clases_tabla'
import catalogoDashboard from '../../../catalogos/capacidades/redsocial/dashboard.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { CLASE_ENLACE_ACCION } from '../../compartido/clases_enlace'
import { CLASES_TARJETA, CLASES_CUERPO_TARJETA } from '../../compartido/clases_tarjeta'

export function SeccionRatiosFinancieros({
  RATIOS,
  EstadoBadge,
  ETIQUETA_RATIO,
}: {
  RATIOS: { nombre: string; valor: string; estado: 'optimo' | 'bajo' | 'aceptable' | 'riesgo'; }[]
  EstadoBadge: ({ estado, children }: { estado: 'optimo' | 'bajo' | 'aceptable' | 'riesgo'; children: string; }) => React.JSX.Element
  ETIQUETA_RATIO: Record<'optimo' | 'bajo' | 'aceptable' | 'riesgo', string>
}) {
  return (
    <article className={CLASES_TARJETA.panel}>
      <div className="mb-3.5 flex items-center justify-between border-b border-borde-suave pb-3.5">
        <h2 className="m-0 text-titulo-banner text-texto">{catalogoDashboard.secciones.ratios_financieros}</h2>
        <a href="#" className={CLASE_ENLACE_ACCION}>{textosRedSocial.VER_TODOS}</a>
      </div>
      <div className={['overflow-x-auto', CLASES_CUERPO_TARJETA.cuerpo_tabla].join(' ')}>
        <table className={CLASES_TABLA.compacta.tabla}>
          <thead>
            <tr>
              <th className={CLASES_TABLA.compacta.encabezado}>{catalogoDashboard.tabla.ratio}</th>
              <th className={CLASES_TABLA.compacta.encabezado}>{catalogoDashboard.tabla.valor}</th>
              <th className={CLASES_TABLA.compacta.encabezado}>{catalogoDashboard.tabla.estado}</th>
            </tr>
          </thead>
          <tbody>
            {RATIOS.map((r) => (
              <tr key={r.nombre}>
                <td className={CLASES_TABLA.compacta.celda_nombre}>{r.nombre}</td>
                <td className={CLASES_TABLA.compacta.celda}>{r.valor}</td>
                <td className={CLASES_TABLA.compacta.celda}>
                  <EstadoBadge estado={r.estado}>{ETIQUETA_RATIO[r.estado]}</EstadoBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  )
}
