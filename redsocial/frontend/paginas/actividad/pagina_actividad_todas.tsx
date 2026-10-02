import { Boton, Icono, EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas, ContactosPanel, GruposRecomendadosPanel, EventosProximosPanel, BloqueAnuncio } from '../../componentes/compartido'
import catalogoActividad from '../../catalogos/capacidades/redsocial/actividad.json'
import { PestanasActividad, TarjetaActividad } from '../../componentes/actividad'
import { CONTACTOS_SUGERIDOS, GRUPOS_RECOMENDADOS, EVENTOS_PROXIMOS, SESION_ACTUAL } from '../../rutas/compartido/rutas_compartido'
import { PUBLICACION_GRUPO_TODAS, MENCION_TODAS, COMENTARIO_TODAS, EVENTO_SISTEMA_TODAS, ARCHIVOS_MODULO_TODAS, GRUPO_UNIDO_TODAS } from '../../rutas/actividad/rutas_actividad'

export function PaginaActividadTodas() {
  return (
    <EstructuraApp paginaActiva="actividad">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5">
              <h1 className="m-0 mb-1 text-titulo-pagina font-extrabold text-texto">{catalogoActividad.titulos.todas}</h1>
              <p className="m-0 text-subtitulo text-texto-suave">{catalogoActividad.subtitulos.todas}</p>
            </div>

            <PestanasActividad activa="todas" />

            <section className="rounded-control border border-borde bg-white">
              <TarjetaActividad
                nombreUsuario={PUBLICACION_GRUPO_TODAS.nombreUsuario}
                accion={PUBLICACION_GRUPO_TODAS.accion}
                nombreGrupo={PUBLICACION_GRUPO_TODAS.nombreGrupo}
                tiempo={PUBLICACION_GRUPO_TODAS.tiempo}
                visibilidad
                interacciones={{ reacciones: 128, comentarios: 24 }}
              >
                <div className="mb-1.5 mt-0.5 flex items-start gap-3">
                  <p className="m-0 flex-1 text-cuerpo leading-1.45 text-texto">{PUBLICACION_GRUPO_TODAS.texto}</p>
                  <div className="ml-auto h-17 w-25 flex-none rounded-md bg-t-e8e5f0" />
                </div>
              </TarjetaActividad>

              <TarjetaActividad
                nombreUsuario={MENCION_TODAS.nombreUsuario}
                accion={MENCION_TODAS.accion}
                tiempo={MENCION_TODAS.tiempo}
                visibilidad
                interacciones={{ reacciones: 45, comentarios: 12 }}
              >
                <div className="mb-1.5 mt-0.5 flex items-start gap-3">
                  <p className="m-0 flex-1 text-cuerpo leading-1.45 text-texto">
                    <span className="font-semibold text-primario">@{SESION_ACTUAL.usuario}</span> {MENCION_TODAS.texto}
                  </p>
                  <div className="ml-auto h-17 w-25 flex-none rounded-md bg-t-e8e5f0" />
                </div>
              </TarjetaActividad>

              <TarjetaActividad
                nombreUsuario={COMENTARIO_TODAS.nombreUsuario}
                accion={COMENTARIO_TODAS.accion}
                tiempo={COMENTARIO_TODAS.tiempo}
                visibilidad
                interacciones={{ reacciones: 28, comentarios: 9 }}
              >
                <p className="m-0 mb-1.5 mt-0.5 text-cuerpo leading-1.45 text-texto">{COMENTARIO_TODAS.texto}</p>
              </TarjetaActividad>

              <TarjetaActividad iconoSistema="sistema" nombreUsuario={EVENTO_SISTEMA_TODAS.nombreUsuario} tiempo={EVENTO_SISTEMA_TODAS.tiempo}>
                <p className="m-0 mb-1.5 mt-0.5 text-cuerpo leading-1.45 text-texto">{EVENTO_SISTEMA_TODAS.texto}</p>
                <span className="inline-block rounded-control bg-t-e8f5e9 px-2 py-0.5 text-etiqueta-estado font-semibold text-t-2e7d32">{EVENTO_SISTEMA_TODAS.estado}</span>
              </TarjetaActividad>

              <TarjetaActividad
                nombreUsuario={ARCHIVOS_MODULO_TODAS.nombreUsuario}
                accion={ARCHIVOS_MODULO_TODAS.accion}
                nombreModulo={ARCHIVOS_MODULO_TODAS.nombreModulo}
                tiempo={ARCHIVOS_MODULO_TODAS.tiempo}
              >
                <div className="my-1 overflow-hidden rounded-lg border border-borde">
                  {ARCHIVOS_MODULO_TODAS.archivos.map((f) => (
                    <div key={f.nombre} className="flex items-center gap-2 border-b border-t-f5f3fa px-2.5 py-1.75 last:border-b-0 hover:bg-t-fdfcff">
                      <div className={'grid h-7.5 w-7.5 flex-none place-items-center rounded-md ' + (f.tipo === 'pdf' ? 'bg-t-fdeceb text-negativo-kpi' : 'bg-t-e8f5e9 text-t-2e7d32')}>
                        <Icono name={f.tipo === 'pdf' ? 'archivo-pdf' : 'archivo-hoja'} className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block truncate text-nombre-entidad font-semibold text-texto">{f.nombre}</span>
                        <span className="block text-auxiliar text-texto-suave">{f.tamano}</span>
                      </div>
                      <div className="grid h-6 w-6 flex-none place-items-center text-t-c4c0d3">
                        <Icono name="flecha-derecha" className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </TarjetaActividad>

              <TarjetaActividad
                nombreUsuario={GRUPO_UNIDO_TODAS.nombreUsuario}
                accion={GRUPO_UNIDO_TODAS.accion}
                nombreGrupo={GRUPO_UNIDO_TODAS.nombreGrupo}
                tiempo={GRUPO_UNIDO_TODAS.tiempo}
              >
                <div className="mt-1 flex items-center gap-2.5 rounded-lg border border-borde bg-t-f9f8fc px-3 py-2">
                  <div className="grid h-9 w-9 flex-none place-items-center rounded-lg bg-naranja-categoria text-white">
                    <Icono name="grupos" className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-nombre-entidad font-bold text-texto">{GRUPO_UNIDO_TODAS.nombreGrupo}</span>
                    <span className="block text-auxiliar text-texto-suave">{GRUPO_UNIDO_TODAS.miembros}</span>
                  </div>
                  <Boton type="button" variant="contorno" size="mini" className="flex-none">
                    {catalogoActividad.botones.todas_ver_grupo}
                  </Boton>
                </div>
              </TarjetaActividad>
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
