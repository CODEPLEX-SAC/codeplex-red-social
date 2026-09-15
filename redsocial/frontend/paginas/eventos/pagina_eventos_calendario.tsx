import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { PestanasEventos } from '../../componentes/eventos/bloques/pestanas_eventos'
import { SuperficieColor } from '../../componentes/compartido/interfaz/superficie_color'
import type { EventoCalGrid } from '@/tipos/eventos/pagina_eventos_calendario'
import { CELDAS, PROXIMOS_LATERAL, MES_CALENDARIO_ACTUAL, LEYENDA_CALENDARIO } from '../../datos/eventos/calendario'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'

const DIAS_SEMANA = catalogoEventos.dias_semana

const COLOR_EVENTO_CAL: Record<EventoCalGrid['color'], string> = {
  musica: 'bg-[#dcfce7] text-[#166534]',
  tecnologia: 'bg-[#ede9fe] text-[#5b21b6]',
  negocios: 'bg-[#fef9c3] text-[#854d0e]',
  educacion: 'bg-[#dbeafe] text-[#1e40af]',
  empresa: 'bg-[#dcfce7] text-[#166534]',
}

const SEMANAS_MINI: { numero: string; otroMes?: boolean; hoy?: boolean; conPunto?: boolean }[][] = [
  [
    { numero: '29', otroMes: true }, { numero: '30', otroMes: true }, { numero: '31', otroMes: true },
    { numero: '01' }, { numero: '02' }, { numero: '03' }, { numero: '04' },
  ],
  [
    { numero: '05' }, { numero: '06' }, { numero: '07' }, { numero: '08' }, { numero: '09' }, { numero: '10' }, { numero: '11' },
  ],
  [
    { numero: '12' }, { numero: '13' }, { numero: '14' }, { numero: '15', hoy: true, conPunto: true }, { numero: '16' }, { numero: '17' }, { numero: '18' },
  ],
  [
    { numero: '19' }, { numero: '20' }, { numero: '21' }, { numero: '22', conPunto: true }, { numero: '23' }, { numero: '24' }, { numero: '25' },
  ],
  [
    { numero: '26' }, { numero: '27' }, { numero: '28' }, { numero: '29' }, { numero: '30' },
    { numero: '01', otroMes: true }, { numero: '02', otroMes: true },
  ],
]

