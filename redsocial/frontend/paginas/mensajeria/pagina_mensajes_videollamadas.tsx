import { Icono, EstructuraApp, usarCarrusel, clasesBoton } from '../../componentes/compartido'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { PestanasMensajes, SeccionContactosFrecuentes } from '../../componentes/mensajeria'
import { CONTACTOS_LINEA_MENSAJERIA, GRUPOS_RECIENTES_MENSAJERIA, EVENTOS_PROXIMOS_MENSAJERIA, LLAMADAS_RECIENTES, CONTACTOS_FRECUENTES, REUNIONES_PROGRAMADAS, HISTORIAL } from '../../rutas/mensajeria/rutas_mensajeria'

export function PaginaMensajesVideollamadas() {
  const carrusel = usarCarrusel()

  return (
    <EstructuraApp paginaActiva="mensajes">
      <div>
        <div className="mb-5 flex items-start justify-between gap-5">
          <h1 className="m-0 text-titulo-pagina tracking-n02 text-texto">{catalogoMensajeria.titulos.videollamadas}</h1>
          <div className="flex items-center gap-2.5">
            <a href="#" className="inline-flex items-center gap-1.5 text-enlace-accion text-texto-suave no-underline hover:text-primario">
              <Icono name="reloj" className="h-4 w-4" /> {catalogoMensajeria.leyendas.historial_de_llamadas}
            </a>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <PestanasMensajes
            activa="videollamadas"
            tabs={[
              { etiqueta: catalogoMensajeria.titulos_pestanas.mensajes, clave: 'todos' },
              { etiqueta: catalogoMensajeria.titulos_pestanas.videollamadas, clave: 'videollamadas' },
            ]}
          />
          <div className="mb-3 flex max-w-full flex-wrap items-center gap-2.5">
            <a href="#" className={clasesBoton({ variant: 'secundario', size: 'md' })}>
              <Icono name="crear-evento" className="h-4 w-4" /> {catalogoMensajeria.botones.nueva_reunion}
            </a>
            <a href={catalogoMensajeria.rutas.videollamada_iniciar} className={clasesBoton({ variant: 'primario', size: 'md' })}>
              <Icono name="video" className="h-4 w-4" /> {catalogoMensajeria.botones.iniciar_videollamada}
            </a>
          </div>
        </div>

        <SeccionContactosFrecuentes
          LLAMADAS_RECIENTES={LLAMADAS_RECIENTES}
          carrusel={carrusel}
          CONTACTOS_FRECUENTES={CONTACTOS_FRECUENTES}
          REUNIONES_PROGRAMADAS={REUNIONES_PROGRAMADAS}
          HISTORIAL={HISTORIAL}
          CONTACTOS_LINEA_MENSAJERIA={CONTACTOS_LINEA_MENSAJERIA}
          GRUPOS_RECIENTES_MENSAJERIA={GRUPOS_RECIENTES_MENSAJERIA}
          EVENTOS_PROXIMOS_MENSAJERIA={EVENTOS_PROXIMOS_MENSAJERIA}
        />
      </div>
    </EstructuraApp>
  )
}
