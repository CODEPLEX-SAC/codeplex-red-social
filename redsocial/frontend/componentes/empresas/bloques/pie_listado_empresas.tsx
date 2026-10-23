import { Paginacion } from '../../compartido/interfaz/paginacion'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { ListadoEmpresasProps } from '@/tipos/empresas/contrato_listado_empresas'

const textoAuxiliar = catalogoEmpresas.clases.texto_auxiliar

export function PieListadoEmpresas({ listado }: ListadoEmpresasProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-4">
      <span className={textoAuxiliar}>{listado.resumen}</span>
      <Paginacion total={listado.totalPaginas} pagina={listado.pagina} alCambiar={listado.irAPagina} />
    </div>
  )
}
