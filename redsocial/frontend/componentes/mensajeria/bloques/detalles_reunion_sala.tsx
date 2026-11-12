import { useState } from 'react'
import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { DetallesReunionSalaProps } from '@/tipos/mensajeria/contrato_sala_llamada'

const textos = catalogoMensajeria.videollamada.textos.sala
const clases = catalogoMensajeria.videollamada.clases.sala

export function DetallesReunionSala({ reunion, total, enlaceReunion }: DetallesReunionSalaProps) {
  const [abierto, setAbierto] = useState(false)

  return (
    <div className={clases.pie_detalles}>
      <Boton type="button" variant="filtro" size="filtro" activo={abierto} aria-expanded={abierto} onClick={() => setAbierto((actual) => !actual)}>
        <Icono name="informacion" className="h-4 w-4" /> {textos.detalles}
      </Boton>
      {abierto && (
        <section aria-label={textos.detalles} className={clases.detalles}>
          <h2 className={clases.detalles_titulo}>{reunion.titulo}</h2>
          <p className={clases.detalles_dato}>{reunion.horario}</p>
          <p className={clases.detalles_dato}>{textos.detalles_participantes.replace(':n', String(total))}</p>
          <p className={clases.detalles_dato}>
            {textos.detalles_enlace}: {enlaceReunion}
          </p>
        </section>
      )}
    </div>
  )
}
