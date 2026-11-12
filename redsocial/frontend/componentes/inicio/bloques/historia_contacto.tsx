import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { HistoriaContactoProps } from '@/tipos/inicio/contrato_historia'

const clases = catalogoInicio.historias.flujo.clases

export function HistoriaContacto({ nombre }: HistoriaContactoProps) {
  return (
    <div className="flex w-27.5 flex-none flex-col items-center gap-2">
      <span className={clases.mini_sin_historia}>
        <AvatarUsuario tamano="historia" imagen={usuarioImg} className="border-3 border-white" />
      </span>
      <span className={`${clases.etiqueta_historia} text-texto-suave`}>{nombre}</span>
    </div>
  )
}
