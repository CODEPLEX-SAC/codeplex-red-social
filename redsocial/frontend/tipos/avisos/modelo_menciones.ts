import type { IconName } from '@/tipos/compartido/contrato_icono'

export type TipoMencion = 'publicacion' | 'comentario' | 'grupo' | 'evento'
export type ColorSuperficieMencion = 'morado' | 'azul' | 'naranja' | 'violeta' | 'gris'

export interface FechaVistaPreviaMencion {
  dia: string
  mes: string
}

export interface VistaPreviaMencion {
  icono: IconName
  colorSuperficie: ColorSuperficieMencion
  titulo: string
  subtitulo?: string
  fecha?: FechaVistaPreviaMencion
}

export interface Mencion {
  id: string
  tipo: TipoMencion
  nombre: string
  tiempo: string
  texto: string
  vistaPrevia: VistaPreviaMencion
}
