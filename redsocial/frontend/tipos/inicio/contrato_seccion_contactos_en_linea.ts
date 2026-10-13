import type { ContactoEnLinea } from '../compartido/contrato_contactos_en_linea'
import type { GrupoRecomendado } from '../compartido/contrato_grupos_recomendados'
import type { EventoProximo } from '../compartido/contrato_eventos_proximos'

export interface SeccionContactosEnLineaProps {
  CONTACTOS_LINEA: readonly ContactoEnLinea[]
  GRUPOS_RECOMENDADOS: readonly GrupoRecomendado[]
  EVENTOS_PROXIMOS: readonly EventoProximo[]
}
