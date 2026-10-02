import { BotonIcono, Boton, Icono, EstructuraApp, EstructuraTresColumnas, ColumnaPublicidad } from '../../componentes/compartido'
import catalogoAvisos from '../../catalogos/capacidades/redsocial/avisos.json'
import { PestanasAvisos, FilaAviso, PanelDetalleAviso } from '../../componentes/avisos'
import { AVISOS, CONTEOS_AVISOS, DETALLE_AVISO, CLASES_ICONO_COLOR } from '../../rutas/avisos/rutas_avisos'

export function PaginaAvisos() {
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

            <PestanasAvisos activa="todas" conteos={CONTEOS_AVISOS} />

            <div className="mb-2.5 text-subtitulo font-bold text-texto">{catalogoAvisos.grupos_fecha.hoy}</div>

            <section className="rounded-control border border-borde bg-white">
              {AVISOS.map((n) => (
                <FilaAviso key={n.id} aviso={n} claseIcono={CLASES_ICONO_COLOR[n.colorIcono]} />
              ))}
            </section>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={<PanelDetalleAviso detalle={DETALLE_AVISO} />}
      />
    </EstructuraApp>
  )
}
