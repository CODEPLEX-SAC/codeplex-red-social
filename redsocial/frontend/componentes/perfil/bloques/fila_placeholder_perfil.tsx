import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { FilaPlaceholderPerfilProps } from '@/tipos/perfil/contrato_perfil'

const clases = catalogoPerfil.clases.editor

export function FilaPlaceholderPerfil({ etiqueta, detalle, accesible, icono, onClick }: FilaPlaceholderPerfilProps) {
  return (
    <Boton type="button" variant="fantasma" size="default" aria-label={accesible} onClick={onClick} className={clases.fila_placeholder}>
      <span className={clases.caja_placeholder}>
        <Icono name={icono as IconName} className="h-4.5 w-4.5" />
      </span>
      <span className={clases.columna_placeholder}>
        <span>{etiqueta}</span>
        {detalle && <span className="text-auxiliar">{detalle}</span>}
      </span>
    </Boton>
  )
}
