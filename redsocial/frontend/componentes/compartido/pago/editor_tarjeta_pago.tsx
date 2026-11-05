import { useState } from 'react'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import { Boton } from '../interfaz/boton'
import { Casilla } from '../interfaz/casilla'
import { CampoEtiquetado } from '../interfaz/campo_etiquetado'
import { CampoTexto } from '../interfaz/campo_texto'
import { IndicadorCarga } from '../interfaz/indicador_carga'
import { CLASES_FLUJO_PAGO as clases } from './clases_flujo_pago'
import { formatearVencimiento, tituloTarjeta } from './logica_tarjeta_pago'
import { TituloPanelPago } from './titulo_panel_pago'
import { usarTextosPago } from './usar_textos_pago'
import { sinErrores, validarCambiosTarjeta } from './validacion_tarjeta_pago'
import type { CambiosTarjetaPago, ErroresTarjetaPago, TarjetaPago } from '@/tipos/compartido/contrato_flujo_pago'

const VACIO = catalogoCompartido.controles.texto_vacio

export function EditorTarjetaPago({ tarjeta, ocupado, alGuardar, alCancelar, alQuitar }: { tarjeta: TarjetaPago; ocupado: boolean; alGuardar: (cambios: CambiosTarjetaPago) => void; alCancelar: () => void; alQuitar: () => void }) {
  const textos = usarTextosPago()
  const [vencimiento, setVencimiento] = useState(tarjeta.vencimiento)
  const [titular, setTitular] = useState(tarjeta.titular ?? VACIO)
  const [predeterminada, setPredeterminada] = useState(tarjeta.predeterminada === true)
  const [errores, setErrores] = useState<ErroresTarjetaPago>({})
  const [confirmando, setConfirmando] = useState(false)

  function guardar() {
    const cambios = { vencimiento, titular: titular.trim(), predeterminada }
    const resultado = validarCambiosTarjeta(cambios, textos)
    setErrores(resultado)
    if (sinErrores(resultado)) alGuardar(cambios)
  }

  return (
    <div className={clases.formulario_edicion}>
      <TituloPanelPago titulo={textos.tarjetas.editar_titulo} detalle={tituloTarjeta(tarjeta, textos)} />
      <p className={clases.texto_suave}>{textos.tarjetas.nota_seguridad}</p>
      <CampoEtiquetado etiqueta={textos.campos.vencimiento}>
        <CampoTexto
          anchoCompleto
          inputProps={{ 'aria-label': textos.campos.vencimiento }}
          marcador={textos.campos.vencimiento_ph}
          valor={vencimiento}
          alCambiar={(valor) => setVencimiento(formatearVencimiento(valor))}
          error={errores.vencimiento !== undefined}
          mensajeError={errores.vencimiento}
        />
      </CampoEtiquetado>
      <CampoEtiquetado etiqueta={textos.campos.propietario}>
        <CampoTexto
          anchoCompleto
          inputProps={{ 'aria-label': textos.campos.propietario }}
          marcador={textos.campos.propietario_ph}
          valor={titular}
          alCambiar={setTitular}
          error={errores.propietario !== undefined}
          mensajeError={errores.propietario}
        />
      </CampoEtiquetado>
      <Casilla seleccionado={predeterminada} deshabilitado={tarjeta.predeterminada === true} alCambiar={(_, marcado) => setPredeterminada(marcado)} etiqueta={textos.tarjetas.predeterminada_edicion} />
      {confirmando ? (
        <div className={clases.confirmacion_quitar} role="alertdialog" aria-label={textos.tarjetas.quitar}>
          <p className={clases.texto_suave}>{textos.tarjetas.quitar_pregunta.replace(':tarjeta', tituloTarjeta(tarjeta, textos))}</p>
          <div className={clases.pie}>
            <Boton type="button" variant="secundario" size="md" disabled={ocupado} onClick={() => setConfirmando(false)}>{textos.tarjetas.quitar_conservar}</Boton>
            <Boton type="button" variant="peligro" size="md" disabled={ocupado} aria-busy={ocupado} onClick={alQuitar}>{textos.tarjetas.quitar_confirmar}</Boton>
          </div>
        </div>
      ) : (
        <div className={clases.pie_editor}>
          <Boton type="button" variant="peligro_contorno" size="md" disabled={ocupado} onClick={() => setConfirmando(true)}>{textos.tarjetas.quitar}</Boton>
          <div className={clases.pie}>
            <Boton type="button" variant="secundario" size="md" disabled={ocupado} onClick={alCancelar}>{textos.tarjetas.cancelar_edicion}</Boton>
            <Boton type="button" variant="primario" size="md" disabled={ocupado} aria-busy={ocupado} onClick={guardar}>
              {ocupado ? <IndicadorCarga tamano="xs" color="blanco" etiqueta={textos.metodo_guardado.modal.guardando} /> : textos.tarjetas.guardar_cambios}
            </Boton>
          </div>
        </div>
      )}
    </div>
  )
}
