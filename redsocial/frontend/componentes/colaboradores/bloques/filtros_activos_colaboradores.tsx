import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { FiltroActivo } from '@/tipos/colaboradores/contrato_gestion_colaboradores'

const clases = catalogoColaboradores.clases.listado
const textos = catalogoColaboradores.botones

export function FiltrosActivosColaboradores({ filtros, alQuitar }: { filtros: FiltroActivo[]; alQuitar: (clave: string) => void }) {
  if (filtros.length === 0) return null

  return (
    <ul className={clases.filtros_activos}>
      {filtros.map((filtro) => (
        <li key={filtro.clave}>
          <Boton type="button" variant="filtro" size="filtro" aria-label={textos.quitar_filtro.replace(':filtro', filtro.etiqueta)} onClick={() => alQuitar(filtro.clave)}>
            {filtro.etiqueta}
            <Icono name="cerrar" className={clases.filtro_activo_glifo} />
          </Boton>
        </li>
      ))}
    </ul>
  )
}
