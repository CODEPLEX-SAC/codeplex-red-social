import { createElement } from 'react'
import type { ReactNode } from 'react'
import { NOMBRES_ICONOS } from '../../datos/compartido/iconos'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import type { IconProps } from '@/tipos/compartido/icono_props'
import type { NombreIcono } from '@/tipos/compartido/icono'

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

function convertirNodo(nodo: Element, indice: number): ReactNode {
  if (!ETIQUETAS_PERMITIDAS.has(nodo.tagName)) return null
  const propiedades = Object.fromEntries(
    Array.from(nodo.attributes).map((atributo) => [nombreDePropiedad(atributo.name), atributo.value]),
  )
  return createElement(nodo.tagName, { ...propiedades, key: indice }, ...Array.from(nodo.children).map(convertirNodo))
}

function elementosDelArchivo(nombre: NombreIcono): ReactNode[] {
  const entrada = Object.entries(ARCHIVOS_SVG).find(([ruta]) => ruta.endsWith(`/${nombre}.svg`))
  const documento = LECTOR_SVG.parseFromString(entrada?.[1] ?? '<svg/>', 'image/svg+xml')
  return Array.from(documento.documentElement.children).map(convertirNodo)
}

const ICONOS = Object.fromEntries(
  NOMBRES_ICONOS.map((nombre) => [nombre, elementosDelArchivo(nombre)]),
)

export function Icono({ name, className }: IconProps) {
  const clave = (catalogoCompartido.iconos as Record<string, string>)[name] ?? name
  const elementos = ICONOS[clave]

  return (
    <svg className={className ? `icono ${className}` : 'icono'} viewBox="0 0 24 24" aria-hidden="true">
      {elementos}
    </svg>
  )
}
