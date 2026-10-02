import type { EventoColaborador } from '@/tipos/actividad/modelo_actividad_colaboradores'
import datos from './estilos_actividad_colaboradores.json'

export const CLASES_BADGE = datos.clasesBadge as Record<EventoColaborador['color'], string>
