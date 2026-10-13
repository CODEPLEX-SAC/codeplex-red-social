import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Icono } from '../../compartido/icono'
import { Insignia } from '../../compartido/interfaz/insignia'
import type { ConfiguracionPlanes, EstiloSelectorPlanes } from '@/tipos/marketplace/modelo_planes'

export function CabeceraPlanes({ configuracion, claseModulo, estilo }: { configuracion: ConfiguracionPlanes; claseModulo: string; estilo: EstiloSelectorPlanes }) {
  return (
    <div className="grid justify-items-center gap-1.5 text-center">
      <div className={`grid h-10 w-10 place-items-center rounded-xl ${claseModulo}`}>
        <Icono name={configuracion.icono} className="h-5 w-5 text-white" />
      </div>
      <h2 className="m-0 text-titulo-banner text-texto">{configuracion.nombre}</h2>
      <p className="m-0 text-subtitulo text-texto-suave">{configuracion.descripcion}</p>
      <div role="group" aria-label={catalogoMarketplace.planes.etiquetas} className="flex flex-wrap justify-center gap-2">
        {configuracion.etiquetas.map((e) => (
          <Insignia key={e} variant="status" className={`bg-white ${estilo.pildora}`}>{e}</Insignia>
        ))}
      </div>
    </div>
  )
}
