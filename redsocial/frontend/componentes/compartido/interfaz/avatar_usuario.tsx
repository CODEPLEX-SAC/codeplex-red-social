import { CodeplexAvatarUsuario, avatarCadena } from '@codeplex-sac/ui'
import { Icono } from '../icono'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { AvatarUsuarioProps } from '@/tipos/compartido/contrato_avatar'

const configuracion = catalogoCompartido.avatar
const clases = configuracion.clases

export function AvatarUsuario({ tamano = configuracion.predeterminado.tamano as AvatarUsuarioProps['tamano'], imagen, iniciales, nombre, icono, tono = configuracion.predeterminado.tono as AvatarUsuarioProps['tono'], etiqueta, estado, etiquetaEstado, insignia, colorInsignia, claseInsignia, className = '' }: AvatarUsuarioProps) {
  const medidas = configuracion.tamanos[tamano as keyof typeof configuracion.tamanos]
  const generado = nombre === undefined ? undefined : avatarCadena(nombre)
  const texto = generado?.children ?? iniciales
  const accesible = etiqueta !== undefined && imagen === undefined ? { role: 'img', 'aria-label': etiqueta } : {}
  const textoVisible = texto === undefined ? null : <span className={medidas.fuente}>{texto}</span>
  const contenido = icono ? <Icono name={icono} className={medidas.icono} /> : textoVisible
  const colorContenido = colorInsignia === undefined ? '' : configuracion.colores_insignia[colorInsignia]
  const distintivo = insignia === undefined ? undefined : <span className={[clases.insignia_contenido, colorContenido, claseInsignia].join(' ').trim()}>{insignia}</span>
  const avatar = (
    <CodeplexAvatarUsuario
      tamano={medidas.px}
      imagen={imagen}
      texto={etiqueta ?? catalogoCompartido.campos.alt_decorativo}
      estado={distintivo === undefined ? estado : undefined}
      insignia={distintivo}
      className={[clases.base, className].join(' ').trim()}
      sx={[configuracion.tonos[tono as keyof typeof configuracion.tonos], generado?.sx ?? {}]}
      {...accesible}
    >
      {contenido}
    </CodeplexAvatarUsuario>
  )
  if (distintivo !== undefined) return <span className={[clases.insignia, medidas.insignia].join(' ')}>{avatar}</span>
  if (estado === undefined) return avatar
  const presencia = configuracion.estados[estado]
  return (
    <span data-estado={estado} className={[clases.presencia, medidas.punto, presencia.clase].join(' ')}>
      {avatar}
      {etiquetaEstado ? <span className={clases.presencia_texto}>{etiquetaEstado}</span> : null}
    </span>
  )
}
