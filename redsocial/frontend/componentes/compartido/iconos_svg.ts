import { createElement } from 'react'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import type { NombreIcono } from '@/tipos/compartido/contrato_icono'

const NOMBRES_ICONOS = catalogoCompartido.nombres_iconos as readonly string[]

const ARCHIVOS_SVG = import.meta.glob('../../../recursos/iconos/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const ETIQUETAS_PERMITIDAS = new Set(['path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'ellipse', 'g'])

const LECTOR_SVG = new DOMParser()

function nombreDePropiedad(atributo: string): string {
  return atributo.replace(/-([a-z])/g, (_coincidencia, letra: string) => letra.toUpperCase())
}

function convertirNodo(nodo: Element, indice: number): ReturnType<typeof createElement> | null {
  if (!ETIQUETAS_PERMITIDAS.has(nodo.tagName)) return null
  const propiedades = Object.fromEntries(
    Array.from(nodo.attributes).map((atributo) => [nombreDePropiedad(atributo.name), atributo.value]),
  )
  return createElement(nodo.tagName, { ...propiedades, key: indice }, ...Array.from(nodo.children).map(convertirNodo))
}

function elementosDelArchivo(nombre: NombreIcono): (ReturnType<typeof createElement> | null)[] {
  const entrada = Object.entries(ARCHIVOS_SVG).find(([ruta]) => ruta.endsWith(`/${nombre}.svg`))
  const documento = LECTOR_SVG.parseFromString(entrada?.[1] ?? '<svg/>', 'image/svg+xml')
  return Array.from(documento.documentElement.children).map(convertirNodo)
}

export const ICONOS_SVG = Object.fromEntries(
  NOMBRES_ICONOS.map((nombre) => [nombre, elementosDelArchivo(nombre)]),
)
