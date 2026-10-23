import { useState } from 'react'
import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { Boton } from '../../compartido/interfaz/boton'
import { Modal } from '../../compartido/interfaz/modal'
import { AgregarTarjetaGuardada } from './agregar_tarjeta_guardada'
import { EtiquetasTarjeta } from './detalle_tarjeta_guardada'
import { detalleTarjeta, tarjetaVencida, tituloTarjeta } from './logica_metodos_pago'
import { OpcionMetodoPago } from './opcion_metodo_pago'
import type { MetodosPago } from '@/tipos/marketplace/modelo_pago'
import type { TarjetaGuardada } from '@/tipos/marketplace/modelo_carrito'

const textos = catalogoMarketplace.pago.metodo_guardado
const modal = textos.modal
const clases = textos.clases

export function ModalEditarMetodoPago({ metodos, seleccionadaId, alUsar, alCerrar }: { metodos: MetodosPago; seleccionadaId: string | null; alUsar: (tarjeta: TarjetaGuardada) => void; alCerrar: () => void }) {
  const [elegidaId, setElegidaId] = useState(seleccionadaId)
  const elegida = metodos.tarjetas.find((tarjeta) => tarjeta.id === elegidaId)
  const utilizable = elegida !== undefined && !tarjetaVencida(elegida.vencimiento)

  return (
    <Modal titulo={modal.titulo} etiquetaCerrar={textosRedSocial.CERRAR} onCerrar={alCerrar} className={clases.modal}>
      <div className={clases.cuerpo_modal}>
        {metodos.error && <div role="alert" className={clases.aviso_estado}>{metodos.error === 'lectura' ? textos.error_lectura : textos.error_escritura}</div>}
        {metodos.tarjetas.length === 0 ? (
          <p className={clases.texto_suave}>{modal.vacio}</p>
        ) : (
          <div role="radiogroup" aria-label={modal.lista_etiqueta} className={clases.lista_modal}>
            {metodos.tarjetas.map((tarjeta) => (
              <OpcionMetodoPago key={tarjeta.id} titulo={tituloTarjeta(tarjeta)} detalle={detalleTarjeta(tarjeta)} icono="tarjeta-pago" activa={tarjeta.id === elegidaId} deshabilitada={tarjetaVencida(tarjeta.vencimiento)} adicional={<EtiquetasTarjeta tarjeta={tarjeta} />} alElegir={() => setElegidaId(tarjeta.id)} />
            ))}
          </div>
        )}
        <AgregarTarjetaGuardada metodos={metodos} alGuardar={(tarjeta) => setElegidaId(tarjeta.id)} />
        <p className={clases.texto_suave}>{textos.aviso_demo}</p>
        <div className={clases.pie}>
          <Boton type="button" variant="secundario" size="md" onClick={alCerrar}>{modal.cancelar}</Boton>
          <Boton type="button" variant="primario" size="md" disabled={!utilizable} onClick={() => elegida && alUsar(elegida)}>{modal.usar_tarjeta}</Boton>
        </div>
      </div>
    </Modal>
  )
}
