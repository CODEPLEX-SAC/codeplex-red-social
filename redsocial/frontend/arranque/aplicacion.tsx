import { usarInterceptarEnlaces } from '../enrutamiento/usar_interceptar_enlaces'
import { usarPaginaActual } from '../enrutamiento/usar_pagina_actual'
import { PaginaNoEncontrada } from '@/paginas/compartido/pagina_no_encontrada'

function Aplicacion() {
  usarInterceptarEnlaces()
  const pagina = usarPaginaActual()

  if (!pagina) return <PaginaNoEncontrada />
  return <>{pagina.render()}</>
}

export default Aplicacion
