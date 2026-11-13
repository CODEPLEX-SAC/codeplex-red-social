import { CampoBusqueda } from '../../compartido/interfaz/campo_busqueda'
import catalogoGuardados from '../../../catalogos/capacidades/redsocial/guardados.json'
import type { BuscadorGuardadosProps } from '@/tipos/guardados/contrato_guardados'

const clases = catalogoGuardados.clases

export function BuscadorGuardados({ texto, alBuscar }: BuscadorGuardadosProps) {
  return (
    <div className={clases.buscador_fila}>
      <CampoBusqueda placeholder={catalogoGuardados.placeholders.buscar_guardados} aria-label={catalogoGuardados.campos.buscar_guardados} value={texto} onChange={alBuscar} className={clases.buscador} />
    </div>
  )
}
