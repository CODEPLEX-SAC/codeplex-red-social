import { useEffect } from 'react'
import { esClicSimpleDeEnlace } from './es_clic_simple_de_enlace'
import { obtenerRutaDelEnlaceClicado } from './obtener_ruta_del_enlace_clicado'
import { navegar } from './navegacion'
import { resolverRuta } from './rutas'

export function usarInterceptarEnlaces() {
  useEffect(() => {
    function alHacerClic(evento: MouseEvent) {
      if (!esClicSimpleDeEnlace(evento)) return
      const ruta = obtenerRutaDelEnlaceClicado(evento)
      if (!ruta) return
      if (!resolverRuta(ruta)) return
      evento.preventDefault()
      navegar(ruta)
    }
    document.addEventListener('click', alHacerClic)
    return () => document.removeEventListener('click', alHacerClic)
  }, [])
}
