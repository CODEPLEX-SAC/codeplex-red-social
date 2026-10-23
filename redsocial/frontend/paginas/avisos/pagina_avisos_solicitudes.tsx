import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'
import catalogoAmigos from '../../catalogos/capacidades/redsocial/amigos.json'
import { BannerInformativo, BotonIcono, Boton, Icono, MensajeVacio, EstructuraApp, EstructuraTresColumnas, ColumnaPublicidad } from '../../componentes/compartido'
import catalogoAvisos from '../../catalogos/capacidades/redsocial/avisos.json'
import { PestanasAvisos, FilaSolicitudAviso, PanelLateralSolicitudesAviso } from '../../componentes/avisos'
import { CONTEOS_AVISOS, SOLICITUDES_AMISTAD, SOLICITUDES_GRUPO, SOLICITUDES_EVENTO, SOLICITUDES_COLABORACION } from '../../rutas/avisos/rutas_avisos'

export function PaginaAvisosSolicitudes() {
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

            <PestanasAvisos activa="solicitudes" conteos={CONTEOS_AVISOS} />

            <BannerInformativo
              icono="campana"
              titulo={catalogoAvisos.banner_solicitudes.titulo}
              descripcion={catalogoAvisos.banner_solicitudes.descripcion}
              iconoCuadrado
              etiquetaCerrar={textosRedSocial.CERRAR}
              className="mb-4"
            />

            <div className="mb-2.5 flex items-center justify-between">
              <h2 className="m-0 text-titulo-seccion text-texto">
                {catalogoAvisos.secciones.solicitudes_amistad} ({SOLICITUDES_AMISTAD.length})
              </h2>
              <a href={catalogoAmigos.rutas.solicitudes} className="text-enlace-accion text-primario no-underline hover:underline">{catalogoAvisos.botones.ver_todas}</a>
            </div>
            <section className="mb-5 rounded-control border border-borde bg-white">
              {SOLICITUDES_AMISTAD.map((s) => (
                <FilaSolicitudAviso
                  key={s.id}
                  miniatura={{ tipo: 'avatar' }}
                  titulo={s.nombre}
                  lineaSecundaria={s.rol}
                  lineaTerciaria={s.comunes}
                  tiempo={s.tiempo}
                  accionPrimaria={catalogoAvisos.botones.aceptar}
                  accionSecundaria={catalogoAvisos.botones.eliminar}
                />
              ))}
            </section>

            <div className="mb-2.5 flex items-center justify-between">
              <h2 className="m-0 text-titulo-seccion text-texto">
                {catalogoAvisos.secciones.solicitudes_grupo} ({SOLICITUDES_GRUPO.length})
              </h2>
              <a href={catalogoGrupos.rutas.invitaciones} className="text-enlace-accion text-primario no-underline hover:underline">{catalogoAvisos.botones.ver_todas}</a>
            </div>
            <section className="mb-5 rounded-control border border-borde bg-white">
              {SOLICITUDES_GRUPO.map((s) => (
                <FilaSolicitudAviso
                  key={s.id}
                  miniatura={{ tipo: 'icono', icono: s.iconoMiniatura, color: s.colorMiniatura }}
                  titulo={s.nombreGrupo}
                  lineaSecundaria={s.miembros}
                  lineaTerciaria={<><strong className="font-titulo text-texto">{s.solicitanteNombre}</strong> {s.solicitanteTexto}</>}
                  tiempo={s.tiempo}
                  accionPrimaria={catalogoAvisos.botones.aprobar}
                  accionSecundaria={catalogoAvisos.botones.rechazar}
                />
              ))}
            </section>

            <div className="mb-2.5 flex items-center justify-between">
              <h2 className="m-0 text-titulo-seccion text-texto">
                {catalogoAvisos.secciones.solicitudes_evento} ({SOLICITUDES_EVENTO.length})
              </h2>
              <a href={catalogoEventos.rutas.invitaciones} className="text-enlace-accion text-primario no-underline hover:underline">{catalogoAvisos.botones.ver_todas}</a>
            </div>
            <section className="mb-5 rounded-control border border-borde bg-white">
              {SOLICITUDES_EVENTO.map((s) => (
                <FilaSolicitudAviso
                  key={s.id}
                  miniatura={{ tipo: 'calendario', dia: s.dia, mes: s.mes, color: s.colorMiniatura }}
                  titulo={s.nombreEvento}
                  lineaSecundaria={s.organizador}
                  lineaTerciaria={<><strong className="font-titulo text-texto">{s.solicitanteNombre}</strong> {s.solicitanteTexto}</>}
                  tiempo={s.tiempo}
                  accionPrimaria={catalogoAvisos.botones.aprobar}
                  accionSecundaria={catalogoAvisos.botones.rechazar}
                />
              ))}
            </section>

            <h2 className="mb-2.5 text-titulo-seccion text-texto">
              {catalogoAvisos.secciones.solicitudes_colaboracion} ({SOLICITUDES_COLABORACION.length})
            </h2>
            <section className="rounded-control border border-borde bg-white px-6 py-10 text-center">
              <Icono name="amigos-todos" className="mx-auto mb-3 h-8 w-8 text-texto-icono-discreto" />
              <MensajeVacio titulo={catalogoAvisos.mensajes_solicitudes.sin_colaboracion_titulo} texto={catalogoAvisos.mensajes_solicitudes.sin_colaboracion_descripcion} />
            </section>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={<PanelLateralSolicitudesAviso />}
      />
    </EstructuraApp>
  )
}
