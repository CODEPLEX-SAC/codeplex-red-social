import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { CLASES_TABLA } from '../../compartido/clases_tabla'
import { TarjetaColaborador } from './tarjeta_colaborador'
import type { TablaColaboradoresProps } from '@/tipos/colaboradores/contrato_listado_colaboradores'

const clases = catalogoColaboradores.clases.listado

export function ListaTarjetasColaboradores({ datos, filas }: TablaColaboradoresProps) {
  const { alVerColaborador, alEditarColaborador, alConfirmarBaja, alReenviar } = datos
  const acciones = { alVerColaborador, alEditarColaborador, alConfirmarBaja, alReenviar }

  if (filas.length === 0) return <p className={CLASES_TABLA.mensajeVacio}>{catalogoColaboradores.mensajes.sin_colaboradores}</p>

  return (
    <ul className={clases.tarjetas}>
      {filas.map((fila) => (
        <TarjetaColaborador key={fila.id} c={fila.original} acciones={acciones} />
      ))}
    </ul>
  )
}
