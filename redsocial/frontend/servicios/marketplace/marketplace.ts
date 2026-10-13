import type { IconName } from '../../tipos/compartido/contrato_icono'
import type { Destacado } from '@/tipos/marketplace/modelo_marketplace'
import datos from './marketplace.json'
import planes from './planes_aplicaciones.json'
import pago from './pago_planes.json'
import type { ConfiguracionPlanes } from '@/tipos/marketplace/modelo_planes'
import type { ConfiguracionPago } from '@/tipos/marketplace/modelo_pago'

export const DESTACADOS = datos.destacados as Destacado[]
export const CATEGORIAS = datos.categorias as { icono: IconName; color: 'verde' | 'azul' | 'morado' | 'naranja' | 'rosa'; nombre: string; cantidad: string }[]
export const COMPRAS = datos.compras as { icono: IconName; color: 'verde' | 'morado' | 'azul'; nombre: string; fecha: string }[]
export const POPULARES = datos.populares as { icono: IconName; color: 'verde' | 'azul' | 'morado' | 'naranja' | 'rosa'; nombre: string; puntaje: string; conteo: string; precio: string }[]
export const PLANES_APLICACIONES = planes as Record<string, ConfiguracionPlanes>
export const PAGO_PLANES = pago as ConfiguracionPago
