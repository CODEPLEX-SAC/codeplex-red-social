import { imagenEmpresaPredeterminada } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { Insignia } from '../../compartido/interfaz/insignia'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { DetalleEmpresaProps } from '@/tipos/empresas/contrato_detalle_empresa'

const textos = catalogoEmpresas.detalle_empresa
const PLANTILLA_CODIGO = catalogoEmpresas.codigo_empresa
const PLANTILLA_LOGO = textos.logo_alt
const ETIQUETAS_ESTADO: Record<string, string> = catalogoEmpresas.estados
const CLASES_ESTADO: Record<string, { punto: string; insignia: string }> = catalogoEmpresas.clases.estado

const textoAuxiliar = catalogoEmpresas.clases.texto_auxiliar

export function CabeceraResumenEmpresa({ empresa }: DetalleEmpresaProps) {
  const estado = CLASES_ESTADO[empresa.estado]

  return (
    <div className="flex flex-wrap items-center gap-4 px-6 pt-5 max-480:px-4">
      <span className="grid h-24 w-24 flex-none place-items-center overflow-hidden rounded-2xl bg-primario-suave max-480:h-16 max-480:w-16">
        <AvatarImagen src={empresa.logo ?? imagenEmpresaPredeterminada} alt={PLANTILLA_LOGO.replace(':nombre', empresa.nombre)} className="h-full w-full" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="m-0 break-words text-nombre-entidad text-texto">{empresa.nombre}</h3>
        <span className={`block ${textoAuxiliar}`}>{PLANTILLA_CODIGO.replace(':codigo', empresa.codigo)}</span>
        <div className="mt-2 flex flex-wrap gap-2">
          <Insignia variant="status" className={`inline-flex items-center gap-1.5 ${estado.insignia}`} punto={estado.punto}>
            {ETIQUETAS_ESTADO[empresa.estado]}
          </Insignia>
        </div>
      </div>
    </div>
  )
}
