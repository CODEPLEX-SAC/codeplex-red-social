import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import type { Destacado } from '@/tipos/marketplace/modelo_marketplace'

export function SeccionDestacados3({
  alDesplazarDestacados,
  pistaDestacadosRef,
  DESTACADOS,
  CLASES_MODULO,
}: {
  alDesplazarDestacados: (direccion: 1 | -1) => void
  pistaDestacadosRef: React.RefObject<HTMLDivElement | null>
  DESTACADOS: Destacado[]
  CLASES_MODULO: Record<'verde' | 'azul' | 'morado' | 'naranja', string>
}) {
  return (
    <section className="mb-7">
      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoMarketplace.secciones.destacados}</h2>
        <a href="#" className="text-enlace-accion font-semibold text-primario no-underline hover:underline">{textosRedSocial.VER_TODOS}</a>
      </div>
      <div className="relative">
        <BotonIcono icono="flecha-izquierda" type="button" aria-label={catalogoMarketplace.botones.anterior} onClick={() => alDesplazarDestacados(-1)} variant="flotante" size="default" className="absolute -left-4 top-1/2 -translate-y-1/2" />
        <div
          ref={pistaDestacadosRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-oculto"
        >
          {DESTACADOS.map((d) => (
            <article key={d.nombre} className="flex w-55 flex-none flex-col overflow-hidden rounded-xl border border-t-eeeeee bg-white hover:shadow-t11">
              <div className="relative grid h-20 place-items-center">
                {d.popular && <span className="absolute right-2 top-2 rounded bg-primario px-2 py-0.5 text-etiqueta-estado font-bold text-white">{catalogoMarketplace.leyendas.popular}</span>}
                <div className={`grid h-10 w-10 place-items-center rounded-control ${CLASES_MODULO[d.color]}`}>
                  <Icono name={d.icono} className="h-5.5 w-5.5 text-white" />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-3.5 pt-3">
                <h3 className="m-0 mb-1 text-nombre-entidad font-bold text-texto">{d.nombre}</h3>
                <div className="mb-1.5 flex items-center gap-1">
                  <Icono name="estrella" className="h-3 w-3 text-t-ffcc00" />
                  <span className="text-contador font-bold text-texto">{d.puntaje}</span>
                  <span className="text-contador text-texto-suave">{d.conteo}</span>
                </div>
                <p className="m-0 mb-2.5 text-cuerpo leading-1.4 text-texto-suave">{d.descripcion}</p>
                <div className="mb-2.5 text-valor-destacado font-extrabold text-texto">
                  {d.precio} <span className="text-auxiliar font-normal text-texto-suave">{catalogoMarketplace.leyendas.por_mes}</span>
                </div>
                <Boton type="button" variant="contorno" size="md" className="mt-auto w-full">
                  <Icono name="carrito" className="h-3.5 w-3.5" /> {catalogoMarketplace.botones.ver_detalles}
                </Boton>
              </div>
            </article>
          ))}
        </div>
        <BotonIcono icono="flecha-derecha" type="button" aria-label={catalogoMarketplace.botones.siguiente} onClick={() => alDesplazarDestacados(1)} variant="flotante" size="default" className="absolute -right-4 top-1/2 -translate-y-1/2" />
      </div>
    </section>
  )
}
