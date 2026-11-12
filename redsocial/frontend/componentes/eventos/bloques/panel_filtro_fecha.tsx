import { MarcoPanelFiltro } from '../../compartido/interfaz/marco_panel_filtro'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { BloquePanelFiltroFecha1 } from './bloque_panel_filtro_fecha1'
import { BloqueTitulo2 } from './bloque_titulo2'
import { BloqueRangoSeleccionado } from './bloque_rango_seleccionado'
import { OPCIONES_AVANZADAS, OPCIONES_MOVIL, OPCIONES_RAPIDAS, esMismoDia, estaEnRango, formatearFechaRango } from '../fechas_filtro'
import { usarFiltroFecha } from '../usar_filtro_fecha'
import type { PanelFiltroFechaProps } from '@/tipos/eventos/contrato_filtro_fecha'

export function PanelFiltroFecha({ id, onCerrar, onAplicar }: PanelFiltroFechaProps) {
  const filtro = usarFiltroFecha({ onCerrar, onAplicar })

  return (
    <MarcoPanelFiltro id={id} className={catalogoEventos.panel_filtro_fecha.clase_contenedor}>
      <BloquePanelFiltroFecha1
        enCalendarioMovil={filtro.enCalendarioMovil}
        setVistaMovil={filtro.setVistaMovil}
        tituloMovil={filtro.tituloMovil}
        onCerrar={onCerrar}
      />

      <BloqueTitulo2
        enCalendarioMovil={filtro.enCalendarioMovil}
        OPCIONES_RAPIDAS={OPCIONES_RAPIDAS}
        setOpcionActiva={filtro.setOpcionActiva}
        opcionActiva={filtro.opcionActiva}
        OPCIONES_AVANZADAS={OPCIONES_AVANZADAS}
        OPCIONES_MOVIL={OPCIONES_MOVIL}
        alElegirOpcionMovil={filtro.alElegirOpcionMovil}
      />

      <BloqueRangoSeleccionado
        datos={{ ...filtro, estaEnRango, esMismoDia, formatearFechaRango, onCerrar }}
      />
    </MarcoPanelFiltro>
  )
}
