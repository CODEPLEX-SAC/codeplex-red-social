import { imagenEmpresaPredeterminada } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { AccionesFilaTabla } from '../../compartido/interfaz/acciones_fila_tabla'
import { Insignia } from '../../compartido/interfaz/insignia'
import { TextoTruncable } from '../../compartido/interfaz/texto_truncable'
import { CeldaModuloEmpresa } from './celda_modulo_empresa'
import { CLASE_FILA_EMPRESA, MODULOS_EMPRESA, estaInactiva } from './logica_listado_empresas'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { FilaEmpresaProps } from '@/tipos/empresas/contrato_listado_empresas'
import { CLASES_TABLA } from '../../compartido/clases_tabla'

const PLANTILLA_EDITAR = catalogoEmpresas.botones.editar
const PLANTILLA_VER = catalogoEmpresas.botones.ver_detalle
const PLANTILLA_DESACTIVAR = catalogoEmpresas.botones.desactivar
const PLANTILLA_ACTIVAR = catalogoEmpresas.botones.activar
const ACCIONES = catalogoEmpresas.acciones_fila
const TEXTOS_ACCIONES = catalogoCompartido.acciones_tabla
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
        <AccionesFilaTabla
          nombre={empresa.nombre}
          claseContenedor={clases.acciones_fila}
          claseBoton={clases.objetivo_tactil}
          acciones={[
            { icono: 'ver', etiqueta: PLANTILLA_VER.replace(':nombre', empresa.nombre), etiquetaMenu: TEXTOS_ACCIONES.ver_detalle, alHacerClick: abrirDetalle },
            { icono: 'editar-oficial', etiqueta: PLANTILLA_EDITAR.replace(':nombre', empresa.nombre), etiquetaMenu: TEXTOS_ACCIONES.editar, clase: clases.editar, alHacerClick: abrirEdicion },
            { icono: 'encendido', etiqueta: (inactiva ? PLANTILLA_ACTIVAR : PLANTILLA_DESACTIVAR).replace(':nombre', empresa.nombre), etiquetaMenu: inactiva ? TEXTOS_ACCIONES.activar : TEXTOS_ACCIONES.desactivar, clase: inactiva ? clases.boton_icono_exito : clases.boton_icono_peligro, peligro: !inactiva, alHacerClick: pedirCambioEstado },
          ]}
        />
      </td>
    </tr>
  )
}
