import type { IconName } from '../../tipos/compartido/contrato_icono'
import type { MiLista } from '@/tipos/amigos/modelo_amigos_listas'
import datos from './listas.json'

export const MIS_LISTAS = datos.misListas as MiLista[]
export const LISTAS_SUGERIDAS = datos.listasSugeridas as { icono: IconName; color: string; nombre: string; cantidad: string }[]
