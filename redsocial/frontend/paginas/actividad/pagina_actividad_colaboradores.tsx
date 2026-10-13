import { Boton, BotonPieLista, Icono, EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas, ContactosPanel, GruposRecomendadosPanel, EventosProximosPanel, BloqueAnuncio, AvatarImagen, imagenUsuarioPredeterminada as usuarioImg } from '../../componentes/compartido'
import catalogoActividad from '../../catalogos/capacidades/redsocial/actividad.json'
import { PestanasActividad } from '../../componentes/actividad'
import { CONTACTOS_SUGERIDOS, GRUPOS_RECOMENDADOS, EVENTOS_PROXIMOS } from '../../rutas/compartido/rutas_compartido'
import { EVENTOS_COLABORADOR, CLASES_BADGE } from '../../rutas/actividad/rutas_actividad'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { navegar } from '../../rutas/compartido/navegacion'
import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'

export function PaginaActividadColaboradores() {
  return (
    <EstructuraApp paginaActiva="actividad">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5">
              <h1 className="m-0 mb-1 text-titulo-pagina text-texto">{catalogoActividad.titulos.colaboradores}</h1>
              <p className="m-0 text-subtitulo text-texto-suave">{catalogoActividad.subtitulos.colaboradores}</p>
            </div>

            <PestanasActividad activa="colaboradores" />

            <section className="rounded-control border border-borde bg-white">
              {EVENTOS_COLABORADOR.map((e) => (
                <article key={e.nombre} className="flex items-start gap-3.5 border-b border-borde-suave p-3.5 last:border-b-0 hover:bg-fondo">
                  <div className="relative h-11 w-11 flex-none">
                    <AvatarImagen src={usuarioImg} className="block h-11 w-11 rounded-full bg-primario-suave" />
                    <span className={`absolute -bottom-0.5 -right-0.5 grid h-5.5 w-5.5 place-items-center rounded-full border-2 border-white text-white ${CLASES_BADGE[e.color]}`}>
                      <Icono name={e.icono} className="h-3 w-3" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 text-cuerpo">
                    <span className="text-nombre-entidad text-texto">{e.nombre}</span>
                    <span className="text-texto-suave">{e.accion}</span>
                    {e.destino && <span className="font-titulo text-texto">{e.destino}</span>}
                    {e.detalle && <span className="mt-0.5 block text-auxiliar text-texto-suave">{e.detalle}</span>}
                  </div>
                  <div className="flex flex-none items-center gap-3">
                    <span className="whitespace-nowrap text-fecha-abreviada text-texto-suave">{e.tiempo}</span>
                    <Boton type="button" onClick={() => navegar(e.irAGrupos ? catalogoGrupos.rutas.mis_grupos : catalogoColaboradores.rutas.perfil)} variant="contorno" size="mini" className="flex-none">
                      {e.boton}
                    </Boton>
                  </div>
                </article>
              ))}
              <BotonPieLista>{textosRedSocial.CARGAR_MAS}</BotonPieLista>
            </section>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <ContactosPanel contactos={CONTACTOS_SUGERIDOS} />
            <GruposRecomendadosPanel grupos={GRUPOS_RECOMENDADOS} />
            <EventosProximosPanel eventos={EVENTOS_PROXIMOS} />
            <BloqueAnuncio />
          </aside>
        }
      />
    </EstructuraApp>
  )
}
