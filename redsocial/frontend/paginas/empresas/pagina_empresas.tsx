import { EstructuraApp } from '../../componentes/compartido'
import catalogoEmpresas from '../../catalogos/capacidades/redsocial/empresas.json'
import { SeccionListadoEmpresas } from '../../componentes/empresas'
import { DATOS_DETALLE_EMPRESA, EMPRESAS, FUENTES_BUSQUEDA_EMPRESAS } from '../../rutas/empresas/rutas_empresas'
import type { DatosDetalleEmpresa } from '@/tipos/empresas/contrato_detalle_empresa'

const DATOS_DETALLE_CONECTADOS: DatosDetalleEmpresa = { ...DATOS_DETALLE_EMPRESA, fuenteUsuarios: FUENTES_BUSQUEDA_EMPRESAS.usuarios, fuenteHistorial: FUENTES_BUSQUEDA_EMPRESAS.historial }

export function PaginaEmpresas() {
  return (
    <EstructuraApp paginaActiva={catalogoEmpresas.claves.modulo}>
      <SeccionListadoEmpresas empresas={EMPRESAS} fuente={FUENTES_BUSQUEDA_EMPRESAS.empresas} datosDetalle={DATOS_DETALLE_CONECTADOS} />
    </EstructuraApp>
  )
}
