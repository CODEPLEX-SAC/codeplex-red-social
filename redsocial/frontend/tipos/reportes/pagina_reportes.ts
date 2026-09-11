import type { IconName } from '@/tipos/compartido/icono'

export type MiniGrafico =
  | { tipo: 'barras'; barras: { v: string; c: string }[] }
  | { tipo: 'linea'; puntos: string; color: string }
  | { tipo: 'lista' }
  | { tipo: 'dona-lista'; conic: string }

export interface Plantilla {
  nombre: string
  icono: IconName
  color: 'morado' | 'verde' | 'naranja' | 'azul' | 'rojo'
  descripcion: string
  modulo: string
  grafico: MiniGrafico
}

export interface ReporteReciente {
  nombre: string
  modulo: string
  periodo: string
  autor: string
  fecha: string
  formato: 'pdf' | 'excel'
}
