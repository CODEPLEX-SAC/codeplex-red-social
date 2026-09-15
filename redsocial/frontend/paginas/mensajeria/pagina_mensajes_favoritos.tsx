import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { PestanasMensajes } from '../../componentes/mensajeria/bloques/pestanas_mensajes'
import { PanelLateralMensajeria } from '../../componentes/mensajeria/bloques/panel_lateral_mensajeria'
import { AvatarImagen } from '../../componentes/compartido/interfaz/avatar_imagen'
import usuarioImg from '../../../recursos/imagenes/usuario.jpg'
import { FAVORITOS, MOSTRANDO_FAVORITOS } from '../../datos/mensajeria/bandejas'

export function PaginaMensajesFavoritos() {
  return (
    <EstructuraApp paginaActiva="mensajes">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5 flex items-start justify-between gap-5">
              <h1 className="m-0 text-[23px] font-extrabold tracking-[-0.02em] text-texto">{catalogoMensajeria.titulos.favoritos}</h1>
              <div className="flex items-center gap-2.5">
                <button type="button" aria-label={catalogoMensajeria.botones.nuevo_mensaje} className="grid h-8 w-8 place-items-center rounded-[7px] border-0 bg-transparent text-[#6d6a7c] hover:bg-[#f2f1f6]">
                  <Icono name="mensaje" className="h-[18px] w-[18px]" />
                </button>
              </div>
            </div>

            <PestanasMensajes
              activa="11-04-mensajes-03-favoritos.html"
              tabs={[
                { etiqueta: catalogoMensajeria.titulos_pestanas.todos, archivo: '09-04-mensajes-01-todos-web.html' },
                { etiqueta: catalogoMensajeria.titulos_pestanas.no_leidos, archivo: '10-04-mensajes-02-no-leidos.html', insignia: 5 },
                {
                  etiqueta: (
                    <>
                      <Icono name="estrella" className="h-3 w-3" /> {catalogoMensajeria.titulos_pestanas.favoritos}
                    </>
                  ),
                  archivo: '11-04-mensajes-03-favoritos.html',
                },
              ]}
            />

            <section className="mb-4.5 overflow-hidden rounded-[10px] border border-borde bg-white shadow-sombra">
              <div className="p-3.5">
                {FAVORITOS.map((c) => (
                  <button
                    key={c.nombre}
                    type="button"
                    className="flex w-full items-center gap-2.5 rounded-[10px] border-b border-[#f5f3fa] px-3 py-3.5 text-left last:border-b-0 hover:bg-[#f9f8fc]"
                  >
                    <AvatarImagen src={usuarioImg} className="h-11 w-11 flex-none rounded-full bg-primario-suave" />
                    <span className="min-w-0 flex-1">
                      <strong className="mb-0.75 block text-[13px] font-bold text-texto">{c.nombre}</strong>
                      <span className="mb-1.25 block truncate text-xs text-texto-suave">{c.preview}</span>
                      <span className="inline-block max-w-full truncate rounded text-ellipsis bg-[#e8f5e9] px-2 py-0.5 text-[11px] font-medium text-[#2e7d32]">{c.contexto}</span>
                    </span>
                    <span className="flex flex-none flex-col items-end gap-2">
                      <time className="whitespace-nowrap text-[11px] text-[#aaa7b5]">{c.hora}</time>
                      <span className="grid h-[22px] w-[22px] flex-none place-items-center text-[#f59e0b]">
                        <Icono name="estrella" className="h-[18px] w-[18px]" />
                      </span>
                    </span>
                  </button>
                ))}
              </div>
              <div className="border-t border-[#f0eef5] p-3.5 text-center text-xs text-texto-suave">
                {MOSTRANDO_FAVORITOS}
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
