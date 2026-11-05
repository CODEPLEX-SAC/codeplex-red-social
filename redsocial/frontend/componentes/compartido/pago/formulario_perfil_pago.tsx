import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import { Boton } from '../interfaz/boton'
import { Casilla } from '../interfaz/casilla'
import { CampoEtiquetado } from '../interfaz/campo_etiquetado'
import { CampoTexto } from '../interfaz/campo_texto'
import { IndicadorCarga } from '../interfaz/indicador_carga'
import { Selector } from '../interfaz/selector'
import { CLASES_FLUJO_PAGO as clases } from './clases_flujo_pago'
import { prefijoDePais } from './logica_perfil_pago'
import { soloDigitos } from './logica_tarjeta_pago'
import { TituloPanelPago } from './titulo_panel_pago'
import { usarTextosPago } from './usar_textos_pago'
import type { usarFacturacionPago } from './usar_facturacion_pago'
import type { PaisPago } from '@/tipos/compartido/contrato_flujo_pago'

const reglas = catalogoCompartido.flujo_pago.reglas

export function FormularioPerfilPago({ facturacion, paises, ocupado, cancelable }: { facturacion: ReturnType<typeof usarFacturacionPago>; paises: PaisPago[]; ocupado: boolean; cancelable: boolean }) {
  const textos = usarTextosPago()
  const { campos, canales, perfiles } = textos
  const datos = facturacion.borrador
  const errores = facturacion.errores
  const cambiar = facturacion.cambiar
  const editando = facturacion.modo === 'edicion'
  const etiquetaCelular = campos.celular.replace(':prefijo', prefijoDePais(paises, datos.pais))

  return (
    <div className={clases.perfil_formulario}>
      {editando && <TituloPanelPago titulo={perfiles.editando_titulo} />}
      {!editando && facturacion.hayPerfiles && <TituloPanelPago titulo={perfiles.nuevo_titulo} />}
      <div className={clases.grupo_campos}>
        <CampoEtiquetado etiqueta={campos.documento}>
          <CampoTexto anchoCompleto inputProps={{ 'aria-label': campos.documento }} marcador={campos.documento_ph} error={errores.documento !== undefined} mensajeError={errores.documento} valor={datos.documento} alCambiar={(valor) => cambiar('documento', soloDigitos(valor).slice(0, reglas.perfil.documento_maximo))} />
        </CampoEtiquetado>
        <CampoEtiquetado etiqueta={campos.razon}>
          <CampoTexto anchoCompleto inputProps={{ 'aria-label': campos.razon }} marcador={campos.razon_ph} error={errores.razon !== undefined} mensajeError={errores.razon} valor={datos.razon} alCambiar={(valor) => cambiar('razon', valor)} />
        </CampoEtiquetado>
        <CampoEtiquetado etiqueta={campos.pais}>
          <Selector variant="colaboradores" aria-label={campos.pais} value={datos.pais} onChange={(evento) => cambiar('pais', String(evento.target.value))}>
            {paises.map((pais) => <option key={pais.id} value={pais.id}>{pais.nombre}</option>)}
          </Selector>
        </CampoEtiquetado>
        <CampoEtiquetado etiqueta={campos.direccion}>
          <CampoTexto anchoCompleto inputProps={{ 'aria-label': campos.direccion }} marcador={campos.direccion_ph} valor={datos.direccion} alCambiar={(valor) => cambiar('direccion', valor)} />
        </CampoEtiquetado>
        <div className={clases.dos_columnas}>
          <CampoEtiquetado etiqueta={campos.correo}>
            <CampoTexto anchoCompleto inputProps={{ 'aria-label': campos.correo }} marcador={campos.correo_ph} tipo="email" error={errores.correo !== undefined} mensajeError={errores.correo} valor={datos.correo} alCambiar={(valor) => cambiar('correo', valor)} />
          </CampoEtiquetado>
          <CampoEtiquetado etiqueta={etiquetaCelular}>
            <CampoTexto anchoCompleto inputProps={{ 'aria-label': etiquetaCelular }} marcador={campos.celular_ph} valor={datos.celular} alCambiar={(valor) => cambiar('celular', soloDigitos(valor).slice(0, reglas.perfil.celular_maximo))} />
          </CampoEtiquetado>
        </div>
      </div>
      <div>
        <h4 className={clases.canales_titulo}>{canales.titulo}</h4>
        <div className={clases.canales_lista}>
          <Casilla etiqueta={canales.whatsapp.etiqueta} seleccionado={datos.whatsapp} alCambiar={(_, marcado) => cambiar('whatsapp', marcado)} />
          <Casilla etiqueta={canales.sms.etiqueta} seleccionado={datos.sms} alCambiar={(_, marcado) => cambiar('sms', marcado)} />
        </div>
      </div>
      <div className={clases.perfil_pie}>
        {cancelable && <Boton type="button" variant="secundario" size="md" disabled={ocupado} onClick={facturacion.cancelar}>{perfiles.cancelar}</Boton>}
        <Boton type="button" variant={editando || facturacion.hayPerfiles ? 'primario' : 'contorno'} size="md" disabled={ocupado} aria-busy={ocupado} onClick={facturacion.guardar}>
          {ocupado ? <IndicadorCarga tamano="xs" color="blanco" etiqueta={textos.metodo_guardado.modal.guardando} /> : editando ? perfiles.guardar_cambios : perfiles.guardar}
        </Boton>
      </div>
    </div>
  )
}
