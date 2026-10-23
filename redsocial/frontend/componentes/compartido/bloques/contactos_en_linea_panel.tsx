import { imagenUsuarioPredeterminada as usuarioImg } from '../icono'
import { AvatarUsuario } from '../interfaz/avatar_usuario'
import { PanelLateral } from './panel_lateral'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { ContactosEnLineaPanelProps } from '@/tipos/compartido/contrato_contactos_en_linea'

export function ContactosEnLineaPanel({ contactos }: ContactosEnLineaPanelProps) {
  return (
    <PanelLateral titulo={textosRedSocial.CONTACTOS_EN_LINEA}>
      {contactos.map((c) => (
        <article key={c.nombre} className="flex items-center gap-2 border-b border-borde-suave py-2">
          <AvatarUsuario tamano="sm" imagen={usuarioImg} estado="conectado" />
          <div className="min-w-0 flex-1">
            <strong className="block text-nombre-entidad text-texto">
              {c.nombre}{' '}
              {c.colaborador && <span className="ml-1 text-estado text-exito-texto">{textosRedSocial.COLABORADOR_ETIQUETA}</span>}
            </strong>
          </div>
        </article>
      ))}
    </PanelLateral>
  )
}
