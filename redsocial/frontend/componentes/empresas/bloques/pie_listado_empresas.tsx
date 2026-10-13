import { Paginacion } from '../../compartido/interfaz/paginacion'
import { Selector } from '../../compartido/interfaz/selector'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { ListadoEmpresasProps } from '@/tipos/empresas/contrato_listado_empresas'

const OPCIONES_PAGINADO = catalogoEmpresas.tamanos_pagina

const textoAuxiliar = catalogoEmpresas.clases.texto_auxiliar

export function PieListadoEmpresas({ listado }: ListadoEmpresasProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-4">
      <span className={textoAuxiliar}>{listado.resumen}</span>
      <div className="flex flex-wrap items-center gap-3">
        <Selector variant="mini" aria-label={catalogoEmpresas.campos.tamano_pagina} value={listado.tamanoPagina} onChange={listado.cambiarTamanoPagina}>
          {OPCIONES_PAGINADO.map((tamano) => <option key={tamano.valor} value={tamano.valor}>{tamano.etiqueta}</option>)}
        </Selector>
        <Paginacion total={listado.totalPaginas} pagina={listado.pagina} alCambiar={listado.irAPagina} />
      </div>
    </div>
  )
}
