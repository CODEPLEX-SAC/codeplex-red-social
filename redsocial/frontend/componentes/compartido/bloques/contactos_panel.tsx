import { PanelLateral } from './panel_lateral'
import { imagenUsuarioPredeterminada as usuarioImg } from '../icono'
import { AvatarUsuario } from '../interfaz/avatar_usuario'
import { BotonIcono } from '../interfaz/boton_icono'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { ContactosPanelProps } from '@/tipos/compartido/contrato_contactos'

export function ContactosPanel({ titulo = textosRedSocial.CONTACTOS, contactos }: ContactosPanelProps) {
  return (
    <PanelLateral titulo={titulo}>
      {contactos.map((c) => (
        <article key={c.nombre} className="flex items-center gap-2 border-b border-borde-suave py-2">
          <AvatarUsuario tamano="sm" imagen={usuarioImg} />
          <div className="min-w-0 flex-1">
            <strong className="block truncate text-nombre-entidad text-texto">{c.nombre}</strong>
            <span className="block truncate text-auxiliar text-texto-suave">{c.subtitulo}</span>
          </div>
          <BotonIcono icono="mensaje" type="button" aria-label={textosRedSocial.ENVIAR_MENSAJE} variant="contorno" size="md" className="flex-none" />
        </article>
      ))}
    </PanelLateral>
  )
}
