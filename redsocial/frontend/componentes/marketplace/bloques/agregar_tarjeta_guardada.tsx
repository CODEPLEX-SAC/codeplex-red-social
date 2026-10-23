import { useState } from 'react'
import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Boton } from '../../compartido/interfaz/boton'
import { Casilla } from '../../compartido/interfaz/casilla'
import { IndicadorCarga } from '../../compartido/interfaz/indicador_carga'
import { FormularioTarjeta } from './formulario_tarjeta'
import { datosParaGuardar } from './validacion_tarjeta'
import { TituloPanelPago } from './titulo_panel_pago'
import { usarFormularioTarjeta } from './usar_formulario_tarjeta'
import type { MetodosPago } from '@/tipos/marketplace/modelo_pago'
import type { TarjetaGuardada } from '@/tipos/marketplace/modelo_carrito'

const textos = catalogoMarketplace.pago.metodo_guardado
const modal = textos.modal

export function AgregarTarjetaGuardada({ metodos, alGuardar }: { metodos: MetodosPago; alGuardar: (tarjeta: TarjetaGuardada) => void }) {
  const [abierto, setAbierto] = useState(false)
  const [predeterminada, setPredeterminada] = useState(false)
  const formulario = usarFormularioTarjeta()

  function cerrar() {
    formulario.limpiar()
    setPredeterminada(false)
    metodos.limpiarError()
    setAbierto(false)
  }

  async function guardar() {
    if (!formulario.validar()) return
    const guardada = await metodos.registrar(datosParaGuardar(formulario.tarjeta), predeterminada)
    if (!guardada) return
    alGuardar(guardada)
    cerrar()
  }

  if (!abierto) return <Boton type="button" variant="contorno" size="md" disabled={metodos.ocupado} onClick={() => setAbierto(true)}>{modal.agregar}</Boton>

  return (
    <div className={textos.clases.formulario}>
      <TituloPanelPago titulo={modal.nueva_titulo} />
      <FormularioTarjeta formulario={formulario} />
      <Casilla seleccionado={predeterminada} alCambiar={(_, marcado) => setPredeterminada(marcado)} etiqueta={modal.predeterminada_nueva} />
      <div className={textos.clases.pie}>
        <Boton type="button" variant="secundario" size="md" disabled={metodos.ocupado} onClick={cerrar}>{modal.descartar}</Boton>
        <Boton type="button" variant="primario" size="md" disabled={metodos.ocupado} aria-busy={metodos.ocupado} onClick={guardar}>
          {metodos.ocupado ? <IndicadorCarga tamano="xs" color="blanco" etiqueta={modal.guardando} /> : modal.guardar}
        </Boton>
      </div>
    </div>
  )
}
