import { ProveedorEmpresaActiva } from '@/componentes/compartido/sesion/proveedor_empresa_activa'
import { ProveedorSesionDemostracion } from '@/componentes/compartido/sesion/proveedor_sesion_demostracion'
import { PaginaNoEncontrada } from '@/paginas/compartido/pagina_no_encontrada'
import { ProveedorCarritoMarketplace } from '@/paginas/marketplace/proveedor_carrito_marketplace'
import catalogoAcceso from '../../catalogos/capacidades/redsocial/acceso.json'
import { EMPRESAS } from '../empresas/rutas_empresas'
import { SUSCRIPCIONES_DEMOSTRACION } from '../marketplace/rutas_marketplace'
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
      <ProveedorEmpresaActiva empresas={EMPRESAS}>
        <ProveedorCarritoMarketplace suscripcionesIniciales={SUSCRIPCIONES_DEMOSTRACION}>
          <PaginaVigente />
        </ProveedorCarritoMarketplace>
      </ProveedorEmpresaActiva>
    </ProveedorSesionDemostracion>
  )
}
