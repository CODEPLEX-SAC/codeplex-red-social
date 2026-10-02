import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Casilla } from '../../compartido/interfaz/casilla'
import { Boton } from '../../compartido/interfaz/boton'
import { useState } from 'react'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { PanelFiltroEstadoProps } from '@/tipos/eventos/contrato_filtro_estado'

const OPCIONES = catalogoEventos.panel_filtro_estado.opciones

export function PanelFiltroEstado({ onCerrar }: PanelFiltroEstadoProps) {
  const [seleccionadas, setSeleccionadas] = useState<Set<string>>(() => new Set([OPCIONES[0].clave]))

  function alAlternar(clave: string) {
    setSeleccionadas((actual) => {
      const siguiente = new Set(actual)
      siguiente.has(clave) ? siguiente.delete(clave) : siguiente.add(clave)
      return siguiente
    })
  }

  return (
    <div
      onClick={(evento) => evento.stopPropagation()}
      className="absolute left-0 top-tooltip z-20 flex w-65 flex-col overflow-hidden rounded-xl border border-borde bg-white p-3 shadow-t13 max-600:fixed max-600:inset-x-0 max-600:bottom-0 max-600:top-auto max-600:z-30 panel-hoja-movil max-600:w-full max-600:rounded-b-none max-600:rounded-t-2xl max-600:border-0 max-600:p-0"
    >
      <div className="hidden max-600:flex max-600:flex-none max-600:flex-col max-600:bg-white max-600:pt-2.5">
        <div className="mx-auto mb-1 h-1 w-10 flex-none rounded-full bg-t-e0dce8" />
        <div className="flex items-center justify-between border-b border-t-f0eef5 px-4 pb-3">
          <h3 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoEventos.panel_filtro_estado.titulo}</h3>
          <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} onClick={onCerrar} variant="discreto" size="md" />
        </div>
      </div>

      <h3 className="m-0 mb-2 px-1.5 text-encabezado-tabla font-bold uppercase tracking-wide text-texto-suave max-600:hidden">{catalogoEventos.panel_filtro_estado.titulo}</h3>

      <div className="max-600:px-4 max-600:pt-3">
        {OPCIONES.map((o) => (
          <label
            key={o.clave}
            className={'flex cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-2 ' + (seleccionadas.has(o.clave) ? 'bg-t-f3f0ff' : 'hover:bg-t-faf9fc')}
          >
            <Casilla seleccionado={seleccionadas.has(o.clave)} alCambiar={() => alAlternar(o.clave)} />
            <span className={'min-w-0 flex-1 truncate text-campo-formulario ' + (seleccionadas.has(o.clave) ? 'font-semibold text-primario' : 'text-texto')}>{o.etiqueta}</span>
          </label>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-t-f0eef5 pt-3 max-600:m-0 max-600:flex-none max-600:bg-white max-600:px-4 max-600:pb-4">
        <button type="button" onClick={() => setSeleccionadas(new Set())} className="text-boton font-semibold text-primario hover:underline">
          {catalogoEventos.panel_filtro_estado.limpiar}
        </button>
        <Boton type="button" onClick={onCerrar} variant="primario" size="default">
          {catalogoEventos.panel_filtro_estado.aplicar}
        </Boton>
      </div>
    </div>
  )
}
