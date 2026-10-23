import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import { estadoModuloEmpresa } from './logica_suscripciones_empresas'
import { MODULOS_EMPRESA } from './modulos_empresa'
import type { SuscripcionContratada } from '@/tipos/compartido/contrato_suscripciones'
import type { ResumenEmpresas } from '@/tipos/empresas/contrato_listado_empresas'
import type { Empresa } from '@/tipos/empresas/modelo_empresas'

const POSICION_MES = 1
const POSICION_ANIO = 2
const SEPARADOR_FECHA = '/'
const CIEN = catalogoEmpresas.resumen.porcentaje_maximo

function mesDeRegistro(empresa: Empresa) {
  const partes = empresa.fechaRegistro.split(SEPARADOR_FECHA)
  return partes[POSICION_ANIO] + SEPARADOR_FECHA + partes[POSICION_MES]
}

const MARCADOR = /\{(\w+)\}/g

export function rellenarPlantilla(plantilla: string, valores: Record<string, string | number>) {
  return plantilla.replace(MARCADOR, (_, clave: string) => String(valores[clave]))
}

export function contarAltasDelUltimoMes(empresas: Empresa[]) {
  const meses = empresas.map(mesDeRegistro)
  const ultimo = [...meses].sort().at(-1)
  return meses.filter((mes) => mes === ultimo).length
}

export function calcularResumenEmpresas(empresas: Empresa[], suscripciones: SuscripcionContratada[]): ResumenEmpresas {
  const total = empresas.length
  return {
    total,
    nuevasMes: contarAltasDelUltimoMes(empresas),
    modulos: MODULOS_EMPRESA.map((modulo) => {
      const clave = modulo.clave
      const cantidad = empresas.filter((empresa) => estadoModuloEmpresa(empresa, modulo, suscripciones).activo).length
      return { clave, cantidad, porcentaje: total === 0 ? 0 : Math.round((cantidad / total) * CIEN) }
    }),
  }
}
