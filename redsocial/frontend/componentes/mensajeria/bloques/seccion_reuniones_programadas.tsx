import { posicionesDe } from '../../compartido/posiciones'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import { Icono } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'

export function SeccionReunionesProgramadas({
  REUNIONES_PROGRAMADAS,
}: {
  REUNIONES_PROGRAMADAS: { dia: string; mes: string; titulo: string; hora: string; participantes: string; avatares: number; extra: string; }[]
}) {
  return (
    <section className="min-w-0 rounded-xl border border-borde bg-white p-4">
      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoMensajeria.secciones.reuniones_programadas}</h2>
      </div>
      <div className="flex flex-col gap-px overflow-hidden rounded-control border border-borde bg-borde">
        {REUNIONES_PROGRAMADAS.map((r) => (
          <article key={r.titulo} className="flex flex-wrap items-center gap-x-3.5 gap-y-2 bg-white px-4 py-3.5 hover:bg-t-fafafe">
            <div className="flex min-w-12 flex-none flex-col items-center rounded-lg border border-borde bg-white py-1.5">
              <span className="text-dia-evento font-bold leading-1.1 text-primario">{r.dia}</span>
              <span className="text-mes-evento font-semibold uppercase text-primario">{r.mes}</span>
            </div>

            <strong className="min-w-35 flex-1 truncate text-nombre-entidad text-texto">{r.titulo}</strong>

            <p className="m-0 flex flex-none items-center gap-1.5 whitespace-nowrap text-auxiliar text-texto-suave">
              <Icono name="reloj" className="h-3.25 w-3.25" /> {r.hora}
            </p>

            <div className="flex flex-none items-center gap-1.5">
              <div className="flex items-center">
                {posicionesDe(r.avatares).map((posicion) => (
                  <AvatarImagen
                    key={posicion.id}
                    src={usuarioImg}
                    className={'h-8 w-8 rounded-full border-2 border-white bg-primario-suave' + (posicion.orden > 0 ? ' -ml-2' : '')}
                  />
                ))}
                <span className="-ml-2 grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-primario text-contador font-semibold text-white">{r.extra}</span>
              </div>
              <span className="flex items-center gap-1.5 whitespace-nowrap text-auxiliar text-texto-suave">
                <Icono name="usuarios" className="h-3.25 w-3.25" /> {r.participantes}
              </span>
            </div>

            <a href="#" className="flex-none whitespace-nowrap rounded-md bg-primario px-3.5 py-1.5 text-boton font-semibold text-white no-underline hover:opacity-88">{catalogoMensajeria.botones.unirse}</a>
          </article>
        ))}
      </div>
      <div className="pt-3.5 text-center">
        <a href="#" className="text-enlace-accion font-medium text-primario no-underline hover:underline">{catalogoMensajeria.botones.ver_todas_las_reuniones}</a>
      </div>
    </section>
  )
}
