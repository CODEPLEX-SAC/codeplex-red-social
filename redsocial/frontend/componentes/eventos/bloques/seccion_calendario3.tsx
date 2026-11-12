import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { PanelCalendarioMini } from './panel_calendario_mini'
import { TarjetaProximosEventos } from './tarjeta_proximos_eventos'
import { TarjetaResumenEventos } from './tarjeta_resumen_eventos'
import type { EventoLateral } from '@/tipos/eventos/modelo_eventos_invitaciones'

const clases = catalogoEventos.clases_calendario_lateral

export function SeccionCalendario3({
  MES_CALENDARIO_INVITACIONES,
  SEMANAS_CALENDARIO_INVITACIONES,
  PROXIMOS_LATERAL,
  RESUMEN_INVITACIONES,
}: {
  MES_CALENDARIO_INVITACIONES: string
  SEMANAS_CALENDARIO_INVITACIONES: { numero: string; otroMes?: boolean | undefined; hoy?: boolean | undefined; conPunto?: boolean | undefined; }[][]
  PROXIMOS_LATERAL: EventoLateral[]
  RESUMEN_INVITACIONES: { valor: string; etiqueta: string; }[]
}) {
  return (
    <aside className={clases.columna_flex}>
      <PanelCalendarioMini mes={MES_CALENDARIO_INVITACIONES} semanas={SEMANAS_CALENDARIO_INVITACIONES} />
      <TarjetaProximosEventos proximos={PROXIMOS_LATERAL} />
      <TarjetaResumenEventos resumen={RESUMEN_INVITACIONES} />
    </aside>
  )
}
