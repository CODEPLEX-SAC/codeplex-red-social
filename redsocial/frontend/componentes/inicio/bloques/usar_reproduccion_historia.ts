import { useEffect, useRef } from 'react'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'

const DURACION = catalogoInicio.historias.reproduccion.duracion_ms

export function usarReproduccionHistoria(clave: string, onTerminar: () => void) {
  const terminar = useRef(onTerminar)

  useEffect(() => {
    terminar.current = onTerminar
  }, [onTerminar])

  useEffect(() => {
    const temporizador = window.setTimeout(() => terminar.current(), DURACION)
    return () => window.clearTimeout(temporizador)
  }, [clave])
}
