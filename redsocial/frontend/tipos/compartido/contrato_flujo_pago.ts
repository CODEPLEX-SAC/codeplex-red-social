import type { ReactNode } from 'react'
import type catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import type { IconName } from './contrato_icono'

export type MetodoPagoId = 'tarjeta' | 'billetera'

export type ModoFacturacionPago = 'resumen' | 'edicion' | 'nuevo'

export type VentanaFlujoPago = 'tarjetas' | 'perfiles' | null

export type EstadoCargaPago = 'cargando' | 'listo' | 'error'

export type CodigoErrorPago = 'lectura' | 'escritura'

export type TextosFlujoPago = typeof catalogoCompartido.flujo_pago.textos

export type Parcial<T> = { [K in keyof T]?: T[K] extends readonly unknown[] ? T[K] : T[K] extends object ? Parcial<T[K]> : T[K] }

export interface TarjetaPago {
  id: string
  marca: string
  ultimos4: string
  vencimiento: string
  titular?: string
  predeterminada?: boolean
}

export interface DatosTarjetaPago {
  numero: string
  vencimiento: string
  cvv: string
  propietario: string
}

export interface ErroresTarjetaPago {
  numero?: string
  vencimiento?: string
  cvv?: string
  propietario?: string
}

export interface TarjetaPorGuardar {
  marca: string
  ultimos4: string
  vencimiento: string
  titular?: string
}

export interface CambiosTarjetaPago {
  vencimiento: string
  titular: string
  predeterminada: boolean
}

export interface FormularioTarjetaPago {
  tarjeta: DatosTarjetaPago
  errores: ErroresTarjetaPago
  cambiarNumero(valor: string): void
  cambiarVencimiento(valor: string): void
  cambiarCvv(valor: string): void
  cambiarPropietario(valor: string): void
  validar(): boolean
  limpiar(): void
}

export interface EstadoInicialTarjetasPago {
  tarjetas: TarjetaPago[]
  estado: EstadoCargaPago
}

export interface RepositorioTarjetasPago {
  leerEstadoInicial(): EstadoInicialTarjetasPago
  listar(): Promise<TarjetaPago[]>
  registrar(datos: TarjetaPorGuardar, predeterminada: boolean): Promise<TarjetaPago[]>
  actualizar(id: string, cambios: CambiosTarjetaPago): Promise<TarjetaPago[]>
  eliminar(id: string): Promise<TarjetaPago[]>
  codigoDeFallo(fallo: unknown): CodigoErrorPago
}

export interface ControlTarjetasPago {
  tarjetas: TarjetaPago[]
  estado: EstadoCargaPago
  ocupado: boolean
  error: CodigoErrorPago | null
  recargar(): void
  registrar(datos: TarjetaPorGuardar, predeterminada: boolean): Promise<TarjetaPago | null>
  actualizar(id: string, cambios: CambiosTarjetaPago): Promise<TarjetaPago | null>
  eliminar(id: string): Promise<boolean>
  limpiarError(): void
}

export interface ErroresPerfilPago {
  documento?: string
  razon?: string
  correo?: string
}

export interface PaisPago {
  id: string
  nombre: string
  prefijo: string
}

export interface BilleteraPago {
  id: string
  nombre: string
}

export interface DatosPerfilPago {
  documento: string
  razon: string
  pais: string
  direccion: string
  correo: string
  celular: string
  whatsapp: boolean
  sms: boolean
}

export interface PerfilPago extends DatosPerfilPago {
  id: string
}

export interface EstadoInicialPerfilesPago {
  perfiles: PerfilPago[]
  estado: EstadoCargaPago
}

export interface RepositorioPerfilesPago {
  leerEstadoInicial(): EstadoInicialPerfilesPago
  listar(): Promise<PerfilPago[]>
  registrar(datos: DatosPerfilPago): Promise<PerfilPago[]>
  actualizar(id: string, datos: DatosPerfilPago): Promise<PerfilPago[]>
  codigoDeFallo(fallo: unknown): CodigoErrorPago
}

export interface ControlPerfilesPago {
  perfiles: PerfilPago[]
  estado: EstadoCargaPago
  ocupado: boolean
  error: CodigoErrorPago | null
  recargar(): void
  registrar(datos: DatosPerfilPago): Promise<PerfilPago | null>
  actualizar(id: string, datos: DatosPerfilPago): Promise<PerfilPago | null>
  limpiarError(): void
}

export interface LineaPedidoPago {
  id: string
  nombre: string
  detalle: string
  precio: string
  icono: IconName
  claseIcono: string
}

export interface FilaResumenPago {
  etiqueta: string
  valor: string
}

export interface FilaCalendarioPago {
  titulo: string
  detalle: string
  valor: string
}

export interface PedidoPago {
  lineas: LineaPedidoPago[]
  adicionales: FilaResumenPago[]
  filas: FilaResumenPago[]
  totalEtiqueta: string
  totalDetalle?: string
  total: string
  accion: string
  aviso: string
}

export interface AutorizacionPago {
  id: string
  texto: string
  obligatoria: boolean
  version?: string
}

export interface ConfiguracionAutorizacionesPago {
  titulo: string
  detalle: string
  elementos: AutorizacionPago[]
}

export interface AceptacionAutorizacionPago {
  id: string
  aceptada: boolean
  version?: string
}

export type FaseOperacionPago = 'inicial' | 'validando' | 'procesando' | 'exito' | 'error'

export type VarianteAvisoPago = 'exito' | 'advertencia' | 'error' | 'info'

export interface AvisoPago {
  variante: VarianteAvisoPago
  mensaje: string
}

export interface ResultadoOperacionPago {
  exito: boolean
  mensaje?: string
}

export interface DemostracionPago {
  tarjetas?: string
  perfiles?: string
}

export interface ConfiguracionFlujoPago {
  metodos: MetodoPagoId[]
  metodoInicial?: MetodoPagoId
  billeteras: BilleteraPago[]
  paises: PaisPago[]
  perfilInicialId?: string | null
  avisoRenovacion?: string | null
  calendario?: { titulo: string; detalle: string; filas: FilaCalendarioPago[] } | null
  autorizaciones: ConfiguracionAutorizacionesPago
  demostracion?: DemostracionPago
  textos?: Parcial<TextosFlujoPago>
}

export interface ResultadoFlujoPago {
  metodo: MetodoPagoId
  marca: string
  ultimos4: string
  billetera: string | null
  perfil: PerfilPago | null
  autorizaciones: AceptacionAutorizacionPago[]
  simulado: boolean
}

export interface OpcionMetodoPagoProps {
  titulo: string
  detalle?: string
  icono: IconName
  activa: boolean
  deshabilitada?: boolean
  adicional?: ReactNode
  alElegir: () => void
}

export interface FlujoPagoProps {
  configuracion: ConfiguracionFlujoPago
  pedido: PedidoPago
  tarjetas: ControlTarjetasPago
  perfiles: ControlPerfilesPago
  adicional?: ReactNode
  alActivar: (resultado: ResultadoFlujoPago) => void | ResultadoOperacionPago | Promise<void | ResultadoOperacionPago>
}
