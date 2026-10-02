import { EstructuraApp, ColumnaPublicidad } from '../../componentes/compartido'
import { useState } from 'react'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'
import type { IconName } from '../../tipos/compartido/contrato_icono'
import type { Colaborador } from '../../tipos/colaboradores/modelo_colaboradores'
import { COLABORADORES, FILTROS_ESTADO_COLABORADORES, PASOS_FUNCIONA_COLABORADORES, ROL_CLASES, ESTADO_CLASES, APLICACIONES_DISPONIBLES, FECHA_BAJA_EJEMPLO } from '../../rutas/colaboradores/rutas_colaboradores'
import { SeccionListado, SeccionDetalleColaborador, SeccionEditarColaborador, SeccionComoFunciona, BloqueConfirmarBajaColaborador } from '../../componentes/colaboradores'


const PASOS_FUNCIONA: { icono: IconName; clase: string; numero: string; descripcion: string }[] = [...PASOS_FUNCIONA_COLABORADORES]

export function PaginaColaboradores() {
  const [menuAbierto, setMenuAbierto] = useState<number | null>(null)
  const [colaboradorAbierto, setColaboradorAbierto] = useState<Colaborador | null>(null)
  const [modoPanel, setModoPanel] = useState<'ver' | 'editar'>('ver')
  const [colaboradorABaja, setColaboradorABaja] = useState<Colaborador | null>(null)
  const panelAbierto = colaboradorAbierto !== null

  function abrirParaVer(colaborador: Colaborador | null) {
    setColaboradorAbierto(colaborador)
    setModoPanel('ver')
  }

  function abrirParaEditar(colaborador: Colaborador) {
    setColaboradorAbierto(colaborador)
    setModoPanel('editar')
  }

  const [anclaMenu, setAnclaMenu] = useState<HTMLElement | null>(null)
  const cerrarMenus = () => {
    setMenuAbierto(null)
    setAnclaMenu(null)
  }

  return (
    <EstructuraApp paginaActiva={catalogoColaboradores.claves.modulo}>
      <div
        onClick={cerrarMenus}
        className={
          'grid items-start gap-lg max-1100:grid-cols-1 ' +
          (panelAbierto ? 'panel-colaboradores-abierto' : 'panel-colaboradores-cerrado')
        }
      >
        <SeccionListado
          datos={{
            COLABORADORES,
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
          colaborador={colaboradorAbierto}
          etiquetaEstado={ESTADO_CLASES[colaboradorAbierto.estado].etiqueta}
          aplicacionesDisponibles={APLICACIONES_DISPONIBLES}
          alCerrar={() => abrirParaVer(null)}
          alCancelar={() => abrirParaVer(colaboradorAbierto)}
        />
      )}

        <div className="hidden 1101:block area-publicidad">
          <ColumnaPublicidad />
        </div>

        <SeccionComoFunciona PASOS_FUNCIONA={PASOS_FUNCIONA} />
      </div>

      {colaboradorABaja && (
        <BloqueConfirmarBajaColaborador
          colaborador={colaboradorABaja}
          fechaEjemplo={FECHA_BAJA_EJEMPLO}
          alCerrar={() => setColaboradorABaja(null)}
        />
      )}
    </EstructuraApp>
  )
}
