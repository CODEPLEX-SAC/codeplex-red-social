import { EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas } from '../../componentes/compartido'
import { useState } from 'react'
import { SeccionEventosDeHoy, SeccionCalendario } from '../../componentes/eventos'
import { CELDAS, PROXIMOS_LATERAL_CALENDARIO as PROXIMOS_LATERAL, MES_CALENDARIO_ACTUAL, MES_ABREVIADO_ACTUAL, EVENTOS_POR_DIA, LEYENDA_CALENDARIO, SEMANAS_MINI, RANGO_FECHA_SEMANA, DIAS_SEMANA_CAL, HORAS_SEMANA, EVENTOS_SEMANA, FECHA_DIA, HORAS_DIA, EVENTOS_DIA, COLOR_EVENTO_CAL, COLOR_EVENTO_DIA } from '../../rutas/eventos/rutas_eventos'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import type { VistaCalendario } from '@/tipos/eventos/modelo_eventos_calendario'





const VISTAS = catalogoEventos.claves.vistas_calendario as Record<VistaCalendario, VistaCalendario>

export function PaginaEventosCalendario() {
  const [vista, setVista] = useState<VistaCalendario>(VISTAS.mes)
  const [indiceDiaSeleccionado, setIndiceDiaSeleccionado] = useState(() => CELDAS.findIndex((c) => c.hoy))

  const diaSeleccionado = CELDAS[indiceDiaSeleccionado]
  const eventosDiaSeleccionado = EVENTOS_POR_DIA[diaSeleccionado.numero] ?? []

  return (
    <EstructuraApp paginaActiva={catalogoEventos.claves.modulo}>
      <EstructuraTresColumnas
        principal={
          <SeccionEventosDeHoy
            datos={{
              vista,
              RANGO_FECHA_SEMANA,
              FECHA_DIA,
              MES_CALENDARIO_ACTUAL,
              setVista,
              CELDAS,
              setIndiceDiaSeleccionado,
              indiceDiaSeleccionado,
              COLOR_EVENTO_CAL,
              diaSeleccionado,
              MES_ABREVIADO_ACTUAL,
              eventosDiaSeleccionado,
              COLOR_EVENTO_DIA,
              DIAS_SEMANA_CAL,
              HORAS_SEMANA,
              EVENTOS_SEMANA,
              HORAS_DIA,
              EVENTOS_DIA,
            }}
          />
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <SeccionCalendario
            MES_CALENDARIO_ACTUAL={MES_CALENDARIO_ACTUAL}
            SEMANAS_MINI={SEMANAS_MINI}
            PROXIMOS_LATERAL={PROXIMOS_LATERAL}
            LEYENDA_CALENDARIO={LEYENDA_CALENDARIO}
          />
        }
      />
    </EstructuraApp>
  )
}
