import { imagenRedSocialDe } from '../../compartido'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { LienzoHistoria } from './lienzo_historia'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { VistaLateralHistoriaProps } from '@/tipos/inicio/contrato_historia'

const clases = catalogoInicio.historias.flujo.clases

export function VistaLateralHistoria({ historia }: VistaLateralHistoriaProps) {
  return (
    <span className={clases.lateral_interior}>
      <LienzoHistoria borrador={historia.borrador} inmersivo miniatura soloFondo />
      <span aria-hidden="true" className={clases.lateral_velo} />
      <span className={clases.lateral_datos}>
        <AvatarUsuario tamano="md" imagen={imagenRedSocialDe(historia.autorId)} />
        <strong className={clases.lateral_nombre}>{historia.nombre}</strong>
        <span className={clases.lateral_tiempo}>{historia.tiempo}</span>
      </span>
    </span>
  )
}
