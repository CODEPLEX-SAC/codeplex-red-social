import catalogoDashboard from '../../../catalogos/capacidades/redsocial/dashboard.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'

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
    <article className="min-w-0 rounded-control border border-gris-borde bg-white py-4.5 px-5 shadow-sombra">
      <div className="mb-3.5 flex items-center justify-between border-b border-t-f0eef5 pb-3.5">
        <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoDashboard.secciones.ratios_financieros}</h2>
        <a href="#" className="text-enlace-accion font-semibold text-primario no-underline">{textosRedSocial.VER_TODOS}</a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-cuerpo">
          <thead>
            <tr>
              <th className="whitespace-nowrap py-0 pb-2 pr-2 text-left text-encabezado-tabla text-texto-suave">{catalogoDashboard.tabla.ratio}</th>
              <th className="whitespace-nowrap py-0 pb-2 pr-2 text-left text-encabezado-tabla text-texto-suave">{catalogoDashboard.tabla.valor}</th>
              <th className="whitespace-nowrap py-0 pb-2 pr-2 text-left text-encabezado-tabla text-texto-suave">{catalogoDashboard.tabla.estado}</th>
            </tr>
          </thead>
          <tbody>
            {RATIOS.map((r) => (
              <tr key={r.nombre}>
                <td className="py-1.75 pr-2 text-texto">{r.nombre}</td>
                <td className="py-1.75 pr-2 text-texto">{r.valor}</td>
                <td className="py-1.75 pr-2">
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
