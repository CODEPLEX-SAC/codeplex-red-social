import type { Colaborador, Aplicacion } from '@/tipos/colaboradores/modelo_colaboradores'
import datos from './colaboradores.json'

export const COLABORADORES = datos.colaboradores as Colaborador[]
export const FILTROS_ESTADO_COLABORADORES = datos.filtrosEstadoColaboradores
export const PASOS_FUNCIONA_COLABORADORES = datos.pasosFuncionaColaboradores
export const DETALLE_COLABORADOR_EJEMPLO = datos.detalleColaboradorEjemplo
export const HISTORIAL_ACTIVIDAD_COLABORADOR_EJEMPLO = datos.historialActividadColaboradorEjemplo
export const APLICACIONES_DISPONIBLES = datos.aplicacionesDisponibles as Aplicacion[]
export const FECHA_BAJA_EJEMPLO = datos.fechaBajaEjemplo
