import type { IconName } from '../../tipos/compartido/contrato_icono'
import type { EventoDestacado, EventoProximo } from '@/tipos/eventos/modelo_eventos_para_ti'
import type { CiudadFiltroEvento, MarcadorMapaEvento } from '@/tipos/eventos/contrato_filtro_ubicacion'
import datos from './para_ti.json'

export const DESTACADOS = datos.destacados as EventoDestacado[]
export const PROXIMOS = datos.proximos as EventoProximo[]
export const PROXIMOS_LATERAL_PARA_TI = datos.proximosLateralParaTi
export const CATEGORIAS_LATERAL_PARA_TI = datos.categoriasLateralParaTi as { icono: IconName; color: string; nombre: string; conteo: string }[]
export const CATEGORIAS_FILTRO_PARA_TI = datos.categoriasFiltroParaTi as { icono: IconName; color: string; nombre: string; conteo: string }[]
export const CIUDADES_FILTRO_PARA_TI = datos.ciudadesFiltroParaTi as CiudadFiltroEvento[]
export const MARCADORES_MAPA_PARA_TI = datos.marcadoresMapaParaTi as MarcadorMapaEvento[]
export const CIUDADES_CON_EVENTOS = datos.ciudadesConEventos as string[]
