import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'

const DIAS_CORTOS = catalogoEventos.dias_semana_cortos

export function BloquePanelFiltroFecha2({
  modoRango,
  celdas,
  finRango,
  estaEnRango,
  inicioRango,
  esMismoDia,
  alSeleccionarDiaRango,
  alSeleccionarDia,
  diaSeleccionado,
}: {
  modoRango: boolean
  celdas: { fecha: Date; numero: number; delMes: boolean; }[]
  finRango: Date | null
  estaEnRango: (fecha: Date, inicio: Date, fin: Date) => boolean
  inicioRango: Date
  esMismoDia: (a: Date, b: Date) => boolean
  alSeleccionarDiaRango: (fecha: Date) => void
  alSeleccionarDia: (fecha: Date) => void
  diaSeleccionado: Date
}) {
  return (
    <div className="grid grid-cols-7 gap-y-1">
      {DIAS_CORTOS.map((d) => (
        <span key={d} className="grid h-7 place-items-center text-encabezado-tabla font-semibold uppercase text-texto-suave">{d}</span>
      ))}
      {modoRango
        ? celdas.map((c) => {
            if (!c.delMes) return <div key={c.fecha.toISOString()} className="h-7.5" />
            const enRango = finRango !== null && estaEnRango(c.fecha, inicioRango, finRango)
            const esInicio = esMismoDia(c.fecha, inicioRango)
            const esFin = finRango !== null && esMismoDia(c.fecha, finRango)
            const rangoDeVariosDias = finRango !== null && !esMismoDia(inicioRango, finRango)
            return (
              <button
                key={c.fecha.toISOString()}
                type="button"
                onClick={() => alSeleccionarDiaRango(c.fecha)}
                className={'relative grid h-7.5 place-items-center justify-self-stretch border-0 p-0 ' + (enRango ? 'bg-t-ede9fe' : 'bg-transparent')}
              >
                {esInicio && rangoDeVariosDias && <div className="absolute inset-y-0 right-0 w-1/2 bg-t-ede9fe" />}
                {esFin && rangoDeVariosDias && <div className="absolute inset-y-0 left-0 w-1/2 bg-t-ede9fe" />}
                <span
                  className={
                    'relative grid h-7.5 w-7.5 place-items-center rounded-full text-cuerpo ' +
                    (esInicio || esFin ? 'bg-primario font-bold text-white' : 'text-texto')
                  }
                >
                  {c.numero}
                </span>
              </button>
            )
          })
        : celdas.map((c) =>
            c.delMes ? (
              <button
                key={c.fecha.toISOString()}
                type="button"
                onClick={() => alSeleccionarDia(c.fecha)}
                className={
                  'grid h-7.5 w-7.5 place-items-center justify-self-center rounded-full text-cuerpo ' +
                  (esMismoDia(diaSeleccionado, c.fecha) ? 'bg-primario font-bold text-white' : 'text-texto hover:bg-t-f5f3fa')
                }
              >
                {c.numero}
              </button>
            ) : (
              <div key={c.fecha.toISOString()} className="h-7.5" />
            ),
          )}
    </div>
  )
}
