import type { IconName } from '@/tipos/compartido/contrato_icono'

export interface BannerInfoAvisoProps {
  icono: IconName
  titulo: string
  descripcion: string
  cuadrado?: boolean
}
