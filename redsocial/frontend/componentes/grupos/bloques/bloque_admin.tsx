import { GrupoAvatares } from '../../compartido/interfaz/grupo_avatares'
import { Icono } from '../../compartido/icono'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import type { GrupoAdmin } from '@/tipos/grupos/modelo_grupos_mis_grupos'

export function BloqueAdmin({
  GRUPOS_ADMIN,
  CLASES_ICONO_ADMIN,
}: {
  GRUPOS_ADMIN: GrupoAdmin[]
  CLASES_ICONO_ADMIN: Record<'morado' | 'naranja', string>
}) {
  return (
    <div className="mb-8 grid grid-cols-2 gap-5 max-900:grid-cols-1">
      {GRUPOS_ADMIN.map((g) => (
        <article key={g.nombre} className="flex min-w-0 gap-3.5 rounded-control border border-borde bg-white p-5">
          <div className={`grid h-13 w-13 flex-none place-items-center rounded-xl text-white ${CLASES_ICONO_ADMIN[g.color]}`}>
            <Icono name={g.icono} className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-0.5 flex items-center gap-2">
              <h3 className="m-0 text-nombre-entidad text-texto">{g.nombre}</h3>
              <span className="inline-block whitespace-nowrap rounded bg-fondo-categoria-morado px-2 py-px text-badge text-morado-categoria">{catalogoGrupos.leyendas.admin}</span>
              <BotonIcono icono="puntos" type="button" aria-label={catalogoGrupos.botones.opciones} variant="discreto" size="sm" className="ml-auto flex-none" />
            </div>
            <div className="mb-1.5 text-auxiliar text-texto-suave">{g.tipo}</div>
            <p className="m-0 mb-2.5 text-cuerpo leading-texto text-texto-suave">{g.descripcion}</p>
            <GrupoAvatares avatares={4} tamano="sm" resto={g.masAvatares} className="mb-0" />
          </div>
        </article>
      ))}
    </div>
  )
}
