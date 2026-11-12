import type { InventarioDispositivos, ResultadoCaptura, ResultadoFlujo, ResultadoInvitacion, ResultadoOperacion } from './contrato_integracion_llamada'

export type PromesaInventario = Promise<InventarioDispositivos>
export type PromesaFlujo = Promise<ResultadoFlujo>
export type PromesaOperacion = Promise<ResultadoOperacion>
export type PromesaCaptura = Promise<ResultadoCaptura>
export type PromesaInvitacion = Promise<ResultadoInvitacion>
export type PromesaVacia = Promise<void>
