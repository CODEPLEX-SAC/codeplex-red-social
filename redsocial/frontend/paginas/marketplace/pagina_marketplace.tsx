import { Boton, Icono, EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas, usarCarrusel } from '../../componentes/compartido'
import catalogoMarketplace from '../../catalogos/capacidades/redsocial/marketplace.json'
import { DESTACADOS, CATEGORIAS, COMPRAS, POPULARES, PLANES_APLICACIONES, PAGO_PLANES, CLASES_SELECTOR_PLANES, CLASES_PLAN_DESTACADO, CLASES_MODULO, CLASES_INSIGNIA_CATEGORIA, CLASES_CATEGORIA_COLOR } from '../../rutas/marketplace/rutas_marketplace'
import { SeccionTituloPre, SeccionPopularEstaSemana, ModalPlanesAplicacion, ModalCarritoPlanes, ModalPagoPlanes, PanelMisCompras, SeccionMisCompras, usarCarritoMarketplace } from '../../componentes/marketplace'

export function PaginaMarketplace() {
  const carrusel = usarCarrusel()
  const carrito = usarCarritoMarketplace(PLANES_APLICACIONES)
  const comprasVista = [...carrito.compras.map((c) => ({ nombre: c.nombre, icono: c.icono, color: c.tema, fecha: catalogoMarketplace.carrito.adquirido.replace(':fecha', c.fecha) })), ...COMPRAS]
  const seccionCompras = carrito.comprasAbiertas ? (
    <SeccionMisCompras compras={carrito.compras} servicios={carrito.servicios} vip={PAGO_PLANES.vip} clasesModulo={CLASES_MODULO} desinstalacion={carrito.desinstalacion} alVolver={carrito.cerrarCompras} alMejorar={carrito.abrirPlanes} alContratarVip={carrito.contratarVip} />
  ) : null
  return (
    <EstructuraApp paginaActiva="marketplace">
      <EstructuraTresColumnas
        principal={
          <SeccionTituloPre
            carrusel={carrusel}
            DESTACADOS={DESTACADOS}
            CLASES_MODULO={CLASES_MODULO}
            CLASES_INSIGNIA_CATEGORIA={CLASES_INSIGNIA_CATEGORIA}
            planesSeleccionados={carrito.elegidos}
            alVerPlanes={carrito.abrirPlanes}
            accesos={{ cantidadCarrito: carrito.items.length, abrirCarrito: carrito.abrirCarrito, abrirCompras: carrito.alternarCompras }}
            contenidoCompras={seccionCompras}
            CATEGORIAS={CATEGORIAS}
            CLASES_CATEGORIA_COLOR={CLASES_CATEGORIA_COLOR}
          />
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <PanelMisCompras compras={comprasVista} clasesColor={CLASES_MODULO} alIrACompras={carrito.abrirCompras} />

            <SeccionPopularEstaSemana POPULARES={POPULARES} CLASES_CATEGORIA_COLOR={CLASES_CATEGORIA_COLOR} />

            <section className="rounded-xl degradado-lavanda-media p-6 text-center">
              <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-full bg-overlay-12">
                <Icono name="cohete" className="h-10 w-10 text-primario" />
              </div>
              <h3 className="m-0 mb-1.5 text-titulo-banner text-texto">{catalogoMarketplace.desarrollador.titulo}</h3>
              <p className="m-0 mb-3.5 text-cuerpo leading-texto text-texto-suave">{catalogoMarketplace.desarrollador.texto}</p>
              <Boton type="button" variant="primario" size="md">{catalogoMarketplace.botones.publicar_mi_aplicacion}</Boton>
            </section>
          </aside>
        }
      />
      {carrito.configuracionPlanes && (
        <ModalPlanesAplicacion configuracion={carrito.configuracionPlanes} claseModulo={CLASES_MODULO[carrito.configuracionPlanes.color]} estilo={CLASES_SELECTOR_PLANES[carrito.configuracionPlanes.color]} estiloDestacado={CLASES_PLAN_DESTACADO} alCerrar={carrito.cerrarPlanes} alConfirmar={carrito.agregar} />
      )}
      {carrito.carritoAbierto && (
        <ModalCarritoPlanes items={carrito.items} clasesModulo={CLASES_MODULO} alCerrar={carrito.cerrarCarrito} alQuitar={carrito.quitar} alCambiarPlan={carrito.cambiarPlan} alProceder={carrito.proceder} />
      )}
      {carrito.pagoAbierto && (
        <ModalPagoPlanes items={carrito.items} pago={PAGO_PLANES} historial={carrito.historial} servicios={carrito.servicios} clasesModulo={CLASES_MODULO} alCerrar={carrito.volverAlCarrito} alFinalizar={carrito.finalizar} />
      )}
    </EstructuraApp>
  )
}
