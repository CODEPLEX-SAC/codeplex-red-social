import { Selector } from '../../compartido/interfaz/selector'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'

const opcionesEstado = catalogoColaboradores.selectores.estado.opciones.slice(1, 4)

export function BloqueEditarEstadoAcceso({ colaborador, etiquetaEstado }: { colaborador: Colaborador; etiquetaEstado: string }) {
  return (
    <section className="mt-4 border-t border-borde-suave pt-4">
      <h3 className="m-0 mb-2.5 text-nombre-entidad text-texto">{catalogoColaboradores.editar.estado_de_acceso}</h3>
      <div className="flex flex-col gap-1">
        <label className="text-etiqueta text-texto">{catalogoColaboradores.selectores.estado.etiqueta} <span className="text-negativo-kpi">*</span></label>
        <Selector variant="colaboradores" defaultValue={etiquetaEstado} name={colaborador.nombre}>
          {opcionesEstado.map((o) => <option key={o}>{o}</option>)}
        </Selector>
      </div>
    </section>
  )
}
