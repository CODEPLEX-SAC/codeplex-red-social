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

export function PanelFiltroCategoria({ categorias, onCerrar }: PanelFiltroCategoriaProps) {
  const [busqueda, setBusqueda] = useState('')
  const [seleccionadas, setSeleccionadas] = useState<Set<string>>(() => new Set(categorias[0] ? [categorias[0].nombre] : []))

  const categoriasVisibles = categorias.filter((c) => c.nombre.toLowerCase().includes(busqueda.toLowerCase()))

  function alAlternar(nombre: string) {
    setSeleccionadas((actual) => {
      const siguiente = new Set(actual)
      siguiente.has(nombre) ? siguiente.delete(nombre) : siguiente.add(nombre)
      return siguiente
    })
  }

  return (
    <div
      onClick={(evento) => evento.stopPropagation()}
      className="absolute left-0 top-tooltip z-20 flex w-72.5 flex-col overflow-hidden rounded-xl border border-borde bg-white p-3 shadow-t13 max-600:fixed max-600:inset-x-0 max-600:bottom-0 max-600:top-auto max-600:z-30 panel-hoja-movil max-600:w-full max-600:rounded-b-none max-600:rounded-t-2xl max-600:border-0 max-600:p-0"
    >
      <div className="hidden max-600:flex max-600:flex-none max-600:flex-col max-600:bg-white max-600:pt-2.5">
        <div className="mx-auto mb-1 h-1 w-10 flex-none rounded-full bg-t-e0dce8" />
        <div className="flex items-center justify-between border-b border-t-f0eef5 px-4 pb-3">
          <h3 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoEventos.filtros.categoria}</h3>
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
          <label key={c.nombre} className="flex cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-2 hover:bg-t-faf9fc">
            <Casilla seleccionado={seleccionadas.has(c.nombre)} alCambiar={() => alAlternar(c.nombre)} />
            <SuperficieColor variante={c.color} className="grid h-7 w-7 flex-none place-items-center rounded-7 text-white">
              <Icono name={c.icono} className="h-3.5 w-3.5" />
            </SuperficieColor>
            <span className="min-w-0 flex-1 truncate text-campo-formulario text-texto">{c.nombre}</span>
            <span className="flex-none text-contador font-semibold text-texto-suave">{c.conteo}</span>
          </label>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-t-f0eef5 pt-3 max-600:m-0 max-600:flex-none max-600:bg-white max-600:px-4 max-600:pb-4">
        <button type="button" onClick={() => setSeleccionadas(new Set())} className="text-boton font-semibold text-primario hover:underline">
          {catalogoEventos.botones.limpiar_seleccion}
        </button>
        <Boton type="button" onClick={onCerrar} variant="primario" size="default">
          {catalogoEventos.panel_filtro_fecha.aplicar}
        </Boton>
      </div>
    </div>
  )
}
