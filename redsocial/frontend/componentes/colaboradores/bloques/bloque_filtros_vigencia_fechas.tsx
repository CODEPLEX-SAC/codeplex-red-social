import type { Dayjs } from 'dayjs'
import { SelectorFecha } from '../../compartido/interfaz/selector_fecha'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'

const textos = catalogoColaboradores.panel_filtros_avanzados

function CampoFecha({ texto, valor, alCambiar }: { texto: string; valor: Dayjs | null; alCambiar: (valor: Dayjs | null) => void }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-campo-formulario font-medium text-gris-texto">{texto}</label>
      <SelectorFecha valor={valor} alCambiar={alCambiar} marcador={textos.marcador_fecha} formato={textos.formato_fecha} />
    </div>
  )
}

export function BloqueFiltrosVigenciaFechas({
  fechaInicio,
  fechaFin,
  invitacionDesde,
  invitacionHasta,
  asignarFechaInicio,
  asignarFechaFin,
  asignarInvitacionDesde,
  asignarInvitacionHasta,
}: {
  fechaInicio: Dayjs | null
  fechaFin: Dayjs | null
  invitacionDesde: Dayjs | null
  invitacionHasta: Dayjs | null
  asignarFechaInicio: (valor: Dayjs | null) => void
  asignarFechaFin: (valor: Dayjs | null) => void
  asignarInvitacionDesde: (valor: Dayjs | null) => void
  asignarInvitacionHasta: (valor: Dayjs | null) => void
}) {
  return (
    <div className="flex flex-col gap-3">
      <section>
        <h4 className="m-0 mb-2 text-nombre-entidad font-semibold text-gris-oscuro-texto">{textos.vigencia_acceso}</h4>
        <div className="grid grid-cols-1 gap-3 max-600:grid-cols-2">
          <CampoFecha texto={catalogoColaboradores.editar.fecha_inicio} valor={fechaInicio} alCambiar={asignarFechaInicio} />
          <CampoFecha texto={catalogoColaboradores.editar.fecha_fin} valor={fechaFin} alCambiar={asignarFechaFin} />
        </div>
      </section>

      <section>
        <h4 className="m-0 mb-2 text-nombre-entidad font-semibold text-gris-oscuro-texto">{textos.fecha_invitacion}</h4>
        <div className="grid grid-cols-1 gap-3 max-600:grid-cols-2">
          <CampoFecha texto={textos.desde} valor={invitacionDesde} alCambiar={asignarInvitacionDesde} />
          <CampoFecha texto={textos.hasta} valor={invitacionHasta} alCambiar={asignarInvitacionHasta} />
        </div>
      </section>
    </div>
  )
}
