import { posicionesDe } from '../../compartido/posiciones'
import { Icono } from '../../compartido/icono'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
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
            <Icono name={g.icono} className="h-6.5 w-6.5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-0.5 flex items-center gap-2">
              <h3 className="m-0 text-nombre-entidad font-bold text-texto">{g.nombre}</h3>
              <span className="inline-block whitespace-nowrap rounded bg-t-ede9fe px-2 py-px text-etiqueta-estado font-semibold text-morado-categoria">{catalogoGrupos.leyendas.admin}</span>
              <BotonIcono icono="puntos" type="button" aria-label={catalogoGrupos.botones.opciones} variant="discreto" size="sm" className="ml-auto flex-none" />
            </div>
            <div className="mb-1.5 text-auxiliar text-texto-suave">{g.tipo}</div>
            <p className="m-0 mb-2.5 text-cuerpo leading-normal text-texto-suave">{g.descripcion}</p>
            <div className="mb-0 flex items-center">
              {posicionesDe(4).map((posicion) => (
                <AvatarImagen
                  key={posicion.id}
                  src={usuarioImg}
                  className={'h-7 w-7 rounded-full border-2 border-white bg-primario-suave' + (posicion.orden > 0 ? ' -ml-2' : '')}
                />
              ))}
              <span className="-ml-1 grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-t-ede9fe text-contador font-bold text-primario">{g.masAvatares}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
