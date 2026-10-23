import catalogoMarketplace from '../../catalogos/capacidades/redsocial/marketplace.json'

import { codigoDeFallo, leerEstadoInicial, listarMetodosPago, registrarMetodoPago } from '../../servicios/marketplace/metodos_pago'
import type { RepositorioMetodosPago } from '@/tipos/marketplace/modelo_pago'

export const rutasMarketplace = catalogoMarketplace.rutas

export const REPOSITORIO_METODOS_PAGO: RepositorioMetodosPago = {
  leerEstadoInicial,
  listar: listarMetodosPago,
  registrar: registrarMetodoPago,
  codigoDeFallo,
}

export * from '../../servicios/marketplace/estilos_marketplace'
export * from '../../servicios/marketplace/marketplace'
