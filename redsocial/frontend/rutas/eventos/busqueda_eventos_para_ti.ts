import { coincideNombre, contieneTexto, crearFuenteLocal } from '../../componentes/compartido/interfaz/fuente_busqueda_local'
import { DESTACADOS } from '../../servicios/eventos/para_ti'
import type { ConfiguracionBusqueda } from '@/tipos/compartido/contrato_busqueda'
import type { FiltrosBusquedaEventos } from '@/tipos/eventos/contrato_buscar_eventos'
import type { EventoDestacado } from '@/tipos/eventos/modelo_eventos_para_ti'

function admiteUbicacion(evento: EventoDestacado, { ubicacion }: FiltrosBusquedaEventos): boolean {
  return contieneTexto(evento.ubicacion, ubicacion)
}

export const BUSQUEDA_EVENTOS_PARA_TI: ConfiguracionBusqueda<EventoDestacado, FiltrosBusquedaEventos> = { fuente: crearFuenteLocal(DESTACADOS, coincideNombre, admiteUbicacion), modo: 'local' }
