import { useMemo, useState } from 'react'
import { coincideNombre, contieneTexto, crearFuenteLocal, usarBusqueda } from '../../compartido'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import type { PanelFiltroUbicacionProps } from '@/tipos/eventos/contrato_filtro_ubicacion'
import { usarAlturaMapaResponsiva } from './usar_altura_mapa_responsiva'

const textos = catalogoEventos.panel_filtro_ubicacion

export function usarFiltroUbicacion({ ciudades, marcadores, fuenteCiudades, fuenteLugares, ciudadActual, onAplicar, onCerrar }: PanelFiltroUbicacionProps) {
  const fuenteLocalCiudades = useMemo(() => crearFuenteLocal(ciudades, coincideNombre), [ciudades])
  const busquedaCiudad = usarBusqueda(fuenteCiudades ?? fuenteLocalCiudades, { modo: fuenteCiudades ? 'remota' : 'local' })
  const fuenteLocalLugares = useMemo(() => crearFuenteLocal(marcadores, (marcador, consulta) => contieneTexto(marcador.nombreLugar ?? String(), consulta)), [marcadores])
  const busquedaLugar = usarBusqueda(fuenteLugares ?? fuenteLocalLugares, { modo: fuenteLugares ? 'remota' : 'local' })
  const [enMapa, setEnMapa] = useState(false)
  const [ciudadElegida, setCiudadElegida] = useState(() => ciudadActual ?? ciudades[0]?.nombre ?? '')
  const [lugarElegido, setLugarElegido] = useState(() => marcadores[0]?.id ?? '')
  const alturaMapa = usarAlturaMapaResponsiva()

  const ciudad = ciudades.find((c) => c.nombre === ciudadElegida) ?? ciudades[0]
  const lugar = marcadores.find((m) => m.id === lugarElegido)
  const centro: [number, number] = lugar ? [lugar.lat, lugar.lng] : [ciudad.lat, ciudad.lng]
  const lugarCompleto = [ciudad.nombre, textos.separador_lugar, textos.pais].join('')

  function alAplicar() {
    onAplicar(ciudadElegida === '' ? null : ciudadElegida)
    onCerrar()
  }

  function alElegirCiudad(nombre: string) {
    setCiudadElegida(nombre)
    setLugarElegido(marcadores[0]?.id ?? '')
  }

  return { busquedaCiudad, busquedaLugar, enMapa, setEnMapa, ciudadElegida, setCiudadElegida, setLugarElegido, alturaMapa, lugar, centro, lugarCompleto, alAplicar, alElegirCiudad }
}
