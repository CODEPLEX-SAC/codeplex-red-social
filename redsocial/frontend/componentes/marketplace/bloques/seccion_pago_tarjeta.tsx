import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Boton } from '../../compartido/interfaz/boton'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Icono } from '../../compartido/icono'
import { Insignia } from '../../compartido/interfaz/insignia'
import { EncabezadoPasoPago } from './encabezado_paso_pago'
import { detalleTarjeta } from './logica_pago_planes'
import type { usarPagoPlanes } from './usar_pago_planes'
import type { TarjetaGuardada } from '@/tipos/marketplace/modelo_carrito'

const textos = catalogoMarketplace.pago
const guardados = textos.guardados

function TarjetaElegida({ tarjeta, alCambiar }: { tarjeta: TarjetaGuardada; alCambiar: () => void }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-borde bg-fondo px-3.5 py-2.5">
      <Icono name="tarjeta-pago" className="h-5 w-5 flex-none text-primario" />
      <div className="min-w-0 flex-1">
        <div className="text-nombre-fila text-texto">{guardados.enmascarada.replace(':ultimos', tarjeta.ultimos4)}</div>
        <div className="text-auxiliar text-texto-suave">{detalleTarjeta(tarjeta)}</div>
      </div>
      <Insignia variant="status" className="bg-primario-suave text-primario">{tarjeta.marca}</Insignia>
      <Boton type="button" variant="enlace" size="enlace_accion" onClick={alCambiar}>{guardados.cambiar}</Boton>
    </div>
  )
}

export function SeccionPagoTarjeta({ estado, cantidadGuardadas }: { estado: ReturnType<typeof usarPagoPlanes>; cantidadGuardadas: number }) {
  const campos = textos.campos
  const guardada = estado.tarjetaGuardada
  return (
    <section className={textos.clases.tarjeta}>
      <EncabezadoPasoPago numero={1} titulo={textos.paso1.titulo} detalle={textos.paso1.detalle} />
      <div className="grid gap-3">
        {guardada ? (
          <>
            <TarjetaElegida tarjeta={guardada} alCambiar={estado.nuevaTarjeta} />
            <CampoTexto anchoCompleto etiqueta={campos.cvv} marcador={campos.cvv_ph} textoAyuda={guardados.cvv_aviso} valor={estado.tarjeta.cvv} alCambiar={estado.cambiarCvv} />
            <Boton type="button" variant="enlace" size="enlace_accion" onClick={() => estado.abrirVentana('tarjetas')}>{guardados.ver_todas.replace(':n', String(cantidadGuardadas))}</Boton>
          </>
        ) : (
          <>
            <CampoTexto anchoCompleto etiqueta={campos.numero} marcador={campos.numero_ph} valor={estado.tarjeta.numero} alCambiar={estado.cambiarNumero} />
            <div className={textos.clases.dos_columnas}>
              <CampoTexto anchoCompleto etiqueta={campos.vencimiento} marcador={campos.vencimiento_ph} valor={estado.tarjeta.vencimiento} alCambiar={estado.cambiarVencimiento} />
              <CampoTexto anchoCompleto etiqueta={campos.cvv} marcador={campos.cvv_ph} valor={estado.tarjeta.cvv} alCambiar={estado.cambiarCvv} />
            </div>
            <CampoTexto anchoCompleto etiqueta={campos.propietario} marcador={campos.propietario_ph} valor={estado.tarjeta.propietario} alCambiar={estado.cambiarPropietario} />
            {cantidadGuardadas > 0 && <Boton type="button" variant="enlace" size="enlace_accion" onClick={() => estado.abrirVentana('tarjetas')}>{guardados.usar_guardada}</Boton>}
          </>
        )}
      </div>
    </section>
  )
}
