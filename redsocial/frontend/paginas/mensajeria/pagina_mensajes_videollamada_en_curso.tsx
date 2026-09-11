import { useState } from 'react'
import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { CampoBusqueda } from '../../componentes/compartido/interfaz/campo_busqueda'
import usuarioImg from '../../../recursos/imagenes/usuario.jpg'
import type { ParticipanteVL } from '@/tipos/mensajeria/pagina_mensajes_videollamada_en_curso'

const PARTICIPANTES: ParticipanteVL[] = [
  { nombre: 'Pedro Lozano (Tú)', rol: 'Organizador', organizador: true, micActivo: true, videoActivo: true },
  { nombre: 'María Fernández', rol: 'En línea', micActivo: true, videoActivo: true },
  { nombre: 'Luis Rodríguez', rol: 'Colaborador', micActivo: true, videoActivo: true },
  { nombre: 'Carmen López', rol: 'Colaborador', micActivo: true, videoActivo: true },
  { nombre: 'Diego Mendoza', rol: 'Colaborador', micActivo: true, videoActivo: true },
  { nombre: 'Ana García', rol: 'Colaborador', micActivo: true, videoActivo: true },
  { nombre: 'Jorge Torres', rol: 'Colaborador', micActivo: false, videoActivo: true },
  { nombre: 'Lucía Gómez', rol: 'Colaborador', micActivo: true, videoActivo: true },
  { nombre: 'Sofía Ramírez', rol: 'Colaborador', micActivo: false, videoActivo: true },
  { nombre: 'Carlos Sánchez', rol: 'Colaborador', micActivo: true, videoActivo: true },
  { nombre: 'Mónica Valdez', rol: 'Colaborador', micActivo: true, videoActivo: true },
  { nombre: 'Javier Rojas', rol: 'Colaborador', micActivo: true, videoActivo: true },
  { nombre: 'Natalia Vera', rol: 'Colaborador', micActivo: false, videoActivo: false },
  { nombre: 'Ricardo Silva', rol: 'Invitado', micActivo: true, videoActivo: true },
  { nombre: 'Daniela Costa', rol: 'Invitado', micActivo: true, videoActivo: true },
]

