import { EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas, AvatarUsuario, Insignia, BotonIcono, imagenUsuarioPredeterminada as usuarioImg } from '../../componentes/compartido'
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
              <h1 className="m-0 text-titulo-pagina tracking-n02 text-texto">{catalogoMensajeria.titulos.no_leidos}</h1>
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
                  <div key={c.nombre} className="relative border-b border-fondo-hover-discreto last:border-b-0">
                    <button type="button" className="flex w-full items-center gap-2.5 rounded-control px-3 py-3.5 text-left hover:bg-fondo">
                      <span className="h-2 w-2 flex-none rounded-full bg-primario" />
                      <AvatarUsuario tamano="md" imagen={usuarioImg} />
                      <span className="min-w-0 flex-1">
                        <strong className="mb-0.5 block text-nombre-entidad text-texto">{c.nombre}</strong>
                        <span className="mb-0.5 block truncate text-cuerpo text-texto-suave">{c.preview}</span>
                        <span className="block truncate text-auxiliar italic text-texto-suave">{c.contexto}</span>
                      </span>
                      <span className="flex flex-none flex-col items-end gap-1.5">
                        <time className="whitespace-nowrap text-fecha-abreviada text-texto-suave">{c.hora}</time>
                        <span className="flex items-center gap-1.5">
                          <Insignia variant="counter">{c.badge}</Insignia>
                          <span aria-hidden="true" className="h-5 w-5" />
                        </span>
                      </span>
                    </button>
                    <BotonIcono icono="estrella" type="button" aria-label={catalogoMensajeria.botones.marcar_favorito} variant="sutil" size="sm" className="absolute bottom-3 right-2.5" />
                  </div>
                ))}
              </div>
              <div className="border-t border-borde-suave p-3.5 text-center text-auxiliar text-texto-suave">
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
