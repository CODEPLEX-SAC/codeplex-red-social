import { AlertaEstado } from '../interfaz/alerta_estado'
import { useState } from 'react'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { Boton } from '../interfaz/boton'
import { Modal } from '../interfaz/modal'
import { AgregarTarjetaPago } from './agregar_tarjeta_pago'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import { EditorTarjetaPago } from './editor_tarjeta_pago'
import { FilaTarjetaPago } from './fila_tarjeta_pago'
import { tarjetaVencida } from './logica_tarjeta_pago'
import { usarTextosPago } from './usar_textos_pago'
import type { CambiosTarjetaPago, ControlTarjetasPago, VarianteAvisoPago } from '@/tipos/compartido/contrato_flujo_pago'

const clases = catalogoCompartido.flujo_pago.clases

export function ModalTarjetasPago({ control, alNotificar, seleccionadaId, aviso, alUsar, alCerrar }: { control: ControlTarjetasPago; alNotificar: (variante: VarianteAvisoPago, mensaje: string) => void; seleccionadaId: string | null; aviso?: string; alUsar: (id: string) => void; alCerrar: () => void }) {
  const textos = usarTextosPago()
  const modal = textos.metodo_guardado.modal
  const [elegidaId, setElegidaId] = useState(seleccionadaId)
  const [edicionId, setEdicionId] = useState<string | null>(null)
  const elegida = control.tarjetas.find((tarjeta) => tarjeta.id === elegidaId)
  const enEdicion = control.tarjetas.find((tarjeta) => tarjeta.id === edicionId)
  const utilizable = elegida !== undefined && !tarjetaVencida(elegida.vencimiento)

  async function guardarCambios(cambios: CambiosTarjetaPago) {
    if (!enEdicion) return
    const actualizada = await control.actualizar(enEdicion.id, cambios)
    if (actualizada) {
      setEdicionId(null)
      alNotificar('exito', textos.avisos.tarjeta_actualizada)
    }
  }

  async function quitar() {
    if (!enEdicion) return
    const id = enEdicion.id
    if (await control.eliminar(id)) {
      setEdicionId(null)
      if (elegidaId === id) setElegidaId(null)
      alNotificar('exito', textos.avisos.tarjeta_quitada)
    }
  }

  function cancelarEdicion() {
    control.limpiarError()
    setEdicionId(null)
  }

  return (
    <Modal titulo={modal.titulo} etiquetaCerrar={textosRedSocial.CERRAR} onCerrar={alCerrar} className={clases.modal}>
      <div className={clases.cuerpo_modal}>
        {control.error && <AlertaEstado className={clases.aviso_estado}>{control.error === 'lectura' ? textos.metodo_guardado.error_lectura : textos.metodo_guardado.error_escritura}</AlertaEstado>}
        {enEdicion ? (
          <EditorTarjetaPago key={enEdicion.id} tarjeta={enEdicion} ocupado={control.ocupado} alGuardar={guardarCambios} alCancelar={cancelarEdicion} alQuitar={quitar} />
        ) : (
          <>
            {control.tarjetas.length === 0 ? (
              <p className={clases.texto_suave}>{modal.vacio}</p>
            ) : (
              <div role="radiogroup" aria-label={modal.lista_etiqueta} className={clases.lista_modal}>
                {control.tarjetas.map((tarjeta) => (
                  <FilaTarjetaPago key={tarjeta.id} tarjeta={tarjeta} activa={tarjeta.id === elegidaId} alElegir={() => setElegidaId(tarjeta.id)} alEditar={() => setEdicionId(tarjeta.id)} />
                ))}
              </div>
            )}
            <AgregarTarjetaPago control={control} alGuardar={(tarjeta) => setElegidaId(tarjeta.id)} />
            {aviso && <p className={clases.texto_suave}>{aviso}</p>}
            <div className={clases.pie}>
              <Boton type="button" variant="secundario" size="md" onClick={alCerrar}>{modal.cancelar}</Boton>
              <Boton type="button" variant="primario" size="md" disabled={!utilizable} onClick={() => elegida && alUsar(elegida.id)}>{modal.usar_tarjeta}</Boton>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
