import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'

export function BloqueRecientes({
  LLAMADAS_RECIENTES,
}: {
  LLAMADAS_RECIENTES: { nombre: string; direccion?: 'entrante' | 'saliente' | undefined; esGrupo?: boolean | undefined; miembros?: string | undefined; hora: string; }[]
}) {
  return (
    <section className="min-w-0">
      <CampoBusqueda placeholder={catalogoMensajeria.placeholders.buscar_videollamadas} aria-label={catalogoMensajeria.placeholders.buscar_videollamadas} className="mb-3.5 w-full" />

      <div className="mb-4 flex gap-2 overflow-x-auto pb-0 scrollbar-oculto">
        <Boton type="button" variant="filtro" size="filtro" activo className="flex-none">{catalogoMensajeria.filtros.recientes}</Boton>
        <Boton type="button" variant="filtro" size="filtro" className="flex-none">{catalogoMensajeria.filtros.contactos}</Boton>
        <Boton type="button" variant="filtro" size="filtro" className="flex-none">{catalogoMensajeria.filtros.grupos}</Boton>
        <Boton type="button" variant="filtro" size="filtro" className="flex-none">{catalogoMensajeria.filtros.reuniones_programadas}</Boton>
      </div>

      <div className="flex flex-col gap-0.5">
        {LLAMADAS_RECIENTES.map((c) => (
          <article key={c.nombre} className="flex items-center gap-2.5 rounded-lg px-2 py-2.5">
            {c.esGrupo ? (
              <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-primario text-white">
                <Icono name="usuarios" className="h-4 w-4" />
              </span>
            ) : (
              <AvatarImagen src={usuarioImg} className="h-10 w-10 flex-none rounded-full bg-primario-suave" />
            )}
            <span className="min-w-0 flex-1">
              <strong className="block truncate text-nombre-entidad font-semibold text-texto">{c.nombre}</strong>
              <small className="mt-0.5 flex items-center gap-1 truncate text-auxiliar text-texto-suave">
                {c.direccion && (
                  <>
                    <Icono name={c.direccion === 'entrante' ? 'flecha-abajo-izquierda' : 'flecha-arriba-derecha'} className="h-2.75 w-2.75" />
                    {c.direccion === 'entrante' ? catalogoMensajeria.leyendas.videollamada_entrante : catalogoMensajeria.leyendas.videollamada_saliente}
                  </>
                )}
                {c.miembros}
              </small>
            </span>
            <span className="flex-none text-fecha-abreviada text-t-aaa7b5">{c.hora}</span>
            <BotonIcono icono="video" type="button" aria-label={catalogoMensajeria.botones.videollamar} variant="contorno" size="default" className="flex-none" />
          </article>
        ))}
      </div>

      <div className="px-3.5 py-2.5 text-center">
        <a href="#" className="text-enlace-accion font-medium text-primario no-underline hover:underline">{catalogoMensajeria.botones.ver_mas_llamadas}</a>
      </div>
    </section>
  )
}
