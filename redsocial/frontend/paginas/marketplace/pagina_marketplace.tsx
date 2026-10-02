import { Boton, Icono, EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas, usarCarrusel } from '../../componentes/compartido'
import { useRef } from 'react'
import catalogoMarketplace from '../../catalogos/capacidades/redsocial/marketplace.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { DESTACADOS, CATEGORIAS, COMPRAS, POPULARES, CLASES_MODULO, CLASES_CATEGORIA_COLOR } from '../../rutas/marketplace/rutas_marketplace'
import { SeccionTituloPre, SeccionPopularEstaSemana } from '../../componentes/marketplace'

export function PaginaMarketplace() {
  const carrusel = usarCarrusel()
  const pistaDestacadosRef = useRef<HTMLDivElement>(null)

  function alDesplazarDestacados(direccion: -1 | 1) {
    const pista = pistaDestacadosRef.current
    if (!pista) return
    pista.scrollBy({ left: direccion * pista.clientWidth * 0.9, behavior: 'smooth' })
  }

  return (
    <EstructuraApp paginaActiva="marketplace">
      <EstructuraTresColumnas
        principal={
          <SeccionTituloPre
            carrusel={carrusel}
            alDesplazarDestacados={alDesplazarDestacados}
            pistaDestacadosRef={pistaDestacadosRef}
            DESTACADOS={DESTACADOS}
            CLASES_MODULO={CLASES_MODULO}
            CATEGORIAS={CATEGORIAS}
            CLASES_CATEGORIA_COLOR={CLASES_CATEGORIA_COLOR}
          />
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <section className="rounded-xl border border-t-eeeeee bg-white">
              <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
                <h3 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoMarketplace.secciones.mis_compras_recientes}</h3>
                <a href="#" className="text-enlace-accion font-semibold text-primario no-underline hover:underline">{textosRedSocial.VER_TODAS}</a>
              </div>
              <div className="px-4 pb-1">
                {COMPRAS.map((c) => (
                  <article key={c.nombre} className="flex items-center gap-2.5 border-b border-t-f5f5f5 py-2.5 last:border-b-0">
                    <div className={`grid h-9 w-9 flex-none place-items-center rounded-control ${CLASES_CATEGORIA_COLOR[c.color]}`}>
                      <Icono name={c.icono} className="h-4.5 w-4.5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-nombre-entidad font-semibold text-texto">{c.nombre}</span>
                      <span className="text-fecha-abreviada text-texto-suave">{c.fecha}</span>
                    </div>
                    <span className="flex-none whitespace-nowrap rounded bg-t-e8f9ee px-2 py-0.75 text-etiqueta-estado font-bold text-t-1b8a3e">{catalogoMarketplace.leyendas.activo}</span>
                  </article>
                ))}
              </div>
              <Boton type="button" variant="secundario" size="md" className="mx-4 mb-3.5 mt-1 w-lista">{catalogoMarketplace.botones.ir_a_mis_compras}</Boton>
            </section>

            <SeccionPopularEstaSemana POPULARES={POPULARES} CLASES_CATEGORIA_COLOR={CLASES_CATEGORIA_COLOR} />

            <section className="rounded-xl degradado-lavanda-media p-6 text-center">
              <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-full bg-overlay-12">
                <Icono name="cohete" className="h-10 w-10 text-primario" />
              </div>
              <h3 className="m-0 mb-1.5 text-titulo-banner font-extrabold text-texto">{catalogoMarketplace.desarrollador.titulo}</h3>
              <p className="m-0 mb-3.5 text-cuerpo leading-1.45 text-texto-suave">{catalogoMarketplace.desarrollador.texto}</p>
              <Boton type="button" variant="primario" size="md">{catalogoMarketplace.botones.publicar_mi_aplicacion}</Boton>
            </section>
          </aside>
        }
      />
    </EstructuraApp>
  )
}
