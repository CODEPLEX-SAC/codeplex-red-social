import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { configuracionVacia, copiarConfiguracion } from './logica_permisos_invitacion'
import { ModalAdministrarRoles } from './modal_administrar_roles'
import { ModalConfirmacionRol } from './modal_confirmacion_rol'
import { ModalRol } from './modal_rol'
import type { ModoModalRol } from '@/tipos/colaboradores/contrato_modal_rol'
import type { Dialogo, PilaDialogosRolesProps } from '@/tipos/colaboradores/contrato_panel_permisos_modulo'
import type { RolModulo } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

const textos = catalogoColaboradores.dialogos_rol

function nombreInicialDelRol(modo: ModoModalRol, rol: RolModulo | null) {
  if (!rol) return ''
  if (modo === 'duplicar') return textos.copia_de.replace(':rol', rol.etiqueta)
  return modo === 'editar' ? rol.etiqueta : ''
}

export function PilaDialogosRoles({ modulo, PERMISOS, pila, setPila }: PilaDialogosRolesProps) {
  const recursos = PERMISOS.recursos[modulo] ?? []
  const cerrarUltimo = () => setPila((actuales) => actuales.slice(0, -1))
  const abrir = (dialogo: Dialogo) => setPila((actuales) => [...actuales, dialogo])
  const rolesAdministrables = (PERMISOS.roles[modulo] ?? []).filter((rol) => !rol.borrador)

  function formulario(modo: ModoModalRol, rol: RolModulo | null) {
    const nombreInicial = nombreInicialDelRol(modo, rol)
    return (
      <ModalRol
        key={`${modo}-${rol?.clave ?? 'nuevo'}`}
        modo={modo}
        modulo={modulo}
        recursos={recursos}
        nombreInicial={nombreInicial}
        configuracionInicial={rol ? copiarConfiguracion(rol.configuracion) : configuracionVacia(recursos)}
        alGuardar={(nombre, configuracion) => (modo === 'crear' ? PERMISOS.crearBorrador(modulo, nombre) : PERMISOS.guardarRol({ modulo, modo, clave: rol?.clave ?? null, nombre, configuracion }))}
        alCerrar={cerrarUltimo}
      />
    )
  }

  return (
    <>
      {pila.map((dialogo, indice) => {
        if (dialogo.tipo === 'administrar') {
          return (
            <ModalAdministrarRoles
              key={`administrar-${indice}`}
              modulo={modulo}
              roles={rolesAdministrables}
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
