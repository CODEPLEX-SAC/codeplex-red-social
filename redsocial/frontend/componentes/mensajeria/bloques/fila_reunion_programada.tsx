import { GrupoAvatares } from '../../compartido/interfaz/grupo_avatares'
import { clasesBoton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ReunionProgramada } from '@/tipos/mensajeria/contrato_reunion'

export function FilaReunionProgramada({ reunion: r }: { reunion: ReunionProgramada }) {
  return (
    <article className="flex flex-wrap items-center gap-x-3.5 gap-y-2 bg-white px-4 py-3.5 hover:bg-fondo">
      <div className="flex min-w-12 flex-none flex-col items-center rounded-lg border border-borde bg-white py-1.5">
        <span className="text-dia-evento leading-none text-primario">{r.dia}</span>
        <span className="text-mes-evento uppercase text-primario">{r.mes}</span>
      </div>

      <strong className="min-w-35 flex-1 truncate text-nombre-entidad text-texto">{r.titulo}</strong>

      <p className="m-0 flex flex-none items-center gap-1.5 whitespace-nowrap text-auxiliar text-texto-suave">
        <Icono name="reloj" className="h-3.5 w-3.5" /> {r.hora}
      </p>

      <div className="flex flex-none items-center gap-1.5">
        <GrupoAvatares avatares={r.avatares} tamano="sm" tono="solido" resto={r.extra} />
        <span className="flex items-center gap-1.5 whitespace-nowrap text-auxiliar text-texto-suave">
          <Icono name="grupo" className="h-3.5 w-3.5" /> {r.participantes}
        </span>
      </div>

      <a href={`${catalogoMensajeria.rutas.videollamada_en_curso}?${catalogoMensajeria.parametros_ruta.reunion}=${r.id}`} className={clasesBoton({ variant: 'primario', size: 'default', className: 'flex-none' })}>{catalogoMensajeria.botones.unirse}</a>
    </article>
  )
}
