import { useState } from 'react'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { AcordeonSignificadoPermisos } from './acordeon_significado_permisos'
import { BotonRestablecerPermisos } from './boton_restablecer_permisos'
import { PanelEdicionPermisos } from './panel_edicion_permisos'
import { PilaDialogosRoles } from './pila_dialogos_roles'
import { SelectorRolModulo } from './selector_rol_modulo'
import type { EstadoPermisosInvitacion } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'
import type { Dialogo } from '@/tipos/colaboradores/contrato_panel_permisos_modulo'

const ids = catalogoColaboradores.ids_permisos
const seleccion = catalogoColaboradores.seleccion_jerarquica

export function PanelPermisosModulo({ modulo, PERMISOS }: { modulo: string; PERMISOS: EstadoPermisosInvitacion }) {
  const [pila, setPila] = useState<Dialogo[]>([])
  const recursos = PERMISOS.recursos[modulo] ?? []
  const abrir = (dialogo: Dialogo) => setPila((actuales) => [...actuales, dialogo])

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
      <PilaDialogosRoles modulo={modulo} PERMISOS={PERMISOS} pila={pila} setPila={setPila} />
    </>
  )
}