export function PaginaEventosCalendario() {
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
                  <h1 className="m-0 text-[22px] font-extrabold text-texto">
                    {catalogoEventos.titulos.seccion} <span className="text-primario">/ {catalogoEventos.titulos.calendario}</span>
                  </h1>
                  <p className="m-0 mt-0.5 text-[13px] text-texto-suave">{catalogoEventos.subtitulos.calendario}</p>
                </div>
              </div>
            </div>

            <PestanasEventos activa="28-08-eventos-06-calendario-web.html" insigniaInvitaciones={{ valor: 2, estilo: 'pill' }} />

            <div className="flex items-center gap-3 border-b border-gris-borde py-3">
              <button type="button" className="rounded-lg border border-gris-borde bg-fondo px-4 py-2 text-sm font-semibold text-gris-texto hover:border-primario">{catalogoEventos.botones.hoy}</button>
              <div className="flex items-center gap-1">
                <button type="button" className="flex h-8 w-8 items-center justify-center rounded-md border border-gris-borde bg-fondo text-base text-gris-texto hover:border-primario">‹</button>
                <button type="button" className="flex h-8 w-8 items-center justify-center rounded-md border border-gris-borde bg-fondo text-base text-gris-texto hover:border-primario">›</button>
              </div>
              <span className="ml-2 flex items-center gap-1.5 text-base font-bold text-gris-oscuro-texto">
                {MES_CALENDARIO_ACTUAL} <span className="text-[10px] text-gris-texto-terciario">▾</span>
              </span>
              <div className="ml-auto flex items-center overflow-hidden rounded-lg border border-gris-borde">
                <button type="button" className="border-r border-gris-borde bg-[#f3f4f6] px-4 py-2 text-sm font-semibold text-gris-texto">{catalogoEventos.botones.vista_mes}</button>
                <button type="button" className="border-r border-gris-borde bg-fondo px-4 py-2 text-sm font-medium text-gris-texto hover:bg-[#f3f4f6]">{catalogoEventos.botones.vista_semana}</button>
                <button type="button" className="bg-fondo px-4 py-2 text-sm font-medium text-gris-texto hover:bg-[#f3f4f6]">{catalogoEventos.botones.vista_dia}</button>
              </div>
              <button type="button" className="ml-3 flex items-center gap-1.5 rounded-lg border border-gris-borde bg-fondo px-3.5 py-2 text-sm text-gris-texto hover:border-primario">
                <Icono name="filtro" className="h-3.5 w-3.5" /> {catalogoEventos.filtros.filtros}
              </button>
            </div>

            <div className="mt-4 overflow-x-auto overflow-y-hidden rounded-xl border border-gris-borde bg-fondo">
              <div className="grid min-w-[700px] grid-cols-7 border-b border-gris-borde bg-[#f9fafb]">
                {DIAS_SEMANA.map((d) => (
                  <span key={d} className="py-2.5 text-center text-[11px] font-semibold uppercase tracking-wide text-gris-texto-terciario">{d}</span>
                ))}
              </div>
              <div className="grid min-w-[700px] grid-cols-7">
                {CELDAS.map((c, i) => (
                  <div
                    key={i}
                    className={
                      'flex min-h-[100px] flex-col gap-1 p-1.5 ' +
                      ((i + 1) % 7 !== 0 ? 'border-r border-gris-borde ' : '') +
                      (i < CELDAS.length - 7 ? 'border-b border-gris-borde ' : '') +
                      (c.otroMes ? 'bg-[#fafafa]' : '')
                    }
                  >
                    <span className={'mb-0.5 flex h-6 w-6 items-center justify-center rounded-full text-[13px] font-semibold ' + (c.hoy ? 'bg-primario font-bold text-white' : c.otroMes ? 'text-[#d1d5db]' : 'text-gris-texto')}>
                      {c.numero}
                    </span>
                    {c.evento && (
                      <div className={'rounded px-1.5 py-0.75 text-[10px] leading-[1.3] ' + COLOR_EVENTO_CAL[c.evento.color]}>
                        <span className="block font-semibold">{c.evento.hora}</span>
                        <span className="block truncate font-medium">{c.evento.nombre}</span>
                      </div>
                    )}
                    {c.masTexto && c.evento && (
                      <span className={'mt-0.5 block rounded px-1.5 py-0.75 text-[10px] font-semibold leading-[1.3] ' + COLOR_EVENTO_CAL[c.evento.color]}>{c.masTexto}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <section className="overflow-hidden rounded-xl border border-[#eee] bg-white">
              <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
                <h3 className="m-0 text-sm font-bold text-texto">{catalogoEventos.secciones.calendario}</h3>
                <a href="#" className="text-[11px] font-semibold text-primario no-underline hover:underline">{catalogoEventos.botones.hoy}</a>
              </div>
              <div className="px-4 pb-3">
                <div className="mb-2.5 flex items-center justify-between px-1">
                  <button type="button" className="grid h-6 w-6 place-items-center rounded-md border-0 bg-transparent text-primario hover:bg-[#f5f3ff]">
                    <Icono name="flecha-izquierda" className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-[13px] font-bold text-texto">{MES_CALENDARIO_ACTUAL}</span>
                  <button type="button" className="grid h-6 w-6 place-items-center rounded-md border-0 bg-transparent text-primario hover:bg-[#f5f3ff]">
                    <Icono name="flecha-derecha" className="h-3.5 w-3.5" />
                  </button>
                </div>
                <table className="w-full border-collapse text-center">
                  <thead>
                    <tr>
                      {DIAS_SEMANA.map((d) => (
                        <th key={d} className="py-1 text-[10px] font-semibold uppercase text-texto-suave">{d}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SEMANAS_MINI.map((semana, i) => (
                      <tr key={i}>
                        {semana.map((dia, j) => (
                          <td key={j} className={'relative py-1 text-[11px] ' + (dia.otroMes ? 'text-[#d0cdd9]' : 'text-texto')}>
                            <span className={'inline-flex h-6 w-6 items-center justify-center rounded-full ' + (dia.hoy ? 'bg-primario font-bold text-white' : '')}>
                              {dia.numero}
                            </span>
                            {dia.conPunto && <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primario" />}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="overflow-hidden rounded-xl border border-[#eee] bg-white">
              <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
                <h3 className="m-0 text-sm font-bold text-texto">{catalogoEventos.secciones.proximos}</h3>
                <a href="24-08-eventos-02-proximos-web.html" className="text-[11px] font-semibold text-primario no-underline hover:underline">{textosRedSocial.VER_TODOS}</a>
              </div>
              <div className="px-3 pb-2">
                {PROXIMOS_LATERAL.map((ev, i) => (
                  <article key={ev.nombre} className={'grid grid-cols-[64px_1fr] gap-2.5 py-2 ' + (i < PROXIMOS_LATERAL.length - 1 ? 'border-b border-[#f5f5f5]' : '')}>
                    <div className="relative h-16 w-16 flex-none overflow-hidden rounded-lg">
                      <SuperficieColor degradado={ev.gradiente} className="h-full w-full" />
                      <div className="absolute left-1 top-1 rounded-[4px] bg-white px-1 py-0.5 text-center leading-none shadow-[0_1px_3px_rgba(0,0,0,0.15)]">
                        <span className="block text-[11px] font-extrabold text-gris-oscuro-texto">{ev.dia}</span>
                        <span className="block text-[7px] font-bold uppercase text-gris-texto-terciario">{ev.mes}</span>
                      </div>
                    </div>
                    <div className="flex min-w-0 flex-col justify-center gap-[3px]">
                      <span className="text-[13px] font-bold leading-tight text-gris-oscuro-texto">{ev.nombre}</span>
                      <span className="flex items-center gap-1 text-[11px] leading-snug text-gris-texto-terciario">
                        <Icono name="calendario" className="h-3 w-3" /> {ev.fechaHora}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] leading-snug text-gris-texto-terciario">
                        <Icono name="ubicacion" className="h-3 w-3" /> {ev.ubicacion}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-gris-texto-terciario">
                        <Icono name="usuarios" className="h-3 w-3" /> {ev.asistentes}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-xl border border-[#eee] bg-white">
              <div className="px-4 pb-2.5 pt-3.5">
                <h3 className="m-0 text-sm font-bold text-texto">{catalogoEventos.secciones.leyenda}</h3>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 px-4 pb-3.5 pt-1">
                {LEYENDA_CALENDARIO.map((l) => (
                  <span key={l.nombre} className="flex items-center gap-1.5 text-xs text-gris-texto">
                    <SuperficieColor as="span" variante={l.color} className="h-2 w-2 flex-none rounded-full" /> {l.nombre}
                  </span>
                ))}
              </div>
            </section>
          </aside>
        }
      />
    </EstructuraApp>
  )
}
