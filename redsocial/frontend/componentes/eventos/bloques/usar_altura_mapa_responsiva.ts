import { useEffect, useState } from 'react'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'

const textos = catalogoEventos.panel_filtro_ubicacion

function alturaSegunAncho() {
  return window.innerWidth < 600 ? textos.altura_mapa_movil : textos.altura_mapa
}

function escucharRedimension(asignarAltura: (altura: string | number) => void) {
  function actualizar() {
    asignarAltura(alturaSegunAncho())
  }
  window.addEventListener('resize', actualizar)
  return () => window.removeEventListener('resize', actualizar)
}

export function usarAlturaMapaResponsiva() {
  const [altura, setAltura] = useState(alturaSegunAncho())

  useEffect(() => escucharRedimension(setAltura), [setAltura])

  return altura
}
