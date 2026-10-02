import type { EventoCalGrid } from '@/tipos/eventos/modelo_eventos_calendario'
import datos from './estilos_calendario.json'

export const COLOR_EVENTO_CAL = datos.colorEventoCal as Record<EventoCalGrid['color'], string>
export const COLOR_EVENTO_DIA = datos.colorEventoDia as Record<EventoCalGrid['color'], string>
