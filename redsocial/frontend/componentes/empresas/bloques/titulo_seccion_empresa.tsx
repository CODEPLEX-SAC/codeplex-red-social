import { Icono } from '../../compartido/icono'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { TituloSeccionEmpresaProps } from '@/tipos/empresas/contrato_usuarios_empresa'

const clases = catalogoEmpresas.edicion_empresa.clases

export function TituloSeccionEmpresa({ icono, titulo }: TituloSeccionEmpresaProps) {
  return (
    <h4 className={clases.titulo_seccion}>
      <Icono name={icono} className={clases.icono_seccion} />
      {titulo}
    </h4>
  )
}
