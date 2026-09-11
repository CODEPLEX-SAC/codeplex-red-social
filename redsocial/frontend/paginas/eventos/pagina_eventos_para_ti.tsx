import { useRef, useState } from 'react'
import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { Boton } from '../../componentes/compartido/interfaz/boton'
import { CampoBusqueda } from '../../componentes/compartido/interfaz/campo_busqueda'
import { PestanasEventos } from '../../componentes/eventos/bloques/pestanas_eventos'
import type { IconName } from '../../tipos/compartido/icono'
import type { EventoDestacado, EventoProximo } from '@/tipos/eventos/pagina_eventos_para_ti'

const CATEGORIA_GRADIENTE: Record<'tecnologia' | 'negocios' | 'educacion' | 'gastronomia', string> = {
  tecnologia: 'linear-gradient(135deg, #667eea, #764ba2)',
  negocios: 'linear-gradient(135deg, #f093fb, #f5576c)',
  educacion: 'linear-gradient(135deg, #4facfe, #00f2fe)',
  gastronomia: 'linear-gradient(135deg, #fa709a, #fee140)',
}

const CATEGORIA_COLOR: Record<keyof typeof CATEGORIA_GRADIENTE, string> = {
  tecnologia: '#667eea',
  negocios: '#f5576c',
  educacion: '#4facfe',
  gastronomia: '#fa709a',
}

const DESTACADOS: EventoDestacado[] = [
  { categoriaEtiqueta: 'Música', gradiente: 'linear-gradient(135deg, #2d1b69, #11998e)', dia: '24', mes: 'AGO', nombre: 'Concierto Codeplex Live 2026', descripcion: 'Una noche increíble con los mejores artistas.\n¡No te lo pierdas!', fecha: 'Sáb, 24 Ago 2026', hora: '7:00 PM', ubicacion: 'Arena 1, Lima', asistentes: '+128 asistirán' },
  { categoriaEtiqueta: 'Negocios', gradiente: 'linear-gradient(135deg, #f093fb, #f5576c)', dia: '10', mes: 'SEP', nombre: 'Feria de Emprendimiento Codeplex', descripcion: 'Conecta con inversionistas y emprendedores de todo el país.\nCupos limitados.', fecha: 'Jue, 10 Sep 2026', hora: '9:00 AM', ubicacion: 'Centro de Convenciones Lima', asistentes: '+95 asistirán' },
  { categoriaEtiqueta: 'Tecnología', gradiente: 'linear-gradient(135deg, #667eea, #764ba2)', dia: '03', mes: 'OCT', nombre: 'Congreso de Innovación Tecnológica', descripcion: 'Las últimas tendencias en IA, nube y transformación digital.\nCon expositores internacionales.', fecha: 'Sáb, 3 Oct 2026', hora: '8:30 AM', ubicacion: 'Universidad de Lima', asistentes: '+150 asistirán' },
  { categoriaEtiqueta: 'Deportes', gradiente: 'linear-gradient(135deg, #11998e, #38ef7d)', dia: '15', mes: 'NOV', nombre: 'Maratón Codeplex 10K', descripcion: 'Corre por la ciudad y forma parte de la comunidad fitness.\nInscripciones abiertas.', fecha: 'Dom, 15 Nov 2026', hora: '6:00 AM', ubicacion: 'Circuito de Playas, Lima', asistentes: '+210 asistirán' },
]

const PROXIMOS: EventoProximo[] = [
  { categoria: 'tecnologia', categoriaEtiqueta: 'Tecnología', nombre: 'Codeplex Tech Summit', dia: '15', mes: 'JUN', fecha: 'Jue, 15 Jun 2026', ubicacion: 'Centro de Convenciones Lima', masAsistentes: '+86' },
  { categoria: 'negocios', categoriaEtiqueta: 'Negocios', nombre: 'Networking Empresarial', dia: '22', mes: 'JUN', fecha: 'Jue, 22 Jun 2026', ubicacion: 'WeWork San Isidro', masAsistentes: '+42' },
  { categoria: 'educacion', categoriaEtiqueta: 'Educación', nombre: 'Taller de Marketing Digital', dia: '05', mes: 'JUL', fecha: 'Sáb, 5 Jul 2026', ubicacion: 'Online', masAsistentes: '+56' },
  { categoria: 'gastronomia', categoriaEtiqueta: 'Gastronomía', nombre: 'Festival Gastronómico', dia: '18', mes: 'JUL', fecha: 'Vie, 18 Jul 2026', ubicacion: 'Parque de la Exposición', masAsistentes: '+74' },
]

