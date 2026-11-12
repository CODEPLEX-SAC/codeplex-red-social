import { monto } from '../../marketplace/bloques/logica_pago_planes'
import { rellenarPlantilla } from './logica_resumen_empresas'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import type { SuscripcionContratada } from '@/tipos/compartido/contrato_suscripciones'
import type { CapacidadFila, DatosMejora, OpcionMejora, RecursoLimitante } from '@/tipos/empresas/contrato_mejora_plan'

const textosMejora = catalogoEmpresas.planes_asignados.mejora
const resumenTextos = textosMejora.resumen
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
