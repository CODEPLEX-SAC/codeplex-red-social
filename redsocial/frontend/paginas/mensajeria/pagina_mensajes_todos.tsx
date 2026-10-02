import { BotonIcono, EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas } from '../../componentes/compartido'
import { useState } from 'react'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { PestanasMensajes, PanelLateralMensajeria, ListaConversaciones, PanelConversacion } from '../../componentes/mensajeria'
import { CONTACTOS_LINEA_MENSAJERIA, GRUPOS_RECIENTES_MENSAJERIA, EVENTOS_PROXIMOS_MENSAJERIA, CONVERSACIONES, CONVERSACION_ACTIVA, NO_LEIDOS } from '../../rutas/mensajeria/rutas_mensajeria'

export function PaginaMensajesTodos() {
  const [conversacionActiva, setConversacionActiva] = useState<string | null>(null)

  return (
    <EstructuraApp paginaActiva="mensajes" alturaCompleta>
      <EstructuraTresColumnas
        alturaCompleta
        principal={
          <section className="flex h-full flex-col">
            <div className="mb-5 flex items-start justify-between gap-5">
              <h1 className="m-0 text-titulo-pagina font-extrabold tracking-n02 text-texto">{catalogoMensajeria.titulos.todos}</h1>
              <div className="flex items-center gap-2.5">
                <BotonIcono icono="editar" type="button" aria-label={catalogoMensajeria.botones.nuevo_mensaje} variant="contorno" size="default" />
              </div>
            </div>

            <PestanasMensajes
              activa="todos"
              tabs={[
                { etiqueta: catalogoMensajeria.titulos_pestanas.mensajes, clave: 'todos' },
                { etiqueta: catalogoMensajeria.titulos_pestanas.videollamadas, clave: 'videollamadas' },
              ]}
            />

            <section
              data-zona="panel-mensajes"
              className="grid grid-cols-280-1fr h-vh-mensajes min-h-100 overflow-hidden max-1100:grid-cols-260-1fr max-900:grid-cols-1 max-900:gap-4 max-900:flex-1 max-900:min-h-0"
            >
              <ListaConversaciones
                conversaciones={CONVERSACIONES}
                activa={conversacionActiva}
                onSeleccionar={setConversacionActiva}
                oculta={conversacionActiva !== null}
                contadorNoLeidos={NO_LEIDOS.length}
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
        lateral={<PanelLateralMensajeria contactosLinea={CONTACTOS_LINEA_MENSAJERIA} gruposRecientes={GRUPOS_RECIENTES_MENSAJERIA} eventosProximos={EVENTOS_PROXIMOS_MENSAJERIA} />}
      />
    </EstructuraApp>
  )
}
