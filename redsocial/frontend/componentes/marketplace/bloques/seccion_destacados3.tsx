import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { FilaDestacados } from './fila_destacados'
import { TarjetaDestacado } from './tarjeta_destacado'
import type { Destacado } from '@/tipos/marketplace/modelo_marketplace'

export function SeccionDestacados3({
  DESTACADOS,
  CLASES_MODULO,
  CLASES_INSIGNIA_CATEGORIA,
  alVerPlanes,
}: {
  DESTACADOS: Destacado[]
  CLASES_MODULO: Record<'verde' | 'azul' | 'morado' | 'naranja' | 'rojo', string>
  alVerPlanes: (idPlanes: string) => void
  CLASES_INSIGNIA_CATEGORIA: Record<'verde' | 'azul' | 'morado' | 'naranja' | 'rojo', string>
}) {
  return (
    <section className="mb-7">
      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="m-0 text-titulo-seccion text-texto">{catalogoMarketplace.secciones.destacados}</h2>
        <a href="#" className="text-enlace-accion text-primario no-underline hover:underline">{textosRedSocial.VER_TODOS}</a>
      </div>
      <FilaDestacados>
        {DESTACADOS.map((d) => (
          <TarjetaDestacado key={`${d.nombre}-${d.categoria}`} className={catalogoMarketplace.destacados_fila.tarjeta} d={d} claseModulo={CLASES_MODULO[d.color]} claseInsignia={CLASES_INSIGNIA_CATEGORIA[d.color]} alVerPlanes={d.planes ? () => alVerPlanes(d.planes as string) : undefined} />
        ))}
      </FilaDestacados>
    </section>
  )
}
