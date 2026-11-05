import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import { AroHistoria } from '../../compartido/interfaz/aro_historia'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { EnlacePerfilUsuario } from '../../compartido/interfaz/enlace_perfil_usuario'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ZonaAvatarConversacionProps } from '@/tipos/mensajeria/contrato_lista_conversaciones'

const textos = catalogoMensajeria.acciones_conversacion
const clasesChat = catalogoMensajeria.clases.chat

export function ZonaAvatarConversacion({ conversacion: c, estadoHistorias, onAbrirHistorias }: ZonaAvatarConversacionProps) {
  const participantId = c.identificadores.participantId
  const tamano = estadoHistorias === 'ninguna' ? 'lg' : 'md'
  const avatar = c.esGrupo ? <AvatarUsuario tamano={tamano} icono="grupo" tono="solido" imagen={c.imagen} /> : <AvatarUsuario tamano={tamano} imagen={usuarioImg} estado={c.enLinea ? 'conectado' : undefined} />
  const etiqueta = (estadoHistorias === 'nueva' ? textos.aria_historias_nuevas : textos.aria_historias_vistas).replace(':nombre', c.nombre)
  if (participantId === null) return avatar
  if (estadoHistorias === 'ninguna') return <EnlacePerfilUsuario autorId={participantId} nombre={c.nombre} className={clasesChat.enlace_perfil_avatar}>{avatar}</EnlacePerfilUsuario>
  return <AroHistoria estado={estadoHistorias} etiqueta={etiqueta} onAbrir={() => onAbrirHistorias(participantId)}>{avatar}</AroHistoria>
}
