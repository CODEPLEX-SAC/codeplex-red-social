import usuarioImg from '../../../../recursos/imagenes/usuario.jpg'
import type { ContactosPanelProps } from '@/tipos/compartido/contactos_panel'

export function ContactosPanel({ titulo = 'Contactos', contactos }: ContactosPanelProps) {
  return (
    <section className="rounded-xl border border-borde bg-white p-4">
      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="m-0 text-[13px] text-texto">{titulo}</h2>
        <a href="#" className="text-[11px] text-primario no-underline">Ver todos</a>
      </div>
      {contactos.map((c) => (
        <article key={c.nombre} className="flex items-center gap-2 border-b border-[#f0eef5] py-2">
          <span
            className="h-8 w-8 flex-none rounded-full bg-primario-suave bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${usuarioImg})` }}
          />
          <div className="min-w-0 flex-1">
            <strong className="block truncate text-[11px] text-texto">{c.nombre}</strong>
            <span className="block truncate text-[10px] text-texto-suave">{c.subtitulo}</span>
          </div>
          <button type="button" className="inline-flex min-h-[30px] flex-none items-center justify-center rounded-[7px] border border-transparent bg-[#f0f0f0] px-2.5" />
        </article>
      ))}
    </section>
  )
}
