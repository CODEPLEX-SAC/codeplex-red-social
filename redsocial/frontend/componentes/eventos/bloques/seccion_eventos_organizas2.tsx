import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenEventoPredeterminada as imagenEvento } from '../../compartido'
import { Icono } from '../../compartido/icono'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { ElementoEventosOrganizas } from './elemento_eventos_organizas'
import type { EventoOrganizas } from '@/tipos/eventos/modelo_eventos_mis_eventos'

export function SeccionEventosOrganizas2({
  EVENTOS_ORGANIZAS,
  ESTADO_ESTILO,
  ESTADO_ETIQUETA,
  alAbrirMenuOrganizas,
  menuOrganizasAbierto,
  anclaMenuOrganizas,
  cerrarMenuOrganizas,
  setEventoEditando,
  EVENTO_COLABORAS,
}: {
  EVENTOS_ORGANIZAS: EventoOrganizas[]
  ESTADO_ESTILO: Record<'publicado' | 'borrador' | 'colaborador', string>
  ESTADO_ETIQUETA: Record<'publicado' | 'borrador' | 'colaborador', string>
  alAbrirMenuOrganizas: (evento: { stopPropagation: () => void; currentTarget: HTMLElement; }, nombre: string) => void
  menuOrganizasAbierto: string | null
  anclaMenuOrganizas: HTMLElement | null
  cerrarMenuOrganizas: () => void
  setEventoEditando: (valor: string | null | ((actual: string | null) => string | null)) => void
  EVENTO_COLABORAS: EventoOrganizas
}) {
  return (
    <>

    <section className="mb-7">
      <h2 className="mb-4 text-titulo-seccion font-bold text-gris-oscuro-texto">{catalogoEventos.secciones.eventos_organizas}</h2>
      <div className="flex flex-col gap-4">
        {EVENTOS_ORGANIZAS.map((ev) => (
          <ElementoEventosOrganizas key={ev.nombre}
            ev={ev}
            ESTADO_ESTILO={ESTADO_ESTILO}
            ESTADO_ETIQUETA={ESTADO_ETIQUETA}
            alAbrirMenuOrganizas={alAbrirMenuOrganizas}
            menuOrganizasAbierto={menuOrganizasAbierto}
            anclaMenuOrganizas={anclaMenuOrganizas}
            cerrarMenuOrganizas={cerrarMenuOrganizas}
            setEventoEditando={setEventoEditando}
          />
        ))}
      </div>
    </section>

    <section className="mb-7">
      <h2 className="mb-4 text-titulo-seccion font-bold text-gris-oscuro-texto">{catalogoEventos.secciones.eventos_colaboras}</h2>
      <div className="flex flex-col gap-4">
        <article className="grid grid-cols-140-1fr-auto overflow-hidden rounded-xl border border-gris-borde bg-fondo hover:shadow-t3 max-1100:grid-cols-120-1fr-auto max-900:grid-cols-1">
          <div className="relative min-h-35 overflow-hidden max-900:min-h-40">
            <AvatarImagen src={imagenEvento} className="h-full w-full" />
            <div className="absolute left-3.5 top-3.5 rounded-control bg-white px-3 py-2 text-center shadow-t5">
              <span className="block text-dia-evento font-extrabold leading-1.1 text-texto">{EVENTO_COLABORAS.dia}</span>
              <span className="mt-px block text-mes-evento font-bold uppercase text-texto-suave">{EVENTO_COLABORAS.mes}</span>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-1 px-5 py-4">
            <span className={'mb-0.5 inline-block w-fit rounded text-etiqueta-estado font-bold uppercase tracking-wide px-2 py-0.75 ' + ESTADO_ESTILO[EVENTO_COLABORAS.estado]}>{ESTADO_ETIQUETA[EVENTO_COLABORAS.estado]}</span>
            <h3 className="m-0 text-nombre-entidad font-bold text-gris-oscuro-texto">{EVENTO_COLABORAS.nombre}</h3>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-auxiliar text-gris-texto-secundario">
              <span className="flex items-center gap-1"><Icono name="calendario" className="h-3.5 w-3.5 text-gris-texto-terciario" /> {EVENTO_COLABORAS.fecha}</span>
              <span className="flex items-center gap-1"><Icono name="reloj" className="h-3.5 w-3.5 text-gris-texto-terciario" /> {EVENTO_COLABORAS.hora}</span>
              <span className="flex items-center gap-1"><Icono name="ubicacion" className="h-3.5 w-3.5 text-gris-texto-terciario" /> {EVENTO_COLABORAS.ubicacion}</span>
            </div>
            {EVENTO_COLABORAS.pieDerecho.tipo === 'colaborador' && (
              <div className="mt-0.5 text-auxiliar text-gris-texto-secundario">{EVENTO_COLABORAS.pieDerecho.organizador}</div>
            )}
          </div>
          {EVENTO_COLABORAS.pieDerecho.tipo === 'colaborador' && (
            <div className="flex items-center gap-6 border-l border-gris-borde px-5 py-4 max-1100:gap-4 max-1100:px-4 max-900:justify-start max-900:gap-5 max-900:border-l-0 max-900:border-t">
              <div className="min-w-17.5 text-center">
                <span className="block text-valor-destacado font-extrabold text-gris-oscuro-texto">{EVENTO_COLABORAS.pieDerecho.statValor}</span>
                <span className="block text-auxiliar text-gris-texto-secundario">{catalogoEventos.leyendas.asistiran}</span>
              </div>
              <div className="min-w-17.5 text-center">
                <span className="block text-valor-destacado font-extrabold text-gris-oscuro-texto">{EVENTO_COLABORAS.pieDerecho.statPct}</span>
                <span className="block text-auxiliar text-gris-texto-secundario">{catalogoEventos.leyendas.confirmados}</span>
              </div>
              <BotonIcono icono="puntos" type="button" aria-label={catalogoEventos.botones.mas_opciones} variant="sutil" size="default" />
            </div>
          )}
        </article>
      </div>
    </section>

    <div className="py-5 text-center text-auxiliar text-gris-texto-secundario">
      {catalogoEventos.leyendas.no_encuentras_evento} <a href="#" className="font-semibold text-primario no-underline hover:underline">{catalogoEventos.botones.ver_todos_mis_eventos}</a>
    </div>
      </>
  )
}
