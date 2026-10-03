import { ProveedorSesionDemostracion } from '@/componentes/compartido/sesion/proveedor_sesion_demostracion'
import { PaginaNoEncontrada } from '@/paginas/compartido/pagina_no_encontrada'
import catalogoAcceso from '../../catalogos/capacidades/redsocial/acceso.json'
import { usarInterceptarEnlaces } from './usar_interceptar_enlaces'
import { usarPaginaActual } from './usar_pagina_actual'

function PaginaVigente() {
  usarInterceptarEnlaces()
  const pagina = usarPaginaActual(catalogoAcceso.rutas.principal)

  return pagina ? pagina.render() : <PaginaNoEncontrada />
}

export function AplicacionRedSocial() {
  return (
    <ProveedorSesionDemostracion>
      <PaginaVigente />
    </ProveedorSesionDemostracion>
  )
}
