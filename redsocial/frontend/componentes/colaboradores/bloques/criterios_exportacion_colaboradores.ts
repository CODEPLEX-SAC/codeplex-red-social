import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { AmbitoExportacion, CondicionCriterio, CriteriosExportacion, FiltrosAvanzadosColaboradores } from '@/tipos/colaboradores/contrato_gestion_colaboradores'
import { ESTADO_POR_ETIQUETA_PESTANA, interpolarPlantilla } from './colaboradores_tabla_config'

const plantillas = catalogoColaboradores.exportacion.criterios
const panel = catalogoColaboradores.panel_filtros_avanzados
const OPCION_TODOS = catalogoColaboradores.selectores.rol_perfil.opciones[0]
const OPCION_TODAS = catalogoColaboradores.selectores.aplicaciones.opciones[0]
const ULTIMO_ACCESO_TODOS = panel.ultimo_acceso.opciones[0]
const APLICACION_ASIGNADA_TODAS = panel.aplicaciones_asignadas.opciones[0]

function valor(plantilla: string, texto: string): string {
  return interpolarPlantilla(plantilla, { valor: texto })
}

function fecha(instante: Dayjs | null): string {
  return dayjs(instante).format(panel.formato_fecha)
}

function activas(condiciones: CondicionCriterio[]): string[] {
  return condiciones.filter(([activa]) => activa).map(([, texto]) => texto)
}

export function crearCriteriosExportacion(
  pestana: string,
  busqueda: string,
  rol: string,
  aplicacion: string,
  ordenarPor: string,
  avanzados: FiltrosAvanzadosColaboradores,
): CriteriosExportacion {
  return { pestana, busqueda, rol, aplicacion, ordenarPor, avanzados }
}

export function describirFiltrosAvanzados(filtros: FiltrosAvanzadosColaboradores): string[] {
  return activas([
    [Boolean(filtros.fechaInicio), valor(plantillas.vigencia_desde, fecha(filtros.fechaInicio))],
    [Boolean(filtros.fechaFin), valor(plantillas.vigencia_hasta, fecha(filtros.fechaFin))],
    [Boolean(filtros.invitacionDesde), valor(plantillas.invitacion_desde, fecha(filtros.invitacionDesde))],
    [Boolean(filtros.invitacionHasta), valor(plantillas.invitacion_hasta, fecha(filtros.invitacionHasta))],
    [filtros.ultimoAcceso !== ULTIMO_ACCESO_TODOS, valor(plantillas.ultimo_acceso, filtros.ultimoAcceso)],
    [filtros.accesoVigente, plantillas.acceso_vigente],
    [filtros.accesoVencido, plantillas.acceso_vencido],
    [filtros.aplicaciones !== APLICACION_ASIGNADA_TODAS, valor(plantillas.aplicacion_asignada, filtros.aplicaciones)],
    [filtros.cuentaCreada, plantillas.cuenta_creada],
    [filtros.cuentaInvitada, plantillas.cuenta_invitada],
  ])
}

export function describirCriteriosFiltrados(criterios: CriteriosExportacion): string[] {
  return activas([
    [Boolean(ESTADO_POR_ETIQUETA_PESTANA[criterios.pestana]), valor(plantillas.pestana, criterios.pestana)],
    [Boolean(criterios.busqueda.trim()), valor(plantillas.busqueda, criterios.busqueda.trim())],
    [criterios.rol !== OPCION_TODOS, valor(plantillas.rol, criterios.rol)],
    [criterios.aplicacion !== OPCION_TODAS, valor(plantillas.aplicacion, criterios.aplicacion)],
  ]).concat(describirFiltrosAvanzados(criterios.avanzados))
}

export function describirCriterios(criterios: CriteriosExportacion, ambito: AmbitoExportacion): string[] {
  const orden = valor(plantillas.orden, criterios.ordenarPor)
  const alcance = ambito === 'vista' ? [valor(plantillas.vista, criterios.pestana)] : [plantillas.filtrados, ...describirCriteriosFiltrados(criterios)]
  return [...alcance, orden]
}
