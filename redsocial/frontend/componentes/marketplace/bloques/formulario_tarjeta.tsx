import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { CampoEtiquetado } from '../../compartido/interfaz/campo_etiquetado'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import type { FormularioTarjeta as EstadoFormularioTarjeta } from '@/tipos/marketplace/modelo_pago'

const textos = catalogoMarketplace.pago

export function FormularioTarjeta({ formulario }: { formulario: EstadoFormularioTarjeta }) {
  const campos = textos.campos
  const { tarjeta, errores } = formulario
  return (
    <>
      <CampoEtiquetado etiqueta={campos.numero}>
        <CampoTexto anchoCompleto inputProps={{ 'aria-label': campos.numero }} marcador={campos.numero_ph} valor={tarjeta.numero} alCambiar={formulario.cambiarNumero} error={errores.numero !== undefined} mensajeError={errores.numero} />
      </CampoEtiquetado>
      <div className={textos.clases.dos_columnas}>
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
