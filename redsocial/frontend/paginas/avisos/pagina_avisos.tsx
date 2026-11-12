import { Boton, Icono, EstructuraApp, EstructuraTresColumnas, ColumnaPublicidad } from '../../componentes/compartido'
import catalogoAvisos from '../../catalogos/capacidades/redsocial/avisos.json'
import { PestanasNovedades, FilaNovedad, PanelDetalleNovedad, usarAvisosLeidos } from '../../componentes/avisos'
import { AVISOS, CONTEOS_AVISOS, DETALLE_AVISO, CLASES_ICONO_COLOR, PUERTO_LEIDAS_AVISOS } from '../../rutas/avisos/rutas_avisos'

export function PaginaNovedades() {
  usarAvisosLeidos(PUERTO_LEIDAS_AVISOS)
  const sinLeer = AVISOS.filter((aviso) => !PUERTO_LEIDAS_AVISOS.esLeida(aviso.id, aviso.leida)).map((aviso) => aviso.id)
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
                <Boton type="button" variant="secundario" size="default" className="flex-none" disabled={sinLeer.length === 0} onClick={() => PUERTO_LEIDAS_AVISOS.marcarTodas(sinLeer)}>
                  <Icono name="verificado" className="h-3.5 w-3.5" /> {catalogoAvisos.botones.marcar_todas_leidas}
                </Boton>
              </div>
            </div>

            <PestanasNovedades activa="todas" conteos={CONTEOS_AVISOS} />

            <div className="mb-2.5 text-titulo-subseccion text-texto">{catalogoAvisos.grupos_fecha.hoy}</div>

            <section className="rounded-control border border-borde bg-white">
              {AVISOS.map((n) => (
                <FilaNovedad key={n.id} aviso={n} claseIcono={CLASES_ICONO_COLOR[n.colorIcono]} leida={PUERTO_LEIDAS_AVISOS.esLeida(n.id, n.leida)} />
              ))}
            </section>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={<PanelDetalleNovedad detalle={DETALLE_AVISO} />}
      />
    </EstructuraApp>
  )
}
