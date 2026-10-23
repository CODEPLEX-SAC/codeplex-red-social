import type { CapacidadSuscripcion, SuscripcionContratada } from '@/tipos/compartido/contrato_suscripciones'
import type { ConfiguracionPlanes, PlanAplicacion, SeleccionPlan } from '@/tipos/marketplace/modelo_planes'
import type { ModuloEmpresaCatalogo } from './contrato_listado_empresas'

export type RecursoLimitante = 'empresas' | 'sucursales'

export interface CapacidadFila {
  recurso: RecursoLimitante | null
  limite: number | null
  usadas: number | null
}

export interface OpcionMejora {
  plan: PlanAplicacion
  capacidad: CapacidadSuscripcion
  limite: number | null
  precio: number
  diferenciaPrecio: number
  diferenciaCapacidad: number | null
  motivoNoDisponible: 'no_aumenta' | 'no_determinada' | null
}

export interface DatosMejora {
  actual: PlanAplicacion | undefined
  precioActual: number
  opciones: OpcionMejora[]
}

export interface AvisoLimite {
  modulo: ModuloEmpresaCatalogo
  aplicativo: string
  usadas: number
  limite: number
}

export interface TarjetaPlanMejoraProps {
  plan: PlanAplicacion
  limite: number | null
  recurso: RecursoLimitante | null
  periodo: SuscripcionContratada['periodo']
  precio: number
  opcion?: OpcionMejora
  alElegir?: (plan: PlanAplicacion) => void
}

export interface ModalMejoraPlanProps {
  modulo: ModuloEmpresaCatalogo
  suscripcion: SuscripcionContratada
  capacidad: CapacidadFila
  configuracion: ConfiguracionPlanes
  alCerrar: () => void
  alContratar: (seleccion: SeleccionPlan) => void
}

export interface PasoPlanesMejoraProps {
  modulo: ModuloEmpresaCatalogo
  suscripcion: SuscripcionContratada
  capacidad: CapacidadFila
  datos: DatosMejora
  alElegir: (plan: PlanAplicacion) => void
}

export interface PasoResumenMejoraProps {
  suscripcion: SuscripcionContratada
  capacidad: CapacidadFila
  datos: DatosMejora
  opcion: OpcionMejora
  alVolver: () => void
  alCancelar: () => void
  alContinuar: () => void
}

export interface AvisosLimitePlanProps {
  avisos: AvisoLimite[]
}

export interface TablaPlanesAsignadosProps {
  contratados: { modulo: ModuloEmpresaCatalogo; suscripcion: SuscripcionContratada }[]
  activos: string[]
  totalEmpresas: number
  configuracion: (aplicacion: string) => ConfiguracionPlanes | undefined
  alAlternar: (clave: ModuloEmpresaCatalogo['clave']) => void
  alMejorar: (aplicacion: string) => void
}
