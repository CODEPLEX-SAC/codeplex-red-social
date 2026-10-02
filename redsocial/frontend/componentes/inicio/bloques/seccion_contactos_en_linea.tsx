import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import type { GrupoRecomendado } from '@/tipos/compartido/contrato_grupos_recomendados'
import type { EventoProximo } from '@/tipos/compartido/contrato_eventos_proximos'

const AVATAR = 'h-8 w-8 flex-none rounded-full bg-primario-suave'

export function SeccionContactosEnLinea({
  CONTACTOS_LINEA,
  GRUPOS_RECOMENDADOS,
  EVENTOS_PROXIMOS,
}: {
  CONTACTOS_LINEA: { nombre: string; colaborador?: boolean | undefined; }[]
  GRUPOS_RECOMENDADOS: readonly GrupoRecomendado[]
  EVENTOS_PROXIMOS: readonly EventoProximo[]
}) {
  return (
    <aside className="grid gap-4">
      <section className="rounded-xl border border-borde bg-white p-4">
        <div className="mb-3.5 flex items-center justify-between">
          <h2 className="m-0 text-titulo-seccion text-texto">{catalogoInicio.secciones.contactos_en_linea}</h2>
          <a href="#" className="text-enlace-accion text-primario no-underline">{textosRedSocial.VER_TODOS}</a>
        </div>
        {CONTACTOS_LINEA.map((c) => (
          <article key={c.nombre} className="flex items-center gap-2 border-b border-t-f0eef5 py-2">
            <AvatarImagen src={usuarioImg} className={AVATAR} />
            <div className="min-w-0 flex-1">
              <strong className="block text-subtitulo text-texto">
                {c.nombre}{' '}
                {c.colaborador && <span className="ml-1 text-etiqueta-estado font-bold text-exito">{catalogoInicio.leyendas.colaborador}</span>}
              </strong>
            </div>
            <span className="ml-auto h-2 w-2 flex-none rounded-full bg-exito" />
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-borde bg-white p-4">
        <div className="mb-3.5 flex items-center justify-between">
          <h2 className="m-0 text-titulo-seccion text-texto">{catalogoInicio.secciones.grupos_recomendados}</h2>
          <a href="#" className="text-enlace-accion text-primario no-underline">{textosRedSocial.VER_TODOS}</a>
        </div>
        {GRUPOS_RECOMENDADOS.map((g) => (
          <div key={g.nombre} className="flex items-center gap-2.5 py-2">
            <span className="h-9.5 w-9.5 flex-none rounded-9 bg-primario-suave" />
            <div className="min-w-0 flex-1">
              <strong className="block truncate text-nombre-entidad text-texto">{g.nombre}</strong>
              <span className="mt-0.5 block truncate text-auxiliar text-texto-suave">{g.miembros}</span>
            </div>
            <BotonIcono icono="mas" type="button" aria-label={catalogoInicio.botones.unirse} variant="contorno" size="md" className="flex-none" />
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-borde bg-white p-4">
        <div className="mb-3.5 flex items-center justify-between">
          <h2 className="m-0 text-titulo-seccion text-texto">{catalogoInicio.secciones.eventos_proximos}</h2>
          <a href="#" className="text-enlace-accion text-primario no-underline">{textosRedSocial.VER_TODOS}</a>
        </div>
        {EVENTOS_PROXIMOS.map((e) => (
          <article key={e.titulo} className="grid grid-cols-52-1fr gap-3.5 border-b border-t-f0eef5 py-2.5">
            <div className="grid h-13 w-13 place-content-center place-items-center rounded-lg bg-primario-suave text-primario">
              <strong className="text-dia-evento">{e.dia}</strong>
              <span className="text-mes-evento font-extrabold">{e.mes}</span>
            </div>
            <div>
              <h3 className="m-0 text-nombre-entidad text-texto">{e.titulo}</h3>
              <p className="m-0 mt-1 text-auxiliar text-texto-suave">{e.detalle}</p>
            </div>
          </article>
        ))}
      </section>
    </aside>
  )
}
