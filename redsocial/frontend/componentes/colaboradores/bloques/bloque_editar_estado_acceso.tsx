import { Selector } from '../../compartido/interfaz/selector'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { BorradorColaborador } from '@/tipos/colaboradores/contrato_gestion_colaboradores'

const opcionesEditables = catalogoColaboradores.selectores.estado.opciones.slice(1, 4)
const opcionesConBaja = catalogoColaboradores.selectores.estado.opciones.slice(1)

export function BloqueEditarEstadoAcceso({ borrador, etiquetaEstado, alElegirEstado }: { borrador: BorradorColaborador; etiquetaEstado: string; alElegirEstado: (etiqueta: string) => void }) {
  const opcionesEstado = borrador.estado === 'baja' ? opcionesConBaja : opcionesEditables

  return (
    <section className="mt-4 border-t border-borde-suave pt-4">
      <h3 className="m-0 mb-2.5 text-nombre-entidad text-texto">{catalogoColaboradores.editar.estado_de_acceso}</h3>
      <div className="flex flex-col gap-1">
        <label className="text-etiqueta text-texto">{catalogoColaboradores.selectores.estado.etiqueta} <span className="text-negativo-kpi">*</span></label>
        <Selector variant="colaboradores" label={catalogoColaboradores.selectores.estado.etiqueta} value={etiquetaEstado} onChange={(evento) => alElegirEstado(String(evento.target.value))}>
          {opcionesEstado.map((o) => <option key={o}>{o}</option>)}
        </Selector>
      </div>
    </section>
  )
}
