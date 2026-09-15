import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { CampoBusqueda } from '../../componentes/compartido/interfaz/campo_busqueda'
import { AvatarImagen } from '../../componentes/compartido/interfaz/avatar_imagen'
import usuarioImg from '../../../recursos/imagenes/usuario.jpg'
import { SESION_ACTUAL } from '../../datos/compartido/sesion_actual'
import {
  DISPOSITIVOS,
  CONFIGURACION_LLAMADA,
  PARTICIPANTES_INICIAR,
  CONTACTOS_INVITAR,
  OPCIONES_LLAMADA,
  DETALLE_REUNION,
  VOLVER_A_VIDEOLLAMADAS,
} from '../../datos/mensajeria/videollamada_iniciar'

export function PaginaMensajesVideollamadaIniciar() {
  return (
    <EstructuraApp paginaActiva="mensajes">
      <a href="12-04-mensajes-04-videollamadas.html" className="mb-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primario no-underline hover:underline">
        <Icono name="flecha-izquierda" className="h-[15px] w-[15px]" /> {VOLVER_A_VIDEOLLAMADAS}
      </a>

      <div className="grid grid-cols-[minmax(400px,720px)_minmax(320px,400px)] items-start gap-10 max-[1000px]:grid-cols-1 max-[1000px]:gap-5">
        <section className="min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="m-0 text-[23px] font-extrabold tracking-[-0.02em] text-texto">{catalogoMensajeria.titulos.videollamada_iniciar}</h1>
              <p className="m-0 mt-1 text-[13px] text-texto-suave">{catalogoMensajeria.subtitulos.videollamada_iniciar}</p>
            </div>
          </div>

          <div className="relative my-5 h-[420px] overflow-hidden rounded-[14px] bg-[linear-gradient(135deg,#2c2059,#4630d7)] max-[900px]:h-[320px]">
            <button type="button" aria-label={catalogoMensajeria.botones.cambiar_camara} className="absolute right-3.5 top-3.5 grid h-8.5 w-8.5 place-items-center rounded-lg border-0 bg-[rgba(15,12,30,.45)] text-white">
              <Icono name="video" className="h-4 w-4" />
            </button>
            <span className="absolute bottom-3.5 left-3.5 rounded-lg bg-[rgba(15,12,30,.55)] px-3 py-1.25 text-xs font-semibold text-white">{SESION_ACTUAL.usuario}</span>
            <div className="absolute bottom-3.5 left-1/2 flex -translate-x-1/2 items-center gap-2.5">
              <button type="button" aria-label={catalogoMensajeria.botones.silenciar_microfono} className="grid h-[42px] w-[42px] place-items-center rounded-full border-0 bg-white text-texto">
                <Icono name="microfono" className="h-4.5 w-4.5" />
              </button>
              <button type="button" aria-label={catalogoMensajeria.botones.apagar_camara} className="grid h-[42px] w-[42px] place-items-center rounded-full border-0 bg-white text-texto">
                <Icono name="video" className="h-4.5 w-4.5" />
              </button>
              <button type="button" aria-label={catalogoMensajeria.botones.configuracion} className="grid h-[42px] w-[42px] place-items-center rounded-full border-0 bg-[rgba(15,12,30,.55)] text-white">
                <Icono name="ajustes-sistema" className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 items-start gap-4 max-[900px]:grid-cols-1">
            <section className="rounded-xl border border-borde bg-white p-4">
              <h2 className="m-0 mb-3 text-sm font-bold text-texto">{catalogoMensajeria.secciones.dispositivos}</h2>
              {DISPOSITIVOS.map((d, i, arr) => (
                <div key={d.titulo} className={'flex items-center gap-2.5 py-2.5 ' + (i < arr.length - 1 ? 'border-b border-borde' : '')}>
                  <Icono name={d.icono} className="h-[17px] w-[17px] flex-none text-texto-suave" />
                  <div className="min-w-0 flex-1">
                    <strong className="block text-[12.5px] text-texto">{d.titulo}</strong>
                    <span className="block truncate text-[11px] text-texto-suave">{d.detalle}</span>
                  </div>
                  <Icono name="flecha-abajo" className="h-3.5 w-3.5 flex-none text-texto-suave" />
                </div>
              ))}
              <a href="#" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primario no-underline">
                <Icono name="actualizar" className="h-3.5 w-3.5" /> {catalogoMensajeria.botones.probar_dispositivos}
              </a>
            </section>

            <section className="rounded-xl border border-borde bg-white p-4">
              <h2 className="m-0 mb-3 text-sm font-bold text-texto">{catalogoMensajeria.secciones.configuracion_llamada}</h2>
              {CONFIGURACION_LLAMADA.map((c, i, arr) => (
                <div key={c.titulo} className={'flex items-center gap-2.5 py-2.5 ' + (i < arr.length - 1 ? 'border-b border-borde' : '')}>
                  <Icono name={c.icono} className="h-[17px] w-[17px] flex-none text-texto-suave" />
                  <div className="min-w-0 flex-1">
                    <strong className="block text-[12.5px] text-texto">{c.titulo}</strong>
                    <span className="block truncate text-[11px] text-texto-suave">{c.detalle}</span>
                  </div>
                  <label className="relative inline-block h-[22px] w-[38px] flex-none">
                    <input type="checkbox" defaultChecked className="peer sr-only" />
                    <span className="absolute inset-0 rounded-full bg-borde transition-colors peer-checked:bg-primario before:absolute before:left-[3px] before:top-[3px] before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-transform before:content-[''] peer-checked:before:translate-x-4" />
                  </label>
                </div>
              ))}
            </section>
          </div>

          <a href="14-04-mensajes-04-videollamadas-iniciar-encurso.html" className="mt-5 flex w-full items-center justify-center gap-2 rounded-[7px] border border-transparent bg-primario py-3.25 text-sm font-medium text-white no-underline hover:bg-primario-oscuro">
            <Icono name="video" className="h-[17px] w-[17px]" /> {catalogoMensajeria.botones.iniciar_videollamada}
          </a>
          <a href="12-04-mensajes-04-videollamadas.html" className="mt-2.5 block text-center text-[13px] text-texto-suave no-underline hover:underline">{catalogoMensajeria.botones.cancelar}</a>
        </section>

        <aside className="grid min-w-0 gap-4">
          <section className="rounded-xl border border-borde bg-white p-4">
            <div className="mb-2.5 flex items-center justify-between">
              <h2 className="m-0 text-sm font-bold text-texto">{catalogoMensajeria.botones.participantes} ({PARTICIPANTES_INICIAR.length})</h2>
              <Icono name="flecha-abajo" className="h-[15px] w-[15px] text-texto-suave" />
            </div>
            {PARTICIPANTES_INICIAR.map((p) => (
              <article key={p.nombre} className="flex items-center gap-2.5 py-2">
                <AvatarImagen src={usuarioImg} className="h-8 w-8 flex-none rounded-full bg-primario-suave" />
                <div className="min-w-0 flex-1">
                  <strong className="block truncate text-[12.5px] text-texto">{p.nombre}</strong>
                  <span className="block text-[11px] text-exito">{p.rol}</span>
                </div>
                <Icono name="microfono" className="h-[15px] w-[15px] flex-none text-exito" />
              </article>
            ))}

            <h3 className="mb-2 mt-3.5 text-[12.5px] font-bold text-texto">{catalogoMensajeria.secciones.invitar_mas_personas}</h3>
            <CampoBusqueda placeholder={catalogoMensajeria.placeholders.buscar_contactos_o_correo} className="mb-1.5 w-full" />

            <div className="flex flex-col">
              {CONTACTOS_INVITAR.map((nombre) => (
                <article key={nombre} className="flex items-center gap-2.5 py-2">
                  <AvatarImagen src={usuarioImg} className="h-8 w-8 flex-none rounded-full bg-primario-suave" />
                  <div className="min-w-0 flex-1">
                    <strong className="block truncate text-[12.5px] text-texto">{nombre}</strong>
                    <span className="block text-[11px] text-texto-suave">{catalogoMensajeria.leyendas.colaborador}</span>
                  </div>
                  <button type="button" className="flex-none whitespace-nowrap rounded-lg border border-borde bg-white px-3 py-1 text-[11.5px] font-medium text-texto hover:border-primario hover:text-primario">{catalogoMensajeria.botones.invitar}</button>
                </article>
              ))}
            </div>

            <button type="button" className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-borde bg-white px-4 py-2 text-[13px] font-medium text-texto hover:border-primario hover:text-primario">
              <Icono name="enlace" className="h-3.5 w-3.5" /> {catalogoMensajeria.botones.copiar_enlace_reunion}
            </button>
          </section>

          <section className="rounded-xl border border-borde bg-white p-4">
            <h2 className="m-0 mb-2.5 text-sm font-bold text-texto">{catalogoMensajeria.secciones.opciones_llamada}</h2>
            {OPCIONES_LLAMADA.map((o) => (
              <button key={o.titulo} type="button" className="flex w-full items-center gap-2.5 border-0 bg-transparent py-2 text-left">
                <span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-primario-suave text-primario">
                  <Icono name={o.icono} className="h-[15px] w-[15px]" />
                </span>
                <div className="min-w-0 flex-1">
                  <strong className="block text-[12.5px] text-texto">{o.titulo}</strong>
                  <span className="block text-[11px] text-texto-suave">{o.detalle}</span>
                </div>
                <Icono name="flecha-derecha" className="h-3.5 w-3.5 flex-none text-texto-suave" />
              </button>
            ))}
          </section>

          <section className="rounded-xl border border-borde bg-white p-4">
            <h2 className="m-0 mb-2.5 text-sm font-bold text-texto">{catalogoMensajeria.secciones.detalles_reunion}</h2>
            <strong className="mb-2.5 block text-[12.5px] text-texto">{DETALLE_REUNION.titulo}</strong>
            <div className="mb-2 flex items-center gap-2 text-xs text-texto-suave">
              <Icono name="calendario" className="h-3.5 w-3.5 flex-none" /> {DETALLE_REUNION.fecha}
            </div>
            <div className="mb-2 flex items-center gap-2 text-xs text-texto-suave">
              <Icono name="reloj" className="h-3.5 w-3.5 flex-none" /> {DETALLE_REUNION.horario}
            </div>
            <div className="flex items-center gap-2 text-xs text-texto-suave">
              <Icono name="usuarios" className="h-3.5 w-3.5 flex-none" /> {DETALLE_REUNION.participantes}
            </div>
          </section>
        </aside>
      </div>
    </EstructuraApp>
  )
}
