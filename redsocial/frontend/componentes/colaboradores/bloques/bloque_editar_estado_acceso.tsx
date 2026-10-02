import { Selector } from '../../compartido/interfaz/selector'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'

const opcionesEstado = catalogoColaboradores.selectores.estado.opciones.slice(1, 4)

export function BloqueEditarEstadoAcceso({ colaborador, etiquetaEstado }: { colaborador: Colaborador; etiquetaEstado: string }) {
  return (
    <section className="mt-4 border-t border-t-f3f4f6 pt-4">
      <h4 className="m-0 mb-2.5 text-nombre-entidad font-semibold text-gris-oscuro-texto">{catalogoColaboradores.editar.estado_de_acceso}</h4>
      <div className="flex flex-col gap-1">
        <label className="text-campo-formulario font-medium text-gris-texto">{catalogoColaboradores.selectores.estado.etiqueta} <span className="text-negativo-kpi">*</span></label>
        <Selector variant="colaboradores" defaultValue={etiquetaEstado} name={colaborador.nombre}>
          {opcionesEstado.map((o) => <option key={o}>{o}</option>)}
        </Selector>
      </div>
    </section>
  )
}
