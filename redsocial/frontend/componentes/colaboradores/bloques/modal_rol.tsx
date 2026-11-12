import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { Boton } from '../../compartido/interfaz/boton'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Modal } from '../../compartido/interfaz/modal'
import { conEspecifico, conOperacion, conSeleccionModulo, conSeleccionRecurso } from './logica_permisos_invitacion'
import { ModalConfirmacionRol } from './modal_confirmacion_rol'
import { PanelEdicionPermisos } from './panel_edicion_permisos'
import { usarModalRol } from './usar_modal_rol'
import type { ModalRolProps } from '@/tipos/colaboradores/contrato_modal_rol'

const clases = catalogoColaboradores.clases.invitar_permisos
const textos = catalogoColaboradores.dialogos_rol

export function ModalRol(props: ModalRolProps) {
  const { modo, modulo, recursos, nombreInicial, alCerrar } = props
  const estado = usarModalRol(props)
  const { conPermisos, nombre, configuracion, expandidos, error, guardando, confirmandoSalida, cambiar } = estado

  return (
    <Modal titulo={textos.titulos[modo].replace(':modulo', modulo).replace(':rol', nombreInicial)} etiquetaCerrar={textosRedSocial.CERRAR} onCerrar={estado.intentarCerrar} className={conPermisos ? clases.modal_rol : clases.modal_permiso}>
      <div className={clases.rol_cuerpo}>
        <CampoTexto
          id={textos.id_nombre}
          etiqueta={textos.nombre_etiqueta}
          required
          valor={nombre}
          alCambiar={estado.cambiarNombre}
          error={error?.campo === 'nombre'}
          mensajeError={error?.campo === 'nombre' ? error.mensaje : undefined}
        />
        {!conPermisos && <p className={clases.ajuste_nota}>{modo === 'duplicar' ? textos.nota_duplicar : textos.nota_crear}</p>}
        {conPermisos && (
          <PanelEdicionPermisos
            prefijoId={catalogoColaboradores.ids_permisos.rol}
            claveLista={modulo}
            titulo={textos.permisos_titulo}
            subtitulo={textos.permisos_subtitulo_editar}
            recursos={recursos}
            configuracion={configuracion}
            expandidos={expandidos}
            errorPermisos={error?.campo === 'permisos' ? error.mensaje : null}
            alCambiarExpandidos={estado.setExpandidos}
            alSeleccionarModulo={(activo) => cambiar((actual) => conSeleccionModulo(recursos, actual, activo))}
            alSeleccionarRecurso={(recurso, activo) => cambiar((actual) => {
              const definicion = recursos.find((candidato) => candidato.nombre === recurso)
              return definicion ? conSeleccionRecurso(definicion, actual, activo) : actual
            })}
            alAlternar={(recurso, clave, activo) => cambiar((actual) => conOperacion(actual, recurso, clave, activo))}
            alAlternarEspecifico={(recurso, id, activo) => cambiar((actual) => conEspecifico(actual, recurso, id, activo))}
            alAgregar={estado.agregar}
          />
        )}
      </div>
      <div className={clases.rol_pie}>
        <Boton type="button" variant="secundario" size="md" onClick={estado.intentarCerrar}>{textosRedSocial.CANCELAR}</Boton>
        <Boton type="button" variant="primario" size="md" disabled={guardando} aria-busy={guardando} onClick={estado.guardar}>{textos.boton_guardar[modo]}</Boton>
      </div>
      {confirmandoSalida && (
        <ModalConfirmacionRol
          titulo={textos.descartar_titulo}
          mensaje={textos.descartar_mensaje}
          etiquetaCancelar={textos.seguir_editando}
          etiquetaConfirmar={textos.descartar}
          alCancelar={() => estado.setConfirmandoSalida(false)}
          alConfirmar={alCerrar}
        />
      )}
    </Modal>
  )
}
