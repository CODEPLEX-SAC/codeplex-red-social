import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { PanelCalendarioMini } from './panel_calendario_mini'
import { TarjetaProximosEventos } from './tarjeta_proximos_eventos'
import { TarjetaResumenEventos } from './tarjeta_resumen_eventos'
import type { EventoLateral } from '@/tipos/eventos/modelo_eventos_mis_eventos'

const clases = catalogoEventos.clases_calendario_lateral

export function SeccionCalendario11({
  MES_CALENDARIO_MIS_EVENTOS,
  SEMANAS_CALENDARIO_MIS_EVENTOS,
  PROXIMOS_LATERAL,
  RESUMEN_MIS_EVENTOS,
}: {
  MES_CALENDARIO_MIS_EVENTOS: string
  SEMANAS_CALENDARIO_MIS_EVENTOS: { numero: string; otroMes?: boolean | undefined; hoy?: boolean | undefined; conPunto?: boolean | undefined; }[][]
  PROXIMOS_LATERAL: EventoLateral[]
  RESUMEN_MIS_EVENTOS: { valor: string; etiqueta: string; }[]
}) {
  return (
    <aside className={clases.columna_grid}>
      <PanelCalendarioMini mes={MES_CALENDARIO_MIS_EVENTOS} semanas={SEMANAS_CALENDARIO_MIS_EVENTOS} />
      <TarjetaProximosEventos proximos={PROXIMOS_LATERAL} />
      <TarjetaResumenEventos resumen={RESUMEN_MIS_EVENTOS} />
    </aside>
  )
}
