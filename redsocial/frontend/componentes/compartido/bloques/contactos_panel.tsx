import { imagenUsuarioPredeterminada as usuarioImg } from '../icono'
import { AvatarImagen } from '../interfaz/avatar_imagen'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { ContactosPanelProps } from '@/tipos/compartido/contrato_contactos'

export function ContactosPanel({ titulo = textosRedSocial.CONTACTOS, contactos }: ContactosPanelProps) {
  return (
    <section className="rounded-xl border border-borde bg-white p-4">
      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="m-0 text-titulo-seccion text-texto">{titulo}</h2>
        <a href="#" className="text-enlace-accion text-primario no-underline">{textosRedSocial.VER_TODOS}</a>
      </div>
      {contactos.map((c) => (
        <article key={c.nombre} className="flex items-center gap-2 border-b border-t-f0eef5 py-2">
          <AvatarImagen src={usuarioImg} className="h-8 w-8 flex-none rounded-full bg-primario-suave" />
          <div className="min-w-0 flex-1">
            <strong className="block truncate text-nombre-entidad text-texto">{c.nombre}</strong>
            <span className="block truncate text-auxiliar text-texto-suave">{c.subtitulo}</span>
          </div>
          <button type="button" className="inline-flex min-h-7.5 flex-none items-center justify-center rounded-7 border border-transparent bg-t-f0f0f0 px-2.5" />
        </article>
      ))}
    </section>
  )
}
