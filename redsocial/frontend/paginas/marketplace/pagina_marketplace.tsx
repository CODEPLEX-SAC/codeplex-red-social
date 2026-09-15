import { useRef } from 'react'
import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import catalogoMarketplace from '../../catalogos/capacidades/redsocial/marketplace.json'
import mensajesGlobales from '../../mensajes/globales/textos.json'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { useCarrusel } from '../../componentes/compartido/usar_carrusel'
import { DESTACADOS, CATEGORIAS, COMPRAS, POPULARES } from '../../datos/marketplace/marketplace'

const CLASES_MODULO: Record<'verde' | 'azul' | 'morado' | 'naranja', string> = {
  verde: 'bg-[#34c759]',
  azul: 'bg-[#007aff]',
  morado: 'bg-[#5856d6]',
  naranja: 'bg-[#ff9500]',
}

const CLASES_CATEGORIA_COLOR: Record<'verde' | 'azul' | 'morado' | 'naranja' | 'rosa', string> = {
  ...CLASES_MODULO,
  rosa: 'bg-[#ff2d55]',
}

export function PaginaMarketplace() {
  const carrusel = useCarrusel()
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
          <section>
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h1 className="m-0 text-[22px] font-extrabold text-texto">{catalogoMarketplace.titulos.principal}</h1>
                <p className="m-0 mt-0.5 text-[13px] text-texto-suave">{catalogoMarketplace.subtitulos.principal}</p>
              </div>
              <button type="button" className="inline-flex flex-none items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#e0dce8] bg-white px-4 py-2 text-[13px] font-semibold text-texto">
                <Icono name="compras" className="h-4 w-4" /> {catalogoMarketplace.botones.mis_compras}
              </button>
            </div>

            <div className="mb-5 grid grid-cols-2 items-center gap-6 overflow-hidden rounded-[14px] bg-[linear-gradient(135deg,#f3f0ff_0%,#e8e0ff_50%,#d5ccff_100%)] p-9 max-[900px]:grid-cols-1 max-[900px]:p-6">
              <div className="relative z-10">
                <h2 className="m-0 mb-1 text-xl font-extrabold leading-[1.35] text-texto">
                  {catalogoMarketplace.hero.titulo_pre} <span className="text-primario underline underline-offset-2">{catalogoMarketplace.hero.titulo_destacado}</span>
                </h2>
                <div className="my-4 flex flex-wrap gap-5">
                  <div className="flex items-start gap-2">
                    <div className="grid h-7 w-7 flex-none place-items-center rounded-full bg-[rgba(77,60,197,0.1)]">
                      <Icono name="verificado" className="h-3.5 w-3.5 text-primario" />
                    </div>
                    <div className="text-[11px] font-semibold leading-[1.35] text-texto">{catalogoMarketplace.hero.beneficio_1_titulo}<span className="block text-[10px] font-normal text-texto-suave">{catalogoMarketplace.hero.beneficio_1_detalle}</span></div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="grid h-7 w-7 flex-none place-items-center rounded-full bg-[rgba(77,60,197,0.1)]">
                      <Icono name="rapido" className="h-3.5 w-3.5 text-primario" />
                    </div>
                    <div className="text-[11px] font-semibold leading-[1.35] text-texto">{catalogoMarketplace.hero.beneficio_2_titulo}<span className="block text-[10px] font-normal text-texto-suave">{catalogoMarketplace.hero.beneficio_2_detalle}</span></div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="grid h-7 w-7 flex-none place-items-center rounded-full bg-[rgba(77,60,197,0.1)]">
                      <Icono name="soporte" className="h-3.5 w-3.5 text-primario" />
                    </div>
                    <div className="text-[11px] font-semibold leading-[1.35] text-texto">{catalogoMarketplace.hero.beneficio_3_titulo}<span className="block text-[10px] font-normal text-texto-suave">{catalogoMarketplace.hero.beneficio_3_detalle}</span></div>
                  </div>
                </div>
                <div className="flex max-w-[380px] items-center overflow-hidden rounded-[10px] border border-[#e0dce8] bg-white">
                  <span className="grid flex-none place-items-center px-3">
                    <Icono name="buscar" className="h-4 w-4 text-[#aaa7b5]" />
                  </span>
                  <input type="search" placeholder={catalogoMarketplace.placeholders.buscar} className="min-w-0 flex-1 border-0 bg-transparent py-2.75 text-[13px] text-texto outline-none placeholder:text-[#c4c0d3]" />
                  <button type="button" className="grid flex-none place-items-center bg-primario px-4 py-2.75">
                    <Icono name="buscar" className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
              <div className="relative grid h-[160px] place-items-center max-[900px]:hidden">
                <div className="grid h-[140px] w-[140px] place-items-center rounded-full bg-[rgba(77,60,197,0.08)]">
                  <Icono name="tienda" className="h-14 w-14 text-primario opacity-70" />
                </div>
                <div className="absolute right-[30px] top-2.5 h-10 w-10 rotate-[15deg] rounded-[10px] bg-[rgba(255,107,53,0.15)]" />
                <div className="absolute bottom-5 right-2.5 h-8 w-8 -rotate-[10deg] rounded-[10px] bg-[rgba(52,199,89,0.15)]" />
                <div className="absolute bottom-7.5 left-5 h-7 w-7 rotate-[25deg] rounded-[10px] bg-[rgba(255,204,0,0.2)]" />
              </div>
            </div>

            <div
              ref={carrusel.pistaRef}
              className="mb-6 flex flex-wrap items-center gap-2 max-[600px]:flex-nowrap max-[600px]:overflow-x-auto max-[600px]:[-ms-overflow-style:none] max-[600px]:[scrollbar-width:none] max-[600px]:[&::-webkit-scrollbar]:hidden"
            >
              <button type="button" className="inline-flex items-center gap-1 whitespace-nowrap rounded-[20px] border border-primario bg-primario px-4 py-1.75 text-xs font-semibold text-white">
                <Icono name="cuadricula" className="h-3.5 w-3.5" /> {catalogoMarketplace.filtros.todas}
              </button>
              {catalogoMarketplace.filtros.pestanas.map((p) => (
                <button key={p} type="button" className="inline-flex items-center gap-1 whitespace-nowrap rounded-[20px] border border-[#e0dce8] bg-white px-4 py-1.75 text-xs font-semibold text-texto-suave hover:border-primario hover:text-primario">
                  {p}
                </button>
              ))}
              <button type="button" className="inline-flex items-center gap-1 whitespace-nowrap rounded-[20px] border border-[#e0dce8] bg-white px-4 py-1.75 text-xs font-semibold text-texto-suave hover:border-primario hover:text-primario">
                {catalogoMarketplace.filtros.mas} <Icono name="flecha-abajo" className="h-3.5 w-3.5" />
              </button>
            </div>

            <section className="mb-7">
              <div className="mb-3.5 flex items-center justify-between">
                <h2 className="m-0 text-base font-bold text-texto">{catalogoMarketplace.secciones.destacados}</h2>
                <a href="#" className="text-xs font-semibold text-primario no-underline hover:underline">{mensajesGlobales.VER_TODOS}</a>
              </div>
              <div className="relative">
                <button
                  type="button"
                  aria-label={catalogoMarketplace.botones.anterior}
                  onClick={() => alDesplazarDestacados(-1)}
                  className="absolute -left-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-[#e0dce8] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                >
                  <Icono name="flecha-izquierda" className="h-3.5 w-3.5 text-texto" />
                </button>
                <div
                  ref={pistaDestacadosRef}
                  className="flex gap-4 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {DESTACADOS.map((d) => (
                    <article key={d.nombre} className="flex w-55 flex-none flex-col overflow-hidden rounded-xl border border-[#eee] bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                      <div className="relative grid h-20 place-items-center">
                        {d.popular && <span className="absolute right-2 top-2 rounded bg-primario px-2 py-0.5 text-[9px] font-bold text-white">{catalogoMarketplace.leyendas.popular}</span>}
                        <div className={`grid h-10 w-10 place-items-center rounded-[10px] ${CLASES_MODULO[d.color]}`}>
                          <Icono name={d.icono} className="h-5.5 w-5.5 text-white" />
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-3.5 pt-3">
                        <h3 className="m-0 mb-1 text-[13px] font-bold text-texto">{d.nombre}</h3>
                        <div className="mb-1.5 flex items-center gap-1">
                          <Icono name="estrella" className="h-3 w-3 text-[#ffcc00]" />
                          <span className="text-xs font-bold text-texto">{d.puntaje}</span>
                          <span className="text-[11px] text-texto-suave">{d.conteo}</span>
                        </div>
                        <p className="m-0 mb-2.5 text-[11px] leading-[1.4] text-texto-suave">{d.descripcion}</p>
                        <div className="mb-2.5 text-base font-extrabold text-texto">
                          {d.precio} <span className="text-[11px] font-normal text-texto-suave">{catalogoMarketplace.leyendas.por_mes}</span>
                        </div>
                        <button type="button" className="mt-auto flex w-full items-center justify-center gap-1.5 rounded-lg border border-primario bg-white py-2 text-xs font-semibold text-primario hover:bg-primario hover:text-white">
                          <Icono name="carrito" className="h-3.5 w-3.5" /> {catalogoMarketplace.botones.ver_detalles}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
                <button
                  type="button"
                  aria-label={catalogoMarketplace.botones.siguiente}
                  onClick={() => alDesplazarDestacados(1)}
                  className="absolute -right-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-[#e0dce8] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                >
                  <Icono name="flecha-derecha" className="h-3.5 w-3.5 text-texto" />
                </button>
              </div>
            </section>

            <section>
              <div className="mb-3.5 flex items-center justify-between">
                <h2 className="m-0 text-base font-bold text-texto">{catalogoMarketplace.secciones.mas_categorias}</h2>
                <a href="#" className="text-xs font-semibold text-primario no-underline hover:underline">{mensajesGlobales.VER_TODAS}</a>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3.5">
                {CATEGORIAS.map((c) => (
                  <article key={c.nombre} className="flex items-center gap-3 rounded-xl border border-[#eee] bg-white p-4 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                    <div className={`grid h-9 w-9 flex-none place-items-center rounded-[10px] ${CLASES_CATEGORIA_COLOR[c.color]}`}>
                      <Icono name={c.icono} className="h-4.5 w-4.5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[13px] font-bold text-texto">{c.nombre}</span>
                      <span className="text-[11px] text-texto-suave">{c.cantidad}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <section className="rounded-xl border border-[#eee] bg-white">
              <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
                <h3 className="m-0 text-sm font-bold text-texto">{catalogoMarketplace.secciones.mis_compras_recientes}</h3>
                <a href="#" className="text-[11px] font-semibold text-primario no-underline hover:underline">{mensajesGlobales.VER_TODAS}</a>
              </div>
              <div className="px-4 pb-1">
                {COMPRAS.map((c) => (
                  <article key={c.nombre} className="flex items-center gap-2.5 border-b border-[#f5f5f5] py-2.5 last:border-b-0">
                    <div className={`grid h-9 w-9 flex-none place-items-center rounded-[10px] ${CLASES_CATEGORIA_COLOR[c.color]}`}>
                      <Icono name={c.icono} className="h-4.5 w-4.5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-xs font-semibold text-texto">{c.nombre}</span>
                      <span className="text-[11px] text-texto-suave">{c.fecha}</span>
                    </div>
                    <span className="flex-none whitespace-nowrap rounded bg-[#e8f9ee] px-2 py-0.75 text-[10px] font-bold text-[#1b8a3e]">{catalogoMarketplace.leyendas.activo}</span>
                  </article>
                ))}
              </div>
              <button type="button" className="mx-4 mb-3.5 mt-1 block w-[calc(100%-32px)] rounded-lg border border-[#e0dce8] bg-white py-2.25 text-center text-xs font-semibold text-texto hover:border-primario hover:text-primario">{catalogoMarketplace.botones.ir_a_mis_compras}</button>
            </section>

            <section className="rounded-xl border border-[#eee] bg-white">
              <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
                <h3 className="m-0 text-sm font-bold text-texto">{catalogoMarketplace.secciones.popular_esta_semana}</h3>
                <a href="#" className="text-[11px] font-semibold text-primario no-underline hover:underline">{mensajesGlobales.VER_TODOS}</a>
              </div>
              <div className="px-4 pb-3">
                {POPULARES.map((p, i) => (
                  <article key={p.nombre} className="flex items-center gap-2.5 border-b border-[#f5f5f5] py-2.5 last:border-b-0">
                    <span className="w-5 flex-none text-center text-[13px] font-extrabold text-texto-suave">{i + 1}</span>
                    <div className={`grid h-8 w-8 flex-none place-items-center rounded-lg ${CLASES_CATEGORIA_COLOR[p.color]}`}>
                      <Icono name={p.icono} className="h-4 w-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-xs font-semibold text-texto">{p.nombre}</span>
                      <div className="mt-px flex items-center gap-0.75">
                        <Icono name="estrella" className="h-2.5 w-2.5 text-[#ffcc00]" />
                        <span className="text-[10px] font-bold text-texto">{p.puntaje}</span>
                        <span className="text-[10px] text-texto-suave">{p.conteo}</span>
                      </div>
                    </div>
                    <span className="flex-none whitespace-nowrap text-xs font-bold text-texto">
                      {p.precio} <span className="text-[10px] font-normal text-texto-suave">{catalogoMarketplace.leyendas.por_mes}</span>
                    </span>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-xl bg-[linear-gradient(135deg,#f3f0ff_0%,#e8e0ff_100%)] p-6 text-center">
              <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-full bg-[rgba(77,60,197,0.1)]">
                <Icono name="cohete" className="h-10 w-10 text-primario" />
              </div>
              <h3 className="m-0 mb-1.5 text-[15px] font-extrabold text-texto">{catalogoMarketplace.desarrollador.titulo}</h3>
              <p className="m-0 mb-3.5 text-xs leading-[1.45] text-texto-suave">{catalogoMarketplace.desarrollador.texto}</p>
              <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border-0 bg-primario px-5 py-2.5 text-xs font-bold text-white hover:opacity-90">{catalogoMarketplace.botones.publicar_mi_aplicacion}</button>
            </section>
          </aside>
        }
      />
    </EstructuraApp>
  )
}
