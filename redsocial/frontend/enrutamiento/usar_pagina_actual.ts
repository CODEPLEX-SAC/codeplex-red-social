import { useEffect } from 'react'
import { reemplazarRuta, useRutaActual } from './navegacion'
import type { RutaApp } from '@/tipos/enrutamiento/rutas'
import { RUTA_INICIAL, resolverRuta } from './rutas'

export function usarPaginaActual(): RutaApp | undefined {
  const ruta = useRutaActual()

  useEffect(() => {
    if (window.location.pathname === '/') {
      reemplazarRuta(RUTA_INICIAL)
    }
  }, [])

  const rutaEfectiva = ruta === '/' ? RUTA_INICIAL : ruta
  return resolverRuta(rutaEfectiva)
}
