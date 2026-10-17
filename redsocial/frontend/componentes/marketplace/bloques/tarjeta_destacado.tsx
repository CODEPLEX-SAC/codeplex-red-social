import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { Insignia } from '../../compartido/interfaz/insignia'
import type { Destacado } from '@/tipos/marketplace/modelo_marketplace'

export function TarjetaDestacado({
  d,
  claseModulo,
  claseInsignia,
  alVerPlanes,
  className,
}: {
  d: Destacado
  claseModulo: string
  claseInsignia: string
  alVerPlanes?: () => void
  className: string
}) {
  return (
    <article className={`relative flex min-w-0 flex-col overflow-hidden rounded-xl border border-borde-suave bg-white px-4 pb-4 pt-6 hover:shadow-t11 ${className}`}>
      <div className="mb-3 flex items-start gap-3">
        <div className={`grid h-12 w-12 flex-none place-items-center rounded-xl ${claseModulo}`}>
          <Icono name={d.icono} className="h-6 w-6 text-white" />
        </div>
        <div className="grid min-w-0 flex-1 content-start">
          <h3 className="m-0 text-nombre-entidad text-texto">{d.nombre}</h3>
          <span className="text-auxiliar text-texto-suave">{d.publicador}</span>
        </div>
        <div className="flex-none">
          <Insignia variant="status" className={`uppercase ${claseInsignia}`}>{d.categoria}</Insignia>
        </div>
      </div>
      <p className="m-0 mb-3 text-cuerpo leading-texto text-texto-suave">{d.descripcion}</p>
      <ul className="m-0 mb-3 grid list-none gap-1.5 p-0">
        {d.caracteristicas.map((c) => (
          <li key={c} className="flex items-start gap-1.5 text-auxiliar text-texto">
            <Icono name="verificado" className="mt-px h-3.5 w-3.5 flex-none text-exito-texto" />
            <span className="min-w-0">{c}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-end justify-between gap-3">
        <div className="grid min-w-0 gap-1">
          {d.gratis && (
            <div>
              <Insignia variant="status" className="bg-fondo-categoria-verde text-verde-categoria-texto">{catalogoMarketplace.leyendas.gratis}</Insignia>
            </div>
          )}
          <span className="text-cuerpo-grande text-texto">
            {d.precio} <span className="text-auxiliar text-texto-suave">{catalogoMarketplace.leyendas.por_mes}</span>
          </span>
        </div>
        <Boton type="button" variant="primario" size="cta" className="flex-none" disabled={!alVerPlanes} title={alVerPlanes ? undefined : catalogoMarketplace.planes.no_disponible} onClick={alVerPlanes}>
          {catalogoMarketplace.botones.ver_planes} <Icono name="flecha-derecha" className="h-3.5 w-3.5" />
        </Boton>
      </div>
    </article>
  )
}
