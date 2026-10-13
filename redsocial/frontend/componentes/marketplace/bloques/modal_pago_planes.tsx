import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { Modal } from '../../compartido/interfaz/modal'
import { CuerpoPagoPlanes } from './cuerpo_pago_planes'
import { ExitoPagoPlanes } from './exito_pago_planes'
import { detalleTarjeta } from './logica_pago_planes'
import { ModalSeleccionPago } from './modal_seleccion_pago'
import { usarPagoPlanes } from './usar_pago_planes'
import type { HistorialPago, ItemCarrito, ServicioAdicional } from '@/tipos/marketplace/modelo_carrito'
import type { ConfiguracionPago, ResumenActivacion } from '@/tipos/marketplace/modelo_pago'

const guardados = catalogoMarketplace.pago.guardados

export function ModalPagoPlanes({
  items,
  pago,
  historial,
  servicios,
  clasesModulo,
  alCerrar,
  alFinalizar,
}: {
  items: ItemCarrito[]
  pago: ConfiguracionPago
  historial: HistorialPago
  servicios: ServicioAdicional[]
  clasesModulo: Record<string, string>
  alCerrar: () => void
  alFinalizar: (resumen: ResumenActivacion) => void
}) {
  const estado = usarPagoPlanes(pago, items, historial, servicios.map((s) => s.aplicacion))
  const opcionesTarjetas = historial.tarjetas.map((t) => ({ id: t.id, titulo: guardados.enmascarada.replace(':ultimos', t.ultimos4), detalle: detalleTarjeta(t) }))
  const opcionesPerfiles = historial.perfiles.map((p) => ({ id: p.id, titulo: p.razon, detalle: [guardados.documento.replace(':documento', p.documento), p.correo].join(guardados.separador) }))

  function cerrar() {
    if (estado.ventana) return
    if (estado.resumen) alFinalizar(estado.resumen)
    else alCerrar()
  }

  return (
    <>
      <Modal titulo={catalogoMarketplace.pago.titulo} etiquetaCerrar={textosRedSocial.CERRAR} onCerrar={cerrar} suave className="max-w-240 rounded-2xl max-600:rounded-none">
        {estado.resumen ? (
          <ExitoPagoPlanes items={items} resumen={estado.resumen} alVolver={() => alFinalizar(estado.resumen as ResumenActivacion)} />
        ) : (
          <CuerpoPagoPlanes items={items} pago={pago} historial={historial} clasesModulo={clasesModulo} estado={estado} />
        )}
      </Modal>
      {estado.ventana === 'tarjetas' && (
        <ModalSeleccionPago titulo={guardados.titulo_tarjetas} opciones={opcionesTarjetas} seleccionadoId={estado.tarjetaGuardada?.id ?? null} textoNueva={guardados.nueva_tarjeta} alSeleccionar={(id) => estado.usarTarjeta(historial.tarjetas.find((t) => t.id === id) ?? historial.tarjetas[0])} alNueva={estado.nuevaTarjeta} alCerrar={estado.cerrarVentana} />
      )}
      {estado.ventana === 'perfiles' && (
        <ModalSeleccionPago titulo={guardados.titulo_perfiles} opciones={opcionesPerfiles} seleccionadoId={estado.perfilGuardado?.id ?? null} textoNueva={guardados.nuevo_perfil} alSeleccionar={(id) => estado.usarPerfil(historial.perfiles.find((p) => p.id === id) ?? historial.perfiles[0])} alNueva={estado.nuevoPerfil} alCerrar={estado.cerrarVentana} />
      )}
    </>
  )
}
