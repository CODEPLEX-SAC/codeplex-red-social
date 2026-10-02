import { Boton, BotonIcono, Icono, EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas, AvatarImagen, imagenUsuarioPredeterminada as usuarioImg, posicionesDe } from '../../componentes/compartido'
import { EncabezadoAmigos, PestanasAmigos, PanelLateralAmigos, FilaPersonaConocer, FilaListaLateral, FilaActividadReciente } from '../../componentes/amigos'
import catalogoAmigos from '../../catalogos/capacidades/redsocial/amigos.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { PERSONAS_CONOCER, TUS_LISTAS_LATERAL as TUS_LISTAS, ACTIVIDAD_RECIENTE_AMIGOS as ACTIVIDAD_RECIENTE, SUGERENCIAS } from '../../rutas/amigos/rutas_amigos'

export function PaginaAmigosSugerencias() {
  return (
    <EstructuraApp paginaActiva="amigos">
      <EstructuraTresColumnas
        principal={
          <section className="rounded-xl border border-borde bg-white py-4.5 px-5">
            <EncabezadoAmigos textoBoton={catalogoAmigos.botones.agregar_amigos} />
            <PestanasAmigos activa="sugerencias" />

            <div className="mb-5.5 mt-4.5 flex items-start gap-3.5 rounded-control bg-primario-suave p-4.5">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-control bg-white/60 text-primario">
                <Icono name="amigos-todos" className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <strong className="mb-0.75 block text-subtitulo text-texto">{catalogoAmigos.secciones.amplia_tu_red_titulo}</strong>
                <p className="m-0 text-cuerpo leading-1.4 text-texto-suave">{catalogoAmigos.secciones.amplia_tu_red_desc}</p>
              </div>
              <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} variant="discreto" size="sm" className="flex-none" />
            </div>

            <h2 className="mb-4 text-titulo-seccion font-bold text-texto">{catalogoAmigos.secciones.personas_conocer}</h2>
            <div className="mb-4.5 grid grid-cols-4 gap-3.5 max-900:grid-cols-2 max-600:grid-cols-1">
              {SUGERENCIAS.map((s) => (
                <article key={s.nombre} className="flex flex-col items-center rounded-control border border-borde bg-white p-3 pb-3.5 pt-4.5 text-center">
                  <AvatarImagen src={usuarioImg} className="mb-2.5 h-14 w-14 flex-none rounded-full bg-primario-suave" />
                  <div className="mb-2 w-full">
                    <strong className="mb-0.5 block text-nombre-entidad leading-1.3 text-texto">{s.nombre}</strong>
                    <p className="m-0 text-cuerpo leading-1.4 text-texto-suave">{s.descripcion}</p>
                  </div>
                  <div className="mb-2 flex w-full items-center justify-center gap-2">
                    <span className="whitespace-nowrap text-auxiliar text-texto-suave">{s.comunes}</span>
                  </div>
                  <div className="mb-2.5 flex items-center justify-center">
                    {posicionesDe(4).map((posicion) => (
                      <AvatarImagen
                        key={posicion.id}
                        src={usuarioImg}
                        className={'h-5.5 w-5.5 rounded-full border-2 border-white bg-primario-suave' + (posicion.orden > 0 ? ' -ml-2' : '')}
                      />
                    ))}
                    <span className="-ml-2 grid h-5.5 w-5.5 place-items-center rounded-full border-2 border-white bg-t-efedf7 text-contador font-bold text-texto-suave">{s.masAvatares}</span>
                  </div>
                  <div className="flex w-full flex-col items-center gap-1.5">
                    <Boton type="button" variant="secundario" size="mini" className="w-full max-w-30">{catalogoAmigos.botones.agregar}</Boton>
                    <a href="#" className="text-enlace-accion font-semibold text-primario no-underline hover:underline">{catalogoAmigos.botones.ver_perfil}</a>
                  </div>
                </article>
              ))}
            </div>
            <a href="#" className="flex items-center justify-center gap-1.5 border-t border-borde p-3.5 text-enlace-accion text-texto-suave no-underline hover:bg-t-faf9fc">
              {catalogoAmigos.botones.ver_mas_sugerencias} <Icono name="flecha-abajo" className="h-3.25 w-3.25" />
            </a>
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
