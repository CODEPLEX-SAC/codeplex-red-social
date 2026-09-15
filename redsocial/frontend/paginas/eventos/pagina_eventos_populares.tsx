import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { PestanasEventos } from '../../componentes/eventos/bloques/pestanas_eventos'
import { SuperficieColor } from '../../componentes/compartido/interfaz/superficie_color'
import { TextoColor } from '../../componentes/compartido/interfaz/texto_color'
import usuarioImg from '../../../recursos/imagenes/usuario.jpg'
import {
  EVENTOS,
  PROXIMAS_FECHAS_POPULARES as PROXIMAS_FECHAS,
  CATEGORIAS_LATERAL_POPULARES as CATEGORIAS_LATERAL,
  MES_CALENDARIO_POPULARES,
} from '../../datos/eventos/populares'

const DIAS_SEMANA = catalogoEventos.dias_semana

const SEMANAS_CALENDARIO: { numero: string; otroMes?: boolean; hoy?: boolean }[][] = [
  [
    { numero: '29', otroMes: true }, { numero: '30', otroMes: true }, { numero: '31', otroMes: true },
    { numero: '01' }, { numero: '02' }, { numero: '03' }, { numero: '04' },
  ],
  [
    { numero: '05' }, { numero: '06' }, { numero: '07' }, { numero: '08' }, { numero: '09' }, { numero: '10' }, { numero: '11' },
  ],
  [
    { numero: '12' }, { numero: '13' }, { numero: '14' }, { numero: '15', hoy: true }, { numero: '16' }, { numero: '17' }, { numero: '18' },
  ],
  [
    { numero: '19' }, { numero: '20' }, { numero: '21' }, { numero: '22' }, { numero: '23' }, { numero: '24' }, { numero: '25' },
  ],
  [
    { numero: '26' }, { numero: '27' }, { numero: '28' }, { numero: '29' }, { numero: '30' },
    { numero: '01', otroMes: true }, { numero: '02', otroMes: true },
  ],
]

