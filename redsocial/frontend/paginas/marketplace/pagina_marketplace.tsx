import { useRef } from 'react'
import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { useCarrusel } from '../../ganchos/compartido/usar_carrusel'
import type { IconName } from '../../tipos/compartido/icono'
import type { Destacado } from '@/tipos/marketplace/pagina_marketplace'

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

const DESTACADOS: Destacado[] = [
  { nombre: 'Contabilidad Pro', icono: 'contabilidad', color: 'verde', puntaje: '4.8', conteo: '(124)', descripcion: 'Lleva la contabilidad de tu empresa de forma sencilla y eficiente.', precio: 'S/ 49.90' },
  { nombre: 'Integración SUNAT', icono: 'ventas', color: 'azul', puntaje: '4.9', conteo: '(89)', descripcion: 'Facturación electrónica, libros y reportes SUNAT automatizados.', precio: 'S/ 39.90' },
  { nombre: 'Planillas Perú', icono: 'planillas', color: 'morado', popular: true, puntaje: '4.7', conteo: '(156)', descripcion: 'Gestiona planillas, boletas, AFP, CTS y más en un solo lugar.', precio: 'S/ 59.90' },
  { nombre: 'Inventario Avanzado', icono: 'inventario', color: 'naranja', puntaje: '4.6', conteo: '(78)', descripcion: 'Control de stock, kardex, lotes y almacenes.', precio: 'S/ 29.90' },
]

const CATEGORIAS: { icono: IconName; color: keyof typeof CLASES_CATEGORIA_COLOR; nombre: string; cantidad: string }[] = [
  { icono: 'contabilidad', color: 'verde', nombre: 'Contabilidad', cantidad: '32 soluciones' },
  { icono: 'ventas', color: 'azul', nombre: 'Ventas', cantidad: '18 soluciones' },
  { icono: 'planillas', color: 'morado', nombre: 'RRHH', cantidad: '24 soluciones' },
  { icono: 'inventario', color: 'naranja', nombre: 'Inventario', cantidad: '16 soluciones' },
  { icono: 'panel', color: 'rosa', nombre: 'Productividad', cantidad: '22 soluciones' },
]

const PESTANAS = ['Contabilidad', 'Ventas', 'RRHH', 'Inventario', 'Productividad', 'Marketing', 'Seguridad']

const COMPRAS: { icono: IconName; color: 'verde' | 'morado' | 'azul'; nombre: string; fecha: string }[] = [
  { icono: 'contabilidad', color: 'verde', nombre: 'Contabilidad Pro', fecha: 'Adquirido el 12/06/2026' },
  { icono: 'planillas', color: 'morado', nombre: 'Planillas Perú', fecha: 'Adquirido el 05/06/2026' },
  { icono: 'ventas', color: 'azul', nombre: 'Integración SUNAT', fecha: 'Adquirido el 01/06/2026' },
]

