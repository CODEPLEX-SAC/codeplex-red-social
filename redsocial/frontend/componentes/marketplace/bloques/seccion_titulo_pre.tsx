import type { ReactNode } from 'react'
import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { SeccionTituloPre2 } from './seccion_titulo_pre2'
import { SeccionDestacados3 } from './seccion_destacados3'
import type { AccesosCabecera } from '@/tipos/marketplace/modelo_carrito'
import type { Destacado } from '@/tipos/marketplace/modelo_marketplace'

export function SeccionTituloPre({
  carrusel,
  DESTACADOS,
  CLASES_MODULO,
  CLASES_INSIGNIA_CATEGORIA,
  alVerPlanes,
  accesos,
  contenidoCompras,
  CATEGORIAS,
  CLASES_CATEGORIA_COLOR,
}: {
  carrusel: { pistaRef: React.RefObject<HTMLDivElement | null>; }
  DESTACADOS: Destacado[]
  CLASES_MODULO: Record<'verde' | 'azul' | 'morado' | 'naranja' | 'rojo', string>
  CLASES_INSIGNIA_CATEGORIA: Record<'verde' | 'azul' | 'morado' | 'naranja' | 'rojo', string>
  alVerPlanes: (idPlanes: string) => void
  accesos: AccesosCabecera
  contenidoCompras: ReactNode
  CATEGORIAS: { icono: string; color: 'verde' | 'azul' | 'morado' | 'naranja' | 'rosa'; nombre: string; cantidad: string; }[]
  CLASES_CATEGORIA_COLOR: Record<'verde' | 'azul' | 'morado' | 'naranja' | 'rosa', string>
}) {
  return (
    <section>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="m-0 text-titulo-pagina text-texto">{catalogoMarketplace.titulos.principal}</h1>
          <p className="m-0 mt-0.5 text-subtitulo text-texto-suave">{catalogoMarketplace.subtitulos.principal}</p>
        </div>
        <div className="flex flex-none items-center gap-2">
          <Boton type="button" variant="secundario" size="md" onClick={accesos.abrirCompras}>
            <Icono name="compras" className="h-4 w-4" /> {catalogoMarketplace.botones.mis_compras}
          </Boton>
        </div>
      </div>

      <SeccionTituloPre2 busqueda={accesos.busqueda} alBuscar={accesos.alBuscar} />

      <div
        ref={carrusel.pistaRef}
        className="mb-6 flex flex-wrap items-center gap-2 max-600:flex-nowrap max-600:overflow-x-auto max-600:scrollbar-oculto"
      >
        <Boton type="button" variant="filtro" size="filtro" activo>
          <Icono name="cuadricula-oficial" className="h-3.5 w-3.5" /> {catalogoMarketplace.filtros.todas}
        </Boton>
        {catalogoMarketplace.filtros.pestanas.map((p) => (
          <Boton key={p} type="button" variant="filtro" size="filtro">
            {p}
          </Boton>
        ))}
        <Boton type="button" variant="filtro" size="filtro">
          {catalogoMarketplace.filtros.mas} <Icono name="flecha-abajo" className="h-3.5 w-3.5" />
        </Boton>
      </div>

      {contenidoCompras ?? (
        <>
        <SeccionDestacados3
          DESTACADOS={DESTACADOS}
          CLASES_MODULO={CLASES_MODULO}
          CLASES_INSIGNIA_CATEGORIA={CLASES_INSIGNIA_CATEGORIA}
          alVerPlanes={alVerPlanes}
        />

        <section>
          <div className="mb-3.5 flex items-center justify-between">
            <h2 className="m-0 text-titulo-seccion text-texto">{catalogoMarketplace.secciones.mas_categorias}</h2>
            <a href="#" className="text-enlace-accion text-primario no-underline hover:underline">{textosRedSocial.VER_TODAS}</a>
          </div>
          <div className="grid grid-cols-repeatauto-fill-minmax180-1fr gap-3.5">
            {CATEGORIAS.map((c) => (
              <article key={c.nombre} className="flex items-center gap-3 rounded-xl border border-borde-suave bg-white p-4 hover:shadow-t11">
                <div className={`grid h-9 w-9 flex-none place-items-center rounded-control ${CLASES_CATEGORIA_COLOR[c.color]}`}>
                  <Icono name={c.icono} className="h-4.5 w-4.5 text-white" />
                </div>
                <div className="min-w-0">
                  <span className="block text-nombre-entidad text-texto">{c.nombre}</span>
                  <span className="text-contador text-texto-suave">{c.cantidad}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
        </>
      )}
    </section>
  )
}
