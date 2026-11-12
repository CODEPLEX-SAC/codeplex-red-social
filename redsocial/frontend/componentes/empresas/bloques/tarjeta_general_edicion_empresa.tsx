import { Icono } from '../../compartido/icono'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Selector } from '../../compartido/interfaz/selector'
import { CampoEtiquetado } from '../../compartido/interfaz/campo_etiquetado'
import { SIN_TIPO_PLAN_CUENTA } from './logica_edicion_empresa'
import { SelectorLogoEdicionEmpresa } from './selector_logo_edicion_empresa'
import { TituloSeccionEmpresa } from './titulo_seccion_empresa'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { EdicionEmpresaProps } from '@/tipos/empresas/contrato_edicion_empresa'

const detalle = catalogoEmpresas.detalle_empresa
const campos = detalle.campos
const textos = catalogoEmpresas.edicion_empresa
const clases = textos.clases
const RUBROS = catalogoEmpresas.selectores.rubro.opciones.slice(1)
const ESTADOS = Object.entries(catalogoEmpresas.estados)
const TIPOS_PLAN_CUENTA = catalogoEmpresas.modal_empresa.opciones.tipos_plan_cuenta

export function TarjetaGeneralEdicionEmpresa({ edicion, fechaRegistro }: EdicionEmpresaProps) {
  const { datos } = edicion
  return (
    <section aria-label={detalle.secciones.general} className={`${clases.seccion} ${clases.divisor}`}>
      <TituloSeccionEmpresa icono="empresa" titulo={detalle.secciones.general} />
      <div className={clases.cuadricula}>
        <CampoEtiquetado variante="compacta" tono="suave" envolver etiqueta={campos.razon_social} requerido>
          <CampoTexto anchoCompleto inputProps={{ 'aria-label': campos.razon_social }} valor={datos.razon_social} alCambiar={edicion.manejarTexto('razon_social')} />
        </CampoEtiquetado>
        <CampoEtiquetado variante="compacta" tono="suave" envolver etiqueta={campos.nombre_comercial}>
          <CampoTexto anchoCompleto inputProps={{ 'aria-label': campos.nombre_comercial }} valor={datos.nombre_comercial} alCambiar={edicion.manejarTexto('nombre_comercial')} />
        </CampoEtiquetado>
        <CampoEtiquetado variante="compacta" tono="suave" envolver etiqueta={campos.estado} requerido>
          <Selector variant="colaboradores" aria-label={campos.estado} value={datos.estado} onChange={edicion.manejarSelector('estado')}>
            {ESTADOS.map(([clave, etiqueta]) => <option key={clave} value={clave}>{etiqueta}</option>)}
          </Selector>
        </CampoEtiquetado>
        <CampoEtiquetado variante="compacta" tono="suave" envolver etiqueta={campos.ruc} requerido>
          <CampoTexto anchoCompleto soloNumeros longitudMaxima={11} inputProps={{ 'aria-label': campos.ruc }} valor={datos.ruc} alCambiar={edicion.manejarTexto('ruc')} />
        </CampoEtiquetado>
        <CampoEtiquetado variante="compacta" tono="suave" envolver etiqueta={campos.fecha_registro}>
          <CampoTexto anchoCompleto deshabilitado inputProps={{ 'aria-label': textos.etiquetas.fecha_registro }} valor={fechaRegistro} iconoFin={<Icono name="calendario" className="h-4.5 w-4.5" />} />
        </CampoEtiquetado>
        <CampoEtiquetado variante="compacta" tono="suave" envolver etiqueta={campos.rubro} requerido>
          <Selector variant="colaboradores" aria-label={campos.rubro} value={datos.rubro} onChange={edicion.manejarSelector('rubro')}>
            {RUBROS.map((rubro) => <option key={rubro}>{rubro}</option>)}
          </Selector>
        </CampoEtiquetado>
        <CampoEtiquetado variante="compacta" tono="suave" envolver etiqueta={campos.tipo_plan_cuenta}>
          <Selector variant="colaboradores" aria-label={campos.tipo_plan_cuenta} value={datos.tipo_plan_cuenta} onChange={edicion.manejarSelector('tipo_plan_cuenta')}>
            <option value={SIN_TIPO_PLAN_CUENTA}>{textos.sin_definir}</option>
            {TIPOS_PLAN_CUENTA.map((tipo) => <option key={tipo}>{tipo}</option>)}
          </Selector>
        </CampoEtiquetado>
        <SelectorLogoEdicionEmpresa edicion={edicion} />
      </div>
    </section>
  )
}
