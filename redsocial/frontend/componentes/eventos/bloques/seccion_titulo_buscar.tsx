import { ProveedorTemaGraficos } from '../../compartido/proveedor_tema_graficos'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { CodeplexMapa } from '@codeplex-sac/mapas'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { SeccionTituloBuscar2 } from './seccion_titulo_buscar2'
import type { CiudadFiltroEvento, FilaCiudadProps, MarcadorMapaEvento } from '@/tipos/eventos/contrato_filtro_ubicacion'
import type { CodeplexMapaMarcador } from '@codeplex-sac/mapas'

const textos = catalogoEventos.panel_filtro_ubicacion

export function SeccionTituloBuscar({ datos }: {
  datos: {
    enMapa: boolean
    setEnMapa: (valor: boolean | ((actual: boolean) => boolean)) => void
    onCerrar: () => void
    buscadorLista: React.JSX.Element
    setCiudadElegida: (valor: string | ((actual: string) => string)) => void
    ciudadElegida: string
    alElegirCiudad: (nombre: string) => void
    ciudades: CiudadFiltroEvento[]
    FilaCiudad: ({ nombre, activa, onElegir }: FilaCiudadProps) => React.JSX.Element
    centro: [number, number]
    marcadoresMapa: CodeplexMapaMarcador[]
    alturaMapa: string | number
    setLugarElegido: (valor: string | ((actual: string) => string)) => void
    lugar: MarcadorMapaEvento | undefined
    lugarCompleto: string
    alAplicar: () => void
  }
}) {
  const {
    enMapa,
    setEnMapa,
    onCerrar,
    buscadorLista,
    setCiudadElegida,
    ciudadElegida,
    alElegirCiudad,
    ciudades,
    FilaCiudad,
    centro,
    marcadoresMapa,
    alturaMapa,
    setLugarElegido,
    lugar,
    lugarCompleto,
    alAplicar,
  } = datos
  return (
    <ProveedorTemaGraficos>
      <div className="hidden flex-none items-center justify-between gap-3 px-4 pb-2 pt-4 max-600:flex">
        <div className="flex min-w-0 items-center gap-2.5">
          {enMapa && (
            <BotonIcono icono="flecha-izquierda" type="button" aria-label={textos.volver} onClick={() => setEnMapa(false)} variant="discreto" size="default" className="flex-none" />
          )}
          <h3 className="m-0 truncate text-nombre-entidad font-bold text-texto">{enMapa ? textos.titulo_mapa : textos.titulo_buscar}</h3>
        </div>
        <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} onClick={onCerrar} variant="discreto" size="md" className="flex-none" />
      </div>

      <div className="flex min-h-0 flex-1 max-600:flex-col max-600:overflow-y-auto">
        <SeccionTituloBuscar2
          enMapa={enMapa}
          buscadorLista={buscadorLista}
          setCiudadElegida={setCiudadElegida}
          setEnMapa={setEnMapa}
          ciudadElegida={ciudadElegida}
          alElegirCiudad={alElegirCiudad}
          ciudades={ciudades}
          FilaCiudad={FilaCiudad}
        />

        <div className={'w-110 flex-none overflow-y-auto p-4 max-600:w-full max-600:overflow-visible max-600:pt-2 ' + (enMapa ? 'max-600:flex max-600:min-h-0 max-600:flex-1 max-600:flex-col' : 'max-600:hidden')}>
          <h3 className="m-0 mb-2 text-titulo-seccion font-bold text-texto max-600:hidden">{textos.vista_en_el_mapa}</h3>
          <CampoBusqueda
            placeholder={catalogoEventos.placeholders.buscar_lugar_mapa}
            aria-label={catalogoEventos.placeholders.buscar_lugar_mapa}
            className="mb-3 hidden w-full max-600:flex"
          />
          <div className="overflow-hidden rounded-lg border border-t-f0eef5">
            <CodeplexMapa
              key={String(enMapa)}
              centro={centro}
              zoom={textos.zoom_mapa}
              marcadores={marcadoresMapa}
              altura={alturaMapa}
              anchoCompleto
              controlarZoom
              alHacerClicMarcador={(marcador) => setLugarElegido(marcador.id)}
            />
          </div>
          <div className="mt-3 flex items-center gap-3 rounded-lg bg-t-f5f3ff p-3">
            <span className="grid h-10 w-10 flex-none place-items-center rounded-lg bg-t-ede9fe text-primario"><Icono name="ubicacion" className="h-5 w-5" /></span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-cuerpo font-bold text-texto">{lugar?.nombreLugar}</span>
              <span className="block truncate text-auxiliar text-texto-suave">{lugarCompleto}</span>
            </span>
            <button type="button" onClick={() => { setEnMapa(false); alElegirCiudad(ciudadElegida) }} className="inline-flex flex-none items-center gap-1 border-0 bg-transparent p-0 text-enlace-accion font-semibold text-primario hover:underline">
              <Icono name="actualizar" className="h-3.5 w-3.5" /> {textos.cambiar_ubicacion}
            </button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2.5 max-600:hidden">
            <Boton type="button" variant="secundario" size="md" onClick={onCerrar}>{textos.cancelar}</Boton>
            <Boton type="button" variant="primario" size="md" onClick={alAplicar}>{textos.aplicar}</Boton>
          </div>
        </div>
      </div>

      <div className="hidden flex-none grid-cols-2 gap-2.5 px-4 pb-4 pt-3 max-600:grid">
        <Boton type="button" variant="secundario" size="md" onClick={onCerrar}>{textos.cancelar}</Boton>
        <Boton type="button" variant="primario" size="md" onClick={alAplicar}>{textos.aplicar}</Boton>
      </div>
    </ProveedorTemaGraficos>
  )
}
