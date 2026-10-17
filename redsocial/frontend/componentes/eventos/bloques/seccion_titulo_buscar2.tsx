import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import type { CiudadFiltroEvento, FilaCiudadProps } from '@/tipos/eventos/contrato_filtro_ubicacion'

const textos = catalogoEventos.panel_filtro_ubicacion

export function SeccionTituloBuscar2({
  enMapa,
  buscadorLista,
  setCiudadElegida,
  setEnMapa,
  ciudadElegida,
  alElegirCiudad,
  ciudades,
  FilaCiudad,
}: {
  enMapa: boolean
  buscadorLista: React.JSX.Element
  setCiudadElegida: (valor: string | ((actual: string) => string)) => void
  setEnMapa: (valor: boolean | ((actual: boolean) => boolean)) => void
  ciudadElegida: string
  alElegirCiudad: (nombre: string) => void
  ciudades: CiudadFiltroEvento[]
  FilaCiudad: ({ nombre, activa, onElegir }: FilaCiudadProps) => React.JSX.Element
}) {
  return (
    <div className={'w-72 flex-none overflow-y-auto border-r border-borde-suave p-4 max-600:w-full max-600:overflow-visible max-600:border-r-0 max-600:pt-2 ' + (enMapa ? 'max-600:hidden' : '')}>
      <h3 className="m-0 mb-2 text-titulo-seccion text-texto max-600:hidden">{textos.titulo_buscar}</h3>
      {buscadorLista}
      <div className="mb-3">
        <button type="button" onClick={() => { setCiudadElegida(''); setEnMapa(true) }} className={'mb-1 flex w-full items-center gap-2.5 rounded-lg border-0 px-2.5 py-2 text-left text-boton ' + (ciudadElegida === '' ? 'bg-fondo-activo-filtro font-control text-primario' : 'bg-transparent text-texto hover:bg-fondo')}>
          <Icono name="mundo" className="h-4 w-4" /> <span className="min-w-0 flex-1">{textos.todas_las_ubicaciones}</span>
          <Icono name="flecha-derecha" className="hidden h-3.5 w-3.5 flex-none text-texto-suave max-600:block" />
        </button>
        <button type="button" onClick={() => alElegirCiudad(ciudades[0].nombre)} className="flex w-full items-center gap-2.5 rounded-lg border-0 bg-transparent px-2.5 py-2 text-left text-boton text-texto hover:bg-fondo">
          <Icono name="punto-circular" className="h-4 w-4" /> <span className="min-w-0 flex-1">{textos.mi_ubicacion_actual}</span>
          <Icono name="flecha-derecha" className="hidden h-3.5 w-3.5 flex-none text-texto-suave max-600:block" />
        </button>
      </div>
      <h4 className="m-0 mb-1.5 border-t border-borde-suave pt-3 text-nombre-entidad text-texto">{textos.ciudades_principales}</h4>
      <div className="flex flex-col">
        {ciudades.map((c) => (
          <FilaCiudad key={c.nombre} nombre={c.nombre} activa={ciudadElegida === c.nombre} onElegir={() => alElegirCiudad(c.nombre)} />
        ))}
      </div>
      <Boton type="button" variant="enlace" size="enlace" className="mt-1.5 gap-1 border-0 p-0">
        {textos.mas_ubicaciones} <Icono name="flecha-abajo" className="h-3.5 w-3.5" />
      </Boton>
      <div className="mt-3 hidden max-600:block">
        <Boton type="button" variant="contorno" size="md" onClick={() => setEnMapa(true)} className="w-full justify-between">
          <span className="inline-flex items-center gap-2"><Icono name="mundo" className="h-4 w-4" /> {textos.ver_en_el_mapa}</span>
          <Icono name="flecha-derecha" className="h-3.5 w-3.5" />
        </Boton>
      </div>
    </div>
  )
}
