import { BotonIcono, Icono, EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas, Boton } from '../../componentes/compartido'
import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { PestanasGrupos, BloqueAdmin, BloqueVerGrupo, SeccionActividadRecienteGrupos } from '../../componentes/grupos'
import { GRUPOS_ADMIN, MIS_GRUPOS, ACTIVIDAD_MIS_GRUPOS as ACTIVIDAD, GRUPOS_POPULARES, CLASES_ICONO_ADMIN, CLASES_ICONO_MIS, CLASES_ICONO_LATERAL } from '../../rutas/grupos/rutas_grupos'

export function PaginaGruposMisGrupos() {
  return (
    <EstructuraApp paginaActiva="grupos">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-4 flex items-start justify-between gap-5">
              <h1 className="m-0 text-titulo-pagina font-extrabold text-texto">{catalogoGrupos.titulos.mis_grupos}</h1>
              <div className="flex flex-none items-center gap-2.5">
                <Boton variant="primario" size="md">
                  <Icono name="mas" className="h-4 w-4" /> {catalogoGrupos.botones.crear_grupo}
                </Boton>
                <BotonIcono icono="puntos" type="button" aria-label={catalogoGrupos.botones.mas_opciones} variant="discreto" size="sm" className="flex-none" />
              </div>
            </div>

            <PestanasGrupos activa="mis_grupos" />

            <div className="mb-6 flex items-start gap-3.5 rounded-control border border-t-e4dfff bg-t-f3f0ff p-5">
              <span className="grid h-11 w-11 flex-none place-items-center rounded-control bg-primario text-white">
                <Icono name="amigos" className="h-5.5 w-5.5" />
              </span>
              <div className="min-w-0 flex-1">
                <strong className="mb-0.75 block text-subtitulo text-texto">{catalogoGrupos.banner.titulo}</strong>
                <p className="m-0 text-cuerpo leading-1.4 text-texto-suave">{catalogoGrupos.banner.descripcion_mis_grupos}</p>
              </div>
              <BotonIcono icono="cerrar" type="button" aria-label={catalogoGrupos.botones.cerrar} variant="discreto" size="sm" className="flex-none" />
            </div>

            <div className="mb-3.5 flex items-center justify-between">
              <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoGrupos.secciones.grupos_que_administro} ({GRUPOS_ADMIN.length})</h2>
              <a href="#" className="text-enlace-accion font-semibold text-primario no-underline hover:underline">{textosRedSocial.VER_TODOS}</a>
            </div>
            <BloqueAdmin GRUPOS_ADMIN={GRUPOS_ADMIN} CLASES_ICONO_ADMIN={CLASES_ICONO_ADMIN} />

            <div className="mb-3.5 flex items-center justify-between">
              <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoGrupos.secciones.mis_grupos_titulo} ({MIS_GRUPOS.length})</h2>
              <a href="#" className="text-enlace-accion font-semibold text-primario no-underline hover:underline">{textosRedSocial.VER_TODOS}</a>
            </div>
            <BloqueVerGrupo MIS_GRUPOS={MIS_GRUPOS} CLASES_ICONO_MIS={CLASES_ICONO_MIS} />
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <SeccionActividadRecienteGrupos
            ACTIVIDAD={ACTIVIDAD}
            GRUPOS_POPULARES={GRUPOS_POPULARES}
            CLASES_ICONO_LATERAL={CLASES_ICONO_LATERAL}
          />
        }
      />
    </EstructuraApp>
  )
}
