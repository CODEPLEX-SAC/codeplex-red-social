import { Icono, EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas, AvatarImagen, BotonIcono, imagenUsuarioPredeterminada as usuarioImg } from '../../componentes/compartido'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { PestanasMensajes, PanelLateralMensajeria } from '../../componentes/mensajeria'
import { CONTACTOS_LINEA_MENSAJERIA, GRUPOS_RECIENTES_MENSAJERIA, EVENTOS_PROXIMOS_MENSAJERIA, NO_LEIDOS, MOSTRANDO_NO_LEIDOS } from '../../rutas/mensajeria/rutas_mensajeria'

export function PaginaMensajesNoLeidos() {
  return (
    <EstructuraApp paginaActiva="mensajes">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5 flex items-start justify-between gap-5">
              <h1 className="m-0 text-titulo-pagina font-extrabold tracking-n02 text-texto">{catalogoMensajeria.titulos.no_leidos}</h1>
              <div className="flex items-center gap-2.5">
                <BotonIcono icono="mensaje" aria-label={catalogoMensajeria.botones.nuevo_mensaje} />
              </div>
            </div>

            <PestanasMensajes
              activa="no_leidos"
              tabs={[
                { etiqueta: catalogoMensajeria.titulos_pestanas.todos, clave: 'todos' },
                { etiqueta: catalogoMensajeria.titulos_pestanas.no_leidos, clave: 'no_leidos', insignia: 5 },
                { etiqueta: catalogoMensajeria.titulos_pestanas.favoritos, clave: 'favoritos' },
              ]}
            />

            <section className="mb-4.5 overflow-hidden rounded-control border border-borde bg-white shadow-sombra">
              <div className="p-3.5">
                {NO_LEIDOS.map((c) => (
                  <button
                    key={c.nombre}
                    type="button"
                    className="flex w-full items-center gap-2.5 rounded-control border-b border-t-f5f3fa px-3 py-3.5 text-left last:border-b-0 hover:bg-t-f9f8fc"
                  >
                    <span className="h-2 w-2 flex-none rounded-full bg-primario" />
                    <AvatarImagen src={usuarioImg} className="h-11 w-11 flex-none rounded-full bg-primario-suave" />
                    <span className="min-w-0 flex-1">
                      <strong className="mb-0.5 block text-nombre-entidad font-bold text-texto">{c.nombre}</strong>
                      <span className="mb-0.5 block truncate text-cuerpo text-texto-suave">{c.preview}</span>
                      <span className="block truncate text-auxiliar italic text-t-9892a6">{c.contexto}</span>
                    </span>
                    <span className="flex flex-none flex-col items-end gap-1.5">
                      <time className="whitespace-nowrap text-fecha-abreviada text-t-aaa7b5">{c.hora}</time>
                      <span className="flex items-center gap-1.5">
                        <span className="inline-grid h-4.5 min-w-4.5 place-items-center rounded-full bg-primario px-1.25 text-contador font-bold leading-none text-white">{c.badge}</span>
                        <span role="button" aria-label={catalogoMensajeria.botones.marcar_favorito} tabIndex={0} className="grid h-5 w-5 place-items-center text-t-d4d0e0 hover:text-t-f59e0b">
                          <Icono name="estrella" className="h-4 w-4" />
                        </span>
                      </span>
                    </span>
                  </button>
                ))}
              </div>
              <div className="border-t border-t-f0eef5 p-3.5 text-center text-auxiliar text-texto-suave">
                {MOSTRANDO_NO_LEIDOS}
              </div>
            </section>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={<PanelLateralMensajeria contactosLinea={CONTACTOS_LINEA_MENSAJERIA} gruposRecientes={GRUPOS_RECIENTES_MENSAJERIA} eventosProximos={EVENTOS_PROXIMOS_MENSAJERIA} />}
      />
    </EstructuraApp>
  )
}
