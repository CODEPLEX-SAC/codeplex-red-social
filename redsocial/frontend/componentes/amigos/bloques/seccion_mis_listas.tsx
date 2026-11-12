import { MensajeVacio } from '../../compartido'
import { TarjetaListaAmigos } from './tarjeta_lista_amigos'
import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import type { SeccionMisListasProps } from '@/tipos/amigos/contrato_listas'

const clases = catalogoAmigos.clases.listas

export function SeccionMisListas({ listas, alAbrir, alEditar, alEliminar }: SeccionMisListasProps) {
  return (
    <div className={clases.rejilla}>
      {listas.length === 0 && <MensajeVacio texto={catalogoAmigos.listas.vacio} className={clases.vacio} />}
      {listas.map((lista) => (
        <TarjetaListaAmigos key={lista.id} lista={lista} alAbrir={alAbrir} alEditar={alEditar} alEliminar={alEliminar} />
      ))}
    </div>
  )
}
