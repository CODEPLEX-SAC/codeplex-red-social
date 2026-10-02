import { useState } from 'react'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import type { FiltroFecha, OpcionRapidaFecha, PanelFiltroFechaProps } from '@/tipos/eventos/contrato_filtro_fecha'
import {
  DESPLAZAMIENTOS_RAPIDOS,
  HOY_PROTOTIPO,
  OPCIONES_MOVIL,
  generarCeldasMes,
  sumarDias,
} from './fechas_filtro'

const textos = catalogoEventos.panel_filtro_fecha

export function usarFiltroFecha({ onCerrar, onAplicar }: PanelFiltroFechaProps) {
  const [opcionActiva, setOpcionActiva] = useState<OpcionRapidaFecha>('cualquiera')
  const [anio, setAnio] = useState(2026)
  const [mes, setMes] = useState(8)
  const [diaSeleccionado, setDiaSeleccionado] = useState(new Date(2026, 8, 23))
  const [inicioRango, setInicioRango] = useState<Date>(new Date(2026, 8, 23))
  const [finRango, setFinRango] = useState<Date | null>(new Date(2026, 8, 30))

  const [vistaMovil, setVistaMovil] = useState<'opciones' | 'calendario'>('opciones')

  const celdas = generarCeldasMes(anio, mes)
  const enCalendarioMovil = vistaMovil === 'calendario'
  const modoRango = opcionActiva === 'rango' || opcionActiva === 'fin_de_semana'
  const tituloMovil = enCalendarioMovil ? OPCIONES_MOVIL.find((o) => o.clave === opcionActiva)?.etiqueta : textos.titulo

  function alElegirOpcionMovil(clave: OpcionRapidaFecha) {
    setOpcionActiva(clave)
    setAnio(2026)
    setMes(8)
    const desplazamiento = DESPLAZAMIENTOS_RAPIDOS[clave]
    if (desplazamiento) {
      setDiaSeleccionado(sumarDias(HOY_PROTOTIPO, desplazamiento[0]))
      setInicioRango(sumarDias(HOY_PROTOTIPO, desplazamiento[0]))
      setFinRango(sumarDias(HOY_PROTOTIPO, desplazamiento[1]))
    }
    setVistaMovil('calendario')
  }

  function alCambiarMes(direccion: -1 | 1) {
    const fecha = new Date(anio, mes + direccion, 1)
    setAnio(fecha.getFullYear())
    setMes(fecha.getMonth())
  }

  function alSeleccionarDia(fecha: Date) {
    setDiaSeleccionado(fecha)
    setOpcionActiva('especifica')
  }

  function alSeleccionarDiaRango(fecha: Date) {
    if (finRango === null) {
      setOpcionActiva('rango')
      setInicioRango(new Date(Math.min(inicioRango.getTime(), fecha.getTime())))
      setFinRango(new Date(Math.max(inicioRango.getTime(), fecha.getTime())))
      return
    }
    setOpcionActiva('rango')
    setInicioRango(fecha)
    setFinRango(null)
  }

  function obtenerFiltro(): FiltroFecha | null {
    const filtrosPorOpcion: Record<OpcionRapidaFecha, FiltroFecha | null> = {
      cualquiera: null,
      hoy: { inicio: HOY_PROTOTIPO, fin: HOY_PROTOTIPO },
      manana: { inicio: sumarDias(HOY_PROTOTIPO, 1), fin: sumarDias(HOY_PROTOTIPO, 1) },
      fin_de_semana: { inicio: sumarDias(HOY_PROTOTIPO, 3), fin: sumarDias(HOY_PROTOTIPO, 4) },
      especifica: { inicio: diaSeleccionado, fin: diaSeleccionado },
      rango: { inicio: inicioRango, fin: finRango ?? inicioRango },
    }
    const filtro = filtrosPorOpcion[opcionActiva]
    return filtro && { ...filtro, opcion: opcionActiva }
  }

  function alAplicar() {
    onAplicar(obtenerFiltro())
    onCerrar()
  }

  return {
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
  }
}
