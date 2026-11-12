import { capacidadDeFila, datosDeMejora, limiteAlcanzadoEnFila, puedeMejorar } from './logica_mejora_plan'
import { indexarSuscripciones, suscripcionDelModulo } from './logica_suscripciones_empresas'
import { MODULOS_EMPRESA } from './modulos_empresa'
import type { SuscripcionContratada } from '@/tipos/compartido/contrato_suscripciones'
import type { AvisoLimite } from '@/tipos/empresas/contrato_mejora_plan'
import type { ConfiguracionPlanes } from '@/tipos/marketplace/modelo_planes'

export function avisosDeLimite(totalEmpresas: number, suscripciones: SuscripcionContratada[], configuraciones: (aplicacion: string) => ConfiguracionPlanes | undefined, activos: string[]): AvisoLimite[] {
  const indice = indexarSuscripciones(suscripciones)
  const habilitados = new Set(activos)
  return MODULOS_EMPRESA.flatMap((modulo) => {
    const suscripcion = suscripcionDelModulo(modulo, indice)
    if (!suscripcion || !habilitados.has(modulo.clave)) return []
    const capacidad = capacidadDeFila(suscripcion, totalEmpresas)
    const alcanzado = limiteAlcanzadoEnFila(capacidad) && puedeMejorar(datosDeMejora(configuraciones(suscripcion.aplicacion), suscripcion, capacidad))
    return alcanzado ? [{ modulo, aplicativo: suscripcion.nombre, usadas: totalEmpresas, limite: capacidad.limite as number }] : []
  })
}

export function aplicativosContratados(suscripciones: SuscripcionContratada[]) {
  const indice = indexarSuscripciones(suscripciones)
  return MODULOS_EMPRESA.flatMap((modulo) => {
    const suscripcion = suscripcionDelModulo(modulo, indice)
    return suscripcion ? [{ modulo, suscripcion }] : []
  })
}
