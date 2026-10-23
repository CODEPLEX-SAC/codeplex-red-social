import { Pestanas } from '../../compartido/interfaz/pestanas'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { ElementoPestana } from '@/tipos/compartido/contrato_pestanas'
import type { PestanasPerfilProps } from '@/tipos/perfil/contrato_perfil'
import type { PestanaPerfil } from '@/tipos/perfil/modelo_perfil'

const ELEMENTOS = catalogoPerfil.pestanas as ElementoPestana[]

export function PestanasPerfil({ activa, onCambiar }: PestanasPerfilProps) {
  return <Pestanas elementos={ELEMENTOS} activa={activa} alCambiar={(clave) => onCambiar(clave as PestanaPerfil)} className={catalogoPerfil.clases.pestanas} />
}
