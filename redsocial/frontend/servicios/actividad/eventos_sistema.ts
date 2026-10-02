import type { EventoSistema } from '@/tipos/actividad/modelo_actividad_sistema'
import datos from './eventos_sistema.json'

export const EVENTOS_SISTEMA = datos.eventosSistema as EventoSistema[]
