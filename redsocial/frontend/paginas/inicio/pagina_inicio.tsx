import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { useCarrusel } from '../../servicios/compartido/usar_carrusel'
import usuarioImg from '../../../recursos/imagenes/usuario.jpg'
import type { Historia } from '@/tipos/inicio/pagina_inicio'

const AVATAR = 'h-8 w-8 flex-none rounded-full bg-primario-suave bg-cover bg-center bg-no-repeat'
const ESTILO_AVATAR = { backgroundImage: `url(${usuarioImg})` }

const HISTORIAS: Historia[] = [
  { nombre: 'Tu historia', crear: true },
  { nombre: 'Maria F.' },
  { nombre: 'Luis R.' },
  { nombre: 'Carmen L.' },
  { nombre: 'Diego M.' },
  { nombre: 'Ana G.' },
  { nombre: 'Grupo Ing.' },
  { nombre: 'Javier T.' },
  { nombre: 'Sofía R.' },
  { nombre: 'Equipo TI' },
]

const CONTACTOS_LINEA: { nombre: string; colaborador?: boolean }[] = [
  { nombre: 'Ana García', colaborador: true },
  { nombre: 'Luis Rodríguez', colaborador: true },
  { nombre: 'Carmen López', colaborador: true },
  { nombre: 'Diego Mendoza' },
  { nombre: 'María Fernández' },
]

const GRUPOS_RECOMENDADOS = [
  { nombre: 'Ingenieros Civiles', miembros: '12.4 mil miembros' },
  { nombre: 'Emprendedores Perú', miembros: '8.7 mil miembros' },
  { nombre: 'Tecnología & Innovación', miembros: '5.3 mil miembros' },
]

const EVENTOS_PROXIMOS = [
  { dia: '15', mes: 'JUN', titulo: 'Reunión de Proyectos', detalle: 'Lun, 15 jun · 10:00 AM · Oficina Principal' },
  { dia: '22', mes: 'JUN', titulo: 'Capacitación en Seguridad', detalle: 'Lun, 22 jun · 2:00 PM · Virtual' },
  { dia: '30', mes: 'JUN', titulo: 'Cumpleaños: Juan Pérez', detalle: 'Mar, 30 jun · Todo el día' },
]

