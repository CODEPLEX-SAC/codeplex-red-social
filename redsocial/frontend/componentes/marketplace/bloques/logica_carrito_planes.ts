import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { monto, precioNumerico, SUPER_VIP_HABILITADO } from './logica_pago_planes'
import type { ElementoMenu } from '@/tipos/compartido/contrato_menu'
import type { AccesoCarrito } from '@/tipos/compartido/contrato_acceso_carrito'
import type { AccionesCarrito, AccionesCompra, CompraRealizada, ItemCarrito, ManejadoresCompra, ServicioAdicional } from '@/tipos/marketplace/modelo_carrito'
import type { CarritoMarketplace } from '@/tipos/marketplace/contrato_proveedor_carrito'
import type { ConfiguracionPago } from '@/tipos/marketplace/modelo_pago'
import type { ConfiguracionPlanes, SeleccionPlan } from '@/tipos/marketplace/modelo_planes'

export const RUTA_MARKETPLACE = catalogoCompartido.navegacion.navPrincipal.find((item) => item.clave === catalogoCompartido.barra_lateral.destino_modulos)?.ruta ?? ''

export function claseModalPlanes(configuracion: ConfiguracionPlanes) {
  const { modal, modal_por_grupo: anchos } = catalogoMarketplace.planes.clases
  return `${modal} ${anchos[configuracion.modal]}`
}

export function accesoDelCarrito(carrito: CarritoMarketplace, etiqueta: string): AccesoCarrito {
  return { cantidad: carrito.items.length, etiqueta, abrir: carrito.abrirCarrito }
}

export function accionesDelCarrito(carrito: CarritoMarketplace): AccionesCarrito {
  return { cerrar: carrito.configuracionPlanes ? () => undefined : carrito.cerrarCarrito, quitar: carrito.quitar, cambiarPlan: carrito.cambiarPlan, proceder: carrito.proceder, seguirComprando: carrito.seguirComprando }
}

export function reemplazarOAgregar(items: ItemCarrito[], item: ItemCarrito) {
  if (!items.some((i) => i.aplicacion === item.aplicacion)) return [...items, item]
  return items.map((i) => (i.aplicacion === item.aplicacion ? item : i))
}

export function crearItem(configuracion: ConfiguracionPlanes, seleccion: SeleccionPlan): ItemCarrito | null {
  const tipo = configuracion.tipos.find((t) => t.id === seleccion.tipo)
  const plan = tipo?.planes.find((p) => p.id === seleccion.plan)
  if (!plan) return null
  return {
    aplicacion: configuracion.id,
    nombre: configuracion.nombre,
    descripcion: configuracion.descripcion,
    lema: configuracion.lema,
    ruta: configuracion.ruta,
    icono: configuracion.icono,
    tema: configuracion.color,
    plan: plan.id,
    planNombre: plan.nombre,
    periodo: seleccion.periodo,
    precio: plan.precio[seleccion.periodo],
    caracteristicas: plan.caracteristicas.slice(0, catalogoMarketplace.carrito.caracteristicas_visibles).map((c) => c.texto),
    incluye: plan.caracteristicas.map((c) => c.texto),
  }
}

export function crearCompras(items: ItemCarrito[], fecha: string, vence: string, dias: number): CompraRealizada[] {
  return items.map((i) => ({ aplicacion: i.aplicacion, nombre: i.nombre, icono: i.icono, tema: i.tema, planNombre: i.planNombre, lema: i.lema, ruta: i.ruta, periodo: i.periodo, precio: i.precio, incluye: i.incluye, fecha, vence, dias }))
}

export function estadoSuscripcion(compra: CompraRealizada) {
  const estados = catalogoMarketplace.mis_compras.estados
  const enPrueba = compra.dias > 0
  return { ...(enPrueba ? estados.prueba : estados.limitado), enPrueba }
}

export function metasCompra<M extends { id: string }>(compra: CompraRealizada, metas: readonly M[]): M[] {
  const enPrueba = estadoSuscripcion(compra).enPrueba
  return metas.filter((meta) => meta.id !== catalogoMarketplace.mis_compras.meta_dias || enPrueba)
}

export function valoresSuscripcion(compra: CompraRealizada): Record<string, string> {
  return {
    estado: estadoSuscripcion(compra).etiqueta,
    plan: compra.planNombre,
    inicio: compra.fecha,
    vence: compra.vence,
    dias: catalogoMarketplace.mis_compras.dias_valor.replace(':n', String(compra.dias)),
  }
}

export function valoresDetalle(compra: CompraRealizada): Record<string, string> {
  const sufijo = compra.periodo === 'mensual' ? catalogoMarketplace.planes.sufijo_mensual : catalogoMarketplace.planes.sufijo_anual
  return { ...valoresSuscripcion(compra), precio: [monto(precioNumerico(compra.precio)), sufijo].join('') }
}

export function valoresServicio(servicio: ServicioAdicional, vip: ConfiguracionPago['vip']): Record<string, string> {
  return {
    aplicacion: servicio.nombre,
    contratado: servicio.fecha,
    costo: [monto(vip.precio), catalogoMarketplace.pago.vip.mes].join(''),
  }
}

export function elementosPestanasCompras(cantidades: number[]) {
  return catalogoMarketplace.mis_compras.pestanas.map((pestana, indice) => ({ ...pestana, etiqueta: pestana.etiqueta.replace(':n', String(cantidades[indice])) }))
}

export function accionesDeCompra(aplicacion: string, manejadores: ManejadoresCompra): AccionesCompra {
  return {
    detalles: () => manejadores.detalles(aplicacion),
    mejorar: () => manejadores.mejorar(aplicacion),
    contratarVip: () => manejadores.contratarVip(aplicacion),
    desinstalar: () => manejadores.desinstalar(aplicacion),
  }
}

export function elementosMenuCompra(compra: CompraRealizada, acciones: AccionesCompra, vipContratado: boolean): ElementoMenu[] {
  const visibles = catalogoMarketplace.mis_compras.menu.filter((opcion) => !('solo_sin_vip' in opcion && (vipContratado || !SUPER_VIP_HABILITADO)))
  return visibles.map((opcion, indice) => ({
    etiqueta: opcion.etiqueta,
    alHacerClick: acciones[opcion.accion as keyof AccionesCompra],
    ruta: 'requiere_ruta' in opcion ? compra.ruta : undefined,
    deshabilitado: 'requiere_ruta' in opcion && !compra.ruta,
    peligro: 'peligro' in opcion,
    divisor: indice < visibles.length - 1 && visibles[indice + 1].grupo !== opcion.grupo,
  }))
}
