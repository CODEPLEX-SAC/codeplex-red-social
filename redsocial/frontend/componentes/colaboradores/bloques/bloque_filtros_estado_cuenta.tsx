import { Selector } from '../../compartido/interfaz/selector'
import { Casilla } from '../../compartido/interfaz/casilla'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'

const textos = catalogoColaboradores.panel_filtros_avanzados
const clases = catalogoColaboradores.clases.filtros

export function BloqueFiltrosEstadoCuenta({
  valores,
  asignadores,
}: {
  valores: {
    ultimoAcceso: string
    accesoVigente: boolean
    accesoVencido: boolean
    aplicaciones: string
    cuentaCreada: boolean
    cuentaInvitada: boolean
    metodoInvitacion: string
  }
  asignadores: {
    ultimoAcceso: (evento: { target: { value: unknown } }) => void
    accesoVigente: (_: unknown, marcado: boolean) => void
    accesoVencido: (_: unknown, marcado: boolean) => void
    aplicaciones: (evento: { target: { value: unknown } }) => void
    cuentaCreada: (_: unknown, marcado: boolean) => void
    cuentaInvitada: (_: unknown, marcado: boolean) => void
    metodoInvitacion: (evento: { target: { value: unknown } }) => void
  }
}) {
  const { ultimoAcceso, accesoVigente, accesoVencido, aplicaciones, cuentaCreada, cuentaInvitada, metodoInvitacion } = valores
  const {
    ultimoAcceso: onCambiarUltimoAcceso,
    accesoVigente: onCambiarAccesoVigente,
    accesoVencido: onCambiarAccesoVencido,
    aplicaciones: onCambiarAplicaciones,
    cuentaCreada: onCambiarCuentaCreada,
    cuentaInvitada: onCambiarCuentaInvitada,
    metodoInvitacion: onCambiarMetodoInvitacion,
  } = asignadores

  return (
    <div className={clases.columna}>
      <section>
        <Selector variant="colaboradores" label={textos.ultimo_acceso.etiqueta} value={ultimoAcceso} onChange={onCambiarUltimoAcceso}>
          {textos.ultimo_acceso.opciones.map((o) => <option key={o}>{o}</option>)}
        </Selector>
      </section>

      <section>
        <h4 className={clases.titulo_grupo}>{textos.estado_acceso}</h4>
        <div className={clases.opciones}>
          <label className={clases.opcion}>
            <Casilla seleccionado={accesoVigente} alCambiar={onCambiarAccesoVigente} inputProps={{ 'aria-label': textos.acceso_vigente }} />
            <span className={clases.opcion_texto}>{textos.acceso_vigente}</span>
          </label>
          <label className={clases.opcion}>
            <Casilla seleccionado={accesoVencido} alCambiar={onCambiarAccesoVencido} inputProps={{ 'aria-label': textos.acceso_vencido }} />
            <span className={clases.opcion_texto}>{textos.acceso_vencido}</span>
          </label>
        </div>
      </section>

      <section>
        <Selector variant="colaboradores" label={textos.aplicaciones_asignadas.etiqueta} value={aplicaciones} onChange={onCambiarAplicaciones}>
          {textos.aplicaciones_asignadas.opciones.map((o) => <option key={o}>{o}</option>)}
        </Selector>
      </section>

      <section>
        <h4 className={clases.titulo_grupo}>{textos.tipo_cuenta}</h4>
        <div className={clases.opciones}>
          <label className={clases.opcion}>
            <Casilla seleccionado={cuentaCreada} alCambiar={onCambiarCuentaCreada} inputProps={{ 'aria-label': textos.cuenta_creada }} />
            <span className={clases.opcion_texto}>{textos.cuenta_creada}</span>
          </label>
          <label className={clases.opcion}>
            <Casilla seleccionado={cuentaInvitada} alCambiar={onCambiarCuentaInvitada} inputProps={{ 'aria-label': textos.cuenta_invitada }} />
            <span className={clases.opcion_texto}>{textos.cuenta_invitada}</span>
          </label>
        </div>
      </section>

      <section>
        <Selector variant="colaboradores" label={textos.metodo_invitacion.etiqueta} value={metodoInvitacion} onChange={onCambiarMetodoInvitacion} disabled>
          {textos.metodo_invitacion.opciones.map((o) => <option key={o}>{o}</option>)}
        </Selector>
      </section>
    </div>
  )
}
