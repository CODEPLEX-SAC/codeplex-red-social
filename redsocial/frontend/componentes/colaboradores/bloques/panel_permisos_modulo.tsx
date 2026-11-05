import { useState } from 'react'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { AcordeonSignificadoPermisos } from './acordeon_significado_permisos'
import { BotonRestablecerPermisos } from './boton_restablecer_permisos'
import { configuracionVacia, copiarConfiguracion } from './logica_permisos_invitacion'
import { ModalAdministrarRoles } from './modal_administrar_roles'
import { ModalConfirmacionRol } from './modal_confirmacion_rol'
import { ModalRol } from './modal_rol'
import { PanelEdicionPermisos } from './panel_edicion_permisos'
import { SelectorRolModulo } from './selector_rol_modulo'
import type { ModoModalRol } from './modal_rol'
import type { EstadoPermisosInvitacion, RolModulo } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

const ids = catalogoColaboradores.ids_permisos
const seleccion = catalogoColaboradores.seleccion_jerarquica
const textos = catalogoColaboradores.dialogos_rol

type Dialogo =
  | { tipo: 'administrar' }
  | { tipo: 'formulario'; modo: ModoModalRol; rol: RolModulo | null }
  | { tipo: 'editar'; rol: RolModulo }
  | { tipo: 'eliminar'; rol: RolModulo }

export function PanelPermisosModulo({ modulo, PERMISOS }: { modulo: string; PERMISOS: EstadoPermisosInvitacion }) {
  const [pila, setPila] = useState<Dialogo[]>([])
  const recursos = PERMISOS.recursos[modulo] ?? []
  const cerrarUltimo = () => setPila((actuales) => actuales.slice(0, -1))
  const abrir = (dialogo: Dialogo) => setPila((actuales) => [...actuales, dialogo])
  const roles = PERMISOS.roles[modulo] ?? []

  function formulario(modo: ModoModalRol, rol: RolModulo | null) {
    const nombreInicial = modo === 'duplicar' && rol ? textos.copia_de.replace(':rol', rol.etiqueta) : (modo === 'editar' && rol ? rol.etiqueta : '')
    return (
      <ModalRol
        key={`${modo}-${rol?.clave ?? 'nuevo'}`}
        modo={modo}
        modulo={modulo}
        recursos={recursos}
        nombreInicial={nombreInicial}
        configuracionInicial={rol ? copiarConfiguracion(rol.configuracion) : configuracionVacia(recursos)}
        alGuardar={(nombre, configuracion) => (modo === 'crear' ? PERMISOS.crearBorrador(modulo, nombre) : PERMISOS.guardarRol(modulo, modo, rol?.clave ?? null, nombre, configuracion))}
        alCerrar={cerrarUltimo}
      />
    )
  }

  return (
    <>
      <SelectorRolModulo modulo={modulo} PERMISOS={PERMISOS} alCrearRol={() => abrir({ tipo: 'formulario', modo: 'crear', rol: null })} alAdministrar={() => abrir({ tipo: 'administrar' })} />
      <PanelEdicionPermisos
        prefijoId={ids.asignacion}
        claveLista={modulo}
        titulo={seleccion.permisos_de.replace(':modulo', modulo)}
        subtitulo={seleccion.permisos_subtitulo}
        acciones={<BotonRestablecerPermisos modulo={modulo} PERMISOS={PERMISOS} />}
        recursos={recursos}
        configuracion={PERMISOS.porModulo[modulo]}
        expandidos={PERMISOS.expandidos[modulo] ?? []}
        alCambiarExpandidos={(nombres) => PERMISOS.cambiarExpandidos(modulo, nombres)}
        alSeleccionarModulo={(activo) => PERMISOS.seleccionarModulo(modulo, activo)}
        alSeleccionarRecurso={(recurso, activo) => PERMISOS.seleccionarRecurso(modulo, recurso, activo)}
        alAlternar={(recurso, clave, activo) => PERMISOS.alternarPermiso(modulo, recurso, clave, activo)}
        alAlternarEspecifico={(recurso, id, activo) => PERMISOS.alternarEspecifico(modulo, recurso, id, activo)}
        alAgregar={(recurso, etiqueta) => PERMISOS.agregarEspecifico(modulo, recurso, etiqueta)}
      />
      <AcordeonSignificadoPermisos />
      {pila.map((dialogo, indice) => {
        if (dialogo.tipo === 'administrar') {
          return (
            <ModalAdministrarRoles
              key={`administrar-${indice}`}
              modulo={modulo}
              roles={roles.filter((rol) => !rol.borrador)}
              alEditar={(rol) => abrir({ tipo: 'editar', rol })}
              alDuplicar={(rol) => abrir({ tipo: 'formulario', modo: 'duplicar', rol })}
              alEliminar={(rol) => abrir({ tipo: 'eliminar', rol })}
              alCerrar={cerrarUltimo}
            />
          )
        }
        if (dialogo.tipo === 'editar') {
          return (
            <ModalConfirmacionRol
              key={`confirmar-edicion-${dialogo.rol.clave}`}
              titulo={textos.editar_confirmar_titulo}
              mensaje={textos.editar_confirmar_pregunta.replace(':rol', dialogo.rol.etiqueta)}
              detalle={textos.editar_confirmar_detalle}
              etiquetaCancelar={textos.cancelar}
              etiquetaConfirmar={textos.editar_confirmar}
              alCancelar={cerrarUltimo}
              alConfirmar={() => setPila((actuales) => [...actuales.slice(0, -1), { tipo: 'formulario', modo: 'editar', rol: dialogo.rol }])}
            />
          )
        }
        if (dialogo.tipo === 'eliminar') {
          return (
            <ModalConfirmacionRol
              key={`eliminar-${dialogo.rol.clave}`}
              titulo={textos.eliminar_titulo}
              mensaje={textos.eliminar_pregunta.replace(':rol', dialogo.rol.etiqueta)}
              detalle={textos.eliminar_detalle}
              etiquetaCancelar={textos.cancelar}
              etiquetaConfirmar={textos.eliminar_confirmar}
              peligro
              alCancelar={cerrarUltimo}
              alConfirmar={() => {
                PERMISOS.eliminarRol(modulo, dialogo.rol.clave)
                cerrarUltimo()
              }}
            />
          )
        }
        return formulario(dialogo.modo, dialogo.rol)
      })}
    </>
  )
}
