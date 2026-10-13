import { MensajeVacio, Boton, EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas, CampoBusqueda, AvatarImagen, imagenUsuarioPredeterminada as usuarioImg, posicionesDe } from '../../componentes/compartido'
import { EncabezadoAmigos, PestanasAmigos, PanelLateralAmigos, FilaPersonaConocer, FilaListaLateral, FilaActividadReciente } from '../../componentes/amigos'
import catalogoAmigos from '../../catalogos/capacidades/redsocial/amigos.json'
import { RECIBIDAS, PERSONAS_CONOCER_SOLICITUDES as PERSONAS_CONOCER, TUS_LISTAS_SOLICITUDES as TUS_LISTAS, ACTIVIDAD_RECIENTE_SOLICITUDES as ACTIVIDAD_RECIENTE, SOLICITUD_ENVIADA_EJEMPLO } from '../../rutas/amigos/rutas_amigos'

const AMIGOS_COMUNES = 'h-5.5 w-5.5 rounded-full border-2 border-white bg-primario-suave'

export function PaginaAmigosSolicitudes() {
  return (
    <EstructuraApp paginaActiva="amigos">
      <EstructuraTresColumnas
        principal={
          <section className="rounded-xl border border-borde bg-white py-4.5 px-5">
            <EncabezadoAmigos textoBoton={catalogoAmigos.botones.agregar_amigos} />
            <PestanasAmigos activa="solicitudes" />

            <h2 className="mb-3.5 mt-4.5 text-titulo-seccion text-texto">{catalogoAmigos.secciones.solicitudes_amistad}</h2>

            <div className="mb-4.5 flex flex-wrap items-center gap-2">
              <a href="#" className="inline-flex h-7 flex-none items-center gap-1 whitespace-nowrap rounded-20 border border-primario bg-primario px-2.5 text-navegacion text-white no-underline">
                {catalogoAmigos.pestanas_solicitudes.recibidas} <span className="grid h-4 min-w-4 place-items-center rounded-lg bg-white px-1 text-conteo text-primario">3</span>
              </a>
              <a href="#" className="inline-flex h-7 flex-none items-center gap-1 whitespace-nowrap rounded-20 border border-borde bg-white px-2.5 text-navegacion text-texto-suave no-underline hover:bg-fondo-hover-discreto">
                {catalogoAmigos.pestanas_solicitudes.enviadas} <span className="grid h-4 min-w-4 place-items-center rounded-lg bg-fondo-insignia-neutra px-1 text-conteo text-texto-suave">1</span>
              </a>
              <a href="#" className="inline-flex h-7 flex-none items-center gap-1 whitespace-nowrap rounded-20 border border-borde bg-white px-2.5 text-navegacion text-texto-suave no-underline hover:bg-fondo-hover-discreto">
                {catalogoAmigos.pestanas_solicitudes.ignoradas}
              </a>
              <CampoBusqueda
                placeholder={catalogoAmigos.placeholders.buscar_solicitudes}
                aria-label={catalogoAmigos.placeholders.buscar_solicitudes}
                className="ml-auto min-w-40 flex-1"
              />
            </div>

            {RECIBIDAS.length === 0 && <MensajeVacio texto={catalogoAmigos.mensajes.sin_solicitudes} className="col-span-full py-8" />}
            {RECIBIDAS.map((s) => (
              <article key={s.nombre} className="relative mb-3 flex items-start gap-4 rounded-xl border border-borde bg-white p-4.5 last:mb-0 max-600:flex-wrap max-600:p-3.5">
                <AvatarImagen src={usuarioImg} className="h-14 w-14 flex-none rounded-full bg-primario-suave" />
                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 flex items-baseline gap-2 pr-22.5">
                    <strong className="text-nombre-entidad text-texto">{s.nombre}</strong>
                  </div>
                  <span className="absolute right-4.5 top-4.5 whitespace-nowrap text-fecha-abreviada text-texto-suave">{s.tiempo}</span>
                  <p className="m-0 mb-1.5 text-cuerpo leading-texto text-texto-suave">{s.descripcion}</p>
                  <div className="mb-3 flex items-center gap-2.5">
                    <span className="text-auxiliar text-texto-suave">{s.comunes}</span>
                    <div className="flex items-center">
                      {posicionesDe(s.masAvatares ? 4 : 3).map((posicion) => (
                        <AvatarImagen key={posicion.id} src={usuarioImg} className={AMIGOS_COMUNES + (posicion.orden > 0 ? ' -ml-2' : '')} />
                      ))}
                      {s.masAvatares && (
                        <span className="-ml-2 grid h-5.5 w-5.5 place-items-center rounded-full border-2 border-white bg-fondo-insignia-neutra text-conteo text-texto-suave">{s.masAvatares}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="ml-auto flex flex-none items-center gap-2 self-center max-900:flex-col max-900:self-start max-900:mt-1 max-600:w-full max-600:flex-row max-600:self-stretch max-600:ml-0 max-600:mt-3">
                  <Boton type="button" variant="primario" size="default" className="max-600:flex-1">{catalogoAmigos.botones.aceptar}</Boton>
                  <Boton type="button" variant="secundario" size="default" className="max-600:flex-1">{catalogoAmigos.botones.eliminar}</Boton>
                  <Boton type="button" variant="secundario" size="default" className="max-600:flex-1">{catalogoAmigos.botones.ignorar}</Boton>
                </div>
              </article>
            ))}
            <a href="#" className="flex items-center justify-center p-3.5 text-enlace-accion text-primario no-underline hover:bg-fondo">{catalogoAmigos.botones.ver_mas_solicitudes_recibidas}</a>

            <section className="mt-4">
              <h2 className="mb-3.5 text-titulo-seccion text-texto">{catalogoAmigos.secciones.solicitudes_enviadas}</h2>
              <article className="relative mb-3 flex items-start gap-4 rounded-xl border border-borde bg-white p-4.5 max-600:flex-wrap max-600:p-3.5">
                <AvatarImagen src={usuarioImg} className="h-14 w-14 flex-none rounded-full bg-primario-suave" />
                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 flex items-baseline gap-2 pr-22.5">
                    <strong className="text-nombre-entidad text-texto">{SOLICITUD_ENVIADA_EJEMPLO.nombre}</strong>
                  </div>
                  <span className="absolute right-4.5 top-4.5 whitespace-nowrap text-estado text-naranja-categoria-texto">{SOLICITUD_ENVIADA_EJEMPLO.estado}</span>
                  <p className="m-0 mb-1.5 text-cuerpo leading-texto text-texto-suave">{SOLICITUD_ENVIADA_EJEMPLO.descripcion}</p>
                  <div className="mb-3 flex items-center gap-2.5">
                    <span className="text-auxiliar text-texto-suave">{SOLICITUD_ENVIADA_EJEMPLO.comunes}</span>
                    <div className="flex items-center">
                      <AvatarImagen src={usuarioImg} className={AMIGOS_COMUNES} />
                      <AvatarImagen src={usuarioImg} className={AMIGOS_COMUNES + ' -ml-2'} />
                    </div>
                  </div>
                </div>
                <div className="ml-auto flex flex-none items-center gap-2 self-center max-900:flex-col max-900:self-start max-900:mt-1 max-600:w-full max-600:flex-row max-600:self-stretch max-600:ml-0 max-600:mt-3">
                  <Boton type="button" variant="secundario" size="default" className="max-600:flex-1">{catalogoAmigos.botones.cancelar_solicitud}</Boton>
                </div>
              </article>
              <a href="#" className="flex items-center justify-center p-3.5 text-enlace-accion text-primario no-underline hover:bg-fondo">{catalogoAmigos.botones.ver_todas_solicitudes_enviadas}</a>
            </section>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <PanelLateralAmigos titulo={catalogoAmigos.secciones.personas_conocer} ruta={catalogoAmigos.rutas.sugerencias}>
              {PERSONAS_CONOCER.map((p) => (
                <FilaPersonaConocer key={p.nombre} nombre={p.nombre} comunes={p.comunes} />
              ))}
            </PanelLateralAmigos>
            <PanelLateralAmigos titulo={catalogoAmigos.secciones.tus_listas} ruta={catalogoAmigos.rutas.listas}>
              {TUS_LISTAS.map((l) => (
                <FilaListaLateral key={l.nombre} icono={l.icono} color={l.color} nombre={l.nombre} miembros={l.miembros} />
              ))}
            </PanelLateralAmigos>
            <PanelLateralAmigos titulo={catalogoAmigos.secciones.actividad_reciente}>
              {ACTIVIDAD_RECIENTE.map((a) => (
                <FilaActividadReciente key={a.nombre} nombre={a.nombre} accion={a.accion} tiempo={a.tiempo} />
              ))}
            </PanelLateralAmigos>
          </aside>
        }
      />
    </EstructuraApp>
  )
}
