import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import type { CompraRealizada } from '@/tipos/marketplace/modelo_carrito'
import type { ConfiguracionPlanes, PlanAplicacion } from '@/tipos/marketplace/modelo_planes'
import type { CapacidadSuscripcion, SuscripcionContratada } from '@/tipos/compartido/contrato_suscripciones'

const PATRON_EMPRESAS = new RegExp(catalogoMarketplace.capacidad.patrones.empresas)
const PATRON_SUCURSALES = new RegExp(catalogoMarketplace.capacidad.patrones.sucursales)

function numeroDe(etiquetas: string[], patron: RegExp) {
  const coincidencia = etiquetas.map((etiqueta) => patron.exec(etiqueta)).find((resultado) => resultado !== null)
  return coincidencia ? Number(coincidencia[1]) : null
}

export function capacidadDePlan(plan: PlanAplicacion | undefined): CapacidadSuscripcion {
  const etiquetas = plan?.etiquetas ?? []
  return { empresas: numeroDe(etiquetas, PATRON_EMPRESAS), sucursales: numeroDe(etiquetas, PATRON_SUCURSALES) }
}

function planDeCompra(compra: CompraRealizada, configuracion: ConfiguracionPlanes | undefined) {
  return configuracion?.tipos.find((tipo) => tipo.id === compra.tipo)?.planes.find((plan) => plan.id === compra.plan)
}

export function suscripcionesDeCompras(compras: CompraRealizada[], aplicaciones: Record<string, ConfiguracionPlanes>): SuscripcionContratada[] {
  return compras.map((compra) => ({
    aplicacion: compra.aplicacion,
    nombre: compra.nombre,
    icono: compra.icono,
    tipo: compra.tipo,
    plan: compra.plan,
    planNombre: compra.planNombre,
    periodo: compra.periodo,
    precio: compra.precio,
    capacidad: capacidadDePlan(planDeCompra(compra, aplicaciones[compra.aplicacion])),
  }))
}
