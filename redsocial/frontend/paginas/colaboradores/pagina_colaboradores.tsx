import { EstructuraApp, ColumnaPublicidad } from '../../componentes/compartido'
import { useState } from 'react'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'
import type { IconName } from '../../tipos/compartido/contrato_icono'
import type { Colaborador } from '../../tipos/colaboradores/modelo_colaboradores'
import type { EstadoInvitacion, DatosColaboradorInvitado } from '../../tipos/colaboradores/contrato_invitar_colaborador'
import type { BorradorColaborador } from '../../tipos/colaboradores/contrato_gestion_colaboradores'
import { COLABORADORES, FILTROS_ESTADO_COLABORADORES, PASOS_FUNCIONA_COLABORADORES, ROL_CLASES, ESTADO_CLASES, APLICACIONES_DISPONIBLES, FECHA_BAJA_EJEMPLO, DATOS_ASISTENTE_INVITACION } from '../../rutas/colaboradores/rutas_colaboradores'
import { SeccionListado, SeccionDetalleColaborador, SeccionEditarColaborador, SeccionComoFunciona, BloqueConfirmarBajaColaborador, ModalInvitarColaborador, AvisoInvitacionEnviada, usarGestionColaboradores } from '../../componentes/colaboradores'


const PASOS_FUNCIONA: { icono: IconName; clase: string; numero: string; descripcion: string }[] = [...PASOS_FUNCIONA_COLABORADORES]

export function PaginaColaboradores() {
  const [menuAbierto, setMenuAbierto] = useState<number | null>(null)
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

  const [anclaMenu, setAnclaMenu] = useState<HTMLElement | null>(null)
  const cerrarMenus = () => {
    setMenuAbierto(null)
    setAnclaMenu(null)
  }

  return (
    <EstructuraApp paginaActiva={catalogoColaboradores.claves.modulo}>
      {gestion.aviso && <AvisoInvitacionEnviada mensaje={gestion.aviso.texto} error={gestion.aviso.error} alCerrar={gestion.cerrarAviso} />}
      <div
        onClick={cerrarMenus}
        className={
          'grid items-start gap-lg max-1100:grid-cols-1 ' +
          (panelAbierto ? 'panel-colaboradores-abierto' : 'panel-colaboradores-cerrado')
        }
      >
        <SeccionListado
          datos={{
            COLABORADORES: gestion.colaboradores,
            FILTROS_ESTADO_COLABORADORES,
            ESTADO_CLASES,
            ROL_CLASES,
            setMenuAbierto,
            setAnclaMenu,
            menuAbierto,
            anclaMenu,
            cerrarMenus,
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
          estado={ESTADO_CLASES[colaboradorAbierto.estado]}
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

        <div className="hidden 2130:block area-publicidad">
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
