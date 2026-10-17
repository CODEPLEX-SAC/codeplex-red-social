import type { IconName } from './contrato_icono'

export interface OpcionBuscable {
  id: string
  titulo: string
  subtitulo: string
  terminos: string
}

export interface ResultadoBusqueda {
  opciones: OpcionBuscable[]
  total: number
}

export type RespuestaBusqueda = ResultadoBusqueda | Promise<ResultadoBusqueda>

export type FuenteOpcionesBuscables = (texto: string, limite: number) => RespuestaBusqueda

export interface TextosSelectorBuscable {
  buscar: string
  limpiar: string
  sin_resultados: string
  resumen: string
  lista: string
  panel: string
}

export interface SelectorBuscableProps {
  seleccionada: OpcionBuscable
  fuente: FuenteOpcionesBuscables
  limite: number
  textos: TextosSelectorBuscable
  icono: IconName
  alSeleccionar: (id: string) => void
  className?: string
}

export interface PanelSelectorBuscableProps {
  seleccionadaId: string
  resultado: ResultadoBusqueda
  texto: string
  textos: TextosSelectorBuscable
  alCambiarTexto: (texto: string) => void
  alLimpiar: () => void
  alElegir: (id: string) => void
}

export interface ListaOpcionesBuscablesProps {
  opciones: OpcionBuscable[]
  seleccionadaId: string
  etiqueta: string
  alElegir: (id: string) => void
}
