import { CampoEtiquetado } from '../interfaz/campo_etiquetado'
import { CampoTexto } from '../interfaz/campo_texto'
import { CLASES_FLUJO_PAGO as clases } from './clases_flujo_pago'
import { usarTextosPago } from './usar_textos_pago'
import type { FormularioTarjetaPago } from '@/tipos/compartido/contrato_flujo_pago'

export function FormularioTarjetaPagoCampos({ formulario }: { formulario: FormularioTarjetaPago }) {
  const { campos } = usarTextosPago()
  const { tarjeta, errores } = formulario
  return (
    <>
      <CampoEtiquetado etiqueta={campos.numero}>
        <CampoTexto anchoCompleto inputProps={{ 'aria-label': campos.numero }} marcador={campos.numero_ph} valor={tarjeta.numero} alCambiar={formulario.cambiarNumero} error={errores.numero !== undefined} mensajeError={errores.numero} />
      </CampoEtiquetado>
      <div className={clases.dos_columnas}>
        <CampoEtiquetado etiqueta={campos.vencimiento}>
          <CampoTexto anchoCompleto inputProps={{ 'aria-label': campos.vencimiento }} marcador={campos.vencimiento_ph} valor={tarjeta.vencimiento} alCambiar={formulario.cambiarVencimiento} error={errores.vencimiento !== undefined} mensajeError={errores.vencimiento} />
        </CampoEtiquetado>
        <CampoEtiquetado etiqueta={campos.cvv}>
          <CampoTexto anchoCompleto inputProps={{ 'aria-label': campos.cvv }} marcador={campos.cvv_ph} valor={tarjeta.cvv} alCambiar={formulario.cambiarCvv} error={errores.cvv !== undefined} mensajeError={errores.cvv} />
        </CampoEtiquetado>
      </div>
      <CampoEtiquetado etiqueta={campos.propietario}>
        <CampoTexto anchoCompleto inputProps={{ 'aria-label': campos.propietario }} marcador={campos.propietario_ph} valor={tarjeta.propietario} alCambiar={formulario.cambiarPropietario} error={errores.propietario !== undefined} mensajeError={errores.propietario} />
      </CampoEtiquetado>
    </>
  )
}
