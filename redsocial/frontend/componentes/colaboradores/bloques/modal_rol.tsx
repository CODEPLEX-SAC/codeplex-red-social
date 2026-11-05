import { useState } from 'react'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { Boton } from '../../compartido/interfaz/boton'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Modal } from '../../compartido/interfaz/modal'
import { agregarPermisoEspecifico, conEspecifico, conOperacion, conSeleccionModulo, conSeleccionRecurso, copiarConfiguracion, mismaConfiguracion } from './logica_permisos_invitacion'
import { ModalConfirmacionRol } from './modal_confirmacion_rol'
import { PanelEdicionPermisos } from './panel_edicion_permisos'
import type { CampoErrorRol, ConfiguracionPermisos, RecursoPermiso, ResultadoCreacionRol } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

const clases = catalogoColaboradores.clases.invitar_permisos
const textos = catalogoColaboradores.dialogos_rol

export type ModoModalRol = 'crear' | 'duplicar' | 'editar'

export interface ModalRolProps {
  modo: ModoModalRol
  modulo: string
  recursos: RecursoPermiso[]
  nombreInicial: string
  configuracionInicial: ConfiguracionPermisos
  alGuardar: (nombre: string, configuracion: ConfiguracionPermisos) => ResultadoCreacionRol
  alCerrar: () => void
}

export function ModalRol({ modo, modulo, recursos, nombreInicial, configuracionInicial, alGuardar, alCerrar }: ModalRolProps) {
  const conPermisos = modo === 'editar'
  const [nombre, setNombre] = useState(nombreInicial)
  const [configuracion, setConfiguracion] = useState(() => copiarConfiguracion(configuracionInicial))
  const [expandidos, setExpandidos] = useState<string[]>([])
  const [error, setError] = useState<{ campo: CampoErrorRol; mensaje: string } | null>(null)
  const [guardando, setGuardando] = useState(false)
  const [confirmandoSalida, setConfirmandoSalida] = useState(false)
  const pendiente = nombre !== nombreInicial || (conPermisos && !mismaConfiguracion(configuracion, configuracionInicial))

  function intentarCerrar() {
    if (pendiente && conPermisos) setConfirmandoSalida(true)
    else alCerrar()
  }

  function guardar() {
    if (guardando) return
    setGuardando(true)
    const resultado = alGuardar(nombre, configuracion)
    if (resultado.error === null) {
      alCerrar()
      return
    }
    setGuardando(false)
    setError({ campo: resultado.campo ?? 'nombre', mensaje: resultado.error })
  }

  function cambiar(cambio: (actual: ConfiguracionPermisos) => ConfiguracionPermisos) {
    setConfiguracion(cambio)
    setError((actual) => (actual?.campo === 'permisos' ? null : actual))
  }

  function agregar(recurso: string, etiqueta: string) {
    const resultado = agregarPermisoEspecifico(configuracion, recursos.find((candidato) => candidato.nombre === recurso), etiqueta)
    if (resultado.error === null) setConfiguracion(resultado.configuracion)
    return resultado.error
  }

  return (
    <Modal titulo={textos.titulos[modo].replace(':modulo', modulo).replace(':rol', nombreInicial)} etiquetaCerrar={textosRedSocial.CERRAR} onCerrar={intentarCerrar} className={conPermisos ? clases.modal_rol : clases.modal_permiso}>
      <div className={clases.rol_cuerpo}>
        <CampoTexto
          id={textos.id_nombre}
          etiqueta={textos.nombre_etiqueta}
          required
          valor={nombre}
          alCambiar={(valor) => {
            setNombre(valor)
            setError((actual) => (actual?.campo === 'nombre' ? null : actual))
          }}
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
            alCambiarExpandidos={setExpandidos}
            alSeleccionarModulo={(activo) => cambiar((actual) => conSeleccionModulo(recursos, actual, activo))}
            alSeleccionarRecurso={(recurso, activo) => cambiar((actual) => {
              const definicion = recursos.find((candidato) => candidato.nombre === recurso)
              return definicion ? conSeleccionRecurso(definicion, actual, activo) : actual
            })}
            alAlternar={(recurso, clave, activo) => cambiar((actual) => conOperacion(actual, recurso, clave, activo))}
            alAlternarEspecifico={(recurso, id, activo) => cambiar((actual) => conEspecifico(actual, recurso, id, activo))}
            alAgregar={agregar}
          />
        )}
      </div>
      <div className={clases.rol_pie}>
        <Boton type="button" variant="secundario" size="md" onClick={intentarCerrar}>{textosRedSocial.CANCELAR}</Boton>
        <Boton type="button" variant="primario" size="md" disabled={guardando} aria-busy={guardando} onClick={guardar}>{textos.boton_guardar[modo]}</Boton>
      </div>
      {confirmandoSalida && (
        <ModalConfirmacionRol
          titulo={textos.descartar_titulo}
          mensaje={textos.descartar_mensaje}
          etiquetaCancelar={textos.seguir_editando}
          etiquetaConfirmar={textos.descartar}
          alCancelar={() => setConfirmandoSalida(false)}
          alConfirmar={alCerrar}
        />
      )}
    </Modal>
  )
}
