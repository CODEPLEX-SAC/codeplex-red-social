import { capacidadDePlan } from '../../marketplace/bloques/logica_suscripciones'
import { precioNumerico } from '../../marketplace/bloques/logica_pago_planes'
import type { SuscripcionContratada } from '@/tipos/compartido/contrato_suscripciones'
import type { CapacidadFila, DatosMejora, OpcionMejora } from '@/tipos/empresas/contrato_mejora_plan'
import type { ConfiguracionPlanes, PlanAplicacion } from '@/tipos/marketplace/modelo_planes'

export function capacidadDeFila(suscripcion: SuscripcionContratada, totalEmpresas: number): CapacidadFila {
  const { empresas, sucursales } = suscripcion.capacidad
  if (empresas !== null) return { recurso: 'empresas', limite: empresas, usadas: totalEmpresas }
  if (sucursales !== null) return { recurso: 'sucursales', limite: sucursales, usadas: null }
  return { recurso: null, limite: null, usadas: null }
}

export function limiteAlcanzadoEnFila(capacidad: CapacidadFila) {
  return capacidad.recurso === 'empresas' && capacidad.limite !== null && capacidad.usadas !== null && capacidad.usadas >= capacidad.limite
}

export function porcentajeDeUso(capacidad: CapacidadFila, maximo: number) {
  if (capacidad.limite === null || capacidad.usadas === null || capacidad.limite === 0) return null
  return Math.round((capacidad.usadas / capacidad.limite) * maximo)
}

function diferenciaDeCapacidad(limite: number | null, limiteActual: number | null) {
  if (limite === null || limiteActual === null) return null
  return limite - limiteActual
}

function motivoNoDisponible(limite: number | null, limiteActual: number | null): 'no_determinada' | 'no_aumenta' | null {
  if (limite === null || limiteActual === null) return 'no_determinada'
  return limite > limiteActual ? null : 'no_aumenta'
}

function opcionDe(plan: PlanAplicacion, suscripcion: SuscripcionContratada, capacidad: CapacidadFila, precioActual: number): OpcionMejora {
  const capacidadPlan = capacidadDePlan(plan)
  const limite = capacidad.recurso === null ? null : capacidadPlan[capacidad.recurso]
  const precio = precioNumerico(plan.precio[suscripcion.periodo])
  return {
    plan,
    capacidad: capacidadPlan,
    limite,
    precio,
    diferenciaPrecio: precio - precioActual,
    diferenciaCapacidad: diferenciaDeCapacidad(limite, capacidad.limite),
    motivoNoDisponible: motivoNoDisponible(limite, capacidad.limite),
  }
}

export function datosDeMejora(configuracion: ConfiguracionPlanes | undefined, suscripcion: SuscripcionContratada, capacidad: CapacidadFila): DatosMejora {
  const planes = configuracion?.tipos.find((tipo) => tipo.id === suscripcion.tipo)?.planes ?? []
  const actual = planes.find((plan) => plan.id === suscripcion.plan)
  const precioActual = precioNumerico(suscripcion.precio)
  const superiores = planes.filter((plan) => precioNumerico(plan.precio[suscripcion.periodo]) > precioActual)
  return { actual, precioActual, opciones: superiores.map((plan) => opcionDe(plan, suscripcion, capacidad, precioActual)) }
}

export function puedeMejorar(datos: DatosMejora) {
  return datos.opciones.some((opcion) => opcion.motivoNoDisponible === null)
}
