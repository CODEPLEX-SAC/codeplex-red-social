import { clasesChip } from '../../compartido/interfaz/chip_filtro'
import catalogoGuardados from '../../../catalogos/capacidades/redsocial/guardados.json'
import type { FiltrosGuardadosProps } from '@/tipos/guardados/contrato_guardados'

const clases = catalogoGuardados.clases
const FILTROS = catalogoGuardados.filtros

export function FiltrosGuardados({ activo, alCambiar }: FiltrosGuardadosProps) {
  return (
    <div role="group" aria-label={catalogoGuardados.campos.filtros} className={clases.filtros}>
      {FILTROS.map((filtro) => (
        <button key={filtro.clave} type="button" aria-pressed={filtro.clave === activo} onClick={() => alCambiar(filtro.clave)} className={clasesChip({ activo: filtro.clave === activo, className: clases.filtro })}>
          {filtro.etiqueta}
        </button>
      ))}
    </div>
  )
}
