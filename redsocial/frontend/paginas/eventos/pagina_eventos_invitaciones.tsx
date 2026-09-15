import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { Icono } from '../../componentes/compartido/icono'
import { usarCarrusel } from '../../componentes/compartido/usar_carrusel'
import { PestanasEventos } from '../../componentes/eventos/bloques/pestanas_eventos'
import { SuperficieColor } from '../../componentes/compartido/interfaz/superficie_color'
import { TextoColor } from '../../componentes/compartido/interfaz/texto_color'
import type { IconName } from '../../tipos/compartido/icono'
import usuarioImg from '../../../recursos/imagenes/usuario.jpg'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import {
  PENDIENTES,
  RESPONDIDAS,
  PROXIMOS_LATERAL,
  MES_CALENDARIO_INVITACIONES,
  RESUMEN_INVITACIONES,
  CONTEO_PESTANAS_INVITACIONES,
} from '../../datos/eventos/invitaciones'

const DIAS_SEMANA = catalogoEventos.dias_semana

const SEMANAS_CALENDARIO: { numero: string; otroMes?: boolean; hoy?: boolean; conPunto?: boolean }[][] = [
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

export function PaginaEventosInvitaciones() {
  const filtros = usarCarrusel()

  return (
    <EstructuraApp paginaActiva="eventos">
      <EstructuraTresColumnas
        principal={
        <section>
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="grid h-10 w-10 flex-none place-items-center rounded-[10px] bg-primario-suave text-primario">
                <Icono name="calendario" className="w-[22px] h-[22px]" />
              </div>
              <div>
                <h1 className="m-0 text-[22px] font-extrabold text-texto">
                  {catalogoEventos.titulos.seccion} <span className="text-primario">/ {catalogoEventos.titulos.invitaciones}</span>
                </h1>
                <p className="m-0 mt-0.5 text-[13px] text-texto-suave">{catalogoEventos.subtitulos.invitaciones}</p>
              </div>
            </div>
          </div>

          <PestanasEventos activa="27-08-eventos-05-invitaciones-web.html" insigniaInvitaciones={{ valor: 2, estilo: 'pill' }} />

          <div
            ref={filtros.pistaRef}
            className="mb-6 flex items-center gap-3 overflow-x-auto border-b border-gris-borde py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-[950px]:flex-nowrap"
          >
            <button type="button" className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-primario bg-primario px-3.5 py-2 text-sm text-white">
              {catalogoEventos.filtros.todas} <span className="rounded-[10px] bg-white/30 px-[7px] py-px text-[11px] font-bold">{CONTEO_PESTANAS_INVITACIONES.todas}</span>
            </button>
            <button type="button" className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-gris-borde bg-fondo px-3.5 py-2 text-sm text-gris-texto hover:border-primario">
              {catalogoEventos.filtros.pendientes} <span className="rounded-[10px] bg-[#f3f4f6] px-[7px] py-px text-[11px] font-bold text-gris-texto-secundario">{CONTEO_PESTANAS_INVITACIONES.pendientes}</span>
            </button>
            <button type="button" className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-gris-borde bg-fondo px-3.5 py-2 text-sm text-gris-texto hover:border-primario">
              <Icono name="reloj" className="w-[14px] h-[14px]" /> {catalogoEventos.filtros.aceptadas}
            </button>
            <button type="button" className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-gris-borde bg-fondo px-3.5 py-2 text-sm text-gris-texto hover:border-primario">
              <Icono name={'rechazar' as IconName} className="w-[14px] h-[14px]" /> {catalogoEventos.filtros.rechazadas}
            </button>
            <button type="button" className="ml-auto flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-gris-borde bg-fondo px-3.5 py-2 text-sm text-gris-texto hover:border-primario">
              <Icono name="filtro" className="w-[14px] h-[14px]" /> {catalogoEventos.filtros.filtros}
            </button>
          </div>

          <section className="mb-7">
            <h2 className="mb-4 text-[1.05rem] font-bold text-gris-oscuro-texto">{catalogoEventos.secciones.invitaciones_pendientes}</h2>
            <div className="flex flex-col gap-4">
              {PENDIENTES.map((inv) => (
                <article key={inv.nombre} className="grid grid-cols-[140px_1fr_auto] overflow-hidden rounded-xl border border-gris-borde bg-white transition-shadow hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] max-[900px]:grid-cols-1">
                  <div className="relative min-h-[140px] overflow-hidden">
                    <SuperficieColor degradado={inv.gradiente} className="h-full w-full" />
                    <div className="absolute left-3.5 top-3.5 rounded-[10px] bg-white px-3 py-2 text-center shadow-[0_2px_8px_rgba(0,0,0,.12)]">
                      <span className="block text-xl font-extrabold leading-[1.1] text-texto">{inv.dia}</span>
                      <span className="mt-px block text-[10px] font-bold uppercase text-texto-suave">{inv.mes}</span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-1.5 px-5 py-4">
                    <TextoColor variante={inv.categoriaColor} className="inline-block text-[10px] font-bold uppercase tracking-wide">
                      {inv.categoria}
                    </TextoColor>
                    <h3 className="m-0 text-base font-bold text-gris-oscuro-texto">{inv.nombre}</h3>
                    <p className="m-0 text-[0.8125rem] leading-snug text-gris-texto-secundario">{inv.descripcion}</p>
                    <div className="flex flex-wrap gap-3 text-[0.8125rem] text-gris-texto-secundario">
                      <span className="flex items-center gap-1"><Icono name="calendario" className="w-[14px] h-[14px]" /> {inv.fecha}</span>
                      <span className="flex items-center gap-1"><Icono name="reloj" className="w-[14px] h-[14px]" /> {inv.hora}</span>
                      <span className="flex items-center gap-1"><Icono name="ubicacion" className="w-[14px] h-[14px]" /> {inv.ubicacion}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="flex">
                        {Array.from({ length: inv.avatares }).map((_, i) => (
                          <img
                            key={i}
                            src={usuarioImg}
                            alt=""
                            className={'h-7 w-7 rounded-full border-2 border-white object-cover' + (i > 0 ? ' -ml-2' : '')}
                          />
                        ))}
                      </div>
                      <div className="text-[0.8125rem] leading-tight">
                        <span className="block text-[0.8125rem] font-semibold">{inv.invitador}</span>
                        <span className="text-xs text-gris-texto-terciario">{catalogoEventos.leyendas.te_ha_invitado}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-2 p-4 max-[900px]:flex-row max-[900px]:px-4 max-[900px]:pb-4 max-[900px]:pt-0">
                    <button type="button" className="rounded-lg bg-primario px-5 py-2 text-[0.8125rem] font-semibold text-white hover:bg-[#4a35d4] max-[900px]:flex-1">{catalogoEventos.botones.aceptar}</button>
                    <button type="button" className="rounded-lg border border-gris-borde bg-transparent px-5 py-2 text-[0.8125rem] font-semibold text-gris-texto hover:border-primario max-[900px]:flex-1">{catalogoEventos.botones.tal_vez}</button>
                    <button type="button" className="rounded-lg border border-[#fca5a5] bg-transparent px-5 py-2 text-[0.8125rem] font-semibold text-[#ef4444] hover:bg-[#fef2f2] max-[900px]:flex-1">{catalogoEventos.botones.rechazar}</button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-7">
            <h2 className="mb-4 text-[1.05rem] font-bold text-gris-oscuro-texto">{catalogoEventos.secciones.invitaciones_respondidas}</h2>
            <div className="flex flex-col overflow-hidden rounded-xl border border-gris-borde bg-white">
              {RESPONDIDAS.map((inv, i) => (
                <article
                  key={inv.nombre}
                  className={
                    'grid grid-cols-[100px_1fr_auto_auto] items-center hover:bg-[#fafafa] max-[900px]:grid-cols-[90px_1fr] ' +
                    (i < RESPONDIDAS.length - 1 ? 'border-b border-gris-borde' : '')
                  }
                >
                  <div className="relative min-h-20 w-[100px] overflow-hidden max-[900px]:w-full">
                    <SuperficieColor degradado={inv.gradiente} className="h-full w-full" />
                    <div className="absolute left-3.5 top-3.5 rounded-[10px] bg-white px-3 py-2 text-center shadow-[0_2px_8px_rgba(0,0,0,.12)]">
                      <span className="block text-xl font-extrabold leading-[1.1] text-texto">{inv.dia}</span>
                      <span className="mt-px block text-[10px] font-bold uppercase text-texto-suave">{inv.mes}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 px-4 py-3.5">
                    <TextoColor variante={inv.categoriaColor} className="inline-block text-[10px] font-bold uppercase tracking-wide">
                      {inv.categoria}
                    </TextoColor>
                    <h3 className="m-0 text-[0.9375rem] font-bold text-gris-oscuro-texto">{inv.nombre}</h3>
                    <div className="flex flex-wrap gap-3 text-xs text-gris-texto-secundario">
                      <span className="flex items-center gap-1"><Icono name="calendario" className="w-[14px] h-[14px]" /> {inv.fecha}</span>
                      <span className="flex items-center gap-1"><Icono name="reloj" className="w-[14px] h-[14px]" /> {inv.hora}</span>
                      <span className="flex items-center gap-1"><Icono name="ubicacion" className="w-[14px] h-[14px]" /> {inv.ubicacion}</span>
                    </div>
                  </div>
                  <div className="flex items-center max-[900px]:col-span-2 max-[900px]:justify-between">
                    <span
                      className={
                        'mr-2 whitespace-nowrap rounded-[20px] px-3 py-1.25 text-xs font-semibold max-[900px]:mx-4 max-[900px]:mb-3 max-[900px]:mr-0 ' +
                        (inv.estado === 'aceptada' ? 'bg-[#ecfdf5] text-[#059669]' : 'bg-[#fef2f2] text-[#ef4444]')
                      }
                    >
                      {inv.estado === 'aceptada' ? catalogoEventos.leyendas.estado_aceptada : catalogoEventos.leyendas.estado_rechazada}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center text-xl text-gris-texto-terciario max-[900px]:hidden">›</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
        <aside className="flex flex-col gap-4">
          <section className="overflow-hidden rounded-xl border border-[#eee] bg-white">
            <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
              <h3 className="m-0 text-sm font-bold text-texto">{catalogoEventos.secciones.calendario}</h3>
              <a href="28-08-eventos-06-calendario-web.html" className="text-[11px] font-semibold text-primario no-underline hover:underline">{catalogoEventos.botones.ver_calendario}</a>
            </div>
            <div className="px-4 pb-3">
              <div className="mb-2.5 flex items-center justify-between px-1">
                <button type="button" className="grid h-6 w-6 place-items-center rounded-md border-0 bg-transparent text-primario hover:bg-[#f5f3ff]">
                  <Icono name="flecha-izquierda" className="w-[14px] h-[14px]" />
                </button>
                <span className="text-[13px] font-bold text-texto">{MES_CALENDARIO_INVITACIONES}</span>
                <button type="button" className="grid h-6 w-6 place-items-center rounded-md border-0 bg-transparent text-primario hover:bg-[#f5f3ff]">
                  <Icono name="flecha-derecha" className="w-[14px] h-[14px]" />
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
                          <span
                            className={
                              'inline-flex h-6 w-6 items-center justify-center rounded-full ' +
                              (dia.hoy ? 'bg-primario font-bold text-white' : '')
                            }
                          >
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
              <h2 className="m-0 text-sm font-bold">{catalogoEventos.secciones.proximos_de_tus_eventos}</h2>
              <a href="#" className="text-xs font-semibold text-primario no-underline">{textosRedSocial.VER_TODOS}</a>
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
                      <Icono name="calendario" className="w-3 h-3" /> {ev.fechaHora}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-gris-texto-terciario">
                      <Icono name="usuarios" className="w-3 h-3" /> {ev.asistentes}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="overflow-hidden rounded-xl border border-[#eee] bg-white">
            <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
              <h2 className="m-0 text-sm font-bold">{catalogoEventos.secciones.resumen_de_tus_eventos}</h2>
              <a href="#" className="text-xs font-semibold text-primario no-underline">{catalogoEventos.leyendas.este_anio}</a>
            </div>
            <div className="px-4 pb-4">
              <div className="grid grid-cols-3 gap-2 py-2 text-center">
                {RESUMEN_INVITACIONES.map((s) => (
                  <div key={s.etiqueta} className="flex flex-col items-center gap-0.5">
                    <span className="text-xl font-extrabold text-gris-oscuro-texto">{s.valor}</span>
                    <span className="text-[10px] leading-tight text-gris-texto-terciario">{s.etiqueta}</span>
                  </div>
                ))}
              </div>
              <button type="button" className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-gris-borde bg-[#f9fafb] py-2.5 text-[13px] font-semibold text-gris-texto hover:border-primario hover:bg-[#f3f4f6]">
                <Icono name="reportes-barra" className="w-4 h-4" /> {catalogoEventos.botones.ver_reportes}
              </button>
            </div>
          </section>
        </aside>
        }
      />
    </EstructuraApp>
  )
}
