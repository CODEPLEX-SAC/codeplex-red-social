import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { PestanasEventos } from '../../componentes/eventos/bloques/pestanas_eventos'
import type { IconName } from '../../tipos/compartido/icono'
import usuarioImg from '../../../recursos/imagenes/usuario.jpg'
import type { EventoLista } from '@/tipos/eventos/pagina_eventos_proximos'

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

const EVENTOS: EventoLista[] = [
  {
    categoria: 'tecnologia', categoriaEtiqueta: 'Tecnología', nombre: 'Codeplex Tech Summit',
    descripcion: 'Descubre las últimas tendencias en tecnología e innovación de la mano de expertos líderes.',
    dia: '15', mes: 'JUN', fecha: 'Jue, 15 Jun 2026', hora: '9:00 AM', ubicacion: 'Centro de Convenciones Lima', avatares: 5, masAsistentes: '+86 asistirán',
  },
  {
    categoria: 'negocios', categoriaEtiqueta: 'Negocios', nombre: 'Networking Empresarial',
    descripcion: 'Conecta con empresarios, emprendedores y profesionales de diferentes industrias.',
    dia: '22', mes: 'JUN', fecha: 'Jue, 22 Jun 2026', hora: '6:00 PM', ubicacion: 'WeWork San Isidro', avatares: 4, masAsistentes: '+42 asistirán',
  },
  {
    categoria: 'educacion', categoriaEtiqueta: 'Educación', nombre: 'Taller de Marketing Digital',
    descripcion: 'Aprende estrategias efectivas para llevar tu negocio al siguiente nivel.',
    dia: '05', mes: 'JUL', fecha: 'Sáb, 5 Jul 2026', hora: '10:00 AM', ubicacion: 'Online', avatares: 4, masAsistentes: '+56 asistirán',
  },
  {
    categoria: 'gastronomia', categoriaEtiqueta: 'Gastronomía', nombre: 'Festival Gastronómico',
    descripcion: 'Disfruta de lo mejor de la gastronomía local e internacional en un solo lugar.',
    dia: '18', mes: 'JUL', fecha: 'Vie, 18 Jul 2026', hora: '7:00 PM', ubicacion: 'Parque de la Exposición', avatares: 5, masAsistentes: '+74 asistirán',
  },
]

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

const PROXIMAS_FECHAS: { dia: string; mes: string; nombre: string; punto: keyof typeof PUNTO_COLOR; detalle: string }[] = [
  { dia: '15', mes: 'JUN', nombre: 'Codeplex Tech Summit', punto: 'tecnologia', detalle: '9:00 AM · Centro de Convenciones Lima' },
  { dia: '22', mes: 'JUN', nombre: 'Networking Empresarial', punto: 'negocios', detalle: '6:00 PM · WeWork San Isidro' },
  { dia: '05', mes: 'JUL', nombre: 'Taller de Marketing Digital', punto: 'educacion', detalle: '10:00 AM · Online' },
]

const PUNTO_COLOR: Record<'tecnologia' | 'negocios' | 'educacion', string> = {
  tecnologia: '#6366f1',
  negocios: '#f97316',
  educacion: '#3b82f6',
}

const CATEGORIAS_LATERAL: { icono: IconName; color: string; nombre: string; conteo: string }[] = [
  { icono: 'estrella', color: '#ec4899', nombre: 'Música', conteo: '128' },
  { icono: 'panel', color: '#6366f1', nombre: 'Tecnología', conteo: '95' },
  { icono: 'empresa', color: '#f97316', nombre: 'Negocios', conteo: '86' },
  { icono: 'calendario', color: '#3b82f6', nombre: 'Educación', conteo: '74' },
  { icono: 'carrito', color: '#ef4444', nombre: 'Gastronomía', conteo: '58' },
  { icono: 'actividad', color: '#22c55e', nombre: 'Deportes', conteo: '63' },
]

export function PaginaEventosProximos() {
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
                    Eventos <span className="text-primario">/ Próximos</span>
                  </h1>
                  <p className="m-0 mt-0.5 text-[13px] text-texto-suave">Los eventos que están por ocurrir.</p>
                </div>
              </div>
            </div>

            <PestanasEventos activa="24-08-eventos-02-proximos-web.html" insigniaInvitaciones={{ valor: 2, estilo: 'pill' }} />

            <div className="mb-6 flex flex-wrap items-center gap-2">
              <button type="button" className="inline-flex h-8 items-center gap-1.25 whitespace-nowrap rounded-lg border border-primario bg-primario px-3 text-xs font-medium text-white">
                <Icono name="calendario" className="h-3.5 w-3.5" /> Próximos eventos <Icono name="flecha-abajo" className="h-3.5 w-3.5" />
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

            <div className="flex flex-col gap-4">
              {EVENTOS.map((ev) => (
                <article key={ev.nombre} className="grid grid-cols-[140px_1fr] overflow-hidden rounded-xl border border-[#eee] bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,.08)] max-[1100px]:grid-cols-[120px_1fr] max-[900px]:grid-cols-1">
                  <div className="relative min-h-[180px] overflow-hidden">
                    <div className="h-full w-full" style={{ background: CATEGORIA_GRADIENTE[ev.categoria] }} />
                    <div className="absolute left-3.5 top-3.5 rounded-[10px] bg-white px-3 py-2 text-center shadow-[0_2px_8px_rgba(0,0,0,.12)]">
                      <span className="block text-xl font-extrabold leading-[1.1] text-texto">{ev.dia}</span>
                      <span className="mt-px block text-[10px] font-bold uppercase text-texto-suave">{ev.mes}</span>
                    </div>
                  </div>
                  <div className="flex flex-col p-5">
                    <span className="mb-1 inline-block text-[10px] font-bold uppercase tracking-wide" style={{ color: CATEGORIA_COLOR[ev.categoria] }}>{ev.categoriaEtiqueta}</span>
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
                        <button type="button" className="inline-flex h-8 items-center justify-center whitespace-nowrap rounded-[7px] border border-primario bg-white px-4 text-xs font-semibold text-primario hover:bg-primario hover:text-white">Ver detalles</button>
                        <button type="button" aria-label="Guardar evento" className="grid h-8 w-8 flex-none place-items-center rounded-[7px] border border-borde bg-white text-texto-suave hover:border-primario hover:text-primario">
                          <Icono name="guardado" className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
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
                <h3 className="m-0 text-sm font-bold text-texto">Calendario</h3>
                <a href="#" className="text-[11px] font-semibold text-primario no-underline hover:underline">Ver calendario</a>
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
                <h3 className="m-0 text-sm font-bold text-texto">Mis próximas fechas</h3>
                <a href="#" className="text-[11px] font-semibold text-primario no-underline hover:underline">Ver todas</a>
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
                        <span className="h-1.5 w-1.5 flex-none rounded-full" style={{ background: PUNTO_COLOR[f.punto] }} /> {f.detalle}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
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
              <a href="#" className="flex items-center justify-center gap-1.5 border-t border-[#f0eef5] px-4 py-3 text-xs font-semibold text-primario no-underline hover:underline">
                Ver más categorías <Icono name="flecha-derecha" className="h-3.5 w-3.5" />
              </a>
            </section>
          </aside>
        }
      />
    </EstructuraApp>
  )
}
