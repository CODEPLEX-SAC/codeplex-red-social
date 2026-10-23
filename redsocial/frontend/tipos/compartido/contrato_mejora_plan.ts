import type { ConfiguracionPlanes, SeleccionPlan } from '@/tipos/marketplace/modelo_planes'

export interface AccesoMejoraPlan {
  configuracion: (aplicacion: string) => ConfiguracionPlanes | undefined
  contratar: (seleccion: SeleccionPlan) => void
}
