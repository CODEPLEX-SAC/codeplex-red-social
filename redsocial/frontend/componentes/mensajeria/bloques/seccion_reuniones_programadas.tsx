import { useState } from 'react'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import { FilaReunionProgramada } from './fila_reunion_programada'
import type { ReunionProgramada } from '@/tipos/mensajeria/contrato_reunion'

const limite = catalogoMensajeria.limites_listas.reuniones

export function SeccionReunionesProgramadas({
  REUNIONES_PROGRAMADAS,
}: {
  REUNIONES_PROGRAMADAS: ReunionProgramada[]
}) {
  const [todas, setTodas] = useState(false)
  const visibles = todas ? REUNIONES_PROGRAMADAS : REUNIONES_PROGRAMADAS.slice(0, limite)

  return (
    <section className="min-w-0 rounded-xl border border-borde bg-white p-4">
      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="m-0 text-titulo-seccion text-texto">{catalogoMensajeria.secciones.reuniones_programadas}</h2>
      </div>
      <div className="flex flex-col gap-px overflow-hidden rounded-control border border-borde bg-borde">
        {visibles.map((r) => <FilaReunionProgramada key={r.id} reunion={r} />)}
      </div>
      {REUNIONES_PROGRAMADAS.length > limite && (
        <div className="pt-3.5 text-center">
          <Boton type="button" variant="enlace" size="enlace_accion" aria-expanded={todas} onClick={() => setTodas((actual) => !actual)}>
            {todas ? catalogoMensajeria.botones.ver_menos_reuniones : catalogoMensajeria.botones.ver_todas_las_reuniones}
          </Boton>
        </div>
      )}
    </section>
  )
}
