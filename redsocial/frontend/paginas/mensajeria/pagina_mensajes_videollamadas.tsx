import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { CampoBusqueda } from '../../componentes/compartido/interfaz/campo_busqueda'
import { PestanasMensajes } from '../../componentes/mensajeria/bloques/pestanas_mensajes'
import { PanelLateralMensajeria } from '../../componentes/mensajeria/bloques/panel_lateral_mensajeria'
import { usarCarrusel } from '../../componentes/compartido/usar_carrusel'
import type { IconName } from '../../tipos/compartido/icono'
import { AvatarImagen } from '../../componentes/compartido/interfaz/avatar_imagen'
import usuarioImg from '../../../recursos/imagenes/usuario.jpg'
import { LLAMADAS_RECIENTES, CONTACTOS_FRECUENTES, REUNIONES_PROGRAMADAS, HISTORIAL } from '../../datos/mensajeria/videollamadas'

export function PaginaMensajesVideollamadas() {
  const carrusel = usarCarrusel()

  return (
    <EstructuraApp paginaActiva="mensajes">
      <div>
        <div className="mb-5 flex items-start justify-between gap-5">
          <h1 className="m-0 text-[23px] font-extrabold tracking-[-0.02em] text-texto">{catalogoMensajeria.titulos.videollamadas}</h1>
          <div className="flex items-center gap-2.5">
            <a href="#" className="inline-flex items-center gap-1.5 text-[13px] text-texto-suave no-underline hover:text-primario">
              <Icono name="reloj" className="h-4 w-4" /> {catalogoMensajeria.leyendas.historial_de_llamadas}
            </a>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <PestanasMensajes
            activa="12-04-mensajes-04-videollamadas.html"
            tabs={[
              { etiqueta: catalogoMensajeria.titulos_pestanas.mensajes, archivo: '09-04-mensajes-01-todos-web.html' },
              { etiqueta: catalogoMensajeria.titulos_pestanas.videollamadas, archivo: '12-04-mensajes-04-videollamadas.html' },
            ]}
          />
          <div className="mb-3 flex flex-none items-center gap-2.5">
            <a href="#" className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-borde bg-white px-4 py-2 text-[13px] font-medium text-texto no-underline hover:border-primario hover:text-primario">
              <Icono name="crear-evento" className="h-4 w-4" /> {catalogoMensajeria.botones.nueva_reunion}
            </a>
            <a href="13-04-mensajes-04-videollamadas-iniciar.html" className="inline-flex min-h-[34px] items-center justify-center gap-1.5 whitespace-nowrap rounded-[7px] border border-transparent bg-primario px-3.5 text-[13px] font-medium text-white no-underline hover:bg-primario-oscuro">
              <Icono name="video" className="h-4 w-4" /> {catalogoMensajeria.botones.iniciar_videollamada}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-[minmax(260px,300px)_minmax(420px,1fr)_minmax(280px,340px)] items-start gap-10 max-[1350px]:grid-cols-1">
          <section className="min-w-0">
            <CampoBusqueda placeholder={catalogoMensajeria.placeholders.buscar_videollamadas} aria-label={catalogoMensajeria.placeholders.buscar_videollamadas} className="mb-3.5 w-full" />

            <div className="mb-4 flex gap-2 overflow-x-auto pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <button type="button" className="flex-none whitespace-nowrap rounded-[20px] border border-primario bg-primario px-3 py-1.25 text-[11px] font-medium text-white">{catalogoMensajeria.filtros.recientes}</button>
              <button type="button" className="flex-none whitespace-nowrap rounded-[20px] border border-borde bg-white px-3 py-1.25 text-[11px] font-medium text-texto-suave hover:border-primario hover:text-primario">{catalogoMensajeria.filtros.contactos}</button>
              <button type="button" className="flex-none whitespace-nowrap rounded-[20px] border border-borde bg-white px-3 py-1.25 text-[11px] font-medium text-texto-suave hover:border-primario hover:text-primario">{catalogoMensajeria.filtros.grupos}</button>
              <button type="button" className="flex-none whitespace-nowrap rounded-[20px] border border-borde bg-white px-3 py-1.25 text-[11px] font-medium text-texto-suave hover:border-primario hover:text-primario">{catalogoMensajeria.filtros.reuniones_programadas}</button>
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
                    <strong className="block truncate text-xs font-semibold text-texto">{c.nombre}</strong>
                    <small className="mt-0.5 flex items-center gap-1 truncate text-[11px] text-texto-suave">
                      {c.direccion && (
                        <>
                          <Icono name={c.direccion === 'entrante' ? 'flecha-abajo-izquierda' : 'flecha-arriba-derecha'} className="h-[11px] w-[11px]" />
                          {c.direccion === 'entrante' ? catalogoMensajeria.leyendas.videollamada_entrante : catalogoMensajeria.leyendas.videollamada_saliente}
                        </>
                      )}
                      {c.miembros}
                    </small>
                  </span>
                  <span className="flex-none text-[10px] text-[#aaa7b5]">{c.hora}</span>
                  <button type="button" aria-label={catalogoMensajeria.botones.videollamar} className="grid h-8.5 w-8.5 flex-none place-items-center rounded-full border border-borde bg-white text-texto-suave hover:border-primario hover:bg-[#f7f6fa] hover:text-primario">
                    <Icono name="video" className="h-4 w-4" />
                  </button>
                </article>
              ))}
            </div>

            <div className="px-3.5 py-2.5 text-center">
              <a href="#" className="text-[13px] font-medium text-primario no-underline hover:underline">{catalogoMensajeria.botones.ver_mas_llamadas}</a>
            </div>
          </section>

          <section className="grid min-w-0 gap-4">
            <section className="min-w-0 rounded-xl border border-borde bg-white p-4">
              <div className="mb-3.5 flex items-center justify-between">
                <h2 className="m-0 text-[15px] font-bold text-texto">{catalogoMensajeria.secciones.contactos_frecuentes}</h2>
                <a href="#" className="text-xs font-medium text-primario no-underline hover:underline">{catalogoMensajeria.botones.ver_todos}</a>
              </div>
              <div ref={carrusel.pistaRef} className="flex gap-3 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {CONTACTOS_FRECUENTES.map((c) => (
                  <article key={c.nombre} className="flex w-[150px] flex-none flex-col items-center gap-1.5 rounded-xl border border-borde bg-white px-2 py-3.5 text-center hover:shadow-[0_2px_8px_rgba(108,60,224,.08)]">
                    <div className="relative inline-block">
                      {c.esGrupo ? (
                        <span className="relative grid h-13 w-13 place-items-center rounded-full bg-primario-suave text-primario">
                          <Icono name="usuarios" className="h-5 w-5" />
                          <span className="absolute -right-1 -top-1 inline-grid h-[18px] min-w-[18px] place-items-center rounded-full border-2 border-white bg-primario px-1 text-[9px] font-bold text-white">4</span>
                        </span>
                      ) : (
                        <>
                          <AvatarImagen src={usuarioImg} className="block h-13 w-13 rounded-full bg-primario-suave" />
                          <span className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#22c55e]" />
                        </>
                      )}
                    </div>
                    <strong className="text-xs leading-tight text-texto">{c.nombre}</strong>
                    <span className="inline-flex items-center gap-1 text-[11px] text-texto-suave">
                      {!c.esGrupo && <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#22c55e]" />}
                      {c.esGrupo ? c.miembros : catalogoMensajeria.filtros.en_linea}
                    </span>
                    <a href="#" className="mt-0.5 inline-flex items-center gap-1 rounded-md border border-borde bg-white px-2.5 py-1 text-[11px] font-medium text-primario no-underline hover:border-primario hover:bg-[rgba(108,60,224,.06)]">
                      <Icono name="video" className="h-3 w-3" /> {catalogoMensajeria.botones.videollamar}
                    </a>
                  </article>
                ))}
              </div>
            </section>

            <section className="min-w-0 rounded-xl border border-borde bg-white p-4">
              <div className="mb-3.5 flex items-center justify-between">
                <h2 className="m-0 text-[15px] font-bold text-texto">{catalogoMensajeria.secciones.reuniones_programadas}</h2>
              </div>
              <div className="flex flex-col gap-px overflow-hidden rounded-[10px] border border-borde bg-borde">
                {REUNIONES_PROGRAMADAS.map((r) => (
                  <article key={r.titulo} className="flex flex-wrap items-center gap-x-3.5 gap-y-2 bg-white px-4 py-3.5 hover:bg-[#fafafe]">
                    <div className="flex min-w-12 flex-none flex-col items-center rounded-lg border border-borde bg-white py-1.5">
                      <span className="text-lg font-bold leading-[1.1] text-primario">{r.dia}</span>
                      <span className="text-[10px] font-semibold uppercase text-primario">{r.mes}</span>
                    </div>

                    <strong className="min-w-[140px] flex-1 truncate text-[13px] text-texto">{r.titulo}</strong>

                    <p className="m-0 flex flex-none items-center gap-1.5 whitespace-nowrap text-xs text-texto-suave">
                      <Icono name="reloj" className="h-[13px] w-[13px]" /> {r.hora}
                    </p>

                    <div className="flex flex-none items-center gap-1.5">
                      <div className="flex items-center">
                        {Array.from({ length: r.avatares }).map((_, i) => (
                          <AvatarImagen
                            key={i}
                            src={usuarioImg}
                            className={'h-8 w-8 rounded-full border-2 border-white bg-primario-suave' + (i > 0 ? ' -ml-2' : '')}
                          />
                        ))}
                        <span className="-ml-2 grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-primario text-[10px] font-semibold text-white">{r.extra}</span>
                      </div>
                      <span className="flex items-center gap-1.5 whitespace-nowrap text-xs text-texto-suave">
                        <Icono name="usuarios" className="h-[13px] w-[13px]" /> {r.participantes}
                      </span>
                    </div>

                    <a href="#" className="flex-none whitespace-nowrap rounded-md bg-primario px-3.5 py-1.5 text-xs font-semibold text-white no-underline hover:opacity-[.88]">{catalogoMensajeria.botones.unirse}</a>
                  </article>
                ))}
              </div>
              <div className="pt-3.5 text-center">
                <a href="#" className="text-[13px] font-medium text-primario no-underline hover:underline">{catalogoMensajeria.botones.ver_todas_las_reuniones}</a>
              </div>
            </section>

            <section className="min-w-0 rounded-xl border border-borde bg-white p-4">
              <div className="mb-3.5 flex items-center justify-between">
                <h2 className="m-0 text-[15px] font-bold text-texto">{catalogoMensajeria.secciones.historial_reciente}</h2>
              </div>
              <div className="flex flex-col">
                {HISTORIAL.map((h) => (
                  <article key={h.nombre} className="flex items-center gap-3 border-b border-[#f0eef5] py-3 last:border-b-0">
                    {h.esGrupo ? (
                      <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-primario text-white">
                        <Icono name="usuarios" className="h-4 w-4" />
                      </span>
                    ) : (
                      <AvatarImagen src={usuarioImg} className="h-8 w-8 flex-none rounded-full bg-primario-suave" />
                    )}
                    <div className="min-w-0 flex-1">
                      <strong className="mb-0.75 block text-[13px] text-texto">{h.nombre}</strong>
                      <p className="m-0 flex items-center gap-1.5 text-xs text-texto-suave">
                        {h.fecha} · <Icono name="reloj" className="h-3 w-3" /> {h.duracion}
                      </p>
                    </div>
                    <span className="flex flex-none items-center gap-1.25 text-[11px] font-medium text-[#16a34a]">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" /> {catalogoMensajeria.leyendas.completada}
                    </span>
                    <button type="button" aria-label={catalogoMensajeria.botones.mas_opciones} className="grid h-7 w-7 flex-none place-items-center rounded-md border-0 bg-transparent hover:bg-[#f3f2f7]">
                      <Icono name={'puntos' as IconName} className="h-4 w-4" />
                    </button>
                  </article>
                ))}
              </div>
              <div className="pt-3.5 text-center">
                <a href="#" className="text-[13px] font-medium text-primario no-underline hover:underline">{catalogoMensajeria.botones.ver_todo_el_historial}</a>
              </div>
            </section>
          </section>

          <PanelLateralMensajeria />
        </div>
      </div>
    </EstructuraApp>
  )
}
