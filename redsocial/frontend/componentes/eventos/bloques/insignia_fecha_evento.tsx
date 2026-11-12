import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'

const clases = catalogoEventos.clases_resultado_filtro

export function EtiquetaFechaEvento({ dia, mes }: { dia: string; mes: string }) {
  return (
    <div className={clases.insignia}>
      <span className={clases.insignia_dia}>{dia}</span>
      <span className={clases.insignia_mes}>{mes}</span>
    </div>
  )
}
