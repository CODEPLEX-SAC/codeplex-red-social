import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { PanelReaccionesProps } from '@/tipos/inicio/contrato_reacciones'

const configuracion = catalogoInicio.reacciones

export function PanelReacciones({ opciones, onElegir }: PanelReaccionesProps) {
  return (
    <div className={configuracion.clases.puente}>
      <div role="toolbar" aria-label={configuracion.etiqueta_panel} className={configuracion.clases.panel}>
        {opciones.map((opcion) => (
          <BotonIcono
            key={opcion.clave}
            icono={opcion.icono}
            type="button"
            aria-label={opcion.etiqueta}
            title={opcion.etiqueta}
            variant="sutil"
            size="default"
            onClick={() => onElegir(opcion.clave)}
            className={`${opcion.clase_color} ${configuracion.clases.opcion}`}
          />
        ))}
      </div>
    </div>
  )
}
