import { MarcoPanelFiltro } from '../../compartido/interfaz/filtro_desplegable'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Casilla } from '../../compartido/interfaz/casilla'
import { Boton } from '../../compartido/interfaz/boton'
import { useState } from 'react'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { PanelFiltroEstadoProps } from '@/tipos/eventos/contrato_filtro_estado'

const OPCIONES = catalogoEventos.panel_filtro_estado.opciones

export function PanelFiltroEstado({ id, onCerrar }: PanelFiltroEstadoProps) {
  const [seleccionadas, setSeleccionadas] = useState<Set<string>>(() => new Set([OPCIONES[0].clave]))

  function alAlternar(clave: string) {
    setSeleccionadas((actual) => {
      const siguiente = new Set(actual)
      siguiente.has(clave) ? siguiente.delete(clave) : siguiente.add(clave)
      return siguiente
    })
  }

  return (
    <MarcoPanelFiltro id={id} className="w-65 flex-col overflow-hidden p-3 max-600:p-0">
      <div className="hidden max-600:flex max-600:flex-none max-600:flex-col max-600:bg-white max-600:pt-2.5">
        <div className="mx-auto mb-1 h-1 w-10 flex-none rounded-full bg-borde-flotante" />
        <div className="flex items-center justify-between border-b border-borde-suave px-4 pb-3">
          <h3 className="m-0 text-titulo-banner text-texto">{catalogoEventos.panel_filtro_estado.titulo}</h3>
          <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} onClick={onCerrar} variant="discreto" size="md" />
        </div>
      </div>

      <h3 className="m-0 mb-2 px-1.5 text-encabezado-tabla uppercase tracking-wide text-texto-suave max-600:hidden">{catalogoEventos.panel_filtro_estado.titulo}</h3>

      <div className="max-600:px-4 max-600:pt-3">
        {OPCIONES.map((o) => (
          <label
            key={o.clave}
            className={'flex cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-2 ' + (seleccionadas.has(o.clave) ? 'bg-fondo-activo-filtro' : 'hover:bg-fondo')}
          >
            <Casilla seleccionado={seleccionadas.has(o.clave)} alCambiar={() => alAlternar(o.clave)} />
            <span className={'min-w-0 flex-1 truncate text-campo-formulario ' + (seleccionadas.has(o.clave) ? 'font-titulo text-primario' : 'text-texto')}>{o.etiqueta}</span>
          </label>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-borde-suave pt-3 max-600:m-0 max-600:flex-none max-600:bg-white max-600:px-4 max-600:pb-4">
        <Boton type="button" variant="enlace" size="enlace" onClick={() => setSeleccionadas(new Set())}>
          {catalogoEventos.panel_filtro_estado.limpiar}
        </Boton>
        <Boton type="button" onClick={onCerrar} variant="primario" size="default">
          {catalogoEventos.panel_filtro_estado.aplicar}
        </Boton>
      </div>
    </MarcoPanelFiltro>
  )
}
