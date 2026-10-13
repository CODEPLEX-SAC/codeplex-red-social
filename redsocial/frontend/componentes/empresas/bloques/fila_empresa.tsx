import { useState } from 'react'
import type { MouseEvent } from 'react'
import { imagenEmpresaPredeterminada } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Casilla } from '../../compartido/interfaz/casilla'
import { Insignia } from '../../compartido/interfaz/insignia'
import { Menu } from '../../compartido/interfaz/menu'
import { EstadoEmpresa } from './estado_empresa'
import { opcionesDeFila } from './logica_listado_empresas'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { FilaEmpresaProps } from '@/tipos/empresas/contrato_listado_empresas'

const PLANTILLA_SELECCIONAR = catalogoEmpresas.campos.seleccionar_empresa
const PLANTILLA_EDITAR = catalogoEmpresas.botones.editar
const PLANTILLA_OPCIONES = catalogoEmpresas.botones.mas_opciones
const PLANTILLA_VER = catalogoEmpresas.botones.ver_detalle
const PLANTILLA_DESACTIVAR = catalogoEmpresas.botones.desactivar
const ETIQUETAS_PLAN: Record<string, string> = catalogoEmpresas.planes
const ACCIONES = catalogoEmpresas.acciones_fila
const ACCION_DESACTIVAR = catalogoEmpresas.modal_desactivar.accion_menu
const CLASES_PLAN: Record<string, string> = catalogoEmpresas.clases.plan

const clases = catalogoEmpresas.clases

export function FilaEmpresa({ empresa, seleccionada, alAlternar, alElegirAccion }: FilaEmpresaProps) {
  const [ancla, setAncla] = useState<HTMLElement | null>(null)
  const puedeDesactivar = opcionesDeFila(empresa).some((opcion) => opcion.clave === ACCION_DESACTIVAR)

  function alternar(_: unknown, marcado: boolean) {
    alAlternar(empresa.codigo, marcado)
  }

  function abrirMenu(evento: MouseEvent<HTMLButtonElement>) {
    setAncla(evento.currentTarget)
  }

  function cerrarMenu() {
    setAncla(null)
  }

  function abrirDetalle() {
    alElegirAccion(ACCIONES.ver_detalle, empresa)
  }

  function abrirEdicion() {
    alElegirAccion(ACCIONES.editar, empresa)
  }

  function pedirDesactivacion() {
    alElegirAccion(ACCIONES.desactivar, empresa)
  }

  function manejarOpcion(clave: string) {
    return () => alElegirAccion(clave, empresa)
  }

  return (
    <tr className={catalogoEmpresas.clases.fila}>
      <td className={`${clases.celda} w-10 text-center`}>
        <Casilla seleccionado={seleccionada} alCambiar={alternar} inputProps={{ 'aria-label': PLANTILLA_SELECCIONAR.replace(':nombre', empresa.nombre) }} />
      </td>
      <td className={clases.celda}>
        <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-lg bg-primario-suave text-nombre-entidad text-primario">
          <AvatarImagen src={empresa.logo ?? imagenEmpresaPredeterminada} className="h-full w-full" />
        </span>
      </td>
      <td className={clases.celda}>
        <strong className={`block ${clases.nombre_fila}`}>{empresa.nombre}</strong>
        <span className={`block ${clases.texto_auxiliar}`}>{empresa.codigo}</span>
      </td>
      <td className={`${clases.celda} whitespace-nowrap ${clases.texto_celda}`}>{empresa.ruc}</td>
      <td className={`${clases.celda} whitespace-nowrap ${clases.texto_celda}`}>{empresa.rubro}</td>
      <td className={clases.celda}>
        <Insignia variant="status" className={CLASES_PLAN[empresa.plan]}>{ETIQUETAS_PLAN[empresa.plan]}</Insignia>
      </td>
      <td className={`${clases.celda} text-center ${clases.texto_celda}`}>{empresa.usuarios}</td>
      <td className={`${clases.celda} whitespace-nowrap`}>
        <EstadoEmpresa estado={empresa.estado} />
      </td>
      <td className={`${clases.celda} whitespace-nowrap ${clases.texto_celda}`}>{empresa.fechaRegistro}</td>
      <td className={clases.celda}>
        <div className="flex items-center gap-2 max-600:hidden">
          <BotonIcono icono="ver" type="button" variant="contorno" aria-label={PLANTILLA_VER.replace(':nombre', empresa.nombre)} onClick={abrirDetalle} />
          <BotonIcono icono="editar-oficial" type="button" variant="suave" aria-label={PLANTILLA_EDITAR.replace(':nombre', empresa.nombre)} className={catalogoEmpresas.clases.editar} onClick={abrirEdicion} />
          <BotonIcono icono="eliminar" type="button" variant="contorno" aria-label={PLANTILLA_DESACTIVAR.replace(':nombre', empresa.nombre)} disabled={!puedeDesactivar} className={catalogoEmpresas.clases.boton_icono_peligro} onClick={pedirDesactivacion} />
        </div>
        <div className="hidden max-600:block">
          <BotonIcono
            icono="puntos"
            type="button"
            variant="contorno"
            aria-label={PLANTILLA_OPCIONES.replace(':nombre', empresa.nombre)}
            aria-haspopup="menu"
            aria-expanded={Boolean(ancla)}
            onClick={abrirMenu}
          />
          {ancla ? <Menu ancla={ancla} alCerrar={cerrarMenu} elementos={opcionesDeFila(empresa).map((opcion) => ({ etiqueta: opcion.etiqueta, peligro: opcion.peligro, alHacerClick: manejarOpcion(opcion.clave) }))} /> : null}
        </div>
      </td>
    </tr>
  )
}
