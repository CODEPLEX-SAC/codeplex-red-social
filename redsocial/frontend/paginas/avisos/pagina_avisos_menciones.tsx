import { BotonIcono, Boton, Icono, EstructuraApp, EstructuraTresColumnas, ColumnaPublicidad } from '../../componentes/compartido'
import catalogoAvisos from '../../catalogos/capacidades/redsocial/avisos.json'
import { PestanasAvisos, BannerInfoAviso, FilaMencion, PanelDetalleAviso } from '../../componentes/avisos'
import { MENCIONES, CONTEOS_AVISOS, DETALLE_AVISO } from '../../rutas/avisos/rutas_avisos'

export function PaginaAvisosMenciones() {
  return (
    <EstructuraApp paginaActiva="avisos">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5 flex items-start justify-between gap-5 max-600:flex-col max-600:items-stretch">
              <div>
                <h1 className="m-0 mb-1 text-titulo-pagina font-extrabold text-texto">{catalogoAvisos.titulos.principal}</h1>
                <p className="m-0 text-subtitulo text-texto-suave">{catalogoAvisos.subtitulos.principal}</p>
              </div>
              <div className="flex flex-none items-center gap-2">
                <Boton type="button" variant="secundario" size="default" className="flex-none">
                  <Icono name="verificado" className="h-3.5 w-3.5" /> {catalogoAvisos.botones.marcar_todas_leidas}
                </Boton>
                <BotonIcono icono="puntos" type="button" aria-label={catalogoAvisos.botones.mas_opciones} variant="contorno" size="default" className="flex-none" />
              </div>
            </div>

            <PestanasAvisos activa="menciones" conteos={CONTEOS_AVISOS} />

            <BannerInfoAviso
              icono="comentario"
              titulo={catalogoAvisos.banner_menciones.titulo}
              descripcion={catalogoAvisos.banner_menciones.descripcion}
            />

            <section className="rounded-control border border-borde bg-white">
              {MENCIONES.map((m) => (
                <FilaMencion key={m.id} mencion={m} />
              ))}
            </section>

            <div className="mt-4 flex justify-center">
              <Boton type="button" variant="secundario" size="md">
                {catalogoAvisos.botones_lista.cargar_mas_notificaciones} <Icono name="flecha-abajo" className="h-3.5 w-3.5" />
              </Boton>
            </div>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={<PanelDetalleAviso detalle={DETALLE_AVISO} />}
      />
    </EstructuraApp>
  )
}
