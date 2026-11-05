import type { Dayjs } from 'dayjs'
import { CampoEtiquetado } from '../../compartido/interfaz/campo_etiquetado'
import { SelectorFecha } from '../../compartido/interfaz/selector_fecha'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'

const textos = catalogoColaboradores.panel_filtros_avanzados
const clases = catalogoColaboradores.clases.filtros

function CampoFecha({ texto, valor, alCambiar }: { texto: string; valor: Dayjs | null; alCambiar: (valor: Dayjs | null) => void }) {
  return (
    <CampoEtiquetado variante="compacta" etiqueta={texto}>
      <SelectorFecha nombreAccesible={texto} valor={valor} alCambiar={alCambiar} marcador={textos.marcador_fecha} formato={textos.formato_fecha} />
    </CampoEtiquetado>
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
    <div className={clases.columna}>
      <section>
        <h4 className={clases.titulo_grupo}>{textos.vigencia_acceso}</h4>
        <div className={clases.fechas}>
          <CampoFecha texto={catalogoColaboradores.editar.fecha_inicio} valor={fechaInicio} alCambiar={asignarFechaInicio} />
          <CampoFecha texto={catalogoColaboradores.editar.fecha_fin} valor={fechaFin} alCambiar={asignarFechaFin} />
        </div>
      </section>

      <section>
        <h4 className={clases.titulo_grupo}>{textos.fecha_invitacion}</h4>
        <div className={clases.fechas}>
          <CampoFecha texto={textos.desde} valor={invitacionDesde} alCambiar={asignarInvitacionDesde} />
          <CampoFecha texto={textos.hasta} valor={invitacionHasta} alCambiar={asignarInvitacionHasta} />
        </div>
      </section>
    </div>
  )
}
