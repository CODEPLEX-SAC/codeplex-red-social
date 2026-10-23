import { CabeceraEmpresas } from './cabecera_empresas'
import { FiltrosEmpresas } from './filtros_empresas'
import { ResumenEmpresas } from './resumen_empresas'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { EncabezadoListadoEmpresasProps } from '@/tipos/empresas/contrato_listado_empresas'

export function EncabezadoListadoEmpresas({ empresas, listado, alNuevaEmpresa }: EncabezadoListadoEmpresasProps) {
  return (
    <div className={catalogoEmpresas.clases.encabezado_listado}>
      <CabeceraEmpresas alNuevaEmpresa={alNuevaEmpresa} />
      <ResumenEmpresas empresas={empresas} />
      <FiltrosEmpresas listado={listado} />
    </div>
  )
}
