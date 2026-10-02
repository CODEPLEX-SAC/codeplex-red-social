import type { Aviso } from '@/tipos/avisos/modelo_avisos'

export interface FilaAvisoProps {
  aviso: Aviso
  claseIcono: string
  seleccionable?: boolean
}
