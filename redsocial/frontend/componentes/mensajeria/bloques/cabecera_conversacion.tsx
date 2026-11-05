import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { CabeceraConversacionProps } from '@/tipos/mensajeria/contrato_conversacion'

const clases = catalogoMensajeria.clases.chat
const textos = catalogoMensajeria.conversacion

export function CabeceraConversacion({ conversacion, compacto, onVolver }: CabeceraConversacionProps) {
  return (
    <header className={clases.cabecera}>
      <span className={compacto ? clases.volver_compacto : clases.volver}>
        <BotonIcono icono="flecha-izquierda" type="button" aria-label={textos.volver_a_la_lista} onClick={onVolver} variant="discreto" size="default" />
      </span>
      {conversacion.esGrupo ? <AvatarUsuario tamano="md" icono="grupo" tono="solido" /> : <AvatarUsuario tamano="md" imagen={usuarioImg} estado={conversacion.enLinea ? 'conectado' : undefined} />}
      <div className={clases.identidad}>
        <strong className={clases.nombre}>{conversacion.nombre}</strong>
        {conversacion.enLinea && !conversacion.esGrupo && <span className={clases.estado}>{textos.en_linea}</span>}
      </div>
      <div className={clases.acciones}>
        <BotonIcono icono="video" type="button" aria-label={textos.videollamada} variant="contorno" size="default" />
        <BotonIcono icono="llamada" type="button" aria-label={textos.llamada} variant="contorno" size="default" />
        <BotonIcono icono="informacion" type="button" aria-label={textos.informacion} variant="contorno" size="default" />
      </div>
    </header>
  )
}
