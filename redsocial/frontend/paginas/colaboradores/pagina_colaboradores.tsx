import { EstructuraApp, ColumnaPublicidad, AvisoEmergente } from '../../componentes/compartido'
import { useState } from 'react'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'
import type { IconName } from '../../tipos/compartido/contrato_icono'
import type { Colaborador } from '../../tipos/colaboradores/modelo_colaboradores'
import type { EstadoInvitacion, DatosColaboradorInvitado } from '../../tipos/colaboradores/contrato_invitar_colaborador'
import type { BorradorColaborador } from '../../tipos/colaboradores/contrato_gestion_colaboradores'
import { COLABORADORES, FILTROS_ESTADO_COLABORADORES, PASOS_FUNCIONA_COLABORADORES, APLICACIONES_DISPONIBLES, FECHA_BAJA_EJEMPLO, DATOS_ASISTENTE_INVITACION } from '../../rutas/colaboradores/rutas_colaboradores'
import { SeccionListado, SeccionDetalleColaborador, SeccionEditarColaborador, SeccionComoFunciona, BloqueConfirmarBajaColaborador, ModalInvitarColaborador, usarGestionColaboradores } from '../../componentes/colaboradores'


const PASOS_FUNCIONA: { icono: IconName; numero: string; descripcion: string }[] = [...PASOS_FUNCIONA_COLABORADORES]
const clases = catalogoColaboradores.clases.listado

export function PaginaColaboradores() {
  const [colaboradorAbierto, setColaboradorAbierto] = useState<Colaborador | null>(null)
  const [modoPanel, setModoPanel] = useState<'ver' | 'editar'>('ver')
  const [colaboradorABaja, setColaboradorABaja] = useState<Colaborador | null>(null)
  const [invitacion, setInvitacion] = useState<EstadoInvitacion>('cerrada')
  const panelAbierto = colaboradorAbierto !== null
  const gestion = usarGestionColaboradores(COLABORADORES, APLICACIONES_DISPONIBLES, DATOS_ASISTENTE_INVITACION)

  function abrirParaVer(colaborador: Colaborador | null) {
    setColaboradorAbierto(colaborador)
    setModoPanel('ver')
  }

  function abrirParaEditar(colaborador: Colaborador) {
    setColaboradorAbierto(colaborador)
    setModoPanel('editar')
  }

  function abrirInvitacion() {
    setInvitacion('abierta')
  }

  function cerrarInvitacion() {
    setInvitacion('cerrada')
  }

  function enviarInvitacion(invitado: DatosColaboradorInvitado) {
    gestion.invitar(invitado)
    cerrarInvitacion()
  }

  function guardarEdicion(borrador: BorradorColaborador) {
    if (colaboradorAbierto) abrirParaVer(gestion.guardarEdicion(colaboradorAbierto, borrador))
  }

  function confirmarBaja(fecha: string) {
    if (!colaboradorABaja) return
    const actualizado = gestion.darDeBaja(colaboradorABaja, fecha)
    if (colaboradorAbierto?.correo === colaboradorABaja.correo) setColaboradorAbierto(actualizado)
    setColaboradorABaja(null)
  }

  return (
    <EstructuraApp paginaActiva={catalogoColaboradores.claves.modulo}>
      {gestion.aviso && <AvisoEmergente abierto titulo={gestion.aviso.titulo} mensaje={gestion.aviso.texto} variante={gestion.aviso.error ? 'error' : 'exito'} alCerrar={gestion.cerrarAviso} />}
      <div
        className={[clases.pagina_rejilla, panelAbierto ? clases.pagina_rejilla_panel_abierto : clases.pagina_rejilla_panel_cerrado].join(' ')}
      >
        <SeccionListado
          datos={{
            COLABORADORES: gestion.colaboradores,
            FILTROS_ESTADO_COLABORADORES,
            alVerColaborador: abrirParaVer,
            alEditarColaborador: abrirParaEditar,
            alConfirmarBaja: setColaboradorABaja,
            alReenviar: gestion.reenviar,
            alFalloExportar: gestion.avisarFalloExportacion,
            alInvitarColaborador: abrirInvitacion,
          }}
        />

      {colaboradorAbierto && modoPanel === 'ver' && (
        <SeccionDetalleColaborador
          colaborador={colaboradorAbierto}
          alCerrar={() => abrirParaVer(null)}
          alEditar={() => abrirParaEditar(colaboradorAbierto)}
        />
      )}

      {colaboradorAbierto && modoPanel === 'editar' && (
        <SeccionEditarColaborador
          key={colaboradorAbierto.correo}
          colaborador={colaboradorAbierto}
          colaboradores={gestion.colaboradores}
          aplicacionesDisponibles={APLICACIONES_DISPONIBLES}
          alCerrar={() => abrirParaVer(null)}
          alCancelar={() => abrirParaVer(colaboradorAbierto)}
          alGuardar={guardarEdicion}
        />
      )}

        <div className={clases.pagina_publicidad}>
          <ColumnaPublicidad />
        </div>

        <SeccionComoFunciona PASOS_FUNCIONA={PASOS_FUNCIONA} />
      </div>

      {colaboradorABaja && (
        <BloqueConfirmarBajaColaborador
          colaborador={colaboradorABaja}
          fechaEjemplo={FECHA_BAJA_EJEMPLO}
          alCerrar={() => setColaboradorABaja(null)}
          alConfirmar={confirmarBaja}
        />
      )}
      {invitacion === 'abierta' && <ModalInvitarColaborador datos={DATOS_ASISTENTE_INVITACION} alCerrar={cerrarInvitacion} alEnviar={enviarInvitacion} />}
    </EstructuraApp>
  )
}
