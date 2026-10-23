import { capacidadDePlan } from '../../marketplace/bloques/logica_suscripciones'
import { monto, precioNumerico } from '../../marketplace/bloques/logica_pago_planes'
import { rellenarPlantilla } from './logica_resumen_empresas'
import { MODULOS_EMPRESA } from './modulos_empresa'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import type { SuscripcionContratada } from '@/tipos/compartido/contrato_suscripciones'
import type { AvisoLimite, CapacidadFila, DatosMejora, OpcionMejora, RecursoLimitante } from '@/tipos/empresas/contrato_mejora_plan'
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

function opcionDe(plan: PlanAplicacion, suscripcion: SuscripcionContratada, capacidad: CapacidadFila, precioActual: number): OpcionMejora {
  const capacidadPlan = capacidadDePlan(plan)
  const limite = capacidad.recurso === null ? null : capacidadPlan[capacidad.recurso]
  const determinable = limite !== null && capacidad.limite !== null
  const precio = precioNumerico(plan.precio[suscripcion.periodo])
  return {
    plan,
    capacidad: capacidadPlan,
    limite,
    precio,
    diferenciaPrecio: precio - precioActual,
    diferenciaCapacidad: determinable ? limite - (capacidad.limite as number) : null,
    motivoNoDisponible: determinable ? (limite > (capacidad.limite as number) ? null : 'no_aumenta') : 'no_determinada',
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

export function avisosDeLimite(totalEmpresas: number, suscripciones: SuscripcionContratada[], configuraciones: (aplicacion: string) => ConfiguracionPlanes | undefined, activos: string[]): AvisoLimite[] {
  return MODULOS_EMPRESA.flatMap((modulo) => {
    const suscripcion = suscripciones.find((candidata) => candidata.aplicacion === modulo.producto)
    if (!suscripcion || !activos.includes(modulo.clave)) return []
    const capacidad = capacidadDeFila(suscripcion, totalEmpresas)
    const alcanzado = limiteAlcanzadoEnFila(capacidad) && puedeMejorar(datosDeMejora(configuraciones(suscripcion.aplicacion), suscripcion, capacidad))
    return alcanzado ? [{ modulo, aplicativo: suscripcion.nombre, usadas: totalEmpresas, limite: capacidad.limite as number }] : []
  })
}

const textosMejora = catalogoEmpresas.planes_asignados.mejora
const UNO = 1

export function textoCapacidad(recurso: RecursoLimitante | null, cantidad: number | null) {
  if (recurso === null || cantidad === null) return textosMejora.capacidad_no_determinada
  const unidades = textosMejora.unidades[recurso]
  return rellenarPlantilla(textosMejora.capacidad, { n: cantidad, unidad: cantidad === UNO ? unidades.una : unidades.varias })
}

export function textoPrecio(valor: number, periodo: SuscripcionContratada['periodo']) {
  const sufijo = periodo === 'mensual' ? catalogoMarketplace.planes.sufijo_mensual : catalogoMarketplace.planes.sufijo_anual
  return [monto(valor), sufijo].join('')
}

const resumenTextos = textosMejora.resumen

export function filasDeResumen(suscripcion: SuscripcionContratada, capacidad: CapacidadFila, datos: DatosMejora, opcion: OpcionMejora) {
  const periodo = suscripcion.periodo
  return [
    { etiqueta: resumenTextos.plan, actual: textosMejora.plan.replace(':plan', suscripcion.planNombre), nuevo: textosMejora.plan.replace(':plan', opcion.plan.nombre) },
    { etiqueta: resumenTextos.capacidad, actual: textoCapacidad(capacidad.recurso, capacidad.limite), nuevo: textoCapacidad(capacidad.recurso, opcion.limite) },
    { etiqueta: resumenTextos.precio, actual: textoPrecio(datos.precioActual, periodo), nuevo: textoPrecio(opcion.precio, periodo) },
  ]
}

export function lineasDeResumen(suscripcion: SuscripcionContratada, opcion: OpcionMejora) {
  const periodo = suscripcion.periodo
  return [
    { etiqueta: resumenTextos.diferencia, valor: rellenarPlantilla(textosMejora.mas_precio, { monto: textoPrecio(opcion.diferenciaPrecio, periodo) }) },
    { etiqueta: resumenTextos.cobro_ahora, valor: resumenTextos.cobro_ahora_valor },
    { etiqueta: resumenTextos.renovacion, valor: periodo === 'mensual' ? resumenTextos.renovacion_mensual : resumenTextos.renovacion_anual },
  ]
}

export function aplicativosContratados(suscripciones: SuscripcionContratada[]) {
  return MODULOS_EMPRESA.flatMap((modulo) => {
    const suscripcion = suscripciones.find((candidata) => candidata.aplicacion === modulo.producto)
    return suscripcion ? [{ modulo, suscripcion }] : []
  })
}
