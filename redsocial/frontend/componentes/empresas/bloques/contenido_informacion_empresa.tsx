import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import { TarjetaContactoEmpresa } from './tarjeta_contacto_empresa'
import { TarjetaGeneralEmpresa } from './tarjeta_general_empresa'
import type { DetalleEmpresaProps } from '@/tipos/empresas/contrato_detalle_empresa'

export function ContenidoInformacionEmpresa({ empresa }: DetalleEmpresaProps) {
  return (
    <div role="tabpanel" aria-label={catalogoEmpresas.detalle_empresa.pestanas.informacion} className="flex flex-col gap-4 px-6 max-480:px-4">
      <TarjetaGeneralEmpresa empresa={empresa} />
      <TarjetaContactoEmpresa empresa={empresa} />
    </div>
  )
}
