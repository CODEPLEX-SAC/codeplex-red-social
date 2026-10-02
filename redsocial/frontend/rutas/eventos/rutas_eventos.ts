import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'

export const rutasEventos = catalogoEventos.rutas

export { CELDAS, PROXIMOS_LATERAL as PROXIMOS_LATERAL_CALENDARIO, MES_CALENDARIO_ACTUAL, MES_ABREVIADO_ACTUAL, EVENTOS_POR_DIA, LEYENDA_CALENDARIO, SEMANAS_MINI } from '../../servicios/eventos/calendario'
export * from '../../servicios/eventos/calendario_dia'
export * from '../../servicios/eventos/calendario_semana'
export * from '../../servicios/eventos/estilos_calendario'
export * from '../../servicios/eventos/estilos_mis_eventos'
export { INVITACIONES, PENDIENTES, ACEPTADAS, RECHAZADAS, CONTEO_PESTANAS_INVITACIONES, PROXIMOS_LATERAL as PROXIMOS_LATERAL_INVITACIONES, MES_CALENDARIO_INVITACIONES, SEMANAS_CALENDARIO_INVITACIONES, RESUMEN_INVITACIONES } from '../../servicios/eventos/invitaciones'
export { EVENTOS_ORGANIZAS, EVENTO_COLABORAS, PROXIMOS_LATERAL as PROXIMOS_LATERAL_MIS_EVENTOS, MES_CALENDARIO_MIS_EVENTOS, RESUMEN_MIS_EVENTOS, SEMANAS_CALENDARIO_MIS_EVENTOS } from '../../servicios/eventos/mis_eventos'
export * from '../../servicios/eventos/para_ti'
export { EVENTOS as EVENTOS_POPULARES, PROXIMAS_FECHAS_POPULARES, CATEGORIAS_LATERAL_POPULARES, MES_CALENDARIO_POPULARES, SEMANAS_CALENDARIO_POPULARES } from '../../servicios/eventos/populares'
export { EVENTOS as EVENTOS_PROXIMOS, PROXIMAS_FECHAS_EVENTOS_PROXIMOS, CATEGORIAS_LATERAL_EVENTOS_PROXIMOS, MES_CALENDARIO_PROXIMOS, SEMANAS_CALENDARIO_PROXIMOS } from '../../servicios/eventos/proximos'
export * from '../../servicios/eventos/resultados_filtro_fecha'