const PROXIMOS_LATERAL = [
  { dia: '15', mes: 'JUN', nombre: 'Codeplex Tech Summit', linea1: 'Jue, 15 Jun 2026 - 9:00 AM', linea2: 'Centro de Convenciones Lima', asistentes: '86' },
  { dia: '22', mes: 'JUN', nombre: 'Networking Empresarial', linea1: 'Jue, 22 Jun 2026 - 6:00 PM', linea2: 'WeWork San Isidro', asistentes: '42' },
  { dia: '24', mes: 'AGO', nombre: 'Concierto Codeplex Live 2026', linea1: 'Sáb, 24 Ago 2026 - 7:00 PM', linea2: 'Arena 1, Lima', asistentes: '128' },
  { dia: '05', mes: 'JUL', nombre: 'Taller de Marketing Digital', linea1: 'Sáb, 5 Jul 2026 - 10:00 AM', linea2: 'Online', asistentes: '56' },
]

const CATEGORIAS_LATERAL: { icono: IconName; color: string; nombre: string; conteo: string }[] = [
  { icono: 'estrella', color: '#ec4899', nombre: 'Música', conteo: '128' },
  { icono: 'panel', color: '#6366f1', nombre: 'Tecnología', conteo: '95' },
  { icono: 'empresa', color: '#f97316', nombre: 'Negocios', conteo: '86' },
  { icono: 'calendario', color: '#3b82f6', nombre: 'Educación', conteo: '74' },
  { icono: 'actividad', color: '#22c55e', nombre: 'Deportes', conteo: '63' },
  { icono: 'carrito', color: '#ef4444', nombre: 'Gastronomía', conteo: '58' },
  { icono: 'imagen', color: '#8b5cf6', nombre: 'Arte y cultura', conteo: '42' },
  { icono: 'configuracion', color: '#06b6d4', nombre: 'Salud y bienestar', conteo: '38' },
]

