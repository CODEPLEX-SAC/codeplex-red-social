import { useState } from 'react'
import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Boton } from '../../compartido/interfaz/boton'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { Pestanas } from '../../compartido/interfaz/pestanas'
import { ConfirmacionDesinstalar } from './confirmacion_desinstalar'
import { ModalDetalleCompra } from './modal_detalle_compra'
import { TarjetaServicio } from './tarjeta_servicio'
import { TarjetaSuscripcion } from './tarjeta_suscripcion'
import { accionesDeCompra, elementosPestanasCompras } from './logica_carrito_planes'
import type { CompraRealizada, DesinstalacionCompra, ServicioAdicional } from '@/tipos/marketplace/modelo_carrito'
import type { ConfiguracionPago } from '@/tipos/marketplace/modelo_pago'

const textos = catalogoMarketplace.mis_compras
const clases = textos.clases
const [pestanaAplicaciones] = textos.pestanas

export function SeccionMisCompras({
  compras,
  servicios,
  vip,
  clasesModulo,
  desinstalacion,
  alVolver,
  alMejorar,
  alContratarVip,
}: {
  compras: CompraRealizada[]
  servicios: ServicioAdicional[]
  vip: ConfiguracionPago['vip']
  clasesModulo: Record<string, string>
  desinstalacion: DesinstalacionCompra
  alVolver: () => void
  alMejorar: (aplicacion: string) => void
  alContratarVip: (aplicacion: string) => void
}) {
  const [pestana, setPestana] = useState(pestanaAplicaciones.clave)
  const [detalle, setDetalle] = useState<string | null>(null)
  const elegida = compras.find((c) => c.aplicacion === desinstalacion.pendiente)
  const enDetalle = compras.find((c) => c.aplicacion === detalle)
  const manejadores = { detalles: setDetalle, mejorar: alMejorar, contratarVip: alContratarVip, desinstalar: desinstalacion.pedir }
  return (
    <section aria-label={textos.titulo} className={clases.seccion}>
      <div className={clases.cabecera}>
        <h2 className="m-0 text-titulo-seccion text-texto">{textos.titulo}</h2>
        <Boton type="button" variant="enlace" size="enlace_accion" onClick={alVolver}>{textos.ver_catalogo}</Boton>
      </div>
      <p className="m-0 mb-3 text-subtitulo text-texto-suave">{textos.subtitulo}</p>
      <Pestanas elementos={elementosPestanasCompras([compras.length, servicios.length])} activa={pestana} alCambiar={setPestana} className={clases.pestanas} />
      {pestana === pestanaAplicaciones.clave ? (
        compras.length === 0 ? (
          <MensajeVacio titulo={textos.vacio_titulo} texto={textos.vacio_detalle} className={clases.vacio} />
        ) : (
          <div className={clases.lista}>
            {compras.map((c) => (
              <TarjetaSuscripcion
                key={c.aplicacion}
                compra={c}
                claseModulo={clasesModulo[c.tema]}
                vipContratado={servicios.some((s) => s.aplicacion === c.aplicacion)}
                acciones={accionesDeCompra(c.aplicacion, manejadores)}
              />
            ))}
          </div>
        )
      ) : servicios.length === 0 ? (
        <MensajeVacio titulo={textos.servicios_vacio_titulo} texto={textos.servicios_vacio_detalle} className={clases.vacio} />
      ) : (
        <div className={clases.lista}>
          {servicios.map((s) => (
            <TarjetaServicio key={s.aplicacion} servicio={s} vip={vip} />
          ))}
        </div>
      )}
      {enDetalle && <ModalDetalleCompra compra={enDetalle} claseModulo={clasesModulo[enDetalle.tema]} alCerrar={() => setDetalle(null)} />}
      {elegida && <ConfirmacionDesinstalar nombre={elegida.nombre} conVip={servicios.some((s) => s.aplicacion === elegida.aplicacion)} alCancelar={desinstalacion.cancelar} alConfirmar={desinstalacion.confirmar} />}
    </section>
  )
}
