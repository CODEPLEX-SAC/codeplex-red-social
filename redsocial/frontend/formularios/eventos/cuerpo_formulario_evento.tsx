import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import type { Dayjs } from 'dayjs'
import { SeccionConfiguracionEvento, SeccionOrganizadorEvento } from './seccion_configuracion_evento'
import { SeccionCostoLimiteEvento } from './seccion_costo_limite_evento'
import { SeccionImagenEvento } from './seccion_imagen_evento'
import { SeccionInformacionEvento } from './seccion_informacion_evento'
import type { AsignadoresFormularioEvento, ValoresFormularioEvento } from './modelo_formulario_evento'

export function CuerpoFormularioEvento({
  valores,
  asignar,
  inicio,
  fin,
  conImagenActual,
  className,
}: {
  valores: ValoresFormularioEvento
  asignar: AsignadoresFormularioEvento
  inicio?: Dayjs
  fin?: Dayjs
  conImagenActual: boolean
  className: string
}) {
  return (
    <div className={className}>
      <div className={catalogoEventos.formulario_evento.clase_columna}>
        <SeccionInformacionEvento valores={valores} asignar={asignar} inicio={inicio} fin={fin} />
        <SeccionCostoLimiteEvento valores={valores} asignar={asignar} />
      </div>
      <div className={catalogoEventos.formulario_evento.clase_columna}>
        <SeccionImagenEvento valores={valores} asignar={asignar} conImagenActual={conImagenActual} />
        <SeccionOrganizadorEvento />
        <SeccionConfiguracionEvento valores={valores} asignar={asignar} />
      </div>
    </div>
  )
}
