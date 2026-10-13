import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { EtiquetaCampoEmpresaProps } from '@/tipos/empresas/contrato_detalle_empresa'

const claseEtiqueta = catalogoEmpresas.clases.etiqueta_campo

export function EtiquetaCampoEmpresa({ etiqueta, requerido = false, className = '' }: EtiquetaCampoEmpresaProps) {
  return (
    <span className={`${claseEtiqueta} ${className}`}>
      {etiqueta}
      {requerido ? <span className="ml-0.5 text-negativo-kpi">*</span> : null}
    </span>
  )
}
