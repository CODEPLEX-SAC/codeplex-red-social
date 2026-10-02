import { EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas, ContactosPanel, GruposRecomendadosPanel, EventosProximosPanel, BloqueAnuncio } from '../../componentes/compartido'
import catalogoActividad from '../../catalogos/capacidades/redsocial/actividad.json'
import { PestanasActividad, TarjetaActividad } from '../../componentes/actividad'
import { CONTACTOS_SUGERIDOS, GRUPOS_RECOMENDADOS, EVENTOS_PROXIMOS, SESION_ACTUAL } from '../../rutas/compartido/rutas_compartido'
import { MENCIONES } from '../../rutas/actividad/rutas_actividad'

export function PaginaActividadMenciones() {
  return (
    <EstructuraApp paginaActiva="actividad">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5">
              <h1 className="m-0 mb-1 text-titulo-pagina font-extrabold text-texto">{catalogoActividad.titulos.menciones}</h1>
              <p className="m-0 text-subtitulo text-texto-suave">{catalogoActividad.subtitulos.menciones}</p>
            </div>

            <PestanasActividad activa="menciones" />

            <section className="rounded-control border border-borde bg-white">
              {MENCIONES.map((m) => (
                <TarjetaActividad
                  key={m.nombre}
                  nombreUsuario={m.nombre}
                  accion={m.accion}
                  nombreGrupo={m.nombreGrupo}
                  tiempo={m.tiempo}
                  visibilidad
                  interacciones={{ reacciones: m.reacciones, comentarios: m.comentarios }}
                >
                  {m.conImagen ? (
                    <div className="mb-1.5 mt-0.5 flex items-start gap-3">
                      <p className="m-0 flex-1 text-cuerpo leading-1.45 text-texto">
                        <span className="font-semibold text-primario">@{SESION_ACTUAL.usuario}</span> {m.texto}
                      </p>
                      <div className="ml-auto h-17 w-25 flex-none rounded-md bg-t-e8e5f0" />
                    </div>
                  ) : (
                    <p className="m-0 mb-1.5 mt-0.5 text-cuerpo leading-1.45 text-texto">
                      <span className="font-semibold text-primario">@{SESION_ACTUAL.usuario}</span> {m.texto}
                    </p>
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
