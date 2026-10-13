import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { EstadoEmpresaProps } from '@/tipos/empresas/contrato_detalle_empresa'

const ETIQUETAS_ESTADO: Record<string, string> = catalogoEmpresas.estados
const CLASES_ESTADO: Record<string, { texto: string; punto: string }> = catalogoEmpresas.clases.estado

export function EstadoEmpresa({ estado }: EstadoEmpresaProps) {
  const clases = CLASES_ESTADO[estado]

  return (
    <span className={`inline-flex items-center gap-1.5 text-subtitulo ${clases.texto}`}>
      <i className={`h-1.5 w-1.5 rounded-full ${clases.punto}`} />
      {ETIQUETAS_ESTADO[estado]}
    </span>
  )
}
