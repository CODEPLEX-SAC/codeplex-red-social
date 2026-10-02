import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'
import datos from './estilos_colaboradores.json'

export const ROL_CLASES = datos.rolClases as Record<string, string>
export const ESTADO_CLASES = datos.estadoClases as Record<Colaborador['estado'], { texto: string; punto: string; etiqueta: string; insignia: string }>
