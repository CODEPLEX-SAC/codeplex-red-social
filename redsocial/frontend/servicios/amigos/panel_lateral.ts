import type { IconName } from '../../tipos/compartido/contrato_icono'
import datos from './panel_lateral.json'

export const PERSONAS_CONOCER = datos.personasConocer as { nombre: string; comunes: string }[]
export const TUS_LISTAS_LATERAL = datos.tusListasLateral as { icono: IconName; color: string; nombre: string; miembros: string }[]
export const ACTIVIDAD_RECIENTE_AMIGOS = datos.actividadRecienteAmigos as { nombre: string; accion: string; tiempo: string }[]
