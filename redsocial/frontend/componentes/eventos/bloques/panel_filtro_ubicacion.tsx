import { MarcoPanelFiltro, CampoBusqueda, MensajeEstadoBusqueda } from '../../compartido'
import { useMemo } from 'react'
import type { CodeplexMapaMarcador } from '@codeplex-sac/mapas'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import type { PanelFiltroUbicacionProps } from '@/tipos/eventos/contrato_filtro_ubicacion'
import { FilaCiudad } from './fila_ciudad'
import { SeccionTituloBuscar } from './seccion_titulo_buscar'
import { usarFiltroUbicacion } from './usar_filtro_ubicacion'
import 'leaflet/dist/leaflet.css'

const textos = catalogoEventos.panel_filtro_ubicacion

export function PanelFiltroUbicacion(props: PanelFiltroUbicacionProps) {
  const { id, ciudades, onCerrar } = props
  const estado = usarFiltroUbicacion(props)
  const { busquedaCiudad, busquedaLugar, enMapa, lugarCompleto } = estado

  const marcadoresMapa = useMemo<CodeplexMapaMarcador[]>(
    () =>
      busquedaLugar.resultado.elementos.map((m) => ({
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
    [busquedaLugar.resultado.elementos, lugarCompleto],
  )

  const buscadorLista = (
    <CampoBusqueda
      value={busquedaCiudad.texto}
      onChange={(evento) => busquedaCiudad.cambiarTexto(evento.target.value)}
      placeholder={catalogoEventos.placeholders.buscar_ubicacion}
      aria-label={catalogoEventos.placeholders.buscar_ubicacion}
      className="mb-3 w-full"
    />
  )

  const buscadorMapa = (
    <CampoBusqueda
      value={busquedaLugar.texto}
      onChange={(evento) => busquedaLugar.cambiarTexto(evento.target.value)}
      placeholder={catalogoEventos.placeholders.buscar_lugar_mapa}
      aria-label={catalogoEventos.placeholders.buscar_lugar_mapa}
      className="mb-3 hidden w-full max-600:flex"
    />
  )

  const estadoCiudades = <MensajeEstadoBusqueda estado={busquedaCiudad.estado} error={busquedaCiudad.error} />

  const estadoLugares = (
    <div className="hidden max-600:block">
      <MensajeEstadoBusqueda estado={busquedaLugar.estado} error={busquedaLugar.error} className="mb-3" />
    </div>
  )

  return (
    <MarcoPanelFiltro id={id} className={'max-h-150 flex-col overflow-hidden max-900:w-110 ' + (enMapa ? textos.clase_hoja_fija : '')}>
      <SeccionTituloBuscar
        datos={{ ...estado, onCerrar, buscadorLista, buscadorMapa, estadoCiudades, estadoLugares, ciudades, ciudadesVisibles: busquedaCiudad.resultado.elementos, FilaCiudad, marcadoresMapa }}
      />
    </MarcoPanelFiltro>
  )
}
