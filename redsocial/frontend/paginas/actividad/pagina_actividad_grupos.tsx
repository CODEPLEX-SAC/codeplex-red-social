import { Boton, Icono, EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas, Insignia, ContactosPanel, GruposRecomendadosPanel, EventosProximosPanel, BloqueAnuncio, AvatarImagen, imagenUsuarioPredeterminada as usuarioImg } from '../../componentes/compartido'
import catalogoActividad from '../../catalogos/capacidades/redsocial/actividad.json'
import { PestanasActividad } from '../../componentes/actividad'
import { CONTACTOS_SUGERIDOS, GRUPOS_RECOMENDADOS, EVENTOS_PROXIMOS } from '../../rutas/compartido/rutas_compartido'
import { GRUPOS_ACTIVIDAD, CLASES_ICONO_GRUPO } from '../../rutas/actividad/rutas_actividad'

export function PaginaActividadGrupos() {
  return (
    <EstructuraApp paginaActiva="actividad">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5">
              <h1 className="m-0 mb-1 text-titulo-pagina font-extrabold text-texto">{catalogoActividad.titulos.grupos}</h1>
              <p className="m-0 text-subtitulo text-texto-suave">{catalogoActividad.subtitulos.grupos}</p>
            </div>

            <PestanasActividad activa="grupos" />

            <section className="rounded-control border border-borde bg-white">
              <div className="flex items-start justify-between gap-3 border-b border-borde p-4 pb-3">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 flex-none place-items-center rounded-control bg-t-f5f3fa text-texto-suave">
                    <Icono name="grupos" className="h-5.5 w-5.5" />
                  </div>
                  <div>
                    <h2 className="m-0 mb-0.5 text-titulo-seccion font-bold text-texto">{catalogoActividad.secciones.grupos.titulo}</h2>
                    <p className="m-0 text-auxiliar text-texto-suave">{catalogoActividad.secciones.grupos.descripcion}</p>
                  </div>
                </div>
                <Boton type="button" variant="contorno" size="default" className="flex-none">
                  <Icono name="mas" className="h-3.5 w-3.5" /> {catalogoActividad.botones.grupos_crear}
                </Boton>
              </div>

              {GRUPOS_ACTIVIDAD.map((g) => (
                <article
                  key={g.nombre}
                  className={
                    'grid items-start gap-x-3.5 gap-y-0 border-b border-t-f0eef5 p-4 last:border-b-0 hover:bg-t-fdfcff grid-fila-grupo ' +
                    'max-600:gap-y-2'
                  }
                >
                  <div className={`grid h-12 w-12 flex-none place-items-center rounded-xl text-white area-icon ${CLASES_ICONO_GRUPO[g.color]}`}>
                    <Icono name="grupos" className="h-6.5 w-6.5" />
                  </div>

                  <div className="mb-0.5 flex flex-wrap items-center gap-2 area-nombre max-600:contents">
                    <span className="min-w-0 text-nombre-entidad font-bold text-texto max-600:area-nombre">{g.nombre}</span>
                    <div className="max-600:area-badge">
                      <Insignia variant="privacy" tone={g.privacidad}>{g.privacidad === 'publico' ? catalogoActividad.insignias.grupo_publico : catalogoActividad.insignias.grupo_privado}</Insignia>
                    </div>
                  </div>

                  <div className="contents max-600:flex max-600:items-center max-600:gap-1 max-600:area-meta">
                    <span className="mb-2 block text-auxiliar text-texto-suave area-miembros max-600:mb-0">{g.miembros}</span>
                    <span className="whitespace-nowrap text-auxiliar text-texto-suave area-actividades max-600:before:mr-1 max-600:before:content-punto">{g.actividades}</span>
                  </div>

                  <div className="flex items-center gap-2 area-actividad">
                    <AvatarImagen src={usuarioImg} className="h-7 w-7 flex-none rounded-full bg-primario-suave" />
                    <div className="min-w-0 flex-1 text-cuerpo">
                      <span className="font-semibold text-texto">{g.usuario}</span>
                      <span className="text-texto-suave">{g.accion}</span>
                      <span className="mt-0.5 block text-fecha-abreviada text-t-aaa7b5">{g.tiempo}</span>
                    </div>
                  </div>

                  <div className="grid h-5 w-5 place-items-center text-t-c4c0d3 area-flecha">
                    <Icono name="flecha-derecha" className="h-3.5 w-3.5" />
                  </div>
                </article>
              ))}

              <button type="button" className="flex w-full items-center justify-center gap-1.5 border-t border-t-f0eef5 bg-transparent p-3.5 text-boton font-semibold text-primario hover:bg-t-fdfcff">
                {catalogoActividad.botones.grupos_ver_mas}
                <Icono name="flecha-abajo" className="h-4 w-4" />
              </button>
            </section>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <ContactosPanel contactos={CONTACTOS_SUGERIDOS} />
            <GruposRecomendadosPanel grupos={GRUPOS_RECOMENDADOS} />
            <EventosProximosPanel eventos={EVENTOS_PROXIMOS} />
            <BloqueAnuncio />
          </aside>
        }
      />
    </EstructuraApp>
  )
}
