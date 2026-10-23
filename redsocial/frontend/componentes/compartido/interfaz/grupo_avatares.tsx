import { CodeplexAvatarUsuario, CodeplexGrupoAvatares } from '@codeplex-sac/ui'
import { AvatarUsuario } from './avatar_usuario'
import { posicionesDe } from '../posiciones'
import { imagenUsuarioPredeterminada } from '../icono'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { GrupoAvataresProps } from '@/tipos/compartido/contrato_avatar'

const configuracion = catalogoCompartido.avatar
const clases = configuracion.clases

export function GrupoAvatares({ avatares, imagen = imagenUsuarioPredeterminada, tamano = configuracion.predeterminado.tamano_grupo as GrupoAvataresProps['tamano'], resto, tono = configuracion.predeterminado.tono_grupo as GrupoAvataresProps['tono'], className = '' }: GrupoAvataresProps) {
  const medidas = configuracion.tamanos[tamano as keyof typeof configuracion.tamanos]
  const tonoResto = configuracion.tonos[tono as keyof typeof configuracion.tonos]
  const total = avatares + (resto === undefined ? 0 : 1)

  return (
    <div className={[clases.grupo, className].join(' ').trim()}>
      <CodeplexGrupoAvatares maximo={total + 1} spacing={medidas.solape}>
        {posicionesDe(avatares).map((posicion) => (
          <AvatarUsuario key={posicion.id} tamano={tamano} imagen={imagen} />
        ))}
        {resto === undefined ? null : (
          <CodeplexAvatarUsuario tamano={medidas.px} sx={[configuracion.resto_sx, tonoResto]}>
            <span className={clases.resto_texto}>{resto}</span>
          </CodeplexAvatarUsuario>
        )}
      </CodeplexGrupoAvatares>
    </div>
  )
}
