import { BotonIcono, Boton, Icono, EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas, ContactosPanel, GruposRecomendadosPanel, EventosProximosPanel, BloqueAnuncio } from '../../componentes/compartido'
import catalogoActividad from '../../catalogos/capacidades/redsocial/actividad.json'
import { PestanasActividad } from '../../componentes/actividad'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { CONTACTOS_SUGERIDOS, GRUPOS_RECOMENDADOS, EVENTOS_PROXIMOS } from '../../rutas/compartido/rutas_compartido'
import { EVENTOS_SISTEMA, CLASES_ICONO_EVENTO, CLASES_INDICADOR } from '../../rutas/actividad/rutas_actividad'

export function PaginaActividadSistema() {
  return (
    <EstructuraApp paginaActiva="actividad">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5">
              <h1 className="m-0 mb-1 text-titulo-pagina font-extrabold text-texto">{catalogoActividad.titulos.sistema}</h1>
              <p className="m-0 text-subtitulo text-texto-suave">{catalogoActividad.subtitulos.sistema}</p>
            </div>

            <PestanasActividad activa="sistema" />

            <section className="rounded-control border border-borde bg-white">
              <div className="flex items-start justify-between gap-3 border-b border-borde p-4 pb-3">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 flex-none place-items-center rounded-control bg-t-f5f3fa text-texto-suave">
                    <Icono name="configuracion" className="h-5.5 w-5.5" />
                  </div>
                  <div>
                    <h2 className="m-0 mb-0.5 text-titulo-seccion font-bold text-texto">{catalogoActividad.secciones.sistema.titulo}</h2>
                    <p className="m-0 text-auxiliar text-texto-suave">{catalogoActividad.secciones.sistema.descripcion}</p>
                  </div>
                </div>
                <Boton type="button" variant="secundario" size="default" className="flex-none">
                  {catalogoActividad.botones.sistema_todos}
                  <Icono name="flecha-abajo" className="h-3.5 w-3.5 text-texto-suave" />
                </Boton>
              </div>

              {EVENTOS_SISTEMA.map((e) => (
                <article key={e.titulo} className="flex items-center gap-3 border-b border-t-f0eef5 p-3.5 last:border-b-0 hover:bg-t-fdfcff">
                  <div className={`grid h-10 w-10 flex-none place-items-center rounded-control ${CLASES_ICONO_EVENTO[e.color]}`}>
                    <Icono name={e.icono} className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="mb-0.5 block text-subtitulo font-bold text-texto">{e.titulo}</span>
                    <span className="mb-0.75 block text-auxiliar text-texto-suave">{e.descripcion}</span>
                    <div className="flex flex-wrap items-center gap-1 text-auxiliar text-t-9892a6">
                      {e.detalles.map((d, i) => (
                        <span key={d} className="flex items-center gap-1">
                          {i > 0 && <span className="text-t-d4d0e0">·</span>}
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-none items-center gap-2">
                    <span className="whitespace-nowrap text-fecha-abreviada text-t-aaa7b5">{e.tiempo}</span>
                    <span className={`h-2 w-2 flex-none rounded-full ${CLASES_INDICADOR[e.estado]}`} />
                    <BotonIcono icono="puntos" type="button" aria-label={textosRedSocial.MAS_OPCIONES} variant="discreto" size="md" className="flex-none" />
                  </div>
                </article>
              ))}

              <button type="button" className="flex w-full items-center justify-center gap-1.5 border-t border-t-f0eef5 bg-transparent p-3.5 text-boton font-semibold text-primario hover:bg-t-fdfcff">
                {textosRedSocial.CARGAR_MAS}
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
