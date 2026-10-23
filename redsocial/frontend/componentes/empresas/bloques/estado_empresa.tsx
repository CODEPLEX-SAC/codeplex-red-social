import { Insignia } from '../../compartido/interfaz/insignia'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { EstadoEmpresaProps } from '@/tipos/empresas/contrato_detalle_empresa'

const ETIQUETAS_ESTADO: Record<string, string> = catalogoEmpresas.estados
const CLASES_ESTADO: Record<string, { texto: string; punto: string }> = catalogoEmpresas.clases.estado

export function EstadoEmpresa({ estado }: EstadoEmpresaProps) {
  const clases = CLASES_ESTADO[estado]

  return (
    <Insignia variant="status" className={`inline-flex items-center gap-1.5 text-subtitulo ${clases.texto}`} punto={clases.punto}>
      {ETIQUETAS_ESTADO[estado]}
    </Insignia>
  )
}
