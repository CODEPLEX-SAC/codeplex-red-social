import type { Aviso, PestanaAviso } from '@/tipos/avisos/modelo_avisos'
import type { DetalleAviso } from '@/tipos/avisos/contrato_detalle_aviso'
import type { Mencion } from '@/tipos/avisos/modelo_menciones'
import type { EventoAviso } from '@/tipos/avisos/modelo_eventos_aviso'
import type { SolicitudAmistad, SolicitudGrupo, SolicitudEvento } from '@/tipos/avisos/modelo_solicitudes'
import datos from './avisos.json'

export const AVISOS = datos.avisos as Aviso[]
export const AVISOS_NO_LEIDAS = datos.avisosNoLeidas as Aviso[]
export const CONTEOS_AVISOS = datos.conteos as Partial<Record<PestanaAviso, number>>
export const DETALLE_AVISO = datos.detalle as DetalleAviso
export const MENCIONES = datos.menciones as Mencion[]
export const EVENTOS_AVISO = datos.eventosAviso as EventoAviso[]
export const SOLICITUDES_AMISTAD = datos.solicitudesAmistad as SolicitudAmistad[]
export const SOLICITUDES_GRUPO = datos.solicitudesGrupo as SolicitudGrupo[]
export const SOLICITUDES_EVENTO = datos.solicitudesEvento as SolicitudEvento[]
export const SOLICITUDES_COLABORACION = datos.solicitudesColaboracion as unknown[]
