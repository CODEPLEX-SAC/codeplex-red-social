import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { GrupoDestacado } from '@/tipos/grupos/modelo_grupos_descubrir'

export function BloqueUnirse({
  DESTACADOS,
  CLASES_FONDO,
  CLASES_OVERLAY,
}: {
  DESTACADOS: GrupoDestacado[]
  CLASES_FONDO: Record<'azul-oscuro' | 'naranja' | 'violeta' | 'rosa-oscuro', string>
  CLASES_OVERLAY: Record<'naranja' | 'violeta' | 'morado' | 'rosa', string>
}) {
  return (
    <div className="mb-7 grid grid-cols-4 gap-4 max-1100:grid-cols-2 max-900:grid-cols-1">
      {DESTACADOS.map((g) => (
        <article key={g.nombre} className="min-w-0 overflow-hidden rounded-control border border-borde bg-white">
          <div className="relative h-30 overflow-hidden">
            <div className={`flex h-full w-full items-center justify-center ${CLASES_FONDO[g.fondo]}`}>
              <span className="grid h-11 w-11 place-items-center rounded-control bg-white/20">
                <Icono name={g.icono} className="h-6 w-6 text-white" />
              </span>
            </div>
            <span className={`absolute -bottom-4.5 left-3.5 grid h-10 w-10 place-items-center rounded-control border-2 border-white text-white shadow-t6 ${CLASES_OVERLAY[g.overlay]}`}>
              <Icono name={g.icono} className="h-5 w-5" />
            </span>
          </div>
          <div className="p-3.5 pb-3.5 pt-6">
            <h3 className="m-0 mb-0.5 text-nombre-entidad font-bold text-texto">{g.nombre}</h3>
            <div className="mb-2 text-auxiliar text-texto-suave">{g.tipo}</div>
            <p className="m-0 mb-3.5 text-cuerpo leading-normal text-texto-suave">{g.descripcion}</p>
            <Boton type="button" variant="secundario" size="default" className="w-full">
              <Icono name="mas" className="h-3.5 w-3.5" /> {catalogoGrupos.botones.unirse}
            </Boton>
          </div>
        </article>
      ))}
    </div>
  )
}
