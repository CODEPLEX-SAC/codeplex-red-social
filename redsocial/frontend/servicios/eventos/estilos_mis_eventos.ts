import type { EventoOrganizas } from '@/tipos/eventos/modelo_eventos_mis_eventos'
import datos from './estilos_mis_eventos.json'

export const ESTADO_ESTILO = datos.estadoEstilo as Record<EventoOrganizas['estado'], string>
export const ESTADO_ETIQUETA = datos.estadoEtiqueta as Record<EventoOrganizas['estado'], string>
