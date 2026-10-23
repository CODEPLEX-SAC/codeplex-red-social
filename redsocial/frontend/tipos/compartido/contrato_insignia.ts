import type { ReactNode } from 'react'
import type catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'

export type ColorInsigniaSuperpuesta = keyof typeof catalogoCompartido.insignia_superpuesta.colores
export type TamanoContador = keyof typeof catalogoCompartido.insignia_estado.contador.tamanos
export type TonoContador = keyof typeof catalogoCompartido.insignia_estado.contador.tonos

export type InsigniaProps =
  | { variant: 'counter'; tamano?: TamanoContador; tono?: TonoContador; children: ReactNode }
  | { variant: 'status'; className: string; punto?: string; children: string }
  | { variant: 'privacy'; tone: 'publico' | 'privado'; children: string }
  | { variant: 'privado'; children: string }
  | { variant: 'superpuesta'; contenido: ReactNode; color?: ColorInsigniaSuperpuesta; maximo?: number; className?: string; children: ReactNode }
