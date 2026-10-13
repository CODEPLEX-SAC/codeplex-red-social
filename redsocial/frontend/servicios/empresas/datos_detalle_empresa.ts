import type { DatosDetalleEmpresa } from '@/tipos/empresas/contrato_detalle_empresa'
import { HISTORIAL_BASE_EMPRESA } from './historial_empresa'
import { USUARIOS_BASE_EMPRESA } from './usuarios_empresa'

export const DATOS_DETALLE_EMPRESA: DatosDetalleEmpresa = {
  usuariosBase: USUARIOS_BASE_EMPRESA,
  historialBase: HISTORIAL_BASE_EMPRESA,
}
