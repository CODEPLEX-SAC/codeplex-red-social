import { EtiquetaCampoEmpresa } from './etiqueta_campo_empresa'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { FilaDatoEmpresaProps } from '@/tipos/empresas/contrato_detalle_empresa'

const clases = catalogoEmpresas.detalle_empresa.clases

export function FilaDatoEmpresa({ etiqueta, requerido = false, children }: FilaDatoEmpresaProps) {
  return (
    <div className={clases.fila_dato}>
      <EtiquetaCampoEmpresa etiqueta={etiqueta} requerido={requerido} />
      <div className={clases.valor_dato}>{children}</div>
    </div>
  )
}
