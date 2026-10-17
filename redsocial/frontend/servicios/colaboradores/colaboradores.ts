import type { Colaborador, Aplicacion } from '@/tipos/colaboradores/modelo_colaboradores'
import datos from './colaboradores.json'
import { MODULOS } from './permisos'

export const COLABORADORES = datos.colaboradores as Colaborador[]
export const FILTROS_ESTADO_COLABORADORES = datos.filtrosEstadoColaboradores
export const PASOS_FUNCIONA_COLABORADORES = datos.pasosFuncionaColaboradores
export const DETALLE_COLABORADOR_EJEMPLO = datos.detalleColaboradorEjemplo
export const HISTORIAL_ACTIVIDAD_COLABORADOR_EJEMPLO = datos.historialActividadColaboradorEjemplo
const CLASES_APLICACION = datos.clasesAplicacion as Record<string, string>
export const APLICACIONES_DISPONIBLES: Aplicacion[] = MODULOS.map((modulo) => ({ icono: modulo.icono, clase: CLASES_APLICACION[modulo.nombre], nombre: modulo.nombre }))
export const FECHA_BAJA_EJEMPLO = datos.fechaBajaEjemplo
