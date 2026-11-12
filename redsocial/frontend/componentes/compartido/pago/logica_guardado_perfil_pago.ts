import { validarPerfil } from './logica_perfil_pago'
import type { ParametrosGuardadoPerfilPago } from '@/tipos/compartido/contrato_flujo_pago'

export async function guardarPerfilPago({ borrador, modo, perfil, control, textos, notificar, fijarErrores, volverAlResumen }: ParametrosGuardadoPerfilPago): Promise<void> {
  const encontrados = validarPerfil(borrador, textos)
  fijarErrores(encontrados)
  if (Object.keys(encontrados).length > 0) return
  if (modo === 'edicion' && perfil) {
    const actualizado = await control.actualizar(perfil.id, borrador)
    if (actualizado) {
      volverAlResumen(actualizado.id)
      notificar('exito', textos.avisos.perfil_actualizado)
    } else notificar('error', textos.avisos.perfil_error)
    return
  }
  const registrado = await control.registrar(borrador)
  if (registrado) {
    volverAlResumen(registrado.id)
    notificar('exito', textos.avisos.perfil_agregado)
  } else notificar('error', textos.avisos.perfil_error)
}
