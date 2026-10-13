import { useMemo } from 'react'
import { CabeceraHistorialEmpresa } from './cabecera_historial_empresa'
import { FiltrosHistorialEmpresa } from './filtros_historial_empresa'
import { armarHistorial } from './logica_historial_empresa'
import { PieHistorialEmpresa } from './pie_historial_empresa'
import { TablaHistorialEmpresa } from './tabla_historial_empresa'
import { usarHistorialEmpresa } from './usar_historial_empresa'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { PestanaHistorialEmpresaProps } from '@/tipos/empresas/contrato_historial_empresa'

export function PestanaHistorialEmpresa({ empresa, historialBase }: PestanaHistorialEmpresaProps) {
  const registros = useMemo(() => armarHistorial(empresa, historialBase), [empresa, historialBase])
  const listado = usarHistorialEmpresa(registros)

  return (
    <div role="tabpanel" aria-label={catalogoEmpresas.detalle_empresa.pestanas.historial} className="flex flex-col gap-4 px-6 max-480:px-4">
      <CabeceraHistorialEmpresa />
      <FiltrosHistorialEmpresa listado={listado} />
      <TablaHistorialEmpresa listado={listado} />
      <PieHistorialEmpresa listado={listado} />
    </div>
  )
}
