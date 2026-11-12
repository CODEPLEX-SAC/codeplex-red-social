export interface ResultadoBusquedaLista<T> {
  elementos: readonly T[]
  total: number
}

export type RespuestaBusquedaLista<T> =
  | ResultadoBusquedaLista<T>
  | Promise<ResultadoBusquedaLista<T>>

export interface FuenteBusqueda<T, F = undefined> {
  (consulta: string, limite?: number, filtros?: F): RespuestaBusquedaLista<T>
}

export interface ConfiguracionBusqueda<T, F = undefined> {
  fuente: FuenteBusqueda<T, F>
  modo: ModoBusqueda
}

export type CodigoErrorBusqueda = 'consulta_invalida' | 'no_disponible' | 'sin_permiso'

export interface ErrorBusqueda {
  codigo: CodigoErrorBusqueda
  mensaje?: string
}

export type EstadoBusqueda = 'inicial' | 'escribiendo' | 'cargando' | 'con_resultados' | 'sin_coincidencias' | 'error'

export type ModoBusqueda = 'local' | 'remota'

export interface OpcionesBusqueda<F = undefined> {
  limite?: number
  modo?: ModoBusqueda
  filtros?: F
}

export interface BusquedaEnCurso<T> {
  texto: string
  estado: EstadoBusqueda
  resultado: ResultadoBusquedaLista<T>
  error: ErrorBusqueda | null
  cambiarTexto: (texto: string) => void
  limpiar: () => void
}
