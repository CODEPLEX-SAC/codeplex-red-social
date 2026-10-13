import { Paginacion } from '../../compartido/interfaz/paginacion'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { ListadoHistorialProps } from '@/tipos/empresas/contrato_historial_empresa'

const PLANTILLA_RESUMEN = catalogoEmpresas.historial_empresa.resumen

const textoAuxiliar = catalogoEmpresas.clases.texto_auxiliar

export function PieHistorialEmpresa({ listado }: ListadoHistorialProps) {
  const valores: Record<string, number> = { mostrados: listado.filas.length, total: listado.total }
  const resumen = PLANTILLA_RESUMEN.replace(/\{(\w+)\}/g, (_, clave: string) => String(valores[clave]))

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <span className={textoAuxiliar}>{resumen}</span>
      <Paginacion total={listado.totalPaginas} pagina={listado.pagina} alCambiar={listado.irAPagina} />
    </div>
  )
}
