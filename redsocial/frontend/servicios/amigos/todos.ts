import type { IconName } from '../../tipos/compartido/contrato_icono'
import type { Amigo } from '@/tipos/amigos/modelo_amigos_todos'
import datos from './todos.json'

export const RESUMEN_AMIGOS = datos.resumenAmigos as { icono: IconName; peligro?: boolean; etiqueta: string; valor: string }[]
export const AMIGOS = datos.amigos as Amigo[]
export const SOLICITUDES_AMIGOS = datos.solicitudesAmigos as { nombre: string; descripcion: string }[]
export const PERSONAS_CONOCER_TODOS = datos.personasConocerTodos as { nombre: string; comunes: string }[]
export const TUS_LISTAS_TODOS = datos.tusListasTodos as { icono: IconName; color: string; nombre: string; cantidad: string }[]
