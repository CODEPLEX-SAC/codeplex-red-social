import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { CampoEtiquetadoEmpresaProps } from '@/tipos/empresas/contrato_formulario_empresa'

const claseEtiqueta = catalogoEmpresas.clases.etiqueta_campo

export function CampoEtiquetadoEmpresa({ etiqueta, requerido = false, children }: CampoEtiquetadoEmpresaProps) {
  return (
    <label className="flex min-w-0 flex-col gap-1">
      <span className={claseEtiqueta}>
        {etiqueta}
        {requerido ? <span className="ml-0.5 text-negativo-kpi">*</span> : null}
      </span>
      {children}
    </label>
  )
}
