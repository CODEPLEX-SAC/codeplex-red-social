import catalogoEmpresas from '../../catalogos/capacidades/redsocial/empresas.json'

export const rutasEmpresas = catalogoEmpresas.rutas

export * from '../../servicios/empresas/empresas'
export * from '../../servicios/empresas/datos_detalle_empresa'
export { FUENTES_BUSQUEDA_EMPRESAS } from './busqueda_empresas'
