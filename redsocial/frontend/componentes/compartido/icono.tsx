import { CodeplexIcono } from '@codeplex-sac/iconos'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import type { IconProps } from '@/tipos/compartido/contrato_icono_props'
import imagenUsuarioPredeterminada from '../../../recursos/imagenes/usuario.jpg'
import imagenEventoPredeterminada from '../../../recursos/imagenes/concierto.jpg'
import imagenEmpresaPredeterminada from '../../../recursos/imagenes/logo-empresa.jpg'
import { CONFIGURACION_LIBRERIA, ICONOS_LIBRERIA, asegurarFuenteLibreria, clasesSinTamano, tamanoDeClases, tamanosResponsivosDeClases } from './fuente_iconos'
import { ICONOS_SVG } from './iconos_svg'

export { imagenUsuarioPredeterminada, imagenEventoPredeterminada, imagenEmpresaPredeterminada }

asegurarFuenteLibreria()

const PREFIJO_SVG_PROPIO = 'svg:'

export function Icono({ name, className }: IconProps) {
  const destino = (catalogoCompartido.iconos as Record<string, string>)[name] ?? name
  const esSvgPropio = destino.startsWith(PREFIJO_SVG_PROPIO)
  const clave = esSvgPropio ? destino.slice(PREFIJO_SVG_PROPIO.length) : destino
  const nombreLibreria = esSvgPropio ? undefined : ICONOS_LIBRERIA[clave]
  const clases = className ?? ''

  if (nombreLibreria) {
    return <CodeplexIcono nombre={nombreLibreria} className={clasesSinTamano(clases)} sx={{ ...CONFIGURACION_LIBRERIA.estilos, fontSize: tamanoDeClases(clases), ...tamanosResponsivosDeClases(clases) }} />
  }

  const elementos = ICONOS_SVG[clave]

  return (
    <svg className={className ? `icono ${className}` : 'icono'} viewBox="0 0 24 24" aria-hidden="true">
      {elementos}
    </svg>
  )
}
