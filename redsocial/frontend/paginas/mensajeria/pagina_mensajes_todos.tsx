import { useState } from 'react'
import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { PestanasMensajes } from '../../componentes/mensajeria/bloques/pestanas_mensajes'
import { PanelLateralMensajeria } from '../../componentes/mensajeria/bloques/panel_lateral_mensajeria'
import { ListaConversaciones } from '../../componentes/mensajeria/bloques/lista_conversaciones'
import { PanelConversacion } from '../../componentes/mensajeria/bloques/panel_conversacion'
import { CONVERSACIONES, CONVERSACION_ACTIVA } from '../../datos/mensajeria/mensajes'

export function PaginaMensajesTodos() {
  const [conversacionActiva, setConversacionActiva] = useState<string | null>(null)

  return (
    <EstructuraApp paginaActiva="mensajes" alturaCompleta>
      <EstructuraTresColumnas
        alturaCompleta
        principal={
          <section className="flex h-full flex-col">
            <div className="mb-5 flex items-start justify-between gap-5">
              <h1 className="m-0 text-[23px] font-extrabold tracking-[-0.02em] text-texto">Mensajes</h1>
              <div className="flex items-center gap-2.5">
                <button type="button" aria-label="Nuevo mensaje" className="grid h-8 w-8 place-items-center rounded-[7px] border border-borde text-primario hover:bg-[#f7f6fa]">
                  <Icono name="editar" className="h-[18px] w-[18px]" />
                </button>
              </div>
            </div>

            <PestanasMensajes
              activa="09-04-mensajes-01-todos-web.html"
              tabs={[
                { etiqueta: 'Mensajes', archivo: '09-04-mensajes-01-todos-web.html' },
                { etiqueta: 'Videollamadas', archivo: '12-04-mensajes-04-videollamadas.html' },
              ]}
            />

            <section
              data-zona="panel-mensajes"
              className="grid grid-cols-[280px_1fr] h-[calc(100vh-340px)] min-h-[400px] overflow-hidden max-[1100px]:grid-cols-[260px_1fr] max-[900px]:grid-cols-1 max-[900px]:gap-4 max-[900px]:flex-1 max-[900px]:min-h-0"
            >
              <ListaConversaciones
                conversaciones={CONVERSACIONES}
                activa={conversacionActiva}
                onSeleccionar={setConversacionActiva}
                oculta={conversacionActiva !== null}
              />
              <PanelConversacion
                conversacion={CONVERSACION_ACTIVA}
                onVolver={() => setConversacionActiva(null)}
                oculta={conversacionActiva === null}
              />
            </section>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={<PanelLateralMensajeria />}
      />
    </EstructuraApp>
  )
}
