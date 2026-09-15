import { Icono } from '../../componentes/compartido/icono'
import { AvatarImagen } from '../../componentes/compartido/interfaz/avatar_imagen'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { usarCarrusel } from '../../componentes/compartido/usar_carrusel'
import { SuperficieColor } from '../../componentes/compartido/interfaz/superficie_color'
import usuarioImg from '../../../recursos/imagenes/usuario.jpg'
import { HISTORIAS, CONTACTOS_LINEA, PUBLICACION_INICIO, PUBLICACION_COMPARTIDA_INICIO } from '../../datos/inicio/inicio'
import { GRUPOS_RECOMENDADOS, EVENTOS_PROXIMOS } from '../../datos/compartido/panel_lateral'
import { SESION_ACTUAL } from '../../datos/compartido/sesion_actual'
import catalogoInicio from '../../catalogos/capacidades/redsocial/inicio.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'

const AVATAR = 'h-8 w-8 flex-none rounded-full bg-primario-suave'

function Historias() {
  const carrusel = usarCarrusel()
  return (
    <section className="relative mb-4 rounded-xl border border-borde bg-white pt-4">
      <h2 className="m-0 mb-3 px-4 text-[13px] text-texto">{catalogoInicio.secciones.historias}</h2>
      <div
        ref={carrusel.pistaRef}
        className="flex gap-3 overflow-x-auto px-4 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {HISTORIAS.map((h) => (
          <div key={h.nombre} className="flex w-[110px] flex-none cursor-pointer flex-col items-center gap-2">
            {h.crear ? (
              <span className="relative grid h-[104px] w-[104px] place-items-center rounded-full bg-borde p-[3.5px]">
                <AvatarImagen src={usuarioImg} className="h-full w-full rounded-full border-[3px] border-white bg-primario-suave" />
                <span className="absolute -bottom-0.5 -right-0.5 grid h-[30px] w-[30px] place-items-center rounded-full border-[3px] border-white bg-primario text-lg font-bold leading-none text-white">
                  +
                </span>
              </span>
            ) : (
              <SuperficieColor
                as="span"
                degradado="primario"
                className="relative grid h-[104px] w-[104px] place-items-center rounded-full p-[3.5px]"
              >
                <AvatarImagen src={usuarioImg} className="h-full w-full rounded-full border-[3px] border-white bg-primario-suave" />
              </SuperficieColor>
            )}
            <span className={'w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-xs ' + (h.crear ? 'font-semibold text-texto' : 'text-texto-suave')}>
              {h.nombre}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export function PaginaInicio() {
  const placeholderPublicar = catalogoInicio.placeholders.que_estas_pensando.replace('{nombre}', SESION_ACTUAL.usuario.split(' ')[0])
  return (
    <EstructuraApp paginaActiva="inicio">
      <EstructuraTresColumnas
        principal={
          <section>
            <article className="mb-4 rounded-xl border border-borde bg-white p-4 shadow-sombra">
              <div className="mb-3 flex items-center gap-2.5">
                <AvatarImagen src={usuarioImg} className={AVATAR} />
                <input
                  type="text"
                  placeholder={placeholderPublicar}
                  aria-label={placeholderPublicar}
                  className="min-w-0 flex-1 rounded-full border border-borde bg-fondo px-4 py-2.5 text-[13px] text-texto outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-1 border-t border-borde pt-2.5">
                <button type="button" className="flex flex-1 basis-[120px] items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border-0 bg-transparent p-2 text-xs text-texto-suave hover:bg-[#f8f7fc]">
                  <Icono name="foto-video" className="h-4 w-4" /> {catalogoInicio.botones.foto_video}
                </button>
                <button type="button" className="flex flex-1 basis-[120px] items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border-0 bg-transparent p-2 text-xs text-texto-suave hover:bg-[#f8f7fc]">
                  <Icono name="encuesta" className="h-4 w-4" /> {catalogoInicio.botones.encuesta}
                </button>
                <button type="button" className="flex flex-1 basis-[120px] items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border-0 bg-transparent p-2 text-xs text-texto-suave hover:bg-[#f8f7fc]">
                  <Icono name="sentimiento" className="h-4 w-4" /> {catalogoInicio.botones.sentimiento}
                </button>
                <button type="button" className="flex flex-1 basis-[120px] items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border-0 bg-transparent p-2 text-xs text-texto-suave hover:bg-[#f8f7fc]">
                  <Icono name="puntos" className="h-4 w-4" /> {catalogoInicio.botones.mas}
                </button>
              </div>
            </article>

            <Historias />

            <article className="mb-4 rounded-xl border border-borde bg-white shadow-sombra">
              <div className="flex items-center gap-2.5 px-4 py-3.5">
                <AvatarImagen src={usuarioImg} className={AVATAR} />
                <div className="min-w-0 flex-1">
                  <strong className="block text-[13px] text-texto">{PUBLICACION_INICIO.nombre}</strong>
                  <span className="mt-0.5 block text-[10px] text-texto-suave">{PUBLICACION_INICIO.tiempo}</span>
                </div>
                <button type="button" aria-label={catalogoInicio.botones.mas_opciones} className="grid h-8 w-8 flex-none place-items-center rounded-control border-0 bg-transparent text-texto-suave">
                  <Icono name="puntos" className="h-4 w-4" />
                </button>
              </div>
              <p className="m-0 px-4 pb-3.5 text-[12.5px] leading-[1.55] text-[#3c394f]">
                {PUBLICACION_INICIO.texto}<br />¡Gran trabajo equipo! 💪🎉
              </p>
              <div className="grid grid-cols-3 gap-1 px-4 pb-3.5">
                <div className="relative aspect-square rounded-lg bg-[linear-gradient(135deg,#dcd6ff,#efe9ff)]" />
                <div className="relative aspect-square rounded-lg bg-[linear-gradient(135deg,#dcd6ff,#efe9ff)]" />
                <div className="relative aspect-square rounded-lg bg-[linear-gradient(135deg,#dcd6ff,#efe9ff)] after:absolute after:inset-0 after:grid after:place-items-center after:rounded-lg after:bg-[rgba(20,15,40,0.55)] after:text-[15px] after:font-extrabold after:text-white after:content-['+8']" />
              </div>
              <div className="flex items-center justify-between border-t border-[#f0eef5] px-4 py-2.5 text-[11px] text-texto-suave">
                <span>{PUBLICACION_INICIO.reacciones}</span><span>{PUBLICACION_INICIO.comentarios}</span>
              </div>
              <div className="flex border-t border-[#f0eef5]">
                <button type="button" className="flex flex-1 items-center justify-center gap-1.5 border-0 bg-transparent p-2.5 text-xs text-texto-suave hover:bg-[#f8f7fc] hover:text-primario">
                  <Icono name="me-gusta" className="h-[15px] w-[15px]" /> {catalogoInicio.botones.me_gusta}
                </button>
                <button type="button" className="flex flex-1 items-center justify-center gap-1.5 border-0 bg-transparent p-2.5 text-xs text-texto-suave hover:bg-[#f8f7fc] hover:text-primario">
                  <Icono name="comentario" className="h-[15px] w-[15px]" /> {catalogoInicio.botones.comentar}
                </button>
                <button type="button" className="flex flex-1 items-center justify-center gap-1.5 border-0 bg-transparent p-2.5 text-xs text-texto-suave hover:bg-[#f8f7fc] hover:text-primario">
                  <Icono name="compartir" className="h-[15px] w-[15px]" /> {catalogoInicio.botones.compartir}
                </button>
              </div>
            </article>

            <article className="mb-4 rounded-xl border border-borde bg-white shadow-sombra">
              <div className="flex items-center gap-2.5 px-4 py-3.5">
                <AvatarImagen src={usuarioImg} className={AVATAR} />
                <div className="min-w-0 flex-1">
                  <strong className="block text-[13px] text-texto">{PUBLICACION_COMPARTIDA_INICIO.nombre}</strong>
                  <span className="mt-0.5 block text-[10px] text-texto-suave">{catalogoInicio.leyendas.compartio_una_publicacion}</span>
                  <span className="mt-0.5 block text-[10px] text-texto-suave">{PUBLICACION_COMPARTIDA_INICIO.tiempoCompartio}</span>
                </div>
                <button type="button" aria-label={catalogoInicio.botones.mas_opciones} className="grid h-8 w-8 flex-none place-items-center rounded-control border-0 bg-transparent text-texto-suave">
                  <Icono name="puntos" className="h-4 w-4" />
                </button>
              </div>
              <div className="mx-4 mb-4 overflow-hidden rounded-[10px] border border-borde">
                <div className="flex items-center gap-2.5 px-3.5 pb-2 pt-3">
                  <AvatarImagen src={usuarioImg} className={AVATAR} />
                  <div className="min-w-0 flex-1">
                    <strong className="block text-[13px] text-texto">{PUBLICACION_COMPARTIDA_INICIO.origenNombre}</strong>
                    <span className="mt-0.5 block text-[10px] text-texto-suave">{PUBLICACION_COMPARTIDA_INICIO.origenTiempo}</span>
                  </div>
                </div>
                <p className="m-0 px-3.5 pb-2.5 text-xs leading-[1.55] text-[#3c394f]">
                  {PUBLICACION_COMPARTIDA_INICIO.texto}
                </p>
                <div className="mx-3.5 mb-3 h-[140px] rounded-lg bg-[linear-gradient(135deg,#dcd6ff,#efe9ff)]" />
                <a href="#" className="mx-3.5 mb-3 block text-[11px] text-primario no-underline">{catalogoInicio.botones.ver_mas}</a>
              </div>
            </article>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <section className="rounded-xl border border-borde bg-white p-4">
              <div className="mb-3.5 flex items-center justify-between">
                <h2 className="m-0 text-[13px] text-texto">{catalogoInicio.secciones.contactos_en_linea}</h2>
                <a href="#" className="text-[11px] text-primario no-underline">{textosRedSocial.VER_TODOS}</a>
              </div>
              {CONTACTOS_LINEA.map((c) => (
                <article key={c.nombre} className="flex items-center gap-2 border-b border-[#f0eef5] py-2">
                  <AvatarImagen src={usuarioImg} className={AVATAR} />
                  <div className="min-w-0 flex-1">
                    <strong className="block text-[11px] text-texto">
                      {c.nombre}{' '}
                      {c.colaborador && <span className="ml-1 text-[9px] font-bold text-exito">{catalogoInicio.leyendas.colaborador}</span>}
                    </strong>
                  </div>
                  <span className="ml-auto h-2 w-2 flex-none rounded-full bg-exito" />
                </article>
              ))}
            </section>

            <section className="rounded-xl border border-borde bg-white p-4">
              <div className="mb-3.5 flex items-center justify-between">
                <h2 className="m-0 text-[13px] text-texto">{catalogoInicio.secciones.grupos_recomendados}</h2>
                <a href="#" className="text-[11px] text-primario no-underline">{textosRedSocial.VER_TODOS}</a>
              </div>
              {GRUPOS_RECOMENDADOS.map((g) => (
                <div key={g.nombre} className="flex items-center gap-2.5 py-2">
                  <span className="h-[38px] w-[38px] flex-none rounded-[9px] bg-primario-suave" />
                  <div className="min-w-0 flex-1">
                    <strong className="block truncate text-[11.5px] text-texto">{g.nombre}</strong>
                    <span className="mt-0.5 block truncate text-[9.5px] text-texto-suave">{g.miembros}</span>
                  </div>
                  <button type="button" aria-label={catalogoInicio.botones.unirse} className="grid h-[26px] w-[26px] flex-none place-items-center rounded-full border border-borde bg-white text-primario">
                    <Icono name="mas" className="h-[13px] w-[13px]" />
                  </button>
                </div>
              ))}
            </section>

            <section className="rounded-xl border border-borde bg-white p-4">
              <div className="mb-3.5 flex items-center justify-between">
                <h2 className="m-0 text-[13px] text-texto">{catalogoInicio.secciones.eventos_proximos}</h2>
                <a href="#" className="text-[11px] text-primario no-underline">{textosRedSocial.VER_TODOS}</a>
              </div>
              {EVENTOS_PROXIMOS.map((e) => (
                <article key={e.titulo} className="grid grid-cols-[52px_1fr] gap-3.5 border-b border-[#f0eef5] py-2.5">
                  <div className="grid h-[52px] w-[52px] place-content-center place-items-center rounded-lg bg-primario-suave text-primario">
                    <strong className="text-lg">{e.dia}</strong>
                    <span className="text-[8px] font-extrabold">{e.mes}</span>
                  </div>
                  <div>
                    <h3 className="m-0 text-[13px] text-texto">{e.titulo}</h3>
                    <p className="m-0 mt-1 text-[10px] text-texto-suave">{e.detalle}</p>
                  </div>
                </article>
              ))}
            </section>
          </aside>
        }
      />
    </EstructuraApp>
  )
}
