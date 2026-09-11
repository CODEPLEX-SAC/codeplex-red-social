import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { PestanasEventos } from '../../componentes/eventos/bloques/pestanas_eventos'
import type { EventoOrganizas, EventoLateral } from '@/tipos/eventos/pagina_eventos_mis_eventos'

const ESTADO_ESTILO: Record<EventoOrganizas['estado'], string> = {
  publicado: 'bg-[#ede9fe] text-[#6c3ce0]',
  borrador: 'bg-[#fef3c7] text-[#d97706]',
  colaborador: 'bg-[#d1fae5] text-[#059669]',
}

const ESTADO_ETIQUETA: Record<EventoOrganizas['estado'], string> = {
  publicado: 'PUBLICADO',
  borrador: 'BORRADOR',
  colaborador: 'COLABORADOR',
}

const EVENTOS_ORGANIZAS: EventoOrganizas[] = [
  {
    gradiente: 'linear-gradient(135deg,#6c3ce0,#a855f7)', dia: '24', mes: 'AGO', estado: 'publicado',
    nombre: 'Concierto Codeplex Live 2026', fecha: 'Sáb, 24 Ago 2026', hora: '7:00 PM', ubicacion: 'Arena 1, Lima',
    pieDerecho: { tipo: 'stats', asistentesTexto: '1.2K asistentes', statValor: '1.2K', statPct: '83%' },
  },
  {
    gradiente: 'linear-gradient(135deg,#3b82f6,#06b6d4)', dia: '15', mes: 'JUN', estado: 'publicado',
    nombre: 'Codeplex Tech Summit', fecha: 'Jue, 15 Jun 2026', hora: '9:00 AM', ubicacion: 'Centro de Convenciones Lima',
    pieDerecho: { tipo: 'stats', asistentesTexto: '856 asistentes', statValor: '856', statPct: '78%' },
  },
  {
    gradiente: 'linear-gradient(135deg,#f59e0b,#ef4444)', dia: '22', mes: 'JUN', estado: 'publicado',
    nombre: 'Networking Empresarial', fecha: 'Jue, 22 Jun 2026', hora: '6:00 PM', ubicacion: 'WeWork San Isidro',
    pieDerecho: { tipo: 'stats', asistentesTexto: '642 asistentes', statValor: '642', statPct: '72%' },
  },
  {
    gradiente: 'linear-gradient(135deg,#10b981,#34d399)', dia: '05', mes: 'JUL', estado: 'borrador',
    nombre: 'Taller de Marketing Digital', fecha: 'Sáb, 5 Jul 2026', hora: '10:00 AM', ubicacion: 'Online',
    pieDerecho: { tipo: 'borrador' },
  },
]

const EVENTO_COLABORAS: EventoOrganizas = {
  gradiente: 'linear-gradient(135deg,#ec4899,#f43f5e)', dia: '18', mes: 'JUL', estado: 'colaborador',
  nombre: 'Festival Gastronómico', fecha: 'Vie, 18 Jul 2026', hora: '7:00 PM', ubicacion: 'Parque de la Exposición',
  pieDerecho: { tipo: 'colaborador', organizador: 'Organizado por: Municipalidad de Lima', statValor: '538', statPct: '81%' },
}

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

const PROXIMOS_LATERAL: EventoLateral[] = [
  { gradiente: 'linear-gradient(135deg,#6c3ce0,#a855f7)', dia: '24', mes: 'AGO', nombre: 'Concierto Codeplex Live 2026', fechaHora: 'Sáb, 24 Ago 2026 · 7:00 PM', ubicacion: 'Arena 1, Lima', asistentes: '1.2K asistirán' },
  { gradiente: 'linear-gradient(135deg,#3b82f6,#06b6d4)', dia: '15', mes: 'JUN', nombre: 'Codeplex Tech Summit', fechaHora: 'Jue, 15 Jun 2026 · 9:00 AM', asistentes: '856 asistirán' },
  { gradiente: 'linear-gradient(135deg,#f59e0b,#ef4444)', dia: '22', mes: 'JUN', nombre: 'Networking Empresarial', fechaHora: 'Jue, 22 Jun 2026 · 6:00 PM', asistentes: '642 asistirán' },
]

