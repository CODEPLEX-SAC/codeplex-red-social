import { imagenUsuarioPredeterminada as usuarioImg } from '../icono'
import { AvatarImagen } from '../interfaz/avatar_imagen'
import { PanelLateral } from './panel_lateral'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { ContactosEnLineaPanelProps } from '@/tipos/compartido/contrato_contactos_en_linea'

export function ContactosEnLineaPanel({ contactos }: ContactosEnLineaPanelProps) {
  return (
    <PanelLateral titulo={textosRedSocial.CONTACTOS_EN_LINEA}>
      {contactos.map((c) => (
        <article key={c.nombre} className="flex items-center gap-2 border-b border-borde-suave py-2">
          <AvatarImagen src={usuarioImg} className="h-8 w-8 flex-none rounded-full bg-primario-suave" />
          <div className="min-w-0 flex-1">
            <strong className="block text-nombre-entidad text-texto">
              {c.nombre}{' '}
              {c.colaborador && <span className="ml-1 text-estado text-exito-texto">{textosRedSocial.COLABORADOR_ETIQUETA}</span>}
            </strong>
          </div>
          <span className="ml-auto h-2 w-2 flex-none rounded-full bg-exito" />
        </article>
      ))}
    </PanelLateral>
  )
}
