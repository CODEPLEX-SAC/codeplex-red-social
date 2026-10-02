import { Boton } from '../../compartido/interfaz/boton'
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
        <button type="button" className="flex h-8 w-8 items-center justify-center rounded-md border border-gris-borde bg-fondo text-base text-gris-texto hover:border-primario">‹</button>
        <button type="button" className="flex h-8 w-8 items-center justify-center rounded-md border border-gris-borde bg-fondo text-base text-gris-texto hover:border-primario">›</button>
      </div>
      <span className="ml-2 flex flex-none items-center gap-1.5 text-subtitulo font-bold text-gris-oscuro-texto">
        {vista === 'semana' ? RANGO_FECHA_SEMANA : vista === 'dia' ? FECHA_DIA : MES_CALENDARIO_ACTUAL} <span className="text-2.5 text-gris-texto-terciario">▾</span>
      </span>
      <div className="ml-auto flex flex-none items-center overflow-hidden rounded-lg border border-gris-borde max-768:ml-0 max-768:w-full">
        <button
          type="button"
          onClick={() => setVista('mes')}
          className={'max-768:flex-1 border-r border-gris-borde px-4 py-2 text-boton ' + (vista === 'mes' ? 'bg-t-f3f4f6 font-semibold text-gris-texto' : 'bg-fondo font-medium text-gris-texto hover:bg-t-f3f4f6')}
        >
          {catalogoEventos.botones.vista_mes}
        </button>
        <button
          type="button"
          onClick={() => setVista('semana')}
          className={'max-768:flex-1 border-r border-gris-borde px-4 py-2 text-boton ' + (vista === 'semana' ? 'bg-t-f3f4f6 font-semibold text-gris-texto' : 'bg-fondo font-medium text-gris-texto hover:bg-t-f3f4f6')}
        >
          {catalogoEventos.botones.vista_semana}
        </button>
        <button
          type="button"
          onClick={() => setVista('dia')}
          className={'max-768:flex-1 px-4 py-2 text-boton ' + (vista === 'dia' ? 'bg-t-f3f4f6 font-semibold text-gris-texto' : 'bg-fondo font-medium text-gris-texto hover:bg-t-f3f4f6')}
        >
          {catalogoEventos.botones.vista_dia}
        </button>
      </div>
    </div>
  )
}
