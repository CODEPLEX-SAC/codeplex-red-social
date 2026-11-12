import { ContextoDirectorioUsuarios } from '@/componentes/compartido/sesion/contexto_directorio_usuarios'
import { ProveedorEmpresaActiva } from '@/componentes/compartido/sesion/proveedor_empresa_activa'
import { ProveedorSesionDemostracion } from '@/componentes/compartido/sesion/proveedor_sesion_demostracion'
import { PaginaNoEncontrada } from '@/paginas/compartido/pagina_no_encontrada'
import { ProveedorCarritoMarketplace } from '@/paginas/marketplace/proveedor_carrito_marketplace'
import catalogoAcceso from '../../catalogos/capacidades/redsocial/acceso.json'
import { EMPRESAS } from '../empresas/rutas_empresas'
import { PERFILES_USUARIO } from '../perfil/rutas_perfil'
import { SUSCRIPCIONES_DEMOSTRACION } from '../marketplace/rutas_marketplace'
import { ProveedorInsigniasNavegacion } from './proveedor_insignias_navegacion'
import { usarInterceptarEnlaces } from './usar_interceptar_enlaces'
import { usarPaginaActual } from './usar_pagina_actual'

const DIRECTORIO_USUARIOS = PERFILES_USUARIO.map((perfil) => ({ id: perfil.id, nombre: perfil.nombre, titular: perfil.titular, avatar: perfil.avatar }))

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
          <ProveedorInsigniasNavegacion>
            <ContextoDirectorioUsuarios.Provider value={DIRECTORIO_USUARIOS}>
              <PaginaVigente />
            </ContextoDirectorioUsuarios.Provider>
          </ProveedorInsigniasNavegacion>
        </ProveedorCarritoMarketplace>
      </ProveedorEmpresaActiva>
    </ProveedorSesionDemostracion>
  )
}
