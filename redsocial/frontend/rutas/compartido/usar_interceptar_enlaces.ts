import { useEffect } from 'react'
import { esClicSimpleDeEnlace } from './es_clic_simple_de_enlace'
import { obtenerArchivoDelEnlaceClicado } from './obtener_archivo_del_enlace_clicado'
import { navegar } from './navegacion'
import { ARCHIVO_A_RUTA } from './rutas'

export function usarInterceptarEnlaces() {
  useEffect(() => {
    function alHacerClic(evento: MouseEvent) {
      if (!esClicSimpleDeEnlace(evento)) return
      const archivo = obtenerArchivoDelEnlaceClicado(evento)
      if (!archivo) return
      const ruta = ARCHIVO_A_RUTA[archivo]
      if (!ruta) return
      evento.preventDefault()
      navegar(ruta)
    }
    document.addEventListener('click', alHacerClic)
    return () => document.removeEventListener('click', alHacerClic)
  }, [])
}
