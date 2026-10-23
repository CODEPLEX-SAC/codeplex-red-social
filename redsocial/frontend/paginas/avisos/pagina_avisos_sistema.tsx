import { BotonIcono, Boton, Icono, MensajeVacio, EstructuraApp, EstructuraTresColumnas, ColumnaPublicidad } from '../../componentes/compartido'
import catalogoAvisos from '../../catalogos/capacidades/redsocial/avisos.json'
import { PestanasAvisos, PanelDetalleAviso } from '../../componentes/avisos'
import { CONTEOS_AVISOS, DETALLE_AVISO } from '../../rutas/avisos/rutas_avisos'

export function PaginaAvisosSistema() {
  return (
    <EstructuraApp paginaActiva="avisos">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5 flex items-start justify-between gap-5 max-600:flex-col max-600:items-stretch">
              <div>
                <h1 className="m-0 mb-1 text-titulo-pagina text-texto">{catalogoAvisos.titulos.principal}</h1>
                <p className="m-0 text-subtitulo text-texto-suave">{catalogoAvisos.subtitulos.principal}</p>
              </div>
              <div className="flex flex-none items-center gap-2">
                <Boton type="button" variant="secundario" size="default" className="flex-none">
                  <Icono name="verificado" className="h-3.5 w-3.5" /> {catalogoAvisos.botones.marcar_todas_leidas}
                </Boton>
                <BotonIcono icono="puntos" type="button" aria-label={catalogoAvisos.botones.mas_opciones} variant="contorno" size="default" className="flex-none" />
              </div>
            </div>

            <PestanasAvisos activa="sistema" conteos={CONTEOS_AVISOS} />

            <section className="rounded-control border border-borde bg-white p-8">
              <MensajeVacio texto={catalogoAvisos.mensajes.sin_notificaciones} />
            </section>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={<PanelDetalleAviso detalle={DETALLE_AVISO} />}
      />
    </EstructuraApp>
  )
}
