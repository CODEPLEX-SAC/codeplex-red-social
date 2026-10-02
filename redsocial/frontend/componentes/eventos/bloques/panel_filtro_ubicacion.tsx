import { useEffect, useMemo, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import type { CodeplexMapaMarcador } from '@codeplex-sac/mapas'
import { Icono } from '../../compartido/icono'
import { Radio } from '../../compartido/interfaz/radio'
import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import type { FilaCiudadProps, PanelFiltroUbicacionProps } from '@/tipos/eventos/contrato_filtro_ubicacion'
import { SeccionTituloBuscar } from './seccion_titulo_buscar'

const textos = catalogoEventos.panel_filtro_ubicacion

function escucharRedimension(asignarAltura: (altura: string | number) => void) {
  function actualizar() {
    asignarAltura(window.innerWidth < 600 ? textos.altura_mapa_movil : textos.altura_mapa)
  }
  window.addEventListener('resize', actualizar)
  return () => window.removeEventListener('resize', actualizar)
}

function usarAlturaMapaResponsiva() {
  const [altura, setAltura] = useState(window.innerWidth < 600 ? textos.altura_mapa_movil : textos.altura_mapa)

  useEffect(() => escucharRedimension(setAltura), [setAltura])

  return altura
}

function FilaCiudad({ nombre, activa, onElegir }: FilaCiudadProps) {
  return (
    <div onClick={onElegir} className={'flex cursor-pointer items-center gap-1 rounded-lg pr-3 ' + (activa ? 'bg-t-ede9fe' : 'hover:bg-t-faf9fc')}>
      <Radio checked={activa} onChange={onElegir} inputProps={{ 'aria-label': nombre }} />
      <Icono name="ubicacion" className="h-4 w-4 flex-none text-texto-suave" />
      <span className={'ml-1.5 min-w-0 flex-1 truncate text-cuerpo ' + (activa ? 'font-medium text-primario' : 'text-texto')}>{nombre}</span>
    </div>
  )
}

export function PanelFiltroUbicacion({ ciudades, marcadores, ciudadActual, onAplicar, onCerrar }: PanelFiltroUbicacionProps) {
  const [busqueda, setBusqueda] = useState('')
  const [enMapa, setEnMapa] = useState(false)
  const [ciudadElegida, setCiudadElegida] = useState(() => ciudadActual ?? ciudades[0]?.nombre ?? '')
  const [lugarElegido, setLugarElegido] = useState(() => marcadores[0]?.id ?? '')
  const alturaMapa = usarAlturaMapaResponsiva()

  const ciudad = ciudades.find((c) => c.nombre === ciudadElegida) ?? ciudades[0]
  const lugar = marcadores.find((m) => m.id === lugarElegido)
  const centro: [number, number] = lugar ? [lugar.lat, lugar.lng] : [ciudad.lat, ciudad.lng]
  const lugarCompleto = [ciudad.nombre, textos.separador_lugar, textos.pais].join('')

  const marcadoresMapa = useMemo<CodeplexMapaMarcador[]>(
    () =>
      marcadores.map((m) => ({
        id: m.id,
        posicion: [m.lat, m.lng],
        titulo: m.nombreLugar,
        popup: (
          <div>
            <strong className="block text-nombre-entidad text-texto">{m.nombreLugar}</strong>
            <span className="block text-auxiliar text-texto-suave">{lugarCompleto}</span>
          </div>
        ),
      })),
    [marcadores, lugarCompleto],
  )

  function alAplicar() {
    onAplicar(ciudadElegida === '' ? null : ciudadElegida)
    onCerrar()
  }

  function alElegirCiudad(nombre: string) {
    setCiudadElegida(nombre)
    setLugarElegido(marcadores[0]?.id ?? '')
  }

  const buscadorLista = (
    <CampoBusqueda
      value={busqueda}
      onChange={(evento) => setBusqueda(evento.target.value)}
      placeholder={catalogoEventos.placeholders.buscar_ubicacion}
      aria-label={catalogoEventos.placeholders.buscar_ubicacion}
      className="mb-3 w-full"
    />
  )

  return (
    <div
      onClick={(evento) => evento.stopPropagation()}
      className={'absolute left-0 top-tooltip z-20 flex max-h-150 flex-col overflow-hidden rounded-xl border border-borde bg-white shadow-t13 max-600:fixed max-600:inset-x-0 max-600:bottom-0 max-600:top-auto max-600:z-30 panel-hoja-movil max-600:w-full max-600:rounded-b-none max-600:rounded-t-2xl max-600:border-0 ' + (enMapa ? textos.clase_hoja_fija : '')}
    >
      <SeccionTituloBuscar
        datos={{
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
        }}
      />
    </div>
  )
}
