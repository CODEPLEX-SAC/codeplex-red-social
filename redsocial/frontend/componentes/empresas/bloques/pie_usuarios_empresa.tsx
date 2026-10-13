import { Paginacion } from '../../compartido/interfaz/paginacion'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { ListadoUsuariosProps } from '@/tipos/empresas/contrato_usuarios_empresa'

const PLANTILLA_RESUMEN = catalogoEmpresas.usuarios_empresa.resumen

const textoAuxiliar = catalogoEmpresas.clases.texto_auxiliar

export function PieUsuariosEmpresa({ listado }: ListadoUsuariosProps) {
  const valores: Record<string, number> = { mostrados: listado.filas.length, total: listado.total }
  const resumen = PLANTILLA_RESUMEN.replace(/\{(\w+)\}/g, (_, clave: string) => String(valores[clave]))

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <span className={textoAuxiliar}>{resumen}</span>
      <Paginacion total={listado.totalPaginas} pagina={listado.pagina} alCambiar={listado.irAPagina} />
    </div>
  )
}
