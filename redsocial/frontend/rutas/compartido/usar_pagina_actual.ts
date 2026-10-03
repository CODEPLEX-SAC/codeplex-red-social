import { useEffect } from 'react'
import { usarSesionDemostracion } from '@/componentes/compartido/sesion/usar_sesion_demostracion'
import { reemplazarRuta, usarRutaActual } from './navegacion'
import type { RutaApp } from '@/tipos/enrutamiento/contrato_rutas'
import { RUTA_INICIAL, resolverRuta } from './rutas'

function rutaPermitida(ruta: string, autenticado: boolean, rutaAcceso: string) {
  if (!autenticado) return rutaAcceso
  return ruta === '/' ? RUTA_INICIAL : ruta
}

export function usarPaginaActual(rutaAcceso: string): RutaApp | undefined {
  const ruta = usarRutaActual()
  const { autenticado } = usarSesionDemostracion()
  const rutaEfectiva = rutaPermitida(ruta, autenticado, rutaAcceso)

  useEffect(() => {
    if (rutaEfectiva !== ruta) reemplazarRuta(rutaEfectiva)
  }, [ruta, rutaEfectiva])

  return resolverRuta(rutaEfectiva)
}