export function PaginaMensajesVideollamadaEnCurso() {
  const [participantesAbiertos, setParticipantesAbiertos] = useState(false)
  const [micActivo, setMicActivo] = useState(true)
  const [camaraActivo, setCamaraActivo] = useState(true)

  return (
    <EstructuraApp paginaActiva="mensajes">
      <div className="-mx-6 -mt-6.25 -mb-10.5 flex h-[calc(100vh-64px)] min-w-0 flex-col gap-3.5 px-5 pb-5 pt-5 max-[800px]:-mx-3 max-[800px]:-mt-4.5 max-[800px]:-mb-4.5">
        <header className="flex flex-wrap items-center gap-4 rounded-xl border border-borde bg-white px-4 py-3">
          <div className="min-w-[200px] flex-1">
            <strong className="block text-[13.5px] text-texto">Reunión de seguimiento del proyecto Puente Central</strong>
            <p className="m-0 mt-0.5 flex flex-wrap items-center gap-2 text-[11.5px] text-texto-suave">
              <span>10:00 AM - 11:00 AM</span>
              <span className="inline-flex items-center gap-1.25 text-exito">
                <span className="h-[7px] w-[7px] rounded-full bg-exito" /> En llamada
              </span>
              <span className="[font-variant-numeric:tabular-nums]">00:35:42</span>
            </p>
          </div>
          <div className="flex flex-none items-center gap-2">
            <button type="button" aria-label="Ver participantes" onClick={() => setParticipantesAbiertos(true)} className="inline-flex h-8.5 items-center gap-1.5 rounded-lg border-0 bg-primario-suave px-3 text-[12.5px] font-bold text-primario">
              <Icono name="usuarios" className="h-[15px] w-[15px]" /> 15
            </button>
            <button type="button" aria-label="Chat" className="grid h-8.5 w-8.5 flex-none place-items-center rounded-lg border-0 bg-[#f6f4ff] text-texto">
              <Icono name="comentario" className="h-4 w-4" />
            </button>
            <button type="button" aria-label="Seguridad de la llamada" className="grid h-8.5 w-8.5 flex-none place-items-center rounded-lg border-0 bg-[#f6f4ff] text-texto">
              <Icono name="escudo" className="h-4 w-4" />
            </button>
            <button type="button" aria-label="Grabando la llamada" className="grid h-8.5 w-8.5 flex-none place-items-center rounded-lg border-0 bg-[#fdecec] text-peligro">
              <Icono name="punto-circular" className="h-4 w-4" />
            </button>
            <button type="button" aria-label="Más opciones" className="grid h-8.5 w-8.5 flex-none place-items-center rounded-lg border-0 bg-[#f6f4ff] text-texto">
              <Icono name="puntos" className="h-4 w-4" />
            </button>
          </div>
          <a href="12-04-mensajes-04-videollamadas.html" className="inline-flex h-9.5 flex-none items-center gap-1.75 whitespace-nowrap rounded-lg bg-peligro px-4 text-[13px] font-bold text-white no-underline">
            <Icono name="llamada" className="h-[15px] w-[15px] rotate-[135deg]" /> Salir de la llamada
          </a>
        </header>

        <div className="relative flex min-h-0 flex-1 gap-4">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-2.5">
            <div className="grid min-h-0 flex-1 auto-rows-[minmax(120px,1fr)] grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-3 overflow-y-auto rounded-[14px] bg-[#0f0c1e] p-4 max-[780px]:grid-cols-[repeat(auto-fill,minmax(130px,1fr))] max-[480px]:grid-cols-[repeat(auto-fill,minmax(105px,1fr))] max-[480px]:gap-2">
              {PARTICIPANTES.map((p) => (
                <article key={p.nombre} className="relative min-h-[120px] overflow-hidden rounded-[10px]" style={{ background: 'linear-gradient(155deg, #362a63, #1c1735)' }}>
                  {p.organizador && (
                    <span className="absolute left-2 top-2 z-[1] rounded-md bg-[rgba(15,12,30,.55)] px-2.25 py-0.75 text-[10px] font-bold text-white">Organizador</span>
                  )}
                  <div
                    className="absolute inset-0 bg-primario-suave bg-cover bg-center opacity-[.92]"
                    style={{ backgroundImage: `url(${usuarioImg})` }}
                  />
                  <div className="absolute inset-x-2 bottom-2 z-[1] flex items-center gap-1.5">
                    <span className="min-w-0 flex-1 truncate rounded-md bg-[rgba(15,12,30,.55)] px-2.25 py-1 text-[11px] font-semibold text-white">{p.nombre}</span>
                    <span className={'grid h-6 w-6 flex-none place-items-center rounded-full p-1.25 ' + (p.micActivo ? 'bg-[rgba(30,154,104,.9)] text-white' : 'bg-[rgba(15,12,30,.55)] text-[#f2a0a0]')}>
                      <Icono name={p.micActivo ? 'microfono' : 'microfono-apagado'} className="h-full w-full" />
                    </span>
                    <span className={'grid h-6 w-6 flex-none place-items-center rounded-full p-1.25 ' + (p.videoActivo ? 'bg-[rgba(30,154,104,.9)] text-white' : 'bg-[rgba(15,12,30,.55)] text-[#f2a0a0]')}>
                      <Icono name={p.videoActivo ? 'video' : 'video-apagado'} className="h-full w-full" />
                    </span>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex max-w-full flex-none items-center gap-1 self-center overflow-x-auto rounded-[14px] bg-[rgba(15,12,30,.9)] px-2.5 py-2">
              <button type="button" onClick={() => setMicActivo((v) => !v)} className="flex flex-none flex-col items-center gap-1 rounded-[10px] border-0 bg-transparent px-2.5 py-1.5 text-white hover:bg-white/[.08]">
                <span className="relative flex items-center">
                  <Icono name="microfono" className={'h-[19px] w-[19px] ' + (micActivo ? 'text-exito' : '')} />
                  <Icono name="flecha-arriba" className="ml-0.5 h-[11px] w-[11px]" />
                </span>
                <small className="whitespace-nowrap text-[10px]">Micrófono</small>
              </button>
              <button type="button" onClick={() => setCamaraActivo((v) => !v)} className="flex flex-none flex-col items-center gap-1 rounded-[10px] border-0 bg-transparent px-2.5 py-1.5 text-white hover:bg-white/[.08]">
                <span className="relative flex items-center">
                  <Icono name="video" className={'h-[19px] w-[19px] ' + (camaraActivo ? 'text-exito' : '')} />
                  <Icono name="flecha-arriba" className="ml-0.5 h-[11px] w-[11px]" />
                </span>
                <small className="whitespace-nowrap text-[10px]">Cámara</small>
              </button>
              <button type="button" className="flex flex-none flex-col items-center gap-1 rounded-[10px] border-0 bg-transparent px-2.5 py-1.5 text-white hover:bg-white/[.08]">
                <Icono name="pantalla-compartida" className="h-[19px] w-[19px]" />
                <small className="whitespace-nowrap text-[10px]">Compartir pantalla</small>
              </button>
              <button type="button" onClick={() => setParticipantesAbiertos(true)} className="flex flex-none flex-col items-center gap-1 rounded-[10px] border-0 bg-transparent px-2.5 py-1.5 text-white hover:bg-white/[.08]">
                <span className="relative flex items-center">
                  <Icono name="usuarios" className="h-[19px] w-[19px]" />
                  <span className="absolute -right-2.5 -top-1.5 grid h-[15px] min-w-[15px] place-items-center rounded-lg bg-primario px-0.75 text-[9px] font-bold text-white">15</span>
                </span>
                <small className="whitespace-nowrap text-[10px]">Participantes</small>
              </button>
              <button type="button" className="flex flex-none flex-col items-center gap-1 rounded-[10px] border-0 bg-transparent px-2.5 py-1.5 text-white hover:bg-white/[.08]">
                <Icono name="comentario" className="h-[19px] w-[19px]" />
                <small className="whitespace-nowrap text-[10px]">Chat</small>
              </button>
              <button type="button" className="flex flex-none flex-col items-center gap-1 rounded-[10px] border-0 bg-transparent px-2.5 py-1.5 text-white hover:bg-white/[.08]">
                <Icono name="sentimiento" className="h-[19px] w-[19px]" />
                <small className="whitespace-nowrap text-[10px]">Reacciones</small>
              </button>
              <button type="button" className="flex flex-none flex-col items-center gap-1 rounded-[10px] border-0 bg-transparent px-2.5 py-1.5 text-white hover:bg-white/[.08]">
                <Icono name="puntos" className="h-[19px] w-[19px]" />
                <small className="whitespace-nowrap text-[10px]">Más</small>
              </button>
              <a href="12-04-mensajes-04-videollamadas.html" aria-label="Salir de la llamada" className="ml-2 grid h-[46px] w-[46px] flex-none place-items-center rounded-full bg-peligro text-white">
                <Icono name="llamada" className="h-[19px] w-[19px] rotate-[135deg]" />
              </a>
            </div>
          </div>

          {participantesAbiertos && (
            <div className="fixed inset-0 z-[29] bg-[rgba(15,12,30,.4)] max-[1100px]:block hidden" onClick={() => setParticipantesAbiertos(false)} />
          )}

          <aside
            className={
              'flex w-[300px] flex-none min-h-0 flex-col rounded-[14px] border border-borde bg-white p-3.5 ' +
              'max-[1100px]:fixed max-[1100px]:inset-y-0 max-[1100px]:right-0 max-[1100px]:z-30 max-[1100px]:w-[min(320px,88vw)] max-[1100px]:rounded-none max-[1100px]:transition-transform max-[1100px]:duration-200 ' +
              (participantesAbiertos ? 'max-[1100px]:translate-x-0' : 'max-[1100px]:translate-x-full')
            }
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="m-0 text-sm font-bold text-texto">Participantes (15)</h2>
              <button type="button" aria-label="Cerrar" onClick={() => setParticipantesAbiertos(false)} className="grid h-6.5 w-6.5 place-items-center rounded-md border-0 bg-transparent text-texto-suave">
                <Icono name="cerrar" className="h-3.5 w-3.5" />
              </button>
            </div>

            <CampoBusqueda placeholder="Buscar participantes..." className="mb-2.5 w-full" />

            <div className="mb-2.5 flex gap-1.5 overflow-x-auto">
              <button type="button" className="inline-flex flex-none items-center gap-1 whitespace-nowrap rounded-[20px] border border-primario bg-primario px-2.75 py-1.25 text-[11px] font-medium text-white">
                Todos <span className="text-[10px]">15</span>
              </button>
              <button type="button" className="inline-flex flex-none items-center gap-1 whitespace-nowrap rounded-[20px] border border-borde bg-white px-2.75 py-1.25 text-[11px] font-medium text-texto-suave">
                En línea <span className="text-[10px]">12</span>
              </button>
              <button type="button" className="inline-flex flex-none items-center gap-1 whitespace-nowrap rounded-[20px] border border-borde bg-white px-2.75 py-1.25 text-[11px] font-medium text-texto-suave">
                Invitados <span className="text-[10px]">3</span>
              </button>
              <button type="button" aria-label="Más filtros" className="grid h-6.5 w-6.5 flex-none place-items-center rounded-[20px] border border-borde bg-white text-[11px] font-medium text-texto-suave">+</button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
              {PARTICIPANTES.map((p) => (
                <article key={p.nombre} className="flex items-center gap-2 py-1.75">
                  <span
                    className="h-8 w-8 flex-none rounded-full bg-primario-suave bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${usuarioImg})` }}
                  />
                  <div className="min-w-0 flex-1">
                    <strong className="block truncate text-xs text-texto">{p.nombre}</strong>
                    <span className="block text-[10.5px] text-texto-suave">{p.rol}</span>
                  </div>
                  <Icono name={p.micActivo ? 'microfono' : 'microfono-apagado'} className={'h-[15px] w-[15px] flex-none ' + (p.micActivo ? 'text-exito' : 'text-peligro')} />
                  <Icono name={p.videoActivo ? 'video' : 'video-apagado'} className={'h-[15px] w-[15px] flex-none ' + (p.videoActivo ? 'text-exito' : 'text-peligro')} />
                  <button type="button" aria-label="Más opciones" className="grid h-5.5 w-5.5 flex-none place-items-center border-0 bg-transparent text-texto-suave">
                    <Icono name="puntos" className="h-3.5 w-3.5" />
                  </button>
                </article>
              ))}
            </div>

            <div className="mt-2.5 grid gap-2 border-t border-borde pt-2.5">
              <button type="button" className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-borde bg-white px-4 py-2 text-[13px] font-medium text-texto hover:border-primario hover:text-primario">
                <Icono name="enlace" className="h-3.5 w-3.5" /> Invitar por enlace
              </button>
              <button type="button" className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-borde bg-white px-4 py-2 text-[13px] font-medium text-texto hover:border-primario hover:text-primario">
                <Icono name="microfono-apagado" className="h-3.5 w-3.5" /> Silenciar a todos
              </button>
            </div>
          </aside>
        </div>
      </div>
    </EstructuraApp>
  )
}
