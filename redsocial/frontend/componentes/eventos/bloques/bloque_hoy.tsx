import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'

export function BloqueHoy({
  vista,
  RANGO_FECHA_SEMANA,
  FECHA_DIA,
  MES_CALENDARIO_ACTUAL,
  setVista,
}: {
  vista: 'mes' | 'semana' | 'dia'
  RANGO_FECHA_SEMANA: string
  FECHA_DIA: string
  MES_CALENDARIO_ACTUAL: string
  setVista: (valor: 'mes' | 'semana' | 'dia' | ((actual: 'mes' | 'semana' | 'dia') => 'mes' | 'semana' | 'dia')) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-gris-borde py-3 max-768:overflow-x-visible overflow-x-auto scrollbar-oculto">
      <Boton type="button" variant="secundario" size="default" className="flex-none">{catalogoEventos.botones.hoy}</Boton>
      <div className="flex flex-none items-center gap-1">
        <BotonIcono icono="flecha-izquierda" type="button" aria-label={textosRedSocial.ANTERIOR} variant="contorno" />
        <BotonIcono icono="flecha-derecha" type="button" aria-label={textosRedSocial.SIGUIENTE} variant="contorno" />
      </div>
      <span className="ml-2 flex flex-none items-center gap-1.5 text-titulo-subseccion text-texto">
        {vista === 'semana' ? RANGO_FECHA_SEMANA : vista === 'dia' ? FECHA_DIA : MES_CALENDARIO_ACTUAL} <span className="text-texto-suave">▾</span>
      </span>
      <div className="ml-auto flex flex-none items-center overflow-hidden rounded-lg border border-gris-borde max-768:ml-0 max-768:w-full">
        <button
          type="button"
          aria-pressed={vista === 'mes'}
          onClick={() => setVista('mes')}
          className={'max-768:flex-1 border-r border-gris-borde px-4 py-2 text-boton ' + (vista === 'mes' ? 'bg-fondo-hover-neutro font-control text-texto' : 'bg-fondo font-etiqueta text-texto hover:bg-fondo-hover-neutro')}
        >
          {catalogoEventos.botones.vista_mes}
        </button>
        <button
          type="button"
          aria-pressed={vista === 'semana'}
          onClick={() => setVista('semana')}
          className={'max-768:flex-1 border-r border-gris-borde px-4 py-2 text-boton ' + (vista === 'semana' ? 'bg-fondo-hover-neutro font-control text-texto' : 'bg-fondo font-etiqueta text-texto hover:bg-fondo-hover-neutro')}
        >
          {catalogoEventos.botones.vista_semana}
        </button>
        <button
          type="button"
          aria-pressed={vista === 'dia'}
          onClick={() => setVista('dia')}
          className={'max-768:flex-1 px-4 py-2 text-boton ' + (vista === 'dia' ? 'bg-fondo-hover-neutro font-control text-texto' : 'bg-fondo font-etiqueta text-texto hover:bg-fondo-hover-neutro')}
        >
          {catalogoEventos.botones.vista_dia}
        </button>
      </div>
    </div>
  )
}
