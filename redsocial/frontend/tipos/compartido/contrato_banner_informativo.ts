import type { IconName } from './contrato_icono'

export type BannerInformativoVariante = 'destacado' | 'suave' | 'nota'

export interface BannerInformativoProps {
  icono: IconName
  descripcion: string
  titulo?: string
  variante?: BannerInformativoVariante
  iconoCuadrado?: boolean
  etiquetaCerrar?: string
  className?: string
}
