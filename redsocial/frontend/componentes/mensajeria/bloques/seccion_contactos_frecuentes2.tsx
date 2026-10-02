import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import { Icono } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'

export function SeccionContactosFrecuentes2({
  carrusel,
  CONTACTOS_FRECUENTES,
}: {
  carrusel: { pistaRef: React.RefObject<HTMLDivElement | null>; }
  CONTACTOS_FRECUENTES: { nombre: string; esGrupo?: boolean | undefined; miembros?: string | undefined; }[]
}) {
  return (
    <section className="min-w-0 rounded-xl border border-borde bg-white p-4">
      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoMensajeria.secciones.contactos_frecuentes}</h2>
        <a href="#" className="text-enlace-accion font-medium text-primario no-underline hover:underline">{catalogoMensajeria.botones.ver_todos}</a>
      </div>
      <div ref={carrusel.pistaRef} className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-oculto">
        {CONTACTOS_FRECUENTES.map((c) => (
          <article key={c.nombre} className="flex w-37.5 flex-none flex-col items-center gap-1.5 rounded-xl border border-borde bg-white px-2 py-3.5 text-center hover:shadow-t9">
            <div className="relative inline-block">
              {c.esGrupo ? (
                <span className="relative grid h-13 w-13 place-items-center rounded-full bg-primario-suave text-primario">
                  <Icono name="usuarios" className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 inline-grid h-4.5 min-w-4.5 place-items-center rounded-full border-2 border-white bg-primario px-1 text-contador font-bold text-white">4</span>
                </span>
              ) : (
                <>
                  <AvatarImagen src={usuarioImg} className="block h-13 w-13 rounded-full bg-primario-suave" />
                  <span className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-verde-categoria" />
                </>
              )}
            </div>
            <strong className="text-nombre-entidad leading-tight text-texto">{c.nombre}</strong>
            <span className="inline-flex items-center gap-1 text-auxiliar text-texto-suave">
              {!c.esGrupo && <span className="inline-block h-1.5 w-1.5 rounded-full bg-verde-categoria" />}
              {c.esGrupo ? c.miembros : catalogoMensajeria.filtros.en_linea}
            </span>
            <a href="#" className="mt-0.5 inline-flex items-center gap-1 rounded-md border border-borde bg-white px-2.5 py-1 text-boton font-medium text-primario no-underline hover:border-primario hover:bg-overlay-15">
              <Icono name="video" className="h-3 w-3" /> {catalogoMensajeria.botones.videollamar}
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
