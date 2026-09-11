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

export function Icono({ name, className, style }: IconProps) {
  const clave = (MAPA_ICONOS as Record<string, string>)[name] ?? name
  const contenido = (ICONOS as Record<string, string>)[clave]

  if (import.meta.env.DEV && contenido === undefined) {
    console.warn(
      `Icon: "${name}" no resuelve a ninguna clave de ICONOS (clave real: "${clave}"). Se renderiza un <svg> vacío, igual que crearIcono() en el sistema original.`,
    )
  }

  return (
    <svg
      className={className ? `icono ${className}` : 'icono'}
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={style}
      dangerouslySetInnerHTML={{ __html: contenido ?? '' }}
    />
  )
}
