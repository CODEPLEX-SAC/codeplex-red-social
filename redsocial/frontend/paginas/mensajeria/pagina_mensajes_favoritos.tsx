import { Icono, EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas, AvatarUsuario, BotonIcono, MensajeVacio, imagenUsuarioPredeterminada as usuarioImg } from '../../componentes/compartido'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { PestanasMensajes, PanelLateralMensajeria, conversacionesConEtiqueta, proximaMedianoche, textoMostrando, usarAhora, usarMensajeria } from '../../componentes/mensajeria'
import { navegar } from '../../rutas/compartido/navegacion'
import { SESION_ACTUAL } from '../../rutas/compartido/rutas_compartido'
import { ALMACEN_MENSAJERIA, RELOJ_MENSAJERIA, rutasMensajeria, CONTACTOS_LINEA_MENSAJERIA, GRUPOS_RECIENTES_MENSAJERIA, EVENTOS_PROXIMOS_MENSAJERIA } from '../../rutas/mensajeria/rutas_mensajeria'

export function PaginaMensajesFavoritos() {
  const mensajeria = usarMensajeria(ALMACEN_MENSAJERIA, RELOJ_MENSAJERIA, SESION_ACTUAL.id)
  const cantidadNoLeidas = mensajeria.noLeidas.length
  const ahora = usarAhora(RELOJ_MENSAJERIA, proximaMedianoche)
  const favoritas = conversacionesConEtiqueta(mensajeria.favoritas, mensajeria.estado, ahora)

  const abrir = (id: string) => navegar(`${rutasMensajeria.todos}?${catalogoMensajeria.parametros_ruta.conversacion}=${id}`)

  return (
    <EstructuraApp paginaActiva="mensajes">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5 flex items-start justify-between gap-5">
              <h1 className="m-0 text-titulo-pagina text-texto">{catalogoMensajeria.titulos.favoritos}</h1>
              <div className="flex items-center gap-2.5">
                <BotonIcono icono="mensaje" aria-label={catalogoMensajeria.botones.nuevo_mensaje} />
              </div>
            </div>

            <PestanasMensajes
              activa="favoritos"
              tabs={[
                { etiqueta: catalogoMensajeria.titulos_pestanas.todos, clave: 'todos' },
                { etiqueta: catalogoMensajeria.titulos_pestanas.no_leidos, clave: 'no_leidos', insignia: cantidadNoLeidas > 0 ? cantidadNoLeidas : undefined },
                {
                  etiqueta: (
                    <>
                      <Icono name="estrella" className="h-3 w-3" /> {catalogoMensajeria.titulos_pestanas.favoritos}
                    </>
                  ),
                  clave: 'favoritos',
                },
              ]}
            />

            <section data-zona="bandeja-mensajes" className="mb-4.5 overflow-hidden rounded-control border border-borde bg-white shadow-sombra">
              <div className="p-3.5">
                {favoritas.length === 0 && <MensajeVacio texto={catalogoMensajeria.mensajes.sin_favoritos} />}
                {favoritas.map((c) => (
                  <div key={c.id} className="relative border-b border-fondo-hover-discreto last:border-b-0">
                    <button type="button" onClick={() => abrir(c.id)} className="flex w-full items-center gap-2.5 rounded-control px-3 py-3.5 text-left hover:bg-fondo">
                      <AvatarUsuario tamano="md" imagen={usuarioImg} />
                      <span className="min-w-0 flex-1">
                        <strong className="mb-0.75 block text-nombre-entidad text-texto">{c.nombre}</strong>
                        <span className="mb-1.25 block truncate text-cuerpo text-texto-suave">{c.extracto}</span>
                        {c.contexto && <span className="inline-block max-w-full truncate rounded text-ellipsis bg-fondo-categoria-verde px-2 py-0.5 text-badge text-verde-categoria-texto">{c.contexto}</span>}
                      </span>
                      <span className="flex flex-none flex-col items-end gap-2">
                        <time className="whitespace-nowrap text-fecha-abreviada text-texto-suave">{c.etiquetaTiempo}</time>
                        <span aria-hidden="true" className="h-5.5 w-5.5" />
                      </span>
                    </button>
                    <BotonIcono icono="estrella" type="button" aria-label={catalogoMensajeria.botones.quitar_favorito} aria-pressed onClick={() => mensajeria.alternarFavorita(c.id)} variant="sutil" size="sm" className="absolute bottom-3 right-2.5 text-amarillo-categoria" />
                  </div>
                ))}
              </div>
              <div className="border-t border-borde-suave p-3.5 text-center text-auxiliar text-texto-suave">
                {textoMostrando(catalogoMensajeria.leyendas.mostrando_favoritos, mensajeria.favoritas.length, mensajeria.favoritas.length)}
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
