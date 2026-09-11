import { ICONOS, MAPA_ICONOS } from '../../datos/compartido/iconos'
import type { IconProps } from '@/tipos/compartido/icono_props'

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
