import { CodeplexProveedorFechas } from '@codeplex-sac/selectores-fecha'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { BloqueFiltrosVigenciaFechas } from './bloque_filtros_vigencia_fechas'
import { BloqueFiltrosEstadoCuenta } from './bloque_filtros_estado_cuenta'
import { usarFiltrosAvanzados } from './usar_filtros_avanzados'

const textos = catalogoColaboradores.panel_filtros_avanzados

function detenerPropagacion(evento: { stopPropagation: () => void }) {
  evento.stopPropagation()
}

export function PanelFiltrosAvanzados({ onCerrar }: { onCerrar: () => void }) {
  const {
    valores,
    asignar,
    limpiar,
    cambiarUltimoAcceso,
    cambiarAccesoVigente,
    cambiarAccesoVencido,
    cambiarAplicaciones,
    cambiarCuentaCreada,
    cambiarCuentaInvitada,
    cambiarMetodoInvitacion,
  } = usarFiltrosAvanzados()

  return (
    <div
      onClick={detenerPropagacion}
      className="absolute right-0 top-tooltip z-20 flex max-h-150 w-125 flex-col overflow-hidden rounded-xl border border-gris-borde bg-white shadow-t13 max-600:fixed max-600:inset-x-0 max-600:bottom-0 max-600:top-auto max-600:z-30 max-600:w-full max-600:max-w-none max-600:rounded-b-none max-600:rounded-t-2xl panel-hoja-movil"
    >
      <div className="hidden flex-none pt-2.5 max-600:block">
        <div className="mx-auto h-1 w-10 rounded-full bg-t-e0dce8" />
      </div>

      <div className="flex-none border-b border-t-f3f4f6 p-4 pb-3 max-600:border-b-0">
        <div className="flex items-center justify-between">
          <h3 className="m-0 text-titulo-seccion font-bold text-gris-oscuro-texto">{textos.titulo}</h3>
          <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} onClick={onCerrar} variant="discreto" size="sm" />
        </div>
      </div>

      <CodeplexProveedorFechas idioma={textos.idioma}>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-x-5 gap-y-4 max-600:grid-cols-1">
            <BloqueFiltrosVigenciaFechas
              fechaInicio={valores.fechaInicio}
              fechaFin={valores.fechaFin}
              invitacionDesde={valores.invitacionDesde}
              invitacionHasta={valores.invitacionHasta}
              asignarFechaInicio={asignar.fechaInicio}
              asignarFechaFin={asignar.fechaFin}
              asignarInvitacionDesde={asignar.invitacionDesde}
              asignarInvitacionHasta={asignar.invitacionHasta}
            />
            <BloqueFiltrosEstadoCuenta
              valores={{
                ultimoAcceso: valores.ultimoAcceso,
                accesoVigente: valores.accesoVigente,
                accesoVencido: valores.accesoVencido,
                aplicaciones: valores.aplicaciones,
                cuentaCreada: valores.cuentaCreada,
                cuentaInvitada: valores.cuentaInvitada,
                metodoInvitacion: valores.metodoInvitacion,
              }}
              asignadores={{
                ultimoAcceso: cambiarUltimoAcceso,
                accesoVigente: cambiarAccesoVigente,
                accesoVencido: cambiarAccesoVencido,
                aplicaciones: cambiarAplicaciones,
                cuentaCreada: cambiarCuentaCreada,
                cuentaInvitada: cambiarCuentaInvitada,
                metodoInvitacion: cambiarMetodoInvitacion,
              }}
            />
          </div>
        </div>
      </CodeplexProveedorFechas>

      <div className="grid flex-none grid-cols-2 gap-2 border-t border-t-f3f4f6 p-4">
        <Boton type="button" variant="secundario" onClick={limpiar}>{textos.limpiar}</Boton>
        <Boton type="button" variant="primario" onClick={onCerrar}>{textos.aplicar}</Boton>
      </div>
    </div>
  )
}
