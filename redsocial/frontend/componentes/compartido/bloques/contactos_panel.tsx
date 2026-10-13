import { PanelLateral } from './panel_lateral'
import { imagenUsuarioPredeterminada as usuarioImg } from '../icono'
import { AvatarImagen } from '../interfaz/avatar_imagen'
import { BotonIcono } from '../interfaz/boton_icono'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { ContactosPanelProps } from '@/tipos/compartido/contrato_contactos'

export function ContactosPanel({ titulo = textosRedSocial.CONTACTOS, contactos }: ContactosPanelProps) {
  return (
    <PanelLateral titulo={titulo}>
      {contactos.map((c) => (
        <article key={c.nombre} className="flex items-center gap-2 border-b border-borde-suave py-2">
          <AvatarImagen src={usuarioImg} className="h-8 w-8 flex-none rounded-full bg-primario-suave" />
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
