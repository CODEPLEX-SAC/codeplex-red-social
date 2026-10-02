import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { PestanasEventos } from './pestanas_eventos'
import { BloqueHoy } from './bloque_hoy'
import { BloqueEventosCalendario1 } from './bloque_eventos_calendario1'
import { BloqueTodoElDia } from './bloque_todo_el_dia'
import { BloqueTodoElDia2 } from './bloque_todo_el_dia2'
import type { CeldaCal, EventoResumenDia, DiaSemanaCal, EventoSemanaCal, EventoDiaCal, VistaCalendario } from '@/tipos/eventos/modelo_eventos_calendario'
import { BloqueCalendario } from './bloque_calendario'
import { SeccionEventosDeHoy2 } from './seccion_eventos_de_hoy2'


const VISTAS = catalogoEventos.claves.vistas_calendario as Record<VistaCalendario, VistaCalendario>

export function SeccionEventosDeHoy({ datos }: {
  datos: {
    vista: VistaCalendario
    RANGO_FECHA_SEMANA: string
    FECHA_DIA: string
    MES_CALENDARIO_ACTUAL: string
    setVista: (valor: VistaCalendario | ((actual: VistaCalendario) => VistaCalendario)) => void
    CELDAS: CeldaCal[]
    setIndiceDiaSeleccionado: (valor: number | ((actual: number) => number)) => void
    indiceDiaSeleccionado: number
    COLOR_EVENTO_CAL: Record<'empresa' | 'negocios' | 'tecnologia' | 'musica' | 'educacion', string>
    diaSeleccionado: CeldaCal
    MES_ABREVIADO_ACTUAL: string
    eventosDiaSeleccionado: EventoResumenDia[]
    COLOR_EVENTO_DIA: Record<'empresa' | 'negocios' | 'tecnologia' | 'musica' | 'educacion', string>
    DIAS_SEMANA_CAL: DiaSemanaCal[]
    HORAS_SEMANA: string[]
    EVENTOS_SEMANA: EventoSemanaCal[]
    HORAS_DIA: string[]
    EVENTOS_DIA: EventoDiaCal[]
  }
}) {
  const {
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
  } = datos
  return (
    <section>
      <BloqueCalendario />

      <PestanasEventos activa={catalogoEventos.claves.pestanas.calendario} insigniaInvitaciones={{ valor: 2, estilo: catalogoEventos.claves.insignia.pill }} />

      <BloqueHoy
        vista={vista}
        RANGO_FECHA_SEMANA={RANGO_FECHA_SEMANA}
        FECHA_DIA={FECHA_DIA}
        MES_CALENDARIO_ACTUAL={MES_CALENDARIO_ACTUAL}
        setVista={setVista}
      />

      {vista === VISTAS.mes && (
        <BloqueEventosCalendario1
          CELDAS={CELDAS}
          setIndiceDiaSeleccionado={setIndiceDiaSeleccionado}
          indiceDiaSeleccionado={indiceDiaSeleccionado}
          COLOR_EVENTO_CAL={COLOR_EVENTO_CAL}
        />
      )}

      {vista === VISTAS.mes && (
        <SeccionEventosDeHoy2
          indiceDiaSeleccionado={indiceDiaSeleccionado}
          diaSeleccionado={diaSeleccionado}
          MES_ABREVIADO_ACTUAL={MES_ABREVIADO_ACTUAL}
          eventosDiaSeleccionado={eventosDiaSeleccionado}
          COLOR_EVENTO_DIA={COLOR_EVENTO_DIA}
        />
      )}

      {vista === VISTAS.semana && (
        <BloqueTodoElDia
          DIAS_SEMANA_CAL={DIAS_SEMANA_CAL}
          HORAS_SEMANA={HORAS_SEMANA}
          EVENTOS_SEMANA={EVENTOS_SEMANA}
          COLOR_EVENTO_CAL={COLOR_EVENTO_CAL}
        />
      )}

      {vista === VISTAS.dia && (
        <BloqueTodoElDia2
          HORAS_DIA={HORAS_DIA}
          EVENTOS_DIA={EVENTOS_DIA}
          COLOR_EVENTO_DIA={COLOR_EVENTO_DIA}
        />
      )}
    </section>
  )
}
