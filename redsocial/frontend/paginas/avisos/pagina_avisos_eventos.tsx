import { BotonIcono, Boton, Icono, EstructuraApp, EstructuraTresColumnas, ColumnaPublicidad } from '../../componentes/compartido'
import catalogoAvisos from '../../catalogos/capacidades/redsocial/avisos.json'
import { PestanasAvisos, BannerInfoAviso, FilaEventoAviso, PanelDetalleAviso } from '../../componentes/avisos'
import { EVENTOS_AVISO, CONTEOS_AVISOS, DETALLE_AVISO, CLASES_ICONO_COLOR } from '../../rutas/avisos/rutas_avisos'

const EVENTOS_HOY = EVENTOS_AVISO.filter((e) => e.grupo === 'hoy')
const EVENTOS_AYER = EVENTOS_AVISO.filter((e) => e.grupo === 'ayer')

export function PaginaAvisosEventos() {
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

            <PestanasAvisos activa="eventos" conteos={CONTEOS_AVISOS} />

            <BannerInfoAviso
              icono="calendario"
              titulo={catalogoAvisos.banner_eventos.titulo}
              descripcion={catalogoAvisos.banner_eventos.descripcion}
              cuadrado
            />

            <div className="mb-2.5 text-subtitulo font-bold text-texto">{catalogoAvisos.grupos_fecha.hoy}</div>
            <section className="mb-4 rounded-control border border-borde bg-white">
              {EVENTOS_HOY.map((e) => (
                <FilaEventoAviso key={e.id} evento={e} claseIcono={CLASES_ICONO_COLOR[e.colorIcono]} />
              ))}
            </section>

            <div className="mb-2.5 text-subtitulo font-bold text-texto">{catalogoAvisos.grupos_fecha.ayer}</div>
            <section className="rounded-control border border-borde bg-white">
              {EVENTOS_AYER.map((e) => (
                <FilaEventoAviso key={e.id} evento={e} claseIcono={CLASES_ICONO_COLOR[e.colorIcono]} />
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
