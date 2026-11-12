import type { Dispatch, SetStateAction } from 'react'
import type { ErrorBusqueda, RespuestaBusquedaLista, ResultadoBusquedaLista } from '@/tipos/compartido/contrato_busqueda'

export interface Asentada<T> {
  origen: Promise<ResultadoBusquedaLista<T>>
  resultado: ResultadoBusquedaLista<T> | null
  error: ErrorBusqueda | null
}

export type Llamada<T> =
  | { respuesta: RespuestaBusquedaLista<T>; error: null }
  | { respuesta: null; error: ErrorBusqueda }

export interface ConsultaDiferida<F> {
  texto: string
  filtros: F | undefined
}

export interface EntradaEstadoBusqueda {
  error: ErrorBusqueda | null
  escribiendo: boolean
  cargando: boolean
  consulta: string
  hayElementos: boolean
}

export interface ParametrosDiferido<F> {
  retardo: number
  texto: string
  filtros: F | undefined
  setDiferido: Dispatch<SetStateAction<ConsultaDiferida<F>>>
}

export interface ParametrosPendiente<T> {
  pendiente: Promise<ResultadoBusquedaLista<T>> | null
  setAsentada: Dispatch<SetStateAction<Asentada<T> | null>>
}
