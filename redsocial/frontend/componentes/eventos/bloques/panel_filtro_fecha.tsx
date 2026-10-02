import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { BloquePanelFiltroFecha1 } from './bloque_panel_filtro_fecha1'
import { BloqueTitulo2 } from './bloque_titulo2'
import { BloqueRangoSeleccionado } from './bloque_rango_seleccionado'
import { OPCIONES_AVANZADAS, OPCIONES_MOVIL, OPCIONES_RAPIDAS, esMismoDia, estaEnRango, formatearFechaRango } from '../fechas_filtro'
import { usarFiltroFecha } from '../usar_filtro_fecha'
import type { PanelFiltroFechaProps } from '@/tipos/eventos/contrato_filtro_fecha'

export function PanelFiltroFecha({ onCerrar, onAplicar }: PanelFiltroFechaProps) {
  const {
    opcionActiva,
    setOpcionActiva,
    mes,
    anio,
    diaSeleccionado,
    inicioRango,
    finRango,
    setVistaMovil,
    celdas,
    enCalendarioMovil,
    modoRango,
    tituloMovil,
    alElegirOpcionMovil,
    alCambiarMes,
    alSeleccionarDia,
    alSeleccionarDiaRango,
    alAplicar,
  } = usarFiltroFecha({ onCerrar, onAplicar })

  return (
    <div
      onClick={(evento) => evento.stopPropagation()}
      className={catalogoEventos.panel_filtro_fecha.clase_contenedor}
    >
      <BloquePanelFiltroFecha1
        enCalendarioMovil={enCalendarioMovil}
        setVistaMovil={setVistaMovil}
        tituloMovil={tituloMovil}
        onCerrar={onCerrar}
      />

      <BloqueTitulo2
        enCalendarioMovil={enCalendarioMovil}
        OPCIONES_RAPIDAS={OPCIONES_RAPIDAS}
        setOpcionActiva={setOpcionActiva}
        opcionActiva={opcionActiva}
        OPCIONES_AVANZADAS={OPCIONES_AVANZADAS}
        OPCIONES_MOVIL={OPCIONES_MOVIL}
        alElegirOpcionMovil={alElegirOpcionMovil}
      />

      <BloqueRangoSeleccionado
        datos={{
          enCalendarioMovil,
          alCambiarMes,
          mes,
          anio,
          modoRango,
          celdas,
          finRango,
          estaEnRango,
          inicioRango,
          esMismoDia,
          alSeleccionarDiaRango,
          alSeleccionarDia,
          diaSeleccionado,
          formatearFechaRango,
          onCerrar,
          alAplicar,
        }}
      />
    </div>
  )
}
