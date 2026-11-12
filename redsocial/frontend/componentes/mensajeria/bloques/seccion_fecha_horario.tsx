import { CodeplexProveedorFechas } from '@codeplex-sac/selectores-fecha'
import { CampoEtiquetado } from '../../compartido/interfaz/campo_etiquetado'
import { Icono } from '../../compartido/icono'
import { Selector } from '../../compartido/interfaz/selector'
import { SelectorFecha } from '../../compartido/interfaz/selector_fecha'
import { SelectorHora } from '../../compartido/interfaz/selector_hora'
import { textoDeDuracion } from './logica_duracion_reunion'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { SeccionFechaHorarioProps } from '@/tipos/mensajeria/contrato_programar_reunion'

const programar = catalogoMensajeria.videollamada.programar
const textos = programar.textos.fecha_horario
const clases = catalogoMensajeria.videollamada.programar.clases

function MensajeError({ mensaje }: { mensaje?: string }) {
  return mensaje ? <p className={clases.error}>{mensaje}</p> : null
}

export function SeccionFechaHorario({ borrador, errores, duracion, onCambiar, onCambiarInicio }: SeccionFechaHorarioProps) {
  return (
    <section className={clases.tarjeta}>
      <h2 className={clases.titulo_tarjeta}>{textos.titulo}</h2>
      <CodeplexProveedorFechas>
        <div className={clases.rejilla_fechas}>
          <CampoEtiquetado etiqueta={textos.fecha} requerido>
            <SelectorFecha nombreAccesible={textos.fecha} valor={borrador.fecha} alCambiar={(valor) => onCambiar('fecha', valor)} formato={programar.formato_fecha} marcador={textos.marcador_fecha} deshabilitarPasado error={errores.fecha !== undefined} />
            <MensajeError mensaje={errores.fecha} />
          </CampoEtiquetado>
          <CampoEtiquetado etiqueta={textos.zona}>
            <Selector variant="default" className={clases.selector_zona} aria-label={textos.zona} value={borrador.zona} onChange={(evento) => onCambiar('zona', evento.target.value)}>
              {programar.zonas.map((zona) => (
                <option key={zona.valor} value={zona.valor}>
                  {zona.etiqueta}
                </option>
              ))}
            </Selector>
          </CampoEtiquetado>
        </div>
        <div className={clases.rejilla_horas}>
          <CampoEtiquetado etiqueta={textos.inicio} requerido>
            <SelectorHora nombreAccesible={textos.inicio} valor={borrador.inicio} alCambiar={onCambiarInicio} formato={programar.formato_hora} marcador={textos.marcador_hora} error={errores.inicio !== undefined} />
            <MensajeError mensaje={errores.inicio} />
          </CampoEtiquetado>
          <CampoEtiquetado etiqueta={textos.fin} requerido>
            <SelectorHora nombreAccesible={textos.fin} valor={borrador.fin} alCambiar={(valor) => onCambiar('fin', valor)} formato={programar.formato_hora} marcador={textos.marcador_hora} error={errores.fin !== undefined} />
            <MensajeError mensaje={errores.fin} />
          </CampoEtiquetado>
          <CampoEtiquetado etiqueta={textos.duracion}>
            <p aria-live="polite" className={clases.duracion}>
              <Icono name="reloj" className="h-4 w-4 text-primario" /> {textoDeDuracion(duracion)}
            </p>
          </CampoEtiquetado>
        </div>
      </CodeplexProveedorFechas>
    </section>
  )
}
