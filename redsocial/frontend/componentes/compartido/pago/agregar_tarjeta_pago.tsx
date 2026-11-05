import { useState } from 'react'
import { Boton } from '../interfaz/boton'
import { Casilla } from '../interfaz/casilla'
import { IndicadorCarga } from '../interfaz/indicador_carga'
import { CLASES_FLUJO_PAGO as clases } from './clases_flujo_pago'
import { FormularioTarjetaPagoCampos } from './formulario_tarjeta_pago'
import { TituloPanelPago } from './titulo_panel_pago'
import { usarFormularioTarjetaPago } from './usar_formulario_tarjeta_pago'
import { usarTextosPago } from './usar_textos_pago'
import { datosParaGuardar } from './validacion_tarjeta_pago'
import type { ControlTarjetasPago, TarjetaPago } from '@/tipos/compartido/contrato_flujo_pago'

export function AgregarTarjetaPago({ control, alGuardar }: { control: ControlTarjetasPago; alGuardar: (tarjeta: TarjetaPago) => void }) {
  const modal = usarTextosPago().metodo_guardado.modal
  const [abierto, setAbierto] = useState(false)
  const [predeterminada, setPredeterminada] = useState(false)
  const formulario = usarFormularioTarjetaPago()

  function cerrar() {
    formulario.limpiar()
    setPredeterminada(false)
    control.limpiarError()
    setAbierto(false)
  }

  async function guardar() {
    if (!formulario.validar()) return
    const guardada = await control.registrar(datosParaGuardar(formulario.tarjeta), predeterminada)
    if (!guardada) return
    alGuardar(guardada)
    cerrar()
  }

  if (!abierto) return <Boton type="button" variant="contorno" size="md" disabled={control.ocupado} onClick={() => setAbierto(true)}>{modal.agregar}</Boton>

  return (
    <div className={clases.formulario}>
      <TituloPanelPago titulo={modal.nueva_titulo} />
      <FormularioTarjetaPagoCampos formulario={formulario} />
      <Casilla seleccionado={predeterminada} alCambiar={(_, marcado) => setPredeterminada(marcado)} etiqueta={modal.predeterminada_nueva} />
      <div className={clases.pie}>
        <Boton type="button" variant="secundario" size="md" disabled={control.ocupado} onClick={cerrar}>{modal.descartar}</Boton>
        <Boton type="button" variant="primario" size="md" disabled={control.ocupado} aria-busy={control.ocupado} onClick={guardar}>
          {control.ocupado ? <IndicadorCarga tamano="xs" color="blanco" etiqueta={modal.guardando} /> : modal.guardar}
        </Boton>
      </div>
    </div>
  )
}
