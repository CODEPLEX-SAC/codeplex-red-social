import { ContenidoInformacionEmpresa } from './contenido_informacion_empresa'
import { PestanaHistorialEmpresa } from './pestana_historial_empresa'
import { PestanaUsuariosEmpresa } from './pestana_usuarios_empresa'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { ContenidoPestanaEmpresaProps } from '@/tipos/empresas/contrato_detalle_empresa'

const [PESTANA_INFORMACION, PESTANA_USUARIOS] = Object.keys(catalogoEmpresas.detalle_empresa.pestanas)

export function ContenidoPestanaEmpresa({ empresa, pestana, datosDetalle, usuariosGuardados, edicionUsuarios }: ContenidoPestanaEmpresaProps) {
  if (pestana === PESTANA_INFORMACION) return <ContenidoInformacionEmpresa empresa={empresa} />
  if (pestana === PESTANA_USUARIOS) return <PestanaUsuariosEmpresa empresa={empresa} usuariosBase={datosDetalle.usuariosBase} usuariosGuardados={usuariosGuardados} edicionUsuarios={edicionUsuarios} />
  return <PestanaHistorialEmpresa empresa={empresa} historialBase={datosDetalle.historialBase} />
}
