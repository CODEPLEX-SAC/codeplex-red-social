import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { BloquePanelFiltroFecha2 } from './bloque_panel_filtro_fecha2'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'

const MESES = catalogoEventos.meses
const textos = catalogoEventos.panel_filtro_fecha

export function BloqueRangoSeleccionado({ datos }: {
  datos: {
    enCalendarioMovil: boolean
    alCambiarMes: (direccion: 1 | -1) => void
    mes: number
    anio: number
    modoRango: boolean
    celdas: { fecha: Date; numero: number; delMes: boolean; }[]
    finRango: Date | null
    estaEnRango: (fecha: Date, inicio: Date, fin: Date) => boolean
    inicioRango: Date
    esMismoDia: (a: Date, b: Date) => boolean
    alSeleccionarDiaRango: (fecha: Date) => void
    alSeleccionarDia: (fecha: Date) => void
    diaSeleccionado: Date
    formatearFechaRango: (fecha: Date) => string
    onCerrar: () => void
    alAplicar: () => void
  }
}) {
  const {
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
  } = datos
  return (
    <div className={'w-77.5 flex-none p-4 max-600:w-full ' + (enCalendarioMovil ? '' : 'max-600:hidden')}>
      <div className="mb-3 flex items-center justify-between">
        <BotonIcono icono="flecha-izquierda" type="button" aria-label={textosRedSocial.ANTERIOR} onClick={() => alCambiarMes(-1)} variant="sutil" size="md" />
        <span className="text-subtitulo font-bold text-texto">{MESES[mes]} {anio}</span>
        <BotonIcono icono="flecha-derecha" type="button" aria-label={textosRedSocial.SIGUIENTE} onClick={() => alCambiarMes(1)} variant="sutil" size="md" />
      </div>

      <BloquePanelFiltroFecha2
        modoRango={modoRango}
        celdas={celdas}
        finRango={finRango}
        estaEnRango={estaEnRango}
        inicioRango={inicioRango}
        esMismoDia={esMismoDia}
        alSeleccionarDiaRango={alSeleccionarDiaRango}
        alSeleccionarDia={alSeleccionarDia}
        diaSeleccionado={diaSeleccionado}
      />

      {modoRango && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-borde bg-t-faf9fc px-3 py-2.5">
          <Icono name="calendario" className="h-4 w-4 flex-none text-texto-suave" />
          <div className="min-w-0">
            <span className="block text-auxiliar text-texto-suave">{textos.rango_seleccionado}</span>
            <span className="block text-campo-formulario font-bold text-texto">{formatearFechaRango(inicioRango)}{finRango === null ? null : textos.separador_rango + formatearFechaRango(finRango)}</span>
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center justify-end gap-2 border-t border-t-f0eef5 pt-3 max-600:sticky max-600:bottom-0 max-600:z-10 max-600:bg-white">
        <Boton type="button" onClick={onCerrar} variant="secundario" size="default" className="max-600:flex-1">
          {textos.cancelar}
        </Boton>
        <Boton type="button" onClick={alAplicar} variant="primario" size="default" className="max-600:flex-1">
          {textos.aplicar}
        </Boton>
      </div>
    </div>
  )
}
