import type { Empresa } from '@/tipos/empresas/modelo_empresas'
import datos from './empresas.json'

export const EMPRESAS = datos.empresas as Empresa[]