export function PaginaEventosPopulares() {
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
                    {catalogoEventos.titulos.seccion} <span className="text-primario">/ {catalogoEventos.titulos.populares}</span>
                  </h1>
                  <p className="m-0 mt-0.5 text-[13px] text-texto-suave">{catalogoEventos.subtitulos.populares}</p>
                </div>
              </div>
            </div>

            <PestanasEventos activa="25-08-eventos-03-populares-web.html" insigniaInvitaciones={{ valor: 2, estilo: 'pill' }} />

            <div className="mb-6 flex flex-wrap items-center gap-2">
              <button type="button" className="inline-flex h-8 items-center gap-1.25 whitespace-nowrap rounded-lg border border-primario bg-primario px-3 text-xs font-medium text-white">
                <Icono name="fuego" className="h-3.5 w-3.5" /> {catalogoEventos.filtros.mas_populares} <Icono name="flecha-abajo" className="h-3.5 w-3.5" />
              </button>
              <button type="button" className="inline-flex h-8 items-center gap-1.25 whitespace-nowrap rounded-lg border border-borde bg-white px-3 text-xs font-medium text-texto-suave hover:border-primario hover:text-primario">
                <Icono name="calendario" className="h-3.5 w-3.5" /> {catalogoEventos.filtros.fecha} <Icono name="flecha-abajo" className="h-3.5 w-3.5" />
              </button>
              <button type="button" className="inline-flex h-8 items-center gap-1.25 whitespace-nowrap rounded-lg border border-borde bg-white px-3 text-xs font-medium text-texto-suave hover:border-primario hover:text-primario">
                <Icono name="categoria-evento" className="h-3.5 w-3.5" /> {catalogoEventos.filtros.categoria} <Icono name="flecha-abajo" className="h-3.5 w-3.5" />
              </button>
              <button type="button" className="inline-flex h-8 items-center gap-1.25 whitespace-nowrap rounded-lg border border-borde bg-white px-3 text-xs font-medium text-texto-suave hover:border-primario hover:text-primario">
                <Icono name="ubicacion" className="h-3.5 w-3.5" /> {catalogoEventos.filtros.ubicacion} <Icono name="flecha-abajo" className="h-3.5 w-3.5" />
              </button>
              <button type="button" className="inline-flex h-8 items-center gap-1.25 whitespace-nowrap rounded-lg border border-borde bg-white px-3 text-xs font-medium text-texto-suave hover:border-primario hover:text-primario">
                <Icono name="filtro" className="h-3.5 w-3.5" /> {catalogoEventos.filtros.filtros}
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {EVENTOS.map((ev) => (
                <article key={ev.nombre} className="relative grid grid-cols-[140px_1fr] overflow-hidden rounded-xl border border-[#eee] bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,.08)] max-[1100px]:grid-cols-[120px_1fr] max-[900px]:grid-cols-1">
                  <div className="relative min-h-[180px] overflow-hidden">
                    <SuperficieColor degradado={ev.categoria} className="h-full w-full" />
                    <div className="absolute left-3.5 top-3.5 rounded-[10px] bg-white px-3 py-2 text-center shadow-[0_2px_8px_rgba(0,0,0,.12)]">
                      <span className="block text-xl font-extrabold leading-[1.1] text-texto">{ev.dia}</span>
                      <span className="mt-px block text-[10px] font-bold uppercase text-texto-suave">{ev.mes}</span>
                    </div>
                  </div>
                  <div className="flex flex-col p-5">
                    <TextoColor variante={ev.categoria} className="mb-1 inline-block text-[10px] font-bold uppercase tracking-wide">{ev.categoriaEtiqueta}</TextoColor>
                    <h3 className="m-0 mb-1.5 text-base font-bold leading-[1.3] text-texto">{ev.nombre}</h3>
                    <p className="m-0 mb-3 text-xs leading-[1.5] text-texto-suave">{ev.descripcion}</p>
                    <div className="mb-3.5 flex flex-wrap gap-3.5">
                      <span className="flex items-center gap-1.25 text-xs text-texto-suave"><Icono name="calendario" className="h-3.5 w-3.5 text-primario" /> {ev.fecha}</span>
                      <span className="flex items-center gap-1.25 text-xs text-texto-suave"><Icono name="calendario" className="h-3.5 w-3.5 text-primario" /> {ev.hora}</span>
                      <span className="flex items-center gap-1.25 text-xs text-texto-suave"><Icono name="ubicacion" className="h-3.5 w-3.5 text-primario" /> {ev.ubicacion}</span>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center">
                        {Array.from({ length: ev.avatares }).map((_, i) => (
                          <img key={i} src={usuarioImg} alt="" className={'h-7 w-7 rounded-full border-2 border-white object-cover' + (i > 0 ? ' -ml-2' : '')} />
                        ))}
                        <span className="-ml-1 inline-flex h-7 items-center rounded-[14px] border-2 border-white bg-[#ede9fe] px-2 text-[10px] font-bold text-primario">{ev.masAsistentes}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button type="button" className="inline-flex h-8 items-center justify-center whitespace-nowrap rounded-[7px] border border-primario bg-white px-4 text-xs font-semibold text-primario hover:bg-primario hover:text-white">{catalogoEventos.botones.ver_detalles}</button>
                        <button type="button" aria-label={catalogoEventos.botones.guardar_evento} className="grid h-8 w-8 flex-none place-items-center rounded-[7px] border border-borde bg-white text-texto-suave hover:border-primario hover:text-primario">
                          <Icono name="guardado" className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="absolute right-3 top-3 z-[2] inline-flex items-center gap-1.5 whitespace-nowrap rounded-[20px] bg-white/95 px-2.5 py-1.25 shadow-[0_2px_8px_rgba(0,0,0,.1)]">
                    <span className="flex h-6 w-6 flex-none items-center justify-center gap-px rounded-full border-2 border-[#6366f1] text-[10px] font-extrabold text-[#6366f1]">
                      <Icono name="corona" className="h-[13px] w-[13px]" />{ev.ranking}
                    </span>
                    <span className="whitespace-nowrap text-[10px] font-semibold text-texto-suave">{catalogoEventos.insignias.mas_popular}</span>
                    <span className="inline-flex flex-none items-center gap-0.5 whitespace-nowrap text-[10px] font-bold text-texto">
                      <Icono name="fuego" className="h-3.5 w-3.5 fill-[#6366f1] stroke-none" />1
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <section className="overflow-hidden rounded-xl border border-[#eee] bg-white">
              <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
                <h3 className="m-0 text-sm font-bold text-texto">{catalogoEventos.secciones.calendario}</h3>
                <a href="#" className="text-[11px] font-semibold text-primario no-underline hover:underline">{catalogoEventos.botones.ver_calendario}</a>
              </div>
              <div className="px-4 pb-3">
                <div className="mb-2.5 flex items-center justify-between px-1">
                  <button type="button" className="grid h-6 w-6 place-items-center rounded-md border-0 bg-transparent text-primario hover:bg-[#f5f3ff]">
                    <Icono name="flecha-izquierda" className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-[13px] font-bold text-texto">{MES_CALENDARIO_POPULARES}</span>
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
                    {SEMANAS_CALENDARIO.map((semana, i) => (
                      <tr key={i}>
                        {semana.map((dia, j) => (
                          <td key={j} className={'relative py-1 text-[11px] ' + (dia.otroMes ? 'text-[#d0cdd9]' : 'text-texto')}>
                            <span className={'inline-flex h-6 w-6 items-center justify-center rounded-full ' + (dia.hoy ? 'bg-primario font-bold text-white' : '')}>
                              {dia.numero}
                            </span>
                            {dia.hoy && <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primario" />}
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
                <h3 className="m-0 text-sm font-bold text-texto">{catalogoEventos.secciones.mis_proximas_fechas}</h3>
                <a href="#" className="text-[11px] font-semibold text-primario no-underline hover:underline">{textosRedSocial.VER_TODAS}</a>
              </div>
              <div className="px-4 pb-1">
                {PROXIMAS_FECHAS.map((f) => (
                  <article key={f.nombre} className="flex items-start gap-2.5 border-b border-[#f5f5f5] py-2 last:border-b-0">
                    <div className="w-9 flex-none text-center">
                      <span className="block text-base font-extrabold leading-none text-texto">{f.dia}</span>
                      <span className="block text-[8px] font-bold uppercase text-texto-suave">{f.mes}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="mb-0.5 block text-xs font-bold text-texto">{f.nombre}</span>
                      <span className="flex items-center gap-1 text-[11px] leading-[1.35] text-texto-suave">
                        <SuperficieColor as="span" variante={f.punto} className="h-1.5 w-1.5 flex-none rounded-full" /> {f.detalle}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-xl border border-[#eee] bg-white">
              <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
                <h3 className="m-0 text-sm font-bold text-texto">{catalogoEventos.secciones.categorias}</h3>
                <a href="#" className="text-[11px] font-semibold text-primario no-underline hover:underline">{textosRedSocial.VER_TODAS}</a>
              </div>
              <div className="px-4 pb-2">
                {CATEGORIAS_LATERAL.map((c) => (
                  <article key={c.nombre} className="flex items-center gap-2.5 border-b border-[#f5f5f5] py-2 last:border-b-0">
                    <SuperficieColor variante={c.color} className="grid h-7 w-7 flex-none place-items-center rounded-[7px]">
                      <Icono name={c.icono} className="h-3.5 w-3.5 text-white" />
                    </SuperficieColor>
                    <span className="flex-1 text-xs font-medium text-texto">{c.nombre}</span>
                    <span className="flex-none text-xs font-semibold text-texto-suave">{c.conteo}</span>
                  </article>
                ))}
              </div>
              <a href="#" className="flex items-center justify-center gap-1.5 border-t border-[#f0eef5] px-4 py-3 text-xs font-semibold text-primario no-underline hover:underline">
                {catalogoEventos.botones.ver_mas_categorias} <Icono name="flecha-derecha" className="h-3.5 w-3.5" />
              </a>
            </section>
          </aside>
        }
      />
    </EstructuraApp>
  )
}
