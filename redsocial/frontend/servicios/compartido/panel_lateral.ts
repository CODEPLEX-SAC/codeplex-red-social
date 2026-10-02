import type { ContactoPersona } from '../../tipos/compartido/contrato_contactos'
import type { GrupoRecomendado } from '../../tipos/compartido/contrato_grupos_recomendados'
import type { EventoProximo } from '../../tipos/compartido/contrato_eventos_proximos'
import datos from './panel_lateral.json'

export const CONTACTOS_SUGERIDOS = datos.contactosSugeridos as readonly ContactoPersona[]
export const GRUPOS_RECOMENDADOS = datos.gruposRecomendados as readonly GrupoRecomendado[]
export const EVENTOS_PROXIMOS = datos.eventosProximos as readonly EventoProximo[]
