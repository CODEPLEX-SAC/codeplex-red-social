import { CodeplexIcono } from '@codeplex-sac/iconos'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import type { IconProps } from '@/tipos/compartido/contrato_icono_props'
import imagenUsuarioPredeterminada from '../../../recursos/imagenes/usuario.jpg'
import imagenEventoPredeterminada from '../../../recursos/imagenes/concierto.jpg'
import { CONFIGURACION_LIBRERIA, ICONOS_LIBRERIA, asegurarFuenteLibreria, clasesSinTamano, tamanoDeClases } from './fuente_iconos'
import { ICONOS_SVG } from './iconos_svg'

export { imagenUsuarioPredeterminada, imagenEventoPredeterminada }

asegurarFuenteLibreria()

export function Icono({ name, className }: IconProps) {
  const clave = (catalogoCompartido.iconos as Record<string, string>)[name] ?? name
  const nombreLibreria = ICONOS_LIBRERIA[clave]
  const clases = className ?? ''

  if (nombreLibreria) {
    return <CodeplexIcono nombre={nombreLibreria} className={clasesSinTamano(clases)} sx={{ ...CONFIGURACION_LIBRERIA.estilos, fontSize: tamanoDeClases(clases) }} />
  }

  const elementos = ICONOS_SVG[clave]

  return (
    <svg className={className ? `icono ${className}` : 'icono'} viewBox="0 0 24 24" aria-hidden="true">
      {elementos}
    </svg>
  )
}
