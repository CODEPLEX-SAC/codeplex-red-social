import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import { MODULOS_EMPRESA } from './modulos_empresa'
import type { SuscripcionContratada } from '@/tipos/compartido/contrato_suscripciones'
import type { EstadoModuloEmpresa, LimiteEmpresas, ModuloEmpresaCatalogo } from '@/tipos/empresas/contrato_listado_empresas'
import type { Empresa } from '@/tipos/empresas/modelo_empresas'

export const RUTA_MARKETPLACE_EMPRESAS = catalogoCompartido.navegacion.navPrincipal.find((item) => item.clave === catalogoEmpresas.limite.modulo_destino)?.ruta as string

export function estadoModuloEmpresa(empresa: Empresa, modulo: ModuloEmpresaCatalogo, suscripciones: SuscripcionContratada[]): EstadoModuloEmpresa {
  const suscripcion = modulo.producto === null ? undefined : suscripciones.find((candidata) => candidata.aplicacion === modulo.producto)
  const planNombre = modulo.producto === null ? (empresa.planesModulo?.[modulo.clave] ?? null) : (suscripcion?.planNombre ?? null)
  return { activo: planNombre !== null && empresa.modulos.includes(modulo.clave), contratado: planNombre !== null, planNombre }
}

export function modulosActivos(empresa: Empresa, suscripciones: SuscripcionContratada[]) {
  return MODULOS_EMPRESA.filter((modulo) => estadoModuloEmpresa(empresa, modulo, suscripciones).activo)
}

export function opcionesDePlan(suscripciones: SuscripcionContratada[]) {
  return suscripciones.map((suscripcion) => suscripcion.planNombre).filter((plan, indice, planes) => planes.indexOf(plan) === indice)
}

export function limiteDeEmpresas(suscripciones: SuscripcionContratada[]): LimiteEmpresas | null {
  const conLimite = suscripciones.flatMap((suscripcion) => (suscripcion.capacidad.empresas === null ? [] : [{ limite: suscripcion.capacidad.empresas, suscripcion }]))
  const minimo = Math.min(...conLimite.map((entrada) => entrada.limite))
  return conLimite.find((entrada) => entrada.limite === minimo) ?? null
}

export function limiteAlcanzado(totalEmpresas: number, suscripciones: SuscripcionContratada[]) {
  const limite = limiteDeEmpresas(suscripciones)
  return limite !== null && totalEmpresas >= limite.limite
}
