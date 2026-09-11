import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { PestanasMensajes } from '../../componentes/mensajeria/bloques/pestanas_mensajes'
import { PanelLateralMensajeria } from '../../componentes/mensajeria/bloques/panel_lateral_mensajeria'
import usuarioImg from '../../../recursos/imagenes/usuario.jpg'

const NO_LEIDOS = [
  { nombre: 'María Fernández', preview: 'Hola Pedro, ¿puedes enviarme el reporte de avances del proyecto Central?', contexto: 'Proyecto Puente Central', hora: '10:18 AM', badge: 2 },
  { nombre: 'Luis Rodríguez', preview: 'Te comparto el informe solicitado.', contexto: 'Informe de Costos - Proyecto Puente', hora: '09:15 AM', badge: 1 },
  { nombre: 'Equipo de Proyectos', preview: 'Por favor confirma si puedes asistir a la reunión de seguimiento este viernes.', contexto: 'Reunión de seguimiento', hora: 'Ayer', badge: 1 },
  { nombre: 'Ana García', preview: 'Gracias por la información.', contexto: 'Información general', hora: 'Ayer', badge: 1 },
  { nombre: 'Diego Mendoza', preview: 'Estoy revisando los documentos.', contexto: 'Documentos del proyecto', hora: '2 días', badge: 1 },
]

export function PaginaMensajesNoLeidos() {
  return (
    <EstructuraApp paginaActiva="mensajes">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5 flex items-start justify-between gap-5">
              <h1 className="m-0 text-[23px] font-extrabold tracking-[-0.02em] text-texto">Mensajes</h1>
              <div className="flex items-center gap-2.5">
                <button type="button" aria-label="Nuevo mensaje" className="grid h-8 w-8 place-items-center rounded-[7px] border-0 bg-transparent text-[#6d6a7c] hover:bg-[#f2f1f6]">
                  <Icono name="mensaje" className="h-[18px] w-[18px]" />
                </button>
              </div>
            </div>

            <PestanasMensajes
              activa="10-04-mensajes-02-no-leidos.html"
              tabs={[
                { etiqueta: 'Todos', archivo: '09-04-mensajes-01-todos-web.html' },
                { etiqueta: 'No leídos', archivo: '10-04-mensajes-02-no-leidos.html', insignia: 5 },
                { etiqueta: 'Favoritos', archivo: '11-04-mensajes-03-favoritos.html' },
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
                    <span
                      className="h-11 w-11 flex-none rounded-full bg-primario-suave bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${usuarioImg})` }}
                    />
                    <span className="min-w-0 flex-1">
                      <strong className="mb-0.5 block text-[13px] font-bold text-texto">{c.nombre}</strong>
                      <span className="mb-0.5 block truncate text-xs text-texto-suave">{c.preview}</span>
                      <span className="block truncate text-[11px] italic text-[#9892a6]">{c.contexto}</span>
                    </span>
                    <span className="flex flex-none flex-col items-end gap-1.5">
                      <time className="whitespace-nowrap text-[11px] text-[#aaa7b5]">{c.hora}</time>
                      <span className="flex items-center gap-1.5">
                        <span className="inline-grid h-[18px] min-w-[18px] place-items-center rounded-full bg-primario px-1.25 text-[9px] font-bold leading-none text-white">{c.badge}</span>
                        <span role="button" aria-label="Marcar como favorito" tabIndex={0} className="grid h-5 w-5 place-items-center text-[#d4d0e0] hover:text-[#f59e0b]">
                          <Icono name="estrella" className="h-4 w-4" />
                        </span>
                      </span>
                    </span>
                  </button>
                ))}
              </div>
              <div className="border-t border-[#f0eef5] p-3.5 text-center text-xs text-texto-suave">
                Mostrando 5 de 5 mensajes no leídos
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
