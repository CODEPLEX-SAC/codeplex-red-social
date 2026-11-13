import { useState } from 'react'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ContenidoDetallesReunionProps } from '@/tipos/mensajeria/contrato_sala_llamada'

const panel = catalogoMensajeria.videollamada.textos.sala.detalles_panel
const clases = catalogoMensajeria.videollamada.clases.sala

export function ContenidoDetallesReunion({ reunion, enlaceReunion }: ContenidoDetallesReunionProps) {
  const [aviso, setAviso] = useState(String())

  async function copiar() {
    try {
      await navigator.clipboard.writeText([reunion.titulo, reunion.horario, enlaceReunion].join(panel.separador_copia))
      setAviso(panel.copiado)
    } catch {
      setAviso(panel.error_copia)
    }
  }

  return (
    <div className={clases.detalles_cuerpo}>
      <h3 className={clases.detalles_reunion_titulo}>{reunion.titulo}</h3>
      <p className={clases.detalles_horario}>
        <Icono name="reloj" className="h-5 w-5 flex-none" /> {reunion.horario}
      </p>
      <hr className={clases.detalles_separador} />
      <div className={clases.detalles_unirse}>
        <h4 className={clases.detalles_unirse_titulo}>{panel.informacion_unirse}</h4>
        <p className={clases.detalles_enlace_texto}>{enlaceReunion}</p>
        <Boton type="button" variant="secundario" size="md" onClick={() => void copiar()}>
          <Icono name="copiar" className="h-4 w-4" /> {panel.copiar}
        </Boton>
        <p aria-live="polite" className={clases.detalles_aviso}>
          {aviso}
        </p>
      </div>
    </div>
  )
}
