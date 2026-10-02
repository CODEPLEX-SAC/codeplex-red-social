import { EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas, ContactosPanel, GruposRecomendadosPanel, EventosProximosPanel, BloqueAnuncio } from '../../componentes/compartido'
import catalogoActividad from '../../catalogos/capacidades/redsocial/actividad.json'
import { PestanasActividad, TarjetaActividad } from '../../componentes/actividad'
import { CONTACTOS_SUGERIDOS, GRUPOS_RECOMENDADOS, EVENTOS_PROXIMOS } from '../../rutas/compartido/rutas_compartido'
import { PUBLICACIONES } from '../../rutas/actividad/rutas_actividad'

export function PaginaActividadPublicaciones() {
  return (
    <EstructuraApp paginaActiva="actividad">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5">
              <h1 className="m-0 mb-1 text-titulo-pagina font-extrabold text-texto">{catalogoActividad.titulos.publicaciones}</h1>
              <p className="m-0 text-subtitulo text-texto-suave">{catalogoActividad.subtitulos.publicaciones}</p>
            </div>

            <PestanasActividad activa="publicaciones" />

            <section className="rounded-control border border-borde bg-white">
              {PUBLICACIONES.map((p) => (
                <TarjetaActividad
                  key={p.nombre}
                  nombreUsuario={p.nombre}
                  accion={p.accion}
                  nombreGrupo={p.nombreGrupo}
                  tiempo={p.tiempo}
                  visibilidad
                  interacciones={{ reacciones: p.reacciones, comentarios: p.comentarios }}
                >
                  {p.conImagen ? (
                    <div className="mb-1.5 mt-0.5 flex items-start gap-3">
                      <p className="m-0 flex-1 text-cuerpo leading-1.45 text-texto">{p.texto}</p>
                      <div className="ml-auto h-17 w-25 flex-none rounded-md bg-t-e8e5f0" />
                    </div>
                  ) : (
                    <p className="m-0 mb-1.5 mt-0.5 text-cuerpo leading-1.45 text-texto">{p.texto}</p>
                  )}
                </TarjetaActividad>
              ))}
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
