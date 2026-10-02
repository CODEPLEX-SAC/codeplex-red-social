import { posicionesDe } from '../../compartido/posiciones'
import { Icono } from '../../compartido/icono'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
import { Boton } from '../../compartido/interfaz/boton'
import type { GrupoMis } from '@/tipos/grupos/modelo_grupos_mis_grupos'

export function BloqueVerGrupo({
  MIS_GRUPOS,
  CLASES_ICONO_MIS,
}: {
  MIS_GRUPOS: GrupoMis[]
  CLASES_ICONO_MIS: Record<'morado' | 'azul' | 'rosa' | 'verde' | 'amarillo', string>
}) {
  return (
    <div className="grid grid-cols-3 gap-5 max-900:grid-cols-2 max-600:grid-cols-1">
      {MIS_GRUPOS.map((g) => (
        <article key={g.nombre} className="min-w-0 rounded-control border border-borde bg-white p-5">
          <div className="mb-1 flex items-center gap-3">
            <div className={`grid h-11 w-11 flex-none place-items-center rounded-control text-white ${CLASES_ICONO_MIS[g.color]}`}>
              <Icono name={g.icono} className="h-5.5 w-5.5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="m-0 text-nombre-entidad font-bold text-texto">{g.nombre}</h3>
              <span className="text-auxiliar text-texto-suave">{g.tipo}</span>
            </div>
            <BotonIcono icono="puntos" type="button" aria-label={catalogoGrupos.botones.opciones} variant="discreto" size="sm" className="flex-none" />
          </div>
          <p className="my-2 text-cuerpo leading-normal text-texto-suave">{g.descripcion}</p>
          <div className="mb-3 flex items-center">
            {posicionesDe(4).map((posicion) => (
              <AvatarImagen
                key={posicion.id}
                src={usuarioImg}
                className={'h-7 w-7 rounded-full border-2 border-white bg-primario-suave' + (posicion.orden > 0 ? ' -ml-2' : '')}
              />
            ))}
            <span className="-ml-1 grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-t-ede9fe text-contador font-bold text-primario">{g.masAvatares}</span>
          </div>
          <Boton type="button" variant="contorno" size="mini">{catalogoGrupos.botones.ver_grupo}</Boton>
        </article>
      ))}
    </div>
  )
}
