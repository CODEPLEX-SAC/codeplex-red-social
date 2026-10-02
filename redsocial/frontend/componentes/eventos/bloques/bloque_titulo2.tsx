import { Icono } from '../../compartido/icono'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import type { OpcionRapidaFecha } from '@/tipos/eventos/contrato_filtro_fecha'

const textos = catalogoEventos.panel_filtro_fecha

export function BloqueTitulo2({
  enCalendarioMovil,
  OPCIONES_RAPIDAS,
  setOpcionActiva,
  opcionActiva,
  OPCIONES_AVANZADAS,
  OPCIONES_MOVIL,
  alElegirOpcionMovil,
}: {
  enCalendarioMovil: boolean
  OPCIONES_RAPIDAS: readonly { clave: OpcionRapidaFecha; etiqueta: string; detalle: string; }[]
  setOpcionActiva: (valor: OpcionRapidaFecha | ((actual: OpcionRapidaFecha) => OpcionRapidaFecha)) => void
  opcionActiva: OpcionRapidaFecha
  OPCIONES_AVANZADAS: readonly { clave: OpcionRapidaFecha; etiqueta: string; detalle: string; }[]
  OPCIONES_MOVIL: { clave: OpcionRapidaFecha; etiqueta: string; detalle: string; }[]
  alElegirOpcionMovil: (clave: OpcionRapidaFecha) => void
}) {
  return (
    <div className={'w-47.5 flex-none border-r border-t-f0eef5 py-3 max-600:w-full max-600:border-r-0 ' + (enCalendarioMovil ? 'max-600:hidden' : '')}>
      <h3 className="m-0 mb-2 px-4 text-encabezado-tabla font-bold uppercase tracking-wide text-texto-suave max-600:hidden">{textos.titulo}</h3>
      <div className="max-600:hidden">
      {OPCIONES_RAPIDAS.map((o) => (
        <button
          key={o.clave}
          type="button"
          onClick={() => setOpcionActiva(o.clave)}
          className={'flex w-full items-center gap-2 px-4 py-2 text-left text-campo-formulario ' + (o.clave === opcionActiva ? 'bg-t-f3f0ff font-semibold text-primario' : 'text-texto hover:bg-t-faf9fc')}
        >
          <Icono name="calendario" className="h-3.75 w-3.75" />
          <span className="min-w-0 flex-1">{o.etiqueta}</span>
        </button>
      ))}
      <div className="my-2 border-t border-t-f0eef5" />
      {OPCIONES_AVANZADAS.map((o) => (
        <button
          key={o.clave}
          type="button"
          onClick={() => setOpcionActiva(o.clave)}
          className={'flex w-full items-center gap-2 px-4 py-2 text-left text-campo-formulario ' + (o.clave === opcionActiva ? 'bg-t-f3f0ff font-semibold text-primario' : 'text-texto hover:bg-t-faf9fc')}
        >
          <Icono name="calendario" className="h-3.75 w-3.75" /> {o.etiqueta}
        </button>
      ))}
      </div>
      <div className="hidden px-4 max-600:block">
        {OPCIONES_MOVIL.map((o) => (
          <button
            key={o.clave}
            type="button"
            onClick={() => alElegirOpcionMovil(o.clave)}
            className={'flex w-full items-center gap-3 rounded-lg border-0 px-3 py-2.5 text-left ' + (o.clave === opcionActiva ? 'bg-t-f3f0ff' : 'bg-transparent')}
          >
            <Icono name="calendario" className={'h-5 w-5 flex-none ' + (o.clave === opcionActiva ? 'text-primario' : 'text-texto')} />
            <span className="min-w-0 flex-1">
              <span className={'block text-campo-formulario font-medium ' + (o.clave === opcionActiva ? 'text-primario' : 'text-texto')}>{o.etiqueta}</span>
              <span className={'block text-auxiliar ' + (o.clave === opcionActiva ? 'text-primario' : 'text-texto-suave')}>{o.detalle}</span>
            </span>
            <Icono name="flecha-derecha" className={'h-4 w-4 flex-none ' + (o.clave === opcionActiva ? 'text-primario' : 'text-texto-suave')} />
          </button>
        ))}
      </div>
    </div>
  )
}
