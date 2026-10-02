import type { PestanaAviso } from '@/tipos/avisos/modelo_avisos'

export interface PestanasAvisosProps {
  activa: PestanaAviso
  conteos: Partial<Record<PestanaAviso, number>>
}