export function PaginaEventosMisEventos() {
  return (
    <EstructuraApp paginaActiva="eventos">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <Icono name="calendario" className="h-5.5 w-5.5 flex-none text-primario" />
                <div>
                  <h1 className="m-0 text-[22px] font-extrabold text-texto">
                    Eventos <span className="text-primario">/ Mis eventos</span>
                  </h1>
                  <p className="m-0 mt-0.5 text-[13px] text-texto-suave">Administra los eventos que has creado o donde eres organizador.</p>
                </div>
              </div>
            </div>

            <PestanasEventos activa="26-08-eventos-04-mis-eventos-web.html" insigniaInvitaciones={{ valor: 2, estilo: 'texto' }} />

            <div className="mb-6 flex items-center gap-3 border-b border-gris-borde py-3 max-[900px]:grid max-[900px]:grid-cols-2 max-[900px]:gap-3">
              <button type="button" className="flex items-center gap-1.5 rounded-lg border border-gris-borde bg-fondo px-3.5 py-2 text-sm text-gris-texto hover:border-primario max-[900px]:justify-center">
                <Icono name="calendario" className="h-[15px] w-[15px]" /> Mis eventos <Icono name="flecha-abajo" className="ml-1 h-3.5 w-3.5 text-gris-texto-terciario" />
              </button>
              <button type="button" className="flex items-center gap-1.5 rounded-lg border border-gris-borde bg-fondo px-3.5 py-2 text-sm text-gris-texto hover:border-primario max-[900px]:justify-center">
                <Icono name="calendario" className="h-[15px] w-[15px]" /> Estado <Icono name="flecha-abajo" className="ml-1 h-3.5 w-3.5 text-gris-texto-terciario" />
              </button>
              <button type="button" className="flex items-center gap-1.5 rounded-lg border border-gris-borde bg-fondo px-3.5 py-2 text-sm text-gris-texto hover:border-primario max-[900px]:justify-center">
                <Icono name="calendario" className="h-[15px] w-[15px]" /> Fecha <Icono name="flecha-abajo" className="ml-1 h-3.5 w-3.5 text-gris-texto-terciario" />
              </button>
              <button type="button" className="ml-auto flex items-center gap-1.5 rounded-lg border border-gris-borde bg-fondo px-3.5 py-2 text-sm text-gris-texto hover:border-primario max-[900px]:ml-0 max-[900px]:justify-center">
                <Icono name="filtro" className="h-[15px] w-[15px]" /> Filtros
              </button>
            </div>

            <section className="mb-7">
              <h2 className="mb-4 text-[1.05rem] font-bold text-gris-oscuro-texto">Eventos que organizas</h2>
              <div className="flex flex-col gap-4">
                {EVENTOS_ORGANIZAS.map((ev) => (
                  <article key={ev.nombre} className="grid grid-cols-[140px_1fr_auto] overflow-hidden rounded-xl border border-gris-borde bg-fondo hover:shadow-[0_2px_8px_rgba(0,0,0,.06)] max-[1100px]:grid-cols-[120px_1fr_auto] max-[900px]:grid-cols-1">
                    <div className="relative min-h-[140px] overflow-hidden max-[900px]:min-h-[160px]">
                      <div className="h-full w-full" style={{ background: ev.gradiente }} />
                      <div className="absolute left-3.5 top-3.5 rounded-[10px] bg-white px-3 py-2 text-center shadow-[0_2px_8px_rgba(0,0,0,.12)]">
                        <span className="block text-xl font-extrabold leading-[1.1] text-texto">{ev.dia}</span>
                        <span className="mt-px block text-[10px] font-bold uppercase text-texto-suave">{ev.mes}</span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center gap-1 px-5 py-4">
                      <span className={'mb-0.5 inline-block w-fit rounded text-[0.65rem] font-bold uppercase tracking-wide px-2 py-0.75 ' + ESTADO_ESTILO[ev.estado]}>{ESTADO_ETIQUETA[ev.estado]}</span>
                      <h3 className="m-0 text-base font-bold text-gris-oscuro-texto">{ev.nombre}</h3>
                      <div className="mt-0.5 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[0.8rem] text-gris-texto-secundario">
                        <span className="flex items-center gap-1"><Icono name="calendario" className="h-3.5 w-3.5 text-gris-texto-terciario" /> {ev.fecha}</span>
                        <span className="flex items-center gap-1"><Icono name="reloj" className="h-3.5 w-3.5 text-gris-texto-terciario" /> {ev.hora}</span>
                        <span className="flex items-center gap-1"><Icono name="ubicacion" className="h-3.5 w-3.5 text-gris-texto-terciario" /> {ev.ubicacion}</span>
                      </div>
                      {ev.pieDerecho.tipo === 'stats' && (
                        <div className="mt-1 flex items-center gap-1 text-[0.8rem] text-gris-texto-secundario">
                          <Icono name="usuarios" className="h-3.5 w-3.5 text-gris-texto-terciario" /> {ev.pieDerecho.asistentesTexto}
                        </div>
                      )}
                      {ev.pieDerecho.tipo === 'borrador' && (
                        <div className="mt-1 text-[0.8rem] text-gris-texto-terciario">Sin publicar aún</div>
                      )}
                    </div>
                    {ev.pieDerecho.tipo === 'stats' && (
                      <div className="flex items-center gap-6 border-l border-gris-borde px-5 py-4 max-[1100px]:gap-4 max-[1100px]:px-4 max-[900px]:justify-start max-[900px]:gap-5 max-[900px]:border-l-0 max-[900px]:border-t">
                        <div className="min-w-[70px] text-center">
                          <span className="block text-[1.15rem] font-extrabold text-gris-oscuro-texto">{ev.pieDerecho.statValor}</span>
                          <span className="block text-[0.7rem] text-gris-texto-secundario">Asistirán</span>
                        </div>
                        <div className="min-w-[70px] text-center">
                          <span className="block text-[1.15rem] font-extrabold text-gris-oscuro-texto">{ev.pieDerecho.statPct}</span>
                          <span className="block text-[0.7rem] text-gris-texto-secundario">Confirmados</span>
                        </div>
                        <button type="button" aria-label="Más opciones" className="flex h-8 w-8 items-center justify-center rounded-md text-gris-texto-terciario hover:bg-[#f3f4f6]">
                          <Icono name="puntos" className="h-[18px] w-[18px]" />
                        </button>
                      </div>
                    )}
                    {ev.pieDerecho.tipo === 'borrador' && (
                      <div className="flex items-center justify-center border-l border-gris-borde px-5 py-4 max-[900px]:border-l-0 max-[900px]:border-t">
                        <button type="button" className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg border border-primario px-4 py-2 text-[0.85rem] font-semibold text-primario hover:bg-[#f5f0ff]">Continuar editando</button>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>

            <section className="mb-7">
              <h2 className="mb-4 text-[1.05rem] font-bold text-gris-oscuro-texto">Eventos en los que colaboras</h2>
              <div className="flex flex-col gap-4">
                <article className="grid grid-cols-[140px_1fr_auto] overflow-hidden rounded-xl border border-gris-borde bg-fondo hover:shadow-[0_2px_8px_rgba(0,0,0,.06)] max-[1100px]:grid-cols-[120px_1fr_auto] max-[900px]:grid-cols-1">
                  <div className="relative min-h-[140px] overflow-hidden max-[900px]:min-h-[160px]">
                    <div className="h-full w-full" style={{ background: EVENTO_COLABORAS.gradiente }} />
                    <div className="absolute left-3.5 top-3.5 rounded-[10px] bg-white px-3 py-2 text-center shadow-[0_2px_8px_rgba(0,0,0,.12)]">
                      <span className="block text-xl font-extrabold leading-[1.1] text-texto">{EVENTO_COLABORAS.dia}</span>
                      <span className="mt-px block text-[10px] font-bold uppercase text-texto-suave">{EVENTO_COLABORAS.mes}</span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-1 px-5 py-4">
                    <span className={'mb-0.5 inline-block w-fit rounded text-[0.65rem] font-bold uppercase tracking-wide px-2 py-0.75 ' + ESTADO_ESTILO[EVENTO_COLABORAS.estado]}>{ESTADO_ETIQUETA[EVENTO_COLABORAS.estado]}</span>
                    <h3 className="m-0 text-base font-bold text-gris-oscuro-texto">{EVENTO_COLABORAS.nombre}</h3>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[0.8rem] text-gris-texto-secundario">
                      <span className="flex items-center gap-1"><Icono name="calendario" className="h-3.5 w-3.5 text-gris-texto-terciario" /> {EVENTO_COLABORAS.fecha}</span>
                      <span className="flex items-center gap-1"><Icono name="reloj" className="h-3.5 w-3.5 text-gris-texto-terciario" /> {EVENTO_COLABORAS.hora}</span>
                      <span className="flex items-center gap-1"><Icono name="ubicacion" className="h-3.5 w-3.5 text-gris-texto-terciario" /> {EVENTO_COLABORAS.ubicacion}</span>
                    </div>
                    {EVENTO_COLABORAS.pieDerecho.tipo === 'colaborador' && (
                      <div className="mt-0.5 text-[0.8rem] text-gris-texto-secundario">{EVENTO_COLABORAS.pieDerecho.organizador}</div>
                    )}
                  </div>
                  {EVENTO_COLABORAS.pieDerecho.tipo === 'colaborador' && (
                    <div className="flex items-center gap-6 border-l border-gris-borde px-5 py-4 max-[1100px]:gap-4 max-[1100px]:px-4 max-[900px]:justify-start max-[900px]:gap-5 max-[900px]:border-l-0 max-[900px]:border-t">
                      <div className="min-w-[70px] text-center">
                        <span className="block text-[1.15rem] font-extrabold text-gris-oscuro-texto">{EVENTO_COLABORAS.pieDerecho.statValor}</span>
                        <span className="block text-[0.7rem] text-gris-texto-secundario">Asistirán</span>
                      </div>
                      <div className="min-w-[70px] text-center">
                        <span className="block text-[1.15rem] font-extrabold text-gris-oscuro-texto">{EVENTO_COLABORAS.pieDerecho.statPct}</span>
                        <span className="block text-[0.7rem] text-gris-texto-secundario">Confirmados</span>
                      </div>
                      <button type="button" aria-label="Más opciones" className="flex h-8 w-8 items-center justify-center rounded-md text-gris-texto-terciario hover:bg-[#f3f4f6]">
                        <Icono name="puntos" className="h-[18px] w-[18px]" />
                      </button>
                    </div>
                  )}
                </article>
              </div>
            </section>

            <div className="py-5 text-center text-sm text-gris-texto-secundario">
              ¿No encuentras un evento? <a href="#" className="font-semibold text-primario no-underline hover:underline">Ver todos mis eventos</a>
            </div>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <section className="overflow-hidden rounded-xl border border-[#eee] bg-white">
              <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
                <h3 className="m-0 text-sm font-bold text-texto">Calendario</h3>
                <a href="28-08-eventos-06-calendario-web.html" className="text-[11px] font-semibold text-primario no-underline hover:underline">Ver calendario</a>
              </div>
              <div className="px-4 pb-3">
                <div className="mb-2.5 flex items-center justify-between px-1">
                  <button type="button" className="grid h-6 w-6 place-items-center rounded-md border-0 bg-transparent text-primario hover:bg-[#f5f3ff]">
                    <Icono name="flecha-izquierda" className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-[13px] font-bold text-texto">Junio 2026</span>
                  <button type="button" className="grid h-6 w-6 place-items-center rounded-md border-0 bg-transparent text-primario hover:bg-[#f5f3ff]">
                    <Icono name="flecha-derecha" className="h-3.5 w-3.5" />
                  </button>
                </div>
                <table className="w-full border-collapse text-center">
                  <thead>
                    <tr>
                      {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((d) => (
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
                <h2 className="m-0 text-sm font-bold">Próximos de tus eventos</h2>
                <a href="#" className="text-xs font-semibold text-primario no-underline">Ver todos</a>
              </div>
              <div className="px-3 pb-2">
                {PROXIMOS_LATERAL.map((ev, i) => (
                  <article key={ev.nombre} className={'grid grid-cols-[64px_1fr] gap-2.5 py-2 ' + (i < PROXIMOS_LATERAL.length - 1 ? 'border-b border-[#f5f5f5]' : '')}>
                    <div className="relative h-16 w-16 flex-none overflow-hidden rounded-lg">
                      <div className="h-full w-full" style={{ background: ev.gradiente }} />
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
                      {ev.ubicacion && (
                        <span className="flex items-center gap-1 text-[11px] leading-snug text-gris-texto-terciario">
                          <Icono name="ubicacion" className="h-3 w-3" /> {ev.ubicacion}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-[11px] text-gris-texto-terciario">
                        <Icono name="usuarios" className="h-3 w-3" /> {ev.asistentes}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-xl border border-[#eee] bg-white">
              <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
                <h2 className="m-0 text-sm font-bold">Resumen de tus eventos</h2>
                <a href="#" className="text-xs font-semibold text-primario no-underline">Este año ▾</a>
              </div>
              <div className="px-4 pb-4">
                <div className="grid grid-cols-3 gap-2 py-2 text-center">
                  {[
                    { valor: '4', etiqueta: 'Eventos creados' },
                    { valor: '3.3K', etiqueta: 'Asistentes totales' },
                    { valor: '79%', etiqueta: 'Prom. confirmación' },
                  ].map((s) => (
                    <div key={s.etiqueta} className="flex flex-col items-center gap-0.5">
                      <span className="text-xl font-extrabold text-gris-oscuro-texto">{s.valor}</span>
                      <span className="text-[10px] leading-tight text-gris-texto-terciario">{s.etiqueta}</span>
                    </div>
                  ))}
                </div>
                <button type="button" className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-gris-borde bg-[#f9fafb] py-2.5 text-[13px] font-semibold text-gris-texto hover:border-primario hover:bg-[#f3f4f6]">
                  <Icono name="reportes-barra" className="h-4 w-4" /> Ver reportes
                </button>
              </div>
            </section>
          </aside>
        }
      />
    </EstructuraApp>
  )
}
