import { AyudaContextual } from '../../compartido/interfaz/ayuda_contextual'
import { Casilla } from '../../compartido/interfaz/casilla'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { CamposAccesoReunion, SeccionAccesoReunionProps } from '@/tipos/mensajeria/contrato_programar_reunion'

const textos = catalogoMensajeria.videollamada.programar.textos.acceso
const clases = catalogoMensajeria.videollamada.programar.clases
const campos = catalogoMensajeria.videollamada.programar.campos_acceso as CamposAccesoReunion

export function SeccionAccesoReunion({ borrador, onCambiar }: SeccionAccesoReunionProps) {
  return (
    <section className={clases.tarjeta}>
      <h2 className={clases.titulo_tarjeta}>{textos.titulo}</h2>
      <div className={clases.opciones}>
        <Casilla seleccionado={borrador.permitirCompartir} alCambiar={(_, marcado) => onCambiar(campos.compartir, marcado)} etiqueta={textos.compartir} />
        <div className={clases.fila_ayuda}>
          <Casilla seleccionado={borrador.solicitarAdmision} alCambiar={(_, marcado) => onCambiar(campos.admision, marcado)} etiqueta={textos.admision} />
          <AyudaContextual texto={textos.ayuda_admision} etiqueta={textos.etiqueta_ayuda} />
        </div>
      </div>
    </section>
  )
}