export function PaginaEventosParaTi() {
  const [indiceDestacado, setIndiceDestacado] = useState(0)
  const pistaProximosRef = useRef<HTMLDivElement>(null)

  function alCambiarDestacado(direccion: -1 | 1) {
    setIndiceDestacado((actual) => (actual + direccion + DESTACADOS.length) % DESTACADOS.length)
  }

  function alDesplazarProximos(direccion: -1 | 1) {
    const pista = pistaProximosRef.current
    if (!pista) return
    pista.scrollBy({ left: direccion * pista.clientWidth * 0.9, behavior: 'smooth' })
  }

  const destacado = DESTACADOS[indiceDestacado]

  return (
    <EstructuraApp paginaActiva="eventos">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="grid h-10 w-10 flex-none place-items-center rounded-[10px] bg-[#f0edff] text-primario">
                  <Icono name="calendario" className="h-5.5 w-5.5" />
                </div>
                <div>
                  <h1 className="m-0 text-[22px] font-extrabold text-texto">Eventos</h1>
                  <p className="m-0 mt-0.5 text-[13px] text-texto-suave">Descubre eventos que te interesan o crea los tuyos propios.</p>
                </div>
              </div>
              <Boton variant="primario" size="md">
                <Icono name="crear-evento" className="h-4 w-4" /> Crear evento
              </Boton>
            </div>

            <div className="mb-5 flex items-center gap-3 max-[900px]:flex-col max-[900px]:items-stretch">
              <CampoBusqueda
                placeholder="Buscar eventos..."
                aria-label="Buscar eventos"
                className="min-w-0 flex-1 max-[900px]:w-full max-[900px]:flex-none"
              />
              <CampoBusqueda
                icono="ubicacion"
                placeholder="Ubicación"
                aria-label="Ubicación"
                className="min-w-0 flex-1 max-[900px]:w-full max-[900px]:flex-none"
              />
              <button type="button" className="flex h-11 flex-none items-center justify-center whitespace-nowrap rounded-[10px] border-0 bg-primario px-5 text-[13px] font-semibold text-white hover:bg-primario-oscuro max-[900px]:w-full">Buscar</button>
            </div>

            <PestanasEventos activa="23-08-eventos-01-para-ti-web.html" insigniaInvitaciones={{ valor: 7, estilo: 'pill' }} />

            <div className="mb-6 flex flex-wrap items-center gap-2">
              <button type="button" className="inline-flex h-8 items-center gap-1.25 whitespace-nowrap rounded-lg border border-primario bg-primario px-3 text-xs font-medium text-white">
                <Icono name="calendario" className="h-3.5 w-3.5" /> Todos los eventos <Icono name="flecha-abajo" className="h-3.5 w-3.5" />
              </button>
              <button type="button" className="inline-flex h-8 items-center gap-1.25 whitespace-nowrap rounded-lg border border-borde bg-white px-3 text-xs font-medium text-texto-suave hover:border-primario hover:text-primario">
                <Icono name="calendario" className="h-3.5 w-3.5" /> Fecha <Icono name="flecha-abajo" className="h-3.5 w-3.5" />
              </button>
              <button type="button" className="inline-flex h-8 items-center gap-1.25 whitespace-nowrap rounded-lg border border-borde bg-white px-3 text-xs font-medium text-texto-suave hover:border-primario hover:text-primario">
                <Icono name="categoria-evento" className="h-3.5 w-3.5" /> Categoría <Icono name="flecha-abajo" className="h-3.5 w-3.5" />
              </button>
              <button type="button" className="inline-flex h-8 items-center gap-1.25 whitespace-nowrap rounded-lg border border-borde bg-white px-3 text-xs font-medium text-texto-suave hover:border-primario hover:text-primario">
                <Icono name="ubicacion" className="h-3.5 w-3.5" /> Ubicación <Icono name="flecha-abajo" className="h-3.5 w-3.5" />
              </button>
              <button type="button" className="inline-flex h-8 items-center gap-1.25 whitespace-nowrap rounded-lg border border-borde bg-white px-3 text-xs font-medium text-texto-suave hover:border-primario hover:text-primario">
                <Icono name="filtro" className="h-3.5 w-3.5" /> Filtros
              </button>
            </div>

            <section className="mb-7">
              <div className="mb-3.5 flex items-center justify-between">
                <h2 className="m-0 text-base font-bold text-texto">Eventos destacados</h2>
              </div>
              <div className="grid grid-cols-2 overflow-hidden rounded-[14px] border border-[#eee] bg-white max-[900px]:grid-cols-1">
                <div className="relative min-h-[220px] overflow-hidden">
                  <div className="h-full w-full" style={{ background: destacado.gradiente }} />
                  <div className="absolute left-3.5 top-3.5 rounded-[10px] bg-white px-3 py-2 text-center shadow-[0_2px_8px_rgba(0,0,0,.12)]">
                    <span className="block text-xl font-extrabold leading-[1.1] text-texto">{destacado.dia}</span>
                    <span className="mt-px block text-[10px] font-bold uppercase text-texto-suave">{destacado.mes}</span>
                  </div>
                  <button type="button" aria-label="Anterior" onClick={() => alCambiarDestacado(-1)} className="absolute left-2.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border-0 bg-white/90 shadow-[0_2px_8px_rgba(0,0,0,.1)]">
                    <Icono name="flecha-izquierda" className="h-3.5 w-3.5 text-texto" />
                  </button>
                  <button type="button" aria-label="Siguiente" onClick={() => alCambiarDestacado(1)} className="absolute right-2.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border-0 bg-white/90 shadow-[0_2px_8px_rgba(0,0,0,.1)]">
                    <Icono name="flecha-derecha" className="h-3.5 w-3.5 text-texto" />
                  </button>
                </div>
                <div className="flex flex-col p-6">
                  <span className="mb-1.5 inline-block text-[11px] font-bold uppercase tracking-wide text-primario">{destacado.categoriaEtiqueta}</span>
                  <h3 className="m-0 mb-2 text-xl font-extrabold leading-[1.3] text-texto">{destacado.nombre}</h3>
                  <p className="m-0 mb-4 whitespace-pre-line text-[13px] leading-[1.5] text-texto-suave">{destacado.descripcion}</p>
                  <div className="mb-4 flex flex-wrap gap-4">
                    <span className="flex items-center gap-1.25 text-xs text-texto-suave"><Icono name="calendario" className="h-3.5 w-3.5 text-primario" /> {destacado.fecha}</span>
                    <span className="flex items-center gap-1.25 text-xs text-texto-suave"><Icono name="calendario" className="h-3.5 w-3.5 text-primario" /> {destacado.hora}</span>
                    <span className="flex items-center gap-1.25 text-xs text-texto-suave"><Icono name="ubicacion" className="h-3.5 w-3.5 text-primario" /> {destacado.ubicacion}</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <span key={i} className={'h-7 w-7 rounded-full border-2 border-white bg-primario-suave bg-[url(/imagenes/usuario.jpg)] bg-cover bg-center' + (i > 0 ? ' -ml-2' : '')} />
                      ))}
                      <span className="-ml-1 inline-flex h-7 items-center rounded-2xl border-2 border-white bg-[#ede9fe] px-2 text-[10px] font-bold text-primario">{destacado.asistentes}</span>
                    </div>
                    <button type="button" className="inline-flex h-[34px] items-center justify-center whitespace-nowrap rounded-lg border border-primario bg-white px-4.5 text-xs font-semibold text-primario hover:bg-primario hover:text-white">Ver detalles</button>
                  </div>
                </div>
              </div>
              <div className="mt-3.5 flex items-center justify-center gap-1.5">
                {DESTACADOS.map((d, i) => (
                  <button
                    key={d.nombre}
                    type="button"
                    aria-label={`Ir al destacado ${i + 1}`}
                    onClick={() => setIndiceDestacado(i)}
                    className={'rounded-full border-0 p-0 ' + (i === indiceDestacado ? 'h-2.5 w-2.5 bg-primario' : 'h-2 w-2 bg-[#d5d0e5]')}
                  />
                ))}
              </div>
            </section>

            <section>
              <div className="mb-3.5 flex items-center justify-between">
                <h2 className="m-0 text-base font-bold text-texto">Próximos eventos</h2>
                <a href="#" className="text-xs font-semibold text-primario no-underline hover:underline">Ver todos</a>
              </div>
              <div className="relative">
                <button
                  type="button"
                  aria-label="Anterior"
                  onClick={() => alDesplazarProximos(-1)}
                  className="absolute -left-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-[#e0dce8] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                >
                  <Icono name="flecha-izquierda" className="h-3.5 w-3.5 text-texto" />
                </button>
                <div
                  ref={pistaProximosRef}
                  className="flex gap-4 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {PROXIMOS.map((ev) => (
                    <article key={ev.nombre} className="w-55 flex-none overflow-hidden rounded-xl border border-[#eee] bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,.08)]">
                      <div className="relative h-[140px] overflow-hidden">
                        <div className="h-full w-full" style={{ background: CATEGORIA_GRADIENTE[ev.categoria] }} />
                        <div className="absolute left-2.5 top-2.5 rounded-[10px] bg-white px-2.5 py-1.5 text-center shadow-[0_2px_8px_rgba(0,0,0,.12)]">
                          <span className="block text-base font-extrabold leading-[1.1] text-texto">{ev.dia}</span>
                          <span className="block text-[9px] font-bold uppercase text-texto-suave">{ev.mes}</span>
                        </div>
                      </div>
                      <div className="p-3.5">
                        <span className="mb-1 inline-block text-[10px] font-bold uppercase tracking-wide" style={{ color: CATEGORIA_COLOR[ev.categoria] }}>{ev.categoriaEtiqueta}</span>
                        <h4 className="m-0 mb-1.5 text-[13px] font-bold leading-[1.3] text-texto">{ev.nombre}</h4>
                        <div className="mb-2.5 flex flex-col gap-0.75">
                          <span className="flex items-center gap-1.25 text-[11px] text-texto-suave"><Icono name="calendario" className="h-3.5 w-3.5 text-primario" /> {ev.fecha}</span>
                          <span className="flex items-center gap-1.25 text-[11px] text-texto-suave"><Icono name="ubicacion" className="h-3.5 w-3.5 text-primario" /> {ev.ubicacion}</span>
                        </div>
                        <div className="flex items-center">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <span key={i} className={'h-7 w-7 rounded-full border-2 border-white bg-primario-suave bg-[url(/imagenes/usuario.jpg)] bg-cover bg-center' + (i > 0 ? ' -ml-2' : '')} />
                          ))}
                          <span className="-ml-1 inline-flex h-7 items-center rounded-2xl border-2 border-white bg-[#ede9fe] px-2 text-[10px] font-bold text-primario">{ev.masAsistentes}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                <button
                  type="button"
                  aria-label="Siguiente"
                  onClick={() => alDesplazarProximos(1)}
                  className="absolute -right-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-[#e0dce8] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                >
                  <Icono name="flecha-derecha" className="h-3.5 w-3.5 text-texto" />
                </button>
              </div>
            </section>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <section className="overflow-hidden rounded-xl border border-[#eee] bg-white">
              <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
                <h3 className="m-0 text-sm font-bold text-texto">Próximos eventos</h3>
                <a href="#" className="text-[11px] font-semibold text-primario no-underline hover:underline">Ver calendario</a>
              </div>
              <div className="px-4 pb-1">
                {PROXIMOS_LATERAL.map((ev) => (
                  <article key={ev.nombre} className="flex items-start gap-2.5 border-b border-[#f5f5f5] py-2.25 last:border-b-0">
                    <div className="w-10 flex-none pt-0.5 text-center">
                      <span className="block text-lg font-extrabold leading-none text-texto">{ev.dia}</span>
                      <span className="block text-[9px] font-bold uppercase text-texto-suave">{ev.mes}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="mb-0.5 block text-xs font-bold text-texto">{ev.nombre}</span>
                      <span className="block text-[11px] leading-[1.35] text-texto-suave">{ev.linea1}</span>
                      <span className="block text-[11px] leading-[1.35] text-texto-suave">{ev.linea2}</span>
                      <span className="mt-0.75 flex items-center gap-1 text-[11px] text-texto-suave">
                        <Icono name="amigos" className="h-3 w-3" /> {ev.asistentes}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
              <a href="#" className="flex items-center justify-center gap-1.5 border-t border-[#f0eef5] px-4 py-3 text-xs font-semibold text-primario no-underline hover:underline">
                Ver todos los eventos <Icono name="flecha-derecha" className="h-3.5 w-3.5" />
              </a>
            </section>

            <section className="overflow-hidden rounded-xl border border-[#eee] bg-white">
              <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
                <h3 className="m-0 text-sm font-bold text-texto">Categorías</h3>
                <a href="#" className="text-[11px] font-semibold text-primario no-underline hover:underline">Ver todas</a>
              </div>
              <div className="px-4 pb-2">
                {CATEGORIAS_LATERAL.map((c) => (
                  <article key={c.nombre} className="flex items-center gap-2.5 border-b border-[#f5f5f5] py-2 last:border-b-0">
                    <div className="grid h-7 w-7 flex-none place-items-center rounded-[7px]" style={{ background: c.color }}>
                      <Icono name={c.icono} className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="flex-1 text-xs font-medium text-texto">{c.nombre}</span>
                    <span className="flex-none text-xs font-semibold text-texto-suave">{c.conteo}</span>
                  </article>
                ))}
              </div>
            </section>
          </aside>
        }
      />
    </EstructuraApp>
  )
}