function Historias() {
  const carrusel = useCarrusel()
  return (
    <section className="relative mb-4 rounded-xl border border-borde bg-white pt-4">
      <h2 className="m-0 mb-3 px-4 text-[13px] text-texto">Historias</h2>
      <div
        ref={carrusel.pistaRef}
        className="flex gap-3 overflow-x-auto px-4 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {HISTORIAS.map((h) => (
          <div key={h.nombre} className="flex w-[110px] flex-none cursor-pointer flex-col items-center gap-2">
            <span
              className={
                'relative grid h-[104px] w-[104px] place-items-center rounded-full p-[3.5px] ' +
                (h.crear ? 'bg-borde' : '')
              }
              style={!h.crear ? { background: 'linear-gradient(45deg, #8f7cf3, var(--primario), var(--primario-oscuro))' } : undefined}
            >
              <span
                className="h-full w-full rounded-full border-[3px] border-white bg-primario-suave bg-cover bg-center bg-no-repeat"
                style={ESTILO_AVATAR}
              />
              {h.crear && (
                <span className="absolute -bottom-0.5 -right-0.5 grid h-[30px] w-[30px] place-items-center rounded-full border-[3px] border-white bg-primario text-lg font-bold leading-none text-white">
                  +
                </span>
              )}
            </span>
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
  return (
    <EstructuraApp paginaActiva="inicio">
      <EstructuraTresColumnas
        principal={
          <section>
            <article className="mb-4 rounded-xl border border-borde bg-white p-4 shadow-sombra">
              <div className="mb-3 flex items-center gap-2.5">
                <span className={AVATAR} style={ESTILO_AVATAR} />
                <input
                  type="text"
                  placeholder="¿Qué estás pensando, Pedro?"
                  aria-label="¿Qué estás pensando, Pedro?"
                  className="min-w-0 flex-1 rounded-full border border-borde bg-fondo px-4 py-2.5 text-[13px] text-texto outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-1 border-t border-borde pt-2.5">
                <button type="button" className="flex flex-1 basis-[120px] items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border-0 bg-transparent p-2 text-xs text-texto-suave hover:bg-[#f8f7fc]">
                  <Icono name="foto-video" className="h-4 w-4" /> Foto/Video
                </button>
                <button type="button" className="flex flex-1 basis-[120px] items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border-0 bg-transparent p-2 text-xs text-texto-suave hover:bg-[#f8f7fc]">
                  <Icono name="encuesta" className="h-4 w-4" /> Encuesta
                </button>
                <button type="button" className="flex flex-1 basis-[120px] items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border-0 bg-transparent p-2 text-xs text-texto-suave hover:bg-[#f8f7fc]">
                  <Icono name="sentimiento" className="h-4 w-4" /> Sentimiento
                </button>
                <button type="button" className="flex flex-1 basis-[120px] items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border-0 bg-transparent p-2 text-xs text-texto-suave hover:bg-[#f8f7fc]">
                  <Icono name="puntos" className="h-4 w-4" /> Más
                </button>
              </div>
            </article>

            <Historias />

            <article className="mb-4 rounded-xl border border-borde bg-white shadow-sombra">
              <div className="flex items-center gap-2.5 px-4 py-3.5">
                <span className={AVATAR} style={ESTILO_AVATAR} />
                <div className="min-w-0 flex-1">
                  <strong className="block text-[13px] text-texto">María Fernández</strong>
                  <span className="mt-0.5 block text-[10px] text-texto-suave">2 horas · 🌐</span>
                </div>
                <button type="button" aria-label="Más opciones" className="grid h-8 w-8 flex-none place-items-center rounded-control border-0 bg-transparent text-texto-suave">
                  <Icono name="puntos" className="h-4 w-4" />
                </button>
              </div>
              <p className="m-0 px-4 pb-3.5 text-[12.5px] leading-[1.55] text-[#3c394f]">
                Avance del proyecto del puente en la Av. Central.<br />¡Gran trabajo equipo! 💪🎉
              </p>
              <div className="grid grid-cols-3 gap-1 px-4 pb-3.5">
                <div className="relative aspect-square rounded-lg" style={{ background: 'linear-gradient(135deg, #dcd6ff, #efe9ff)' }} />
                <div className="relative aspect-square rounded-lg" style={{ background: 'linear-gradient(135deg, #dcd6ff, #efe9ff)' }} />
                <div className="relative aspect-square rounded-lg after:absolute after:inset-0 after:grid after:place-items-center after:rounded-lg after:bg-[rgba(20,15,40,0.55)] after:text-[15px] after:font-extrabold after:text-white after:content-['+8']" style={{ background: 'linear-gradient(135deg, #dcd6ff, #efe9ff)' }} />
              </div>
              <div className="flex items-center justify-between border-t border-[#f0eef5] px-4 py-2.5 text-[11px] text-texto-suave">
                <span>👍❤️😮 128</span><span>24 comentarios</span>
              </div>
              <div className="flex border-t border-[#f0eef5]">
                <button type="button" className="flex flex-1 items-center justify-center gap-1.5 border-0 bg-transparent p-2.5 text-xs text-texto-suave hover:bg-[#f8f7fc] hover:text-primario">
                  <Icono name="me-gusta" className="h-[15px] w-[15px]" /> Me gusta
                </button>
                <button type="button" className="flex flex-1 items-center justify-center gap-1.5 border-0 bg-transparent p-2.5 text-xs text-texto-suave hover:bg-[#f8f7fc] hover:text-primario">
                  <Icono name="comentario" className="h-[15px] w-[15px]" /> Comentar
                </button>
                <button type="button" className="flex flex-1 items-center justify-center gap-1.5 border-0 bg-transparent p-2.5 text-xs text-texto-suave hover:bg-[#f8f7fc] hover:text-primario">
                  <Icono name="compartir" className="h-[15px] w-[15px]" /> Compartir
                </button>
              </div>
            </article>

            <article className="mb-4 rounded-xl border border-borde bg-white shadow-sombra">
              <div className="flex items-center gap-2.5 px-4 py-3.5">
                <span className={AVATAR} style={ESTILO_AVATAR} />
                <div className="min-w-0 flex-1">
                  <strong className="block text-[13px] text-texto">Luis Rodríguez</strong>
                  <span className="mt-0.5 block text-[10px] text-texto-suave">compartió una publicación.</span>
                  <span className="mt-0.5 block text-[10px] text-texto-suave">3 horas · 🌐</span>
                </div>
                <button type="button" aria-label="Más opciones" className="grid h-8 w-8 flex-none place-items-center rounded-control border-0 bg-transparent text-texto-suave">
                  <Icono name="puntos" className="h-4 w-4" />
                </button>
              </div>
              <div className="mx-4 mb-4 overflow-hidden rounded-[10px] border border-borde">
                <div className="flex items-center gap-2.5 px-3.5 pb-2 pt-3">
                  <span className={AVATAR} style={ESTILO_AVATAR} />
                  <div className="min-w-0 flex-1">
                    <strong className="block text-[13px] text-texto">Ingenieros Unidos</strong>
                    <span className="mt-0.5 block text-[10px] text-texto-suave">5 horas</span>
                  </div>
                </div>
                <p className="m-0 px-3.5 pb-2.5 text-xs leading-[1.55] text-[#3c394f]">
                  Normas de seguridad en obras: siempre primero la prevención.
                </p>
                <div className="mx-3.5 mb-3 h-[140px] rounded-lg" style={{ background: 'linear-gradient(135deg, #dcd6ff, #efe9ff)' }} />
                <a href="#" className="mx-3.5 mb-3 block text-[11px] text-primario no-underline">Ver más</a>
              </div>
            </article>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <section className="rounded-xl border border-borde bg-white p-4">
              <div className="mb-3.5 flex items-center justify-between">
                <h2 className="m-0 text-[13px] text-texto">Contactos en línea</h2>
                <a href="#" className="text-[11px] text-primario no-underline">Ver todos</a>
              </div>
              {CONTACTOS_LINEA.map((c) => (
                <article key={c.nombre} className="flex items-center gap-2 border-b border-[#f0eef5] py-2">
                  <span className={AVATAR} style={ESTILO_AVATAR} />
                  <div className="min-w-0 flex-1">
                    <strong className="block text-[11px] text-texto">
                      {c.nombre}{' '}
                      {c.colaborador && <span className="ml-1 text-[9px] font-bold text-exito">(COLABORADOR)</span>}
                    </strong>
                  </div>
                  <span className="ml-auto h-2 w-2 flex-none rounded-full bg-exito" />
                </article>
              ))}
            </section>

            <section className="rounded-xl border border-borde bg-white p-4">
              <div className="mb-3.5 flex items-center justify-between">
                <h2 className="m-0 text-[13px] text-texto">Grupos recomendados</h2>
                <a href="#" className="text-[11px] text-primario no-underline">Ver todos</a>
              </div>
              {GRUPOS_RECOMENDADOS.map((g) => (
                <div key={g.nombre} className="flex items-center gap-2.5 py-2">
                  <span className="h-[38px] w-[38px] flex-none rounded-[9px] bg-primario-suave" />
                  <div className="min-w-0 flex-1">
                    <strong className="block truncate text-[11.5px] text-texto">{g.nombre}</strong>
                    <span className="mt-0.5 block truncate text-[9.5px] text-texto-suave">{g.miembros}</span>
                  </div>
                  <button type="button" aria-label="Unirse" className="grid h-[26px] w-[26px] flex-none place-items-center rounded-full border border-borde bg-white text-primario">
                    <Icono name="mas" className="h-[13px] w-[13px]" />
                  </button>
                </div>
              ))}
            </section>

            <section className="rounded-xl border border-borde bg-white p-4">
              <div className="mb-3.5 flex items-center justify-between">
                <h2 className="m-0 text-[13px] text-texto">Eventos próximos</h2>
                <a href="#" className="text-[11px] text-primario no-underline">Ver todos</a>
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
