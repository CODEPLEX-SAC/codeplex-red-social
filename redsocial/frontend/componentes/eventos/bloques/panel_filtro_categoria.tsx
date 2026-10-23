import { MarcoPanelFiltro } from '../../compartido/interfaz/filtro_desplegable'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Casilla } from '../../compartido/interfaz/casilla'
import { Boton } from '../../compartido/interfaz/boton'
import { useState } from 'react'
import { Icono } from '../../compartido/icono'
import { SuperficieColor } from '../../compartido/interfaz/superficie_color'
import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { PanelFiltroCategoriaProps } from '@/tipos/eventos/contrato_filtro_categoria'

export function PanelFiltroCategoria({ id, categorias, seleccionadas, alCambiarSeleccion, onCerrar }: PanelFiltroCategoriaProps) {
  const [busqueda, setBusqueda] = useState('')

  const categoriasVisibles = categorias.filter((c) => c.nombre.toLowerCase().includes(busqueda.toLowerCase()))

  function alAlternar(nombre: string) {
    alCambiarSeleccion(seleccionadas.includes(nombre) ? seleccionadas.filter((actual) => actual !== nombre) : [...seleccionadas, nombre])
  }

  return (
    <MarcoPanelFiltro id={id} className="w-72.5 flex-col overflow-hidden p-3 max-600:p-0">
      <div className="hidden max-600:flex max-600:flex-none max-600:flex-col max-600:bg-white max-600:pt-2.5">
        <div className="mx-auto mb-1 h-1 w-10 flex-none rounded-full bg-borde-flotante" />
        <div className="flex items-center justify-between border-b border-borde-suave px-4 pb-3">
          <h3 className="m-0 text-titulo-banner text-texto">{catalogoEventos.filtros.categoria}</h3>
          <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} onClick={onCerrar} variant="discreto" size="md" />
        </div>
      </div>

      <CampoBusqueda
        value={busqueda}
        onChange={(evento) => setBusqueda(evento.target.value)}
        placeholder={catalogoEventos.placeholders.buscar_categorias}
        aria-label={catalogoEventos.placeholders.buscar_categorias}
        className="mb-2.5 w-full flex-none max-600:mx-4 max-600:mt-3 max-600:w-auto"
      />

      <div className="max-h-75 overflow-y-auto max-600:max-h-none max-600:flex-1 max-600:px-4">
        {categoriasVisibles.map((c) => (
          <label key={c.nombre} className="flex cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-2 hover:bg-fondo">
            <Casilla seleccionado={seleccionadas.includes(c.nombre)} alCambiar={() => alAlternar(c.nombre)} />
            <SuperficieColor variante={c.color} className="grid h-7 w-7 flex-none place-items-center rounded-7 text-white">
              <Icono name={c.icono} className="h-3.5 w-3.5" />
            </SuperficieColor>
            <span className="min-w-0 flex-1 truncate text-campo-formulario text-texto">{c.nombre}</span>
            <span className="flex-none text-conteo text-texto-suave">{c.conteo}</span>
          </label>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-borde-suave pt-3 max-600:m-0 max-600:flex-none max-600:bg-white max-600:px-4 max-600:pb-4">
        <Boton type="button" variant="enlace" size="enlace" onClick={() => alCambiarSeleccion([])}>
          {catalogoEventos.botones.limpiar_seleccion}
        </Boton>
        <Boton type="button" onClick={onCerrar} variant="primario" size="default">
          {catalogoEventos.panel_filtro_fecha.aplicar}
        </Boton>
      </div>
    </MarcoPanelFiltro>
  )
}
