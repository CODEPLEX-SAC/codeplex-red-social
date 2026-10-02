import { usarInterceptarEnlaces } from '@/rutas/compartido/usar_interceptar_enlaces'
import { usarPaginaActual } from '@/rutas/compartido/usar_pagina_actual'
import { PaginaNoEncontrada } from '@/paginas/compartido/pagina_no_encontrada'

function Aplicacion() {
  usarInterceptarEnlaces()
  const pagina = usarPaginaActual()

  return (
    <>
      {pagina ? pagina.render() : <PaginaNoEncontrada />}
      <div className="pointer-events-none fixed bottom-2 left-2 z-50 rounded bg-black/60 px-2 py-1 text-xs text-white">
        Última actualización: {__FECHA_ACTUALIZACION__}
      </div>
    </>
  )
}

export default Aplicacion
 