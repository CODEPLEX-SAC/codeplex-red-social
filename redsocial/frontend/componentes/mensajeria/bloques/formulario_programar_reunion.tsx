import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { ResumenReunionProgramada } from './confirmacion_reunion_programada'
import { SeccionAccesoReunion } from './seccion_acceso_reunion'
import { SeccionFechaHorario } from './seccion_fecha_horario'
import { SeccionInformacionReunion } from './seccion_informacion_reunion'
import { SeccionInvitarParticipantes } from './seccion_invitar_participantes'
import { usarProgramarReunion } from './usar_programar_reunion'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { FormularioProgramarReunionProps } from '@/tipos/mensajeria/contrato_programar_reunion'

const acciones = catalogoMensajeria.videollamada.programar.textos.acciones
const clases = catalogoMensajeria.videollamada.programar.clases

export function FormularioProgramarReunion({ fotografiaDe, rutaSala, candidatos, programar, copiarEnlace, onCerrar }: FormularioProgramarReunionProps) {
  const reunion = usarProgramarReunion({ candidatos, programar, copiarEnlace })

  function enviar(evento: React.FormEvent) {
    evento.preventDefault()
    reunion.enviar()
  }

  if (reunion.programada) {
    return <ResumenReunionProgramada reunion={reunion.programada} copia={reunion.copia} onCopiar={() => void reunion.copiar()} rutaSala={rutaSala(reunion.programada)} onCerrar={onCerrar} />
  }

  return (
    <form onSubmit={enviar} noValidate className="grid gap-4">
      <div className={clases.rejilla}>
        <div className={clases.columna}>
          <SeccionInformacionReunion borrador={reunion.borrador} errores={reunion.errores} onCambiar={reunion.cambiar} />
          <SeccionFechaHorario borrador={reunion.borrador} errores={reunion.errores} duracion={reunion.duracion} onCambiar={reunion.cambiar} onCambiarInicio={reunion.cambiarInicio} />
        </div>
        <div className={clases.columna}>
          <SeccionInvitarParticipantes candidatos={candidatos} invitados={reunion.borrador.invitados} disponibles={reunion.disponibles} fotografiaDe={fotografiaDe} onAgregar={reunion.agregar} onQuitar={reunion.quitar} />
          <SeccionAccesoReunion borrador={reunion.borrador} onCambiar={reunion.cambiar} />
        </div>
      </div>
      <div className={clases.pie}>
        <Boton type="button" variant="secundario" size="cta" onClick={onCerrar}>
          {acciones.cancelar}
        </Boton>
        <Boton type="submit" variant="primario" size="cta">
          <Icono name="calendario" className="h-4 w-4" /> {acciones.programar}
        </Boton>
      </div>
    </form>
  )
}
