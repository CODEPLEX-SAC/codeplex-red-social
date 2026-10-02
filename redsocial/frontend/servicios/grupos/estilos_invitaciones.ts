import type { ColorGrupo } from '@/tipos/grupos/modelo_grupos_invitaciones'
import datos from './estilos_invitaciones.json'

export const CLASES_ICONO_INV = datos.clasesIconoInv as Record<ColorGrupo, string>
export const CLASES_RESUMEN = datos.clasesResumen as Record<'morado' | 'verde' | 'rojo' | 'gris', string>
