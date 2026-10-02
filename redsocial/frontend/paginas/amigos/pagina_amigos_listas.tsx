import { BotonIcono, Icono, EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas, AvatarImagen, SuperficieColor, imagenUsuarioPredeterminada as usuarioImg, posicionesDe } from '../../componentes/compartido'
import { EncabezadoAmigos, PestanasAmigos, PanelLateralAmigos, FilaPersonaConocer, FilaListaLateral, FilaActividadReciente } from '../../componentes/amigos'
import catalogoAmigos from '../../catalogos/capacidades/redsocial/amigos.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { PERSONAS_CONOCER, TUS_LISTAS_LATERAL, ACTIVIDAD_RECIENTE_AMIGOS as ACTIVIDAD_RECIENTE, MIS_LISTAS, LISTAS_SUGERIDAS, CLASES_ICONO_LISTA } from '../../rutas/amigos/rutas_amigos'

export function PaginaAmigosListas() {
  return (
    <EstructuraApp paginaActiva="amigos">
      <EstructuraTresColumnas
        principal={
          <section className="rounded-xl border border-borde bg-white py-4.5 px-5">
            <EncabezadoAmigos textoBoton={catalogoAmigos.botones.crear_listas} />
            <PestanasAmigos activa="listas" insigniaSolicitudes={3} />

            <div className="mb-5.5 mt-4.5 flex items-start gap-3.5 rounded-control bg-primario-suave p-4.5">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-control bg-white/60 text-primario">
                <Icono name="usuarios" className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <strong className="mb-0.75 block text-subtitulo text-texto">{catalogoAmigos.secciones.organiza_contactos_titulo}</strong>
                <p className="m-0 text-cuerpo leading-1.4 text-texto-suave">{catalogoAmigos.secciones.organiza_contactos_desc}</p>
              </div>
              <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} variant="discreto" size="sm" className="flex-none" />
            </div>

            <h2 className="mb-3.5 text-titulo-seccion font-bold text-texto">{catalogoAmigos.secciones.mis_listas}</h2>
            <div className="mb-4.5 grid grid-cols-3 gap-3.5 max-900:grid-cols-2 max-600:grid-cols-1">
              {MIS_LISTAS.map((l) => (
                <article key={l.nombre} className="relative flex flex-col rounded-control border border-borde bg-white p-4 pb-4 pt-4.5">
                  <BotonIcono icono="puntos" type="button" aria-label={textosRedSocial.MAS_OPCIONES} variant="discreto" size="sm" className="absolute right-3.5 top-3.5" />
                  <div className={`mb-2.5 grid h-10 w-10 flex-none place-items-center rounded-control text-white ${CLASES_ICONO_LISTA[l.color]}`}>
                    <Icono name={l.icono} className="h-5 w-5" />
                  </div>
                  <div className="mb-2.5">
                    <strong className="mb-0.5 block text-nombre-entidad text-texto">{l.nombre}</strong>
                    <span className="text-auxiliar text-texto-suave">{l.cantidad}</span>
                  </div>
                  <div className="mb-3 flex items-center gap-1.5">
                    <div className="flex items-center">
                      {posicionesDe(l.avatares).map((posicion) => (
                        <AvatarImagen
                          key={posicion.id}
                          src={usuarioImg}
                          className={'h-5.5 w-5.5 rounded-full border-2 border-white bg-primario-suave' + (posicion.orden > 0 ? ' -ml-2' : '')}
                        />
                      ))}
                    </div>
                    <span className="text-contador font-bold text-texto-suave">{l.masAvatares}</span>
                  </div>
                  <p className="m-0 mt-auto text-cuerpo leading-1.4 text-texto-suave">{l.descripcion}</p>
                </article>
              ))}
            </div>

            <button type="button" className="mb-7 flex w-full items-center justify-center gap-2 rounded-control border-2 border-dashed border-borde bg-transparent p-3.5 text-boton font-semibold text-primario hover:bg-t-faf9fc hover:border-primario">
              <Icono name="mas" className="h-4 w-4" /> {catalogoAmigos.botones.crear_nueva_lista}
            </button>

            <div className="mb-3.5 flex items-center justify-between">
              <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoAmigos.secciones.listas_sugeridas}</h2>
              <a href="#" className="text-enlace-accion font-semibold text-primario no-underline hover:underline">{textosRedSocial.VER_TODAS}</a>
            </div>
            <div className="grid grid-cols-4 gap-3 max-900:grid-cols-2 max-600:grid-cols-2 max-380:grid-cols-1">
              {LISTAS_SUGERIDAS.map((l) => (
                <article key={l.nombre} className="flex items-center gap-2.5 rounded-control border border-borde bg-white p-3">
                  <SuperficieColor variante={l.color} className="grid h-8.5 w-8.5 flex-none place-items-center rounded-9 text-white">
                    <Icono name={l.icono} className="h-4 w-4" />
                  </SuperficieColor>
                  <div className="min-w-0 flex-1">
                    <strong className="mb-px block text-nombre-entidad text-texto">{l.nombre}</strong>
                    <span className="text-auxiliar text-texto-suave">{l.cantidad}</span>
                  </div>
                  <BotonIcono icono="mas" type="button" aria-label={catalogoAmigos.botones.agregar} variant="contorno" size="md" className="flex-none" />
                </article>
              ))}
            </div>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <PanelLateralAmigos titulo={catalogoAmigos.secciones.personas_conocer}>
              {PERSONAS_CONOCER.map((p) => (
                <FilaPersonaConocer key={p.nombre} nombre={p.nombre} comunes={p.comunes} />
              ))}
            </PanelLateralAmigos>
            <PanelLateralAmigos titulo={catalogoAmigos.secciones.tus_listas}>
              {TUS_LISTAS_LATERAL.map((l) => (
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
