import { NOMBRES_ICONOS, MAPA_ICONOS } from '../../datos/compartido/iconos'
import type { IconProps } from '@/tipos/compartido/icono_props'
import type { NombreIcono } from '@/tipos/compartido/icono'

const ARCHIVOS_SVG = import.meta.glob('../../../recursos/iconos/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function contenidoDelArchivo(nombre: NombreIcono): string {
  const entrada = Object.entries(ARCHIVOS_SVG).find(([ruta]) => ruta.endsWith(`/${nombre}.svg`))
  const marcado = entrada?.[1] ?? ''
  const interior = marcado.match(/<svg[^>]*>([\s\S]*)<\/svg>/)
  return interior ? interior[1].trim() : ''
}

const ICONOS: Record<NombreIcono, string> = Object.fromEntries(
  NOMBRES_ICONOS.map((nombre) => [nombre, contenidoDelArchivo(nombre)]),
) as Record<NombreIcono, string>

export function Icono({ name, className }: IconProps) {
  const clave = (MAPA_ICONOS as Record<string, string>)[name] ?? name
  const contenido = (ICONOS as Record<string, string>)[clave]

  return (
    <svg
      className={className ? `icono ${className}` : 'icono'}
      viewBox="0 0 24 24"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: contenido ?? '' }}
    />
  )
}
