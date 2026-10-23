import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { ConfiguracionPlanes, SeleccionPlan } from './modelo_planes'

export interface ItemCarrito {
  aplicacion: string
  nombre: string
  descripcion: string
  icono: IconName
  tema: ConfiguracionPlanes['color']
  tipo: string
  plan: string
  planNombre: string
  periodo: SeleccionPlan['periodo']
  precio: string
  caracteristicas: string[]
  incluye: string[]
  lema: string
  ruta?: string
}

export interface CompraRealizada {
  aplicacion: string
  nombre: string
  icono: IconName
  tema: ConfiguracionPlanes['color']
  tipo: string
  plan: string
  planNombre: string
  lema: string
  ruta?: string
  periodo: SeleccionPlan['periodo']
  precio: string
  incluye: string[]
  fecha: string
  vence: string
  dias: number
}

export interface ServicioAdicional {
  aplicacion: string
  nombre: string
  fecha: string
}

export interface AccionesCompra {
  detalles: () => void
  mejorar: () => void
  contratarVip: () => void
  desinstalar: () => void
}

export interface TarjetaGuardada {
  id: string
  marca: string
  ultimos4: string
  vencimiento: string
  titular?: string
  predeterminada?: boolean
}

export interface PerfilFacturacion {
  id: string
  documento: string
  razon: string
  pais: string
  direccion: string
  correo: string
  celular: string
}

export interface HistorialPago {
  perfiles: PerfilFacturacion[]
}

export interface OpcionSeleccionPago {
  id: string
  titulo: string
  detalle: string
}

export interface CompraVista {
  nombre: string
  icono: IconName
  color: string
  fecha: string
}

export interface DesinstalacionCompra {
  pendiente: string | null
  pedir: (aplicacion: string) => void
  cancelar: () => void
  confirmar: () => void
}

export interface AccesosCabecera {
  busqueda: string
  alBuscar: (texto: string) => void
  abrirCompras: () => void
}

export interface AccionesCarrito {
  cerrar: () => void
  quitar: (aplicacion: string) => void
  cambiarPlan: (aplicacion: string) => void
  proceder: () => void
  seguirComprando: () => void
}

export interface ManejadoresCompra {
  detalles: (aplicacion: string) => void
  mejorar: (aplicacion: string) => void
  contratarVip: (aplicacion: string) => void
  desinstalar: (aplicacion: string) => void
}
