import { Icono, EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas } from '../../componentes/compartido'
import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { SeccionDescubrir } from '../../componentes/grupos'
import { FilaActividadGrupo } from '../../componentes/actividad'
import { DESTACADOS, CATEGORIAS, MIS_GRUPOS_LATERAL, ACTIVIDAD_DESCUBRIR as ACTIVIDAD, CLASES_FONDO, CLASES_OVERLAY, CLASES_CATEGORIA, CLASES_LATERAL } from '../../rutas/grupos/rutas_grupos'

export function PaginaGruposDescubrir() {
  return (
    <EstructuraApp paginaActiva="grupos">
      <EstructuraTresColumnas
        principal={
          <SeccionDescubrir
            DESTACADOS={DESTACADOS}
            CLASES_FONDO={CLASES_FONDO}
            CLASES_OVERLAY={CLASES_OVERLAY}
            CATEGORIAS={CATEGORIAS}
            CLASES_CATEGORIA={CLASES_CATEGORIA}
          />
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <section className="rounded-xl border border-t-eeeeee bg-white p-4">
              <div className="mb-3.5 flex items-center justify-between">
                <h3 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoGrupos.secciones.mis_grupos}</h3>
                <a href="#" className="text-enlace-accion font-semibold text-primario no-underline hover:underline">{textosRedSocial.VER_TODOS}</a>
              </div>
              {MIS_GRUPOS_LATERAL.map((g) => (
                <article key={g.nombre} className="flex items-center gap-2.5 border-b border-t-f5f5f5 py-2.25 last:border-b-0">
                  <div className={`grid h-9 w-9 flex-none place-items-center rounded-control text-white ${CLASES_LATERAL[g.color]}`}>
                    <Icono name="grupos" className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-nombre-entidad font-semibold text-texto">{g.nombre}</span>
                      {g.admin && <span className="rounded bg-t-ede9fe px-1.5 py-px text-etiqueta-estado font-semibold text-morado-categoria">{catalogoGrupos.leyendas.admin}</span>}
                    </div>
                    <span className="text-auxiliar text-texto-suave">{g.miembros}</span>
                  </div>
                </article>
              ))}
            </section>

            <section className="rounded-xl border border-t-eeeeee bg-white p-4">
              <div className="mb-3.5 flex items-center justify-between">
                <h3 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoGrupos.secciones.actividad_reciente}</h3>
                <a href="#" className="text-enlace-accion font-semibold text-primario no-underline hover:underline">{catalogoGrupos.leyendas.ver_toda}</a>
              </div>
              {ACTIVIDAD.map((a) => (
                <FilaActividadGrupo key={a.nombre + a.grupo} nombre={a.nombre} accion={a.accion} grupo={a.grupo} tiempo={a.tiempo} />
              ))}
            </section>

            <section className="flex items-start gap-3 rounded-xl degradado-lavanda-media p-5">
              <span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-overlay-13 text-primario">
                <Icono name="amigos" className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <strong className="mb-1 block text-subtitulo text-texto">{catalogoGrupos.consejo.titulo}</strong>
                <p className="m-0 text-cuerpo leading-1.45 text-texto-suave">{catalogoGrupos.consejo.texto}</p>
              </div>
            </section>
          </aside>
        }
      />
    </EstructuraApp>
  )
}
