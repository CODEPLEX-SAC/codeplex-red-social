import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { PestanasMensajes } from '../../componentes/mensajeria/bloques/pestanas_mensajes'
import { PanelLateralMensajeria } from '../../componentes/mensajeria/bloques/panel_lateral_mensajeria'

const FAVORITOS = [
  { nombre: 'María Fernández', preview: 'Hola Pedro, ¿puedes enviarme el reporte de avances del proyecto Central?', contexto: 'Proyecto Puente Central', hora: '10:18 AM' },
  { nombre: 'Luis Rodríguez', preview: 'Te comparto el informe solicitado.', contexto: 'Informe de Costos - Proyecto Puente', hora: '09:15 AM' },
  { nombre: 'Equipo de Proyectos', preview: 'Por favor confirma si puedes asistir a la reunión de seguimiento este viernes.', contexto: 'Reunión de seguimiento', hora: 'Ayer' },
  { nombre: 'Ana García', preview: 'Gracias por la información.', contexto: 'Información general', hora: 'Ayer' },
  { nombre: 'Diego Mendoza', preview: 'Estoy revisando los documentos.', contexto: 'Documentos del proyecto', hora: '2 días' },
]

export function PaginaMensajesFavoritos() {
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
              activa="11-04-mensajes-03-favoritos.html"
              tabs={[
                { etiqueta: 'Todos', archivo: '09-04-mensajes-01-todos-web.html' },
                { etiqueta: 'No leídos', archivo: '10-04-mensajes-02-no-leidos.html', insignia: 5 },
                {
                  etiqueta: (
                    <>
                      <Icono name="estrella" className="h-3 w-3" /> Favoritos
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
                    <span className="h-11 w-11 flex-none rounded-full bg-primario-suave bg-[url('/imagenes/usuario.jpg')] bg-cover bg-center bg-no-repeat" />
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
                Mostrando 5 de 5 mensajes favoritos
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
