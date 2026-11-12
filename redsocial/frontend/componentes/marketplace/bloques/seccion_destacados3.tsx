import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { FilaDestacados } from './fila_destacados'
import { TarjetaDestacado } from './tarjeta_destacado'
import type { Destacado } from '@/tipos/marketplace/modelo_marketplace'

export function SeccionDestacados3({
  DESTACADOS,
  CLASES_MODULO,
  CLASES_INSIGNIA_CATEGORIA,
  alVerPlanes,
  filtrado = false,
}: {
  DESTACADOS: Destacado[]
  CLASES_MODULO: Record<'verde' | 'azul' | 'morado' | 'naranja' | 'rojo', string>
  alVerPlanes: (idPlanes: string) => void
  filtrado?: boolean
  CLASES_INSIGNIA_CATEGORIA: Record<'verde' | 'azul' | 'morado' | 'naranja' | 'rojo', string>
}) {
  const busqueda = catalogoMarketplace.busqueda
  const vacio = filtrado ? { titulo: busqueda.sin_modulo_titulo, detalle: busqueda.sin_modulo_detalle } : { titulo: busqueda.sin_resultados_titulo, detalle: busqueda.sin_resultados_detalle }

  return (
    <section className="mb-7">
      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="m-0 text-titulo-seccion text-texto">{catalogoMarketplace.secciones.destacados}</h2>
      </div>
      {DESTACADOS.length === 0 ? <MensajeVacio titulo={vacio.titulo} texto={vacio.detalle} /> : null}
      <FilaDestacados>
        {DESTACADOS.map((d) => (
          <TarjetaDestacado key={`${d.nombre}-${d.categoria}`} className={catalogoMarketplace.destacados_fila.tarjeta} d={d} claseModulo={CLASES_MODULO[d.color]} claseInsignia={CLASES_INSIGNIA_CATEGORIA[d.color]} alVerPlanes={d.planes ? () => alVerPlanes(d.planes as string) : undefined} />
        ))}
      </FilaDestacados>
    </section>
  )
}
