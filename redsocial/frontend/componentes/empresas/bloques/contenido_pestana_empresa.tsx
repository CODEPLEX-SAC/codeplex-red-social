import { ContenidoInformacionEmpresa } from './contenido_informacion_empresa'
import { PestanaHistorialEmpresa } from './pestana_historial_empresa'
import { PestanaPlanesEmpresa } from './pestana_planes_empresa'
import { PestanaUsuariosEmpresa } from './pestana_usuarios_empresa'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { ContenidoPestanaEmpresaProps } from '@/tipos/empresas/contrato_detalle_empresa'

const [PESTANA_INFORMACION, PESTANA_USUARIOS, , PESTANA_PLANES] = Object.keys(catalogoEmpresas.detalle_empresa.pestanas)

export function ContenidoPestanaEmpresa({ empresa, pestana, datosDetalle, usuariosGuardados, edicionUsuarios, totalEmpresas }: ContenidoPestanaEmpresaProps) {
  if (pestana === PESTANA_INFORMACION) return <ContenidoInformacionEmpresa empresa={empresa} />
  if (pestana === PESTANA_USUARIOS) return <PestanaUsuariosEmpresa empresa={empresa} usuariosBase={datosDetalle.usuariosBase} usuariosGuardados={usuariosGuardados} edicionUsuarios={edicionUsuarios} />
  if (pestana === PESTANA_PLANES) return <PestanaPlanesEmpresa empresa={empresa} totalEmpresas={totalEmpresas} />
  return <PestanaHistorialEmpresa empresa={empresa} historialBase={datosDetalle.historialBase} />
}
