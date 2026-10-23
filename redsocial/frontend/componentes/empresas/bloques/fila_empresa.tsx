import { imagenEmpresaPredeterminada } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Insignia } from '../../compartido/interfaz/insignia'
import { TextoTruncable } from '../../compartido/interfaz/texto_truncable'
import { CeldaModuloEmpresa } from './celda_modulo_empresa'
import { CLASE_FILA_EMPRESA, MODULOS_EMPRESA, estaInactiva } from './logica_listado_empresas'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { FilaEmpresaProps } from '@/tipos/empresas/contrato_listado_empresas'
import { CLASES_TABLA } from '../../compartido/clases_tabla'

const PLANTILLA_EDITAR = catalogoEmpresas.botones.editar
const PLANTILLA_VER = catalogoEmpresas.botones.ver_detalle
const PLANTILLA_DESACTIVAR = catalogoEmpresas.botones.desactivar
const PLANTILLA_ACTIVAR = catalogoEmpresas.botones.activar
const ACCIONES = catalogoEmpresas.acciones_fila
const PLANTILLA_CODIGO = catalogoEmpresas.codigo_empresa
const CLASES_RUBRO: Record<string, string> = catalogoEmpresas.clases.rubro
const CLASE_RUBRO_OTRO = CLASES_RUBRO.otro

const clases = catalogoEmpresas.clases
const identidad = CLASES_TABLA.identidad

export function FilaEmpresa({ empresa, alElegirAccion, alAlternarModulo }: FilaEmpresaProps) {
  const inactiva = estaInactiva(empresa)

  function abrirDetalle() {
    alElegirAccion(ACCIONES.ver_detalle, empresa)
  }

  function abrirEdicion() {
    alElegirAccion(ACCIONES.editar, empresa)
  }

  function pedirCambioEstado() {
    alElegirAccion(inactiva ? ACCIONES.activar : ACCIONES.desactivar, empresa)
  }

  return (
    <tr className={CLASE_FILA_EMPRESA}>
      <td className={`${CLASES_TABLA.celda} ${CLASES_TABLA.columnaAjustada}`}>
        <div className={identidad.contenedor}>
          <span className={clases.celda_empresa.logo}>
            <AvatarImagen src={empresa.logo ?? imagenEmpresaPredeterminada} className="h-full w-full" />
          </span>
          <div className={identidad.texto}>
            <TextoTruncable texto={empresa.nombre} className={identidad.principal} />
            <span className={`block ${identidad.secundario}`}>{PLANTILLA_CODIGO.replace(':codigo', empresa.codigo)}</span>
          </div>
        </div>
      </td>
      <td className={`${CLASES_TABLA.celda} whitespace-nowrap ${clases.texto_celda}`}>{empresa.ruc}</td>
      <td className={CLASES_TABLA.celda}>
        <Insignia variant="status" className={CLASES_RUBRO[empresa.rubro] ?? CLASE_RUBRO_OTRO}>{empresa.rubro}</Insignia>
      </td>
      {MODULOS_EMPRESA.map((modulo) => (
        <CeldaModuloEmpresa key={modulo.clave} empresa={empresa} modulo={modulo} alAlternar={() => alAlternarModulo(empresa, modulo.clave)} />
      ))}
      <td className={`${CLASES_TABLA.celda} ${CLASES_TABLA.celdaFija}`}>
        <div className={clases.acciones_fila}>
          <BotonIcono icono="ver" type="button" variant="contorno" aria-label={PLANTILLA_VER.replace(':nombre', empresa.nombre)} onClick={abrirDetalle} />
          <BotonIcono icono="editar-oficial" type="button" variant="suave" aria-label={PLANTILLA_EDITAR.replace(':nombre', empresa.nombre)} className={catalogoEmpresas.clases.editar} onClick={abrirEdicion} />
          <BotonIcono icono="encendido" type="button" variant="contorno" aria-label={(inactiva ? PLANTILLA_ACTIVAR : PLANTILLA_DESACTIVAR).replace(':nombre', empresa.nombre)} className={inactiva ? clases.boton_icono_exito : clases.boton_icono_peligro} onClick={pedirCambioEstado} />
        </div>
      </td>
    </tr>
  )
}