const POPULARES: { icono: IconName; color: keyof typeof CLASES_CATEGORIA_COLOR; nombre: string; puntaje: string; conteo: string; precio: string }[] = [
  { icono: 'contabilidad', color: 'verde', nombre: 'Contabilidad Pro', puntaje: '4.8', conteo: '(124)', precio: 'S/ 49.90' },
  { icono: 'planillas', color: 'morado', nombre: 'Planillas Perú', puntaje: '4.7', conteo: '(156)', precio: 'S/ 59.90' },
  { icono: 'ventas', color: 'azul', nombre: 'Integración SUNAT', puntaje: '4.9', conteo: '(89)', precio: 'S/ 39.90' },
  { icono: 'inventario', color: 'naranja', nombre: 'Inventario Avanzado', puntaje: '4.6', conteo: '(78)', precio: 'S/ 29.90' },
  { icono: 'panel', color: 'rosa', nombre: 'Control de Asistencia', puntaje: '4.5', conteo: '(63)', precio: 'S/ 19.90' },
]

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
                <h1 className="m-0 text-[22px] font-extrabold text-texto">Marketplace</h1>
                <p className="m-0 mt-0.5 text-[13px] text-texto-suave">Descubre aplicaciones, módulos y soluciones para potenciar tu negocio.</p>
              </div>
              <button type="button" className="inline-flex flex-none items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#e0dce8] bg-white px-4 py-2 text-[13px] font-semibold text-texto">
                <Icono name="compras" className="h-4 w-4" /> Mis compras
              </button>
            </div>

            <div className="mb-5 grid grid-cols-2 items-center gap-6 overflow-hidden rounded-[14px] p-9 max-[900px]:grid-cols-1 max-[900px]:p-6" style={{ background: 'linear-gradient(135deg, #f3f0ff 0%, #e8e0ff 50%, #d5ccff 100%)' }}>
              <div className="relative z-10">
                <h2 className="m-0 mb-1 text-xl font-extrabold leading-[1.35] text-texto">
                  Potencia tu empresa con las mejores soluciones del <span className="text-primario underline underline-offset-2">marketplace</span>
                </h2>
                <div className="my-4 flex flex-wrap gap-5">
                  <div className="flex items-start gap-2">
                    <div className="grid h-7 w-7 flex-none place-items-center rounded-full bg-[rgba(77,60,197,0.1)]">
                      <Icono name="verificado" className="h-3.5 w-3.5 text-primario" />
                    </div>
                    <div className="text-[11px] font-semibold leading-[1.35] text-texto">Soluciones verificadas<span className="block text-[10px] font-normal text-texto-suave">y confiables</span></div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="grid h-7 w-7 flex-none place-items-center rounded-full bg-[rgba(77,60,197,0.1)]">
                      <Icono name="rapido" className="h-3.5 w-3.5 text-primario" />
                    </div>
                    <div className="text-[11px] font-semibold leading-[1.35] text-texto">Instalación rápida<span className="block text-[10px] font-normal text-texto-suave">y segura</span></div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="grid h-7 w-7 flex-none place-items-center rounded-full bg-[rgba(77,60,197,0.1)]">
                      <Icono name="soporte" className="h-3.5 w-3.5 text-primario" />
                    </div>
                    <div className="text-[11px] font-semibold leading-[1.35] text-texto">Soporte y actualizaciones<span className="block text-[10px] font-normal text-texto-suave">continuas</span></div>
                  </div>
                </div>
                <div className="flex max-w-[380px] items-center overflow-hidden rounded-[10px] border border-[#e0dce8] bg-white">
                  <span className="grid flex-none place-items-center px-3">
                    <Icono name="buscar" className="h-4 w-4 text-[#aaa7b5]" />
                  </span>
                  <input type="search" placeholder="Buscar aplicaciones, módulos o soluciones..." className="min-w-0 flex-1 border-0 bg-transparent py-2.75 text-[13px] text-texto outline-none placeholder:text-[#c4c0d3]" />
                  <button type="button" className="grid flex-none place-items-center bg-primario px-4 py-2.75">
                    <Icono name="buscar" className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
              <div className="relative grid h-[160px] place-items-center max-[900px]:hidden">
                <div className="grid h-[140px] w-[140px] place-items-center rounded-full bg-[rgba(77,60,197,0.08)]">
                  <Icono name="tienda" className="h-14 w-14 text-primario opacity-70" />
                </div>
                <div className="absolute right-[30px] top-2.5 h-10 w-10 rotate-[15deg] rounded-[10px]" style={{ background: 'rgba(255,107,53,0.15)' }} />
                <div className="absolute bottom-5 right-2.5 h-8 w-8 -rotate-[10deg] rounded-[10px]" style={{ background: 'rgba(52,199,89,0.15)' }} />
                <div className="absolute bottom-7.5 left-5 h-7 w-7 rotate-[25deg] rounded-[10px]" style={{ background: 'rgba(255,204,0,0.2)' }} />
              </div>
            </div>

            <div
              ref={carrusel.pistaRef}
              className="mb-6 flex flex-wrap items-center gap-2 max-[600px]:flex-nowrap max-[600px]:overflow-x-auto max-[600px]:[-ms-overflow-style:none] max-[600px]:[scrollbar-width:none] max-[600px]:[&::-webkit-scrollbar]:hidden"
            >
              <button type="button" className="inline-flex items-center gap-1 whitespace-nowrap rounded-[20px] border border-primario bg-primario px-4 py-1.75 text-xs font-semibold text-white">
                <Icono name="cuadricula" className="h-3.5 w-3.5" /> Todas
              </button>
              {PESTANAS.map((p) => (
                <button key={p} type="button" className="inline-flex items-center gap-1 whitespace-nowrap rounded-[20px] border border-[#e0dce8] bg-white px-4 py-1.75 text-xs font-semibold text-texto-suave hover:border-primario hover:text-primario">
                  {p}
                </button>
              ))}
              <button type="button" className="inline-flex items-center gap-1 whitespace-nowrap rounded-[20px] border border-[#e0dce8] bg-white px-4 py-1.75 text-xs font-semibold text-texto-suave hover:border-primario hover:text-primario">
                Más <Icono name="flecha-abajo" className="h-3.5 w-3.5" />
              </button>
            </div>

            <section className="mb-7">
              <div className="mb-3.5 flex items-center justify-between">
                <h2 className="m-0 text-base font-bold text-texto">Destacados</h2>
                <a href="#" className="text-xs font-semibold text-primario no-underline hover:underline">Ver todos</a>
              </div>
              <div className="relative">
                <button
                  type="button"
                  aria-label="Anterior"
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
                        {d.popular && <span className="absolute right-2 top-2 rounded bg-primario px-2 py-0.5 text-[9px] font-bold text-white">Popular</span>}
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
                          {d.precio} <span className="text-[11px] font-normal text-texto-suave">/mes</span>
                        </div>
                        <button type="button" className="mt-auto flex w-full items-center justify-center gap-1.5 rounded-lg border border-primario bg-white py-2 text-xs font-semibold text-primario hover:bg-primario hover:text-white">
                          <Icono name="carrito" className="h-3.5 w-3.5" /> Ver detalles
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
                <button
                  type="button"
                  aria-label="Siguiente"
                  onClick={() => alDesplazarDestacados(1)}
                  className="absolute -right-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-[#e0dce8] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                >
                  <Icono name="flecha-derecha" className="h-3.5 w-3.5 text-texto" />
                </button>
              </div>
            </section>

            <section>
              <div className="mb-3.5 flex items-center justify-between">
                <h2 className="m-0 text-base font-bold text-texto">Más categorías</h2>
                <a href="#" className="text-xs font-semibold text-primario no-underline hover:underline">Ver todas</a>
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
                <h3 className="m-0 text-sm font-bold text-texto">Mis compras recientes</h3>
                <a href="#" className="text-[11px] font-semibold text-primario no-underline hover:underline">Ver todas</a>
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
                    <span className="flex-none whitespace-nowrap rounded px-2 py-0.75 text-[10px] font-bold text-[#1b8a3e]" style={{ background: '#e8f9ee' }}>Activo</span>
                  </article>
                ))}
              </div>
              <button type="button" className="mx-4 mb-3.5 mt-1 block rounded-lg border border-[#e0dce8] bg-white py-2.25 text-center text-xs font-semibold text-texto hover:border-primario hover:text-primario" style={{ width: 'calc(100% - 32px)' }}>Ir a mis compras</button>
            </section>

            <section className="rounded-xl border border-[#eee] bg-white">
              <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
                <h3 className="m-0 text-sm font-bold text-texto">Popular esta semana</h3>
                <a href="#" className="text-[11px] font-semibold text-primario no-underline hover:underline">Ver todos</a>
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
                      {p.precio} <span className="text-[10px] font-normal text-texto-suave">/mes</span>
                    </span>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-xl p-6 text-center" style={{ background: 'linear-gradient(135deg, #f3f0ff 0%, #e8e0ff 100%)' }}>
              <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-full" style={{ background: 'rgba(77,60,197,0.1)' }}>
                <Icono name="cohete" className="h-10 w-10 text-primario" />
              </div>
              <h3 className="m-0 mb-1.5 text-[15px] font-extrabold text-texto">¿Eres desarrollador?</h3>
              <p className="m-0 mb-3.5 text-xs leading-[1.45] text-texto-suave">Publica tus aplicaciones en Codeplex y llega a miles de empresas.</p>
              <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border-0 bg-primario px-5 py-2.5 text-xs font-bold text-white hover:opacity-90">Publicar mi aplicación</button>
            </section>
          </aside>
        }
      />
    </EstructuraApp>
  )
}
