import type { IconName } from '@/tipos/compartido/contrato_icono'

export type EstadoCaracteristica = 'incluido' | 'excluido' | 'neutro'

export interface CaracteristicaPlan {
  texto: string
  estado: EstadoCaracteristica
  enfasis?: boolean
}

export interface PlanAplicacion {
  id: string
  nombre: string
  precio: { mensual: string; anual: string }
  etiquetas: string[]
  destacado: boolean
  cinta?: string
  textoElegir?: string
  paquetes?: boolean
  caracteristicas: CaracteristicaPlan[]
}

export interface TipoPlanes {
  id: string
  nombre: string
  detalle: string
  disposicion: 'fila' | 'rejilla'
  catalogo: { url: string; nombre: string }
  planes: PlanAplicacion[]
}

export interface AsistentePlanes {
  titulo: string
  saludo: string
  rapidas: string[]
  respuestas: Record<string, string>
}

export interface DetalleCaracteristica {
  titulo: string
  descripcion: string
}

export interface EstiloSelectorPlanes {
  texto: string
  relleno: string
  tinte: string
  pildora: string
  seleccion: string
}

export interface EstiloPlanDestacado {
  fondo: string
  auxiliar: string
  pildora: string
  icono: string
}

export interface PaquetesPlanes {
  pregunta: string
  ver: string
  titulo: string
  descripcion: string
  filas: { rango: string; tarifa: string; total: string }[]
  base_datos?: { titulo: string; items: string[]; pago_unico: { etiqueta: string; valor: string } }
}

export interface ConfiguracionPlanes {
  id: string
  nombre: string
  lema: string
  ruta?: string
  descripcion: string
  icono: IconName
  color: 'verde' | 'azul' | 'morado' | 'naranja' | 'rojo'
  modal: 'amplio' | 'compacto'
  etiquetas: string[]
  tipos: TipoPlanes[]
  detalles: Record<string, DetalleCaracteristica>
  paquetes?: PaquetesPlanes
  asistente: AsistentePlanes
}

export interface SeleccionPlan {
  aplicacion: string
  tipo: string
  plan: string
  periodo: 'mensual' | 'anual'
}

export type MensajeAsistente = { propio: boolean; texto: string; hora: string }

export interface PropiedadesListaPlanes {
  planes: PlanAplicacion[]
  periodo: SeleccionPlan['periodo']
  planId: string | undefined
  estilo: EstiloSelectorPlanes
  estiloDestacado: EstiloPlanDestacado
  detalles: Record<string, DetalleCaracteristica>
  etiqueta: string
  paquetes?: PaquetesPlanes
  alVerPaquetes?: () => void
  alSeleccionar: (id: string) => void
  alAbrirDetalle: (texto: string) => void
}
