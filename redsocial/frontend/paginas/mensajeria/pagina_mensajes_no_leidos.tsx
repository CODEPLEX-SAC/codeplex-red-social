import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { PestanasMensajes } from '../../componentes/mensajeria/bloques/pestanas_mensajes'
import { PanelLateralMensajeria } from '../../componentes/mensajeria/bloques/panel_lateral_mensajeria'
import { AvatarImagen } from '../../componentes/compartido/interfaz/avatar_imagen'
import usuarioImg from '../../../recursos/imagenes/usuario.jpg'
import { NO_LEIDOS, MOSTRANDO_NO_LEIDOS } from '../../datos/mensajeria/bandejas'

export function PaginaMensajesNoLeidos() {
  return (
    <EstructuraApp paginaActiva="mensajes">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5 flex items-start justify-between gap-5">
              <h1 className="m-0 text-[23px] font-extrabold tracking-[-0.02em] text-texto">{catalogoMensajeria.titulos.no_leidos}</h1>
              <div className="flex items-center gap-2.5">
                <button type="button" aria-label={catalogoMensajeria.botones.nuevo_mensaje} className="grid h-8 w-8 place-items-center rounded-[7px] border-0 bg-transparent text-[#6d6a7c] hover:bg-[#f2f1f6]">
                  <Icono name="mensaje" className="h-[18px] w-[18px]" />
                </button>
              </div>
            </div>

            <PestanasMensajes
              activa="10-04-mensajes-02-no-leidos.html"
              tabs={[
                { etiqueta: catalogoMensajeria.titulos_pestanas.todos, archivo: '09-04-mensajes-01-todos-web.html' },
                { etiqueta: catalogoMensajeria.titulos_pestanas.no_leidos, archivo: '10-04-mensajes-02-no-leidos.html', insignia: 5 },
                { etiqueta: catalogoMensajeria.titulos_pestanas.favoritos, archivo: '11-04-mensajes-03-favoritos.html' },
              ]}
            />

            <section className="mb-4.5 overflow-hidden rounded-[10px] border border-borde bg-white shadow-sombra">
              <div className="p-3.5">
                {NO_LEIDOS.map((c) => (
                  <button
                    key={c.nombre}
                    type="button"
                    className="flex w-full items-center gap-2.5 rounded-[10px] border-b border-[#f5f3fa] px-3 py-3.5 text-left last:border-b-0 hover:bg-[#f9f8fc]"
                  >
                    <span className="h-2 w-2 flex-none rounded-full bg-primario" />
                    <AvatarImagen src={usuarioImg} className="h-11 w-11 flex-none rounded-full bg-primario-suave" />
                    <span className="min-w-0 flex-1">
                      <strong className="mb-0.5 block text-[13px] font-bold text-texto">{c.nombre}</strong>
                      <span className="mb-0.5 block truncate text-xs text-texto-suave">{c.preview}</span>
                      <span className="block truncate text-[11px] italic text-[#9892a6]">{c.contexto}</span>
                    </span>
                    <span className="flex flex-none flex-col items-end gap-1.5">
                      <time className="whitespace-nowrap text-[11px] text-[#aaa7b5]">{c.hora}</time>
                      <span className="flex items-center gap-1.5">
                        <span className="inline-grid h-[18px] min-w-[18px] place-items-center rounded-full bg-primario px-1.25 text-[9px] font-bold leading-none text-white">{c.badge}</span>
                        <span role="button" aria-label={catalogoMensajeria.botones.marcar_favorito} tabIndex={0} className="grid h-5 w-5 place-items-center text-[#d4d0e0] hover:text-[#f59e0b]">
                          <Icono name="estrella" className="h-4 w-4" />
                        </span>
                      </span>
                    </span>
                  </button>
                ))}
              </div>
              <div className="border-t border-[#f0eef5] p-3.5 text-center text-xs text-texto-suave">
                {MOSTRANDO_NO_LEIDOS}
              </div>
            </section>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={<PanelLateralMensajeria />}
      />
    </EstructuraApp>
  )
}
