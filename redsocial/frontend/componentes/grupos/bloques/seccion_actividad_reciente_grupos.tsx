import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import { FilaActividadGrupo } from '../../actividad/bloques/fila_actividad_grupo'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { Icono } from '../../compartido/icono'

export function SeccionActividadRecienteGrupos({
  ACTIVIDAD,
  GRUPOS_POPULARES,
  CLASES_ICONO_LATERAL,
}: {
  ACTIVIDAD: { nombre: string; accion: string; grupo: string; tiempo: string; icono: string; color: 'morado' | 'naranja' | 'azul' | 'rosa' | 'verde'; }[]
  GRUPOS_POPULARES: { nombre: string; color: 'morado' | 'azul' | 'rosa' | 'verde'; tipo: string; }[]
  CLASES_ICONO_LATERAL: Record<'morado' | 'azul' | 'rosa' | 'verde', string>
}) {
  return (
    <aside className="grid gap-4">
      <section className="rounded-xl border border-t-eeeeee bg-white p-4">
        <div className="mb-3.5 flex items-center justify-between">
          <h3 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoGrupos.secciones.actividad_reciente_grupos}</h3>
          <a href="#" className="text-enlace-accion font-semibold text-primario no-underline hover:underline">{catalogoGrupos.leyendas.ver_toda}</a>
        </div>
        {ACTIVIDAD.map((a) => (
          <FilaActividadGrupo key={a.nombre + a.grupo} nombre={a.nombre} accion={a.accion} grupo={a.grupo} tiempo={a.tiempo} icono={a.icono} colorIcono={a.color} />
        ))}
      </section>

      <section className="rounded-xl border border-t-eeeeee bg-white p-4">
        <div className="mb-3.5 flex items-center justify-between">
          <h3 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoGrupos.secciones.grupos_populares}</h3>
          <a href="#" className="text-enlace-accion font-semibold text-primario no-underline hover:underline">{textosRedSocial.VER_TODOS}</a>
        </div>
        {GRUPOS_POPULARES.map((g) => (
          <article key={g.nombre} className="flex items-center gap-2.5 border-b border-t-f5f5f5 py-2.25 last:border-b-0">
            <div className={`grid h-9 w-9 flex-none place-items-center rounded-control text-white ${CLASES_ICONO_LATERAL[g.color]}`}>
              <Icono name="grupos" className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-nombre-entidad font-semibold text-texto">{g.nombre}</span>
              <span className="text-auxiliar text-texto-suave">{g.tipo}</span>
            </div>
            <a href="#" className="flex-none whitespace-nowrap rounded-lg border border-primario bg-white px-3 py-1.5 text-boton font-semibold text-primario no-underline hover:bg-primario hover:text-white">{catalogoGrupos.botones.unirse}</a>
          </article>
        ))}
      </section>

      <section className="flex items-start gap-3 rounded-xl bg-t-f0fdf4 p-5">
        <span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-overlay-6 text-positivo-kpi">
          <Icono name="idea" className="h-4 w-4" />
        </span>
        <div className="flex-1">
          <strong className="mb-1 block text-subtitulo text-texto">{catalogoGrupos.consejo.titulo}</strong>
          <p className="m-0 text-cuerpo leading-1.45 text-texto-suave">{catalogoGrupos.consejo.texto_mis_grupos}</p>
          <a href={catalogoGrupos.rutas.descubrir} className="mt-2.5 inline-block rounded-lg border border-t-bbf7d0 bg-white px-3.5 py-1.75 text-boton font-semibold text-positivo-kpi no-underline hover:bg-t-dcfce7">{catalogoGrupos.botones.explorar_grupos}</a>
        </div>
      </section>
    </aside>
  )
}
