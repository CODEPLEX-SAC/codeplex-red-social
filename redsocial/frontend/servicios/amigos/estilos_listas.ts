import type { MiLista } from '@/tipos/amigos/modelo_amigos_listas'
import datos from './estilos_listas.json'

export const CLASES_ICONO_LISTA = datos.clasesIconoLista as Record<MiLista['color'], string>
