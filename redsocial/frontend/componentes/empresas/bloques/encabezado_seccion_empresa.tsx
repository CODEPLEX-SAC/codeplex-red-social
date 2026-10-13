import { Icono } from '../../compartido/icono'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { EncabezadoSeccionEmpresaProps } from '@/tipos/empresas/contrato_usuarios_empresa'

const clases = catalogoEmpresas.clases.encabezado_seccion

export function EncabezadoSeccionEmpresa({ icono, titulo, subtitulo }: EncabezadoSeccionEmpresaProps) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <Icono name={icono} className={clases.icono} />
      <div className="min-w-0">
        <h4 className={clases.titulo}>{titulo}</h4>
        <p className={clases.subtitulo}>{subtitulo}</p>
      </div>
    </div>
  )
}
